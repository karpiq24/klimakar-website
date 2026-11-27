#!/usr/bin/env python3
# Vendored copy of klima-kar/platform-ci@e5d776cc6189273de29b41bc7e8b5c0fb1ec2744 actions/comments/check_comments.py (infra#681).
# Do not edit here: change platform-ci first, then copy again and update the SHA above. CI runs the base-branch copy.
"""Comment policy: a comment must be a tool directive, a license header, TODO(#issue), a WHY: line (with its
continuation lines) or JSDoc on an export in the configured directories. Everything else is something the code should
say itself (names, types, tests), so a new comment fails. Port of bin/check-comments in the ERP (klima-kar/infra#681).

Ratchet: comments that existed when the policy started are listed in .comment-baseline.json
({"path": ["sorted comment texts", ...]}, the ERP format) and may stay until their module is cleaned up.
Languages: .py, .js/.mjs/.cjs/.ts/.tsx/.jsx, .html (HTML and Django/Jinja comments), .astro (HTML comments, `{/* */}`,
JS/TS frontmatter and <script>), .sh, Dockerfile*, and extensionless scripts with a shebang (python, sh/bash, node).
Shell and Dockerfile: full-line `#` comments only.

Config (optional) .github/comment-policy.json: enabled (default true), include / exclude (lists; an entry ending in
`/` is a directory at any depth, anything else a regular expression searched in the path; include empty = all),
jsdoc_export_dirs (path prefixes), extra_directives (regular expressions matched at the start of the comment text),
baseline_file (default .comment-baseline.json). Default excludes: migrations/, node_modules/, dist/, build/, .venv/,
vendor/, static/ and minified *.min.js.

"Who touches, fixes": with --base only comments in files the change touches count, the rest are notices (one per
file). Without --base the whole tree counts (local runs, pre-commit, push).
Modes: observe (default; findings are warnings, exit 0), enforce (findings fail, exit 1), auto (observe when the
repository has the baseline or the config, otherwise skipped with a notice), off (skipped).
Baseline helpers: --init (all current comments of tracked files), --prune [PATH...] (drops entries that are gone,
never adds; only under PATH when given), --move OLD NEW (carries a renamed file's entries).
--self-test runs the sensitivity test on synthetic files (exit 2 when the check no longer trips).

Standalone on purpose (Python 3.9+ stdlib, git), like agents_check.py: public repositories copy it and run the
base-branch copy. Read only (apart from the baseline helpers); runs nothing from the repository.
Exit: 0 = ok, observe mode or skipped, 1 = findings in enforce mode, 2 = usage error or failed self-test.
"""
from __future__ import annotations

import argparse
import io
import json
import os
import re
import subprocess
import sys
import tempfile
import tokenize
from collections import Counter
from pathlib import Path
from typing import Tuple

POLICY_FILE = ".github/comment-policy.json"
DEFAULT_BASELINE = ".comment-baseline.json"
DEFAULT_EXCLUDE = ["migrations/", "node_modules/", "dist/", "build/", ".venv/", "vendor/", "static/", r"\.min\.js$"]
MAX_FILE_BYTES = 2_000_000  # larger files are generated or vendored
ANNOTATION_LIMIT = 50  # per run; the rest is counted in the summary

DIRECTIVE = (
    r"noqa\b|type:\s*ignore|pragma\b|fmt:\s*(on|off|skip)|isort:|ruff:|pylint:|pyright:|mypy:|"
    r"eslint-|eslint\s|global\s|globals\s|prettier-ignore|biome-ignore|@ts-|@jsx|istanbul ignore|c8 ignore|"
    r"v8 ignore|@vitest-environment|@jest-environment|djlint:|webpackChunkName|webpackIgnore|@vite-ignore|"
    r"\[if\s|<!\[endif\]|SPDX-License-Identifier|Copyright\b|@license\b|!|-\*-|syntax=|escape=|check=|"
    r"shellcheck\s|hadolint\s|i18n-pl\b|ci-inputs:"
)
TODO = re.compile(r"^TODO\(#\d+\)")
WHY = re.compile(r"^WHY:")

JS_TOKEN = re.compile(r"//[^\n]*|/\*.*?\*/|'(?:\\.|[^'\\\n])*'|\"(?:\\.|[^\"\\\n])*\"|`(?:\\.|[^`\\])*`", re.S)
TEMPLATE_COMMENT = re.compile(
    r"\{#(.*?)#\}|\{%\s*comment(?:\s+\"[^\"]*\")?\s*%\}(.*?)\{%\s*endcomment\s*%\}|<!--(.*?)-->", re.S)
HTML_COMMENT = re.compile(r"<!--(.*?)-->", re.S)
JSX_COMMENT = re.compile(r"\{\s*/\*(.*?)\*/\s*\}", re.S)
SCRIPT_BLOCK = re.compile(r"(<script\b[^>]*>)(.*?)</script\s*>", re.S | re.I)
ASTRO_FRONTMATTER = re.compile(r"\A---[ \t]*\n(.*?\n)?---[ \t]*(?:\n|\Z)", re.S)
JS_SUFFIXES = {".js", ".mjs", ".cjs", ".ts", ".mts", ".cts", ".tsx", ".jsx"}
SHELL_INTERPRETERS = re.compile(r"\b(?:ba|da|z|k)?sh\b")

Comment = Tuple[int, str, bool]  # (line, body, joins_previous)


class Policy:
    def __init__(self, data: dict | None = None):
        data = data or {}
        self.enabled = bool(data.get("enabled", True))
        self.include = [str(p) for p in data.get("include", [])]
        self.exclude = [str(p) for p in data.get("exclude", DEFAULT_EXCLUDE)]
        self.jsdoc_export_dirs = tuple(str(p) for p in data.get("jsdoc_export_dirs", []))
        self.baseline_file = str(data.get("baseline_file", DEFAULT_BASELINE))
        extra = [str(p) for p in data.get("extra_directives", [])]
        self.directive = re.compile("^(?:" + "|".join([DIRECTIVE, *extra]) + ")")
        self._include = [path_matcher(p) for p in self.include]
        self._exclude = [path_matcher(p) for p in self.exclude]

    def in_scope(self, path: str) -> bool:
        if self._include and not any(m(path) for m in self._include):
            return False
        return not any(m(path) for m in self._exclude)


def path_matcher(entry: str):
    """`dir/` = a directory at any depth; anything else = a regular expression searched in the path."""
    if entry.endswith("/") and not any(ch in entry for ch in "^$*+?()[]{}|\\"):
        prefix = entry.lstrip("/")
        return lambda path: path.startswith(prefix) or f"/{prefix}" in path
    regex = re.compile(entry)
    return lambda path: bool(regex.search(path))


def load_policy(repo: Path) -> Policy:
    path = repo / POLICY_FILE
    if not path.is_file():
        return Policy()
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise ValueError("not a JSON object")
        return Policy(data)
    except (ValueError, re.error) as exc:
        raise RuntimeError(f"{POLICY_FILE}: {exc}") from exc


def python_comments(text: str) -> list[Comment]:
    """Standalone comments on consecutive lines join; a file tokenize cannot read falls back to full-line comments."""
    comments = []
    try:
        tokens = list(tokenize.generate_tokens(io.StringIO(text).readline))
    except (tokenize.TokenError, SyntaxError):
        return hash_line_comments(text, shebang=False)
    previous_line = None
    for token in tokens:
        if token.type != tokenize.COMMENT:
            continue
        line = token.start[0]
        standalone = not token.line[: token.start[1]].strip()
        comments.append((line, token.string[1:].strip(), standalone and previous_line == line - 1))
        previous_line = line if standalone else None
    return comments


def js_comments(path: str, text: str, policy: Policy, line_offset: int = 0) -> list[Comment]:
    comments = []
    previous_line = None
    for match in JS_TOKEN.finditer(text):
        token = match.group(0)
        if not token.startswith(("//", "/*")):
            continue
        line = text.count("\n", 0, match.start()) + 1 + line_offset
        if token.startswith("//"):
            line_start = text.rfind("\n", 0, match.start()) + 1
            standalone = not text[line_start: match.start()].strip()
            comments.append((line, token[2:].strip(), standalone and previous_line == line - 1))
            previous_line = line if standalone else None
            continue
        previous_line = None
        body = " ".join(part.strip().lstrip("*").strip() for part in token[2:-2].splitlines()).strip()
        is_jsdoc_on_export = (token.startswith("/**") and bool(policy.jsdoc_export_dirs)
                              and path.startswith(policy.jsdoc_export_dirs)
                              and text[match.end():].lstrip().startswith("export "))
        comments.append((line, "WHY: (exported JSDoc)" if is_jsdoc_on_export else body, False))
    return comments


def regex_comments(pattern: re.Pattern[str], text: str) -> list[Comment]:
    return [(text.count("\n", 0, m.start()) + 1, next(g for g in m.groups() if g is not None).strip(), False)
            for m in pattern.finditer(text)]


def astro_comments(path: str, text: str, policy: Policy) -> list[Comment]:
    comments: list[Comment] = []
    template, offset = text, 0
    front = ASTRO_FRONTMATTER.match(text)
    if front:
        comments += js_comments(path, front.group(1) or "", policy, line_offset=1)
        offset = front.end()
        template = " " * offset + text[offset:]  # keeps positions, hides the frontmatter
    scripts = []
    for m in SCRIPT_BLOCK.finditer(template):
        start = m.start(2)
        comments += js_comments(path, m.group(2), policy, line_offset=text.count("\n", 0, start))
        scripts.append((start, m.end(2)))

    def outside_scripts(m: re.Match[str]) -> bool:
        return not any(a <= m.start() < b for a, b in scripts)

    for pattern in (HTML_COMMENT, JSX_COMMENT):
        for m in pattern.finditer(template):
            if outside_scripts(m):
                comments.append((text.count("\n", 0, m.start()) + 1, m.group(1).strip(), False))
    return sorted(comments, key=lambda c: c[0])


def hash_line_comments(text: str, shebang: bool = True) -> list[Comment]:
    """Full-line # comments of shell scripts and Dockerfiles (the shebang is not a comment)."""
    comments = []
    previous_line = None
    for line, content in enumerate(text.splitlines(), start=1):
        stripped = content.strip()
        if not stripped.startswith("#") or (shebang and line == 1 and stripped.startswith("#!")):
            continue
        comments.append((line, stripped[1:].strip(), previous_line == line - 1))
        previous_line = line
    return comments


def language(path: str, text: str | None = None) -> str | None:
    name = path.rsplit("/", 1)[-1]
    if name.startswith(("Dockerfile", "Containerfile")) or name.endswith((".dockerfile", ".Dockerfile")):
        return "hash"
    suffix = os.path.splitext(name)[1].lower()
    if suffix:
        if suffix in JS_SUFFIXES:
            return "js"
        return {".py": "python", ".pyi": "python", ".html": "template", ".astro": "astro", ".sh": "hash",
                ".bash": "hash"}.get(suffix)
    first_line = (text or "").split("\n", 1)[0]
    if not first_line.startswith("#!"):
        return None
    if "python" in first_line:
        return "python"
    if re.search(r"\b(?:node|deno|bun|tsx|ts-node)\b", first_line):
        return "js"
    if SHELL_INTERPRETERS.search(first_line):
        return "hash"
    return None


def disallowed_comments(path: str, text: str, policy: Policy | None = None) -> list[tuple[int, str]]:
    """[(line, normalized text)] of comments the policy does not allow."""
    policy = policy or Policy()
    kind = language(path, text)
    if kind == "python":
        comments = python_comments(text)
    elif kind == "js":
        comments = js_comments(path, text, policy)
    elif kind == "template":
        comments = regex_comments(TEMPLATE_COMMENT, text)
    elif kind == "astro":
        comments = astro_comments(path, text, policy)
    elif kind == "hash":
        comments = hash_line_comments(text)
    else:
        return []
    found = []
    in_why_block = False
    for line, body, joins_previous in comments:
        if WHY.match(body):
            in_why_block = True
            continue
        if joins_previous and in_why_block:
            continue
        in_why_block = False
        if not body or policy.directive.match(body) or TODO.match(body):
            continue
        found.append((line, " ".join(body.split())))
    return found


def git(repo: Path, *args: str, check: bool = True) -> str:
    result = subprocess.run(["git", "-C", str(repo), "-c", "core.quotePath=false", *args],
                            capture_output=True, text=True, check=False)
    if check and result.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)}: {result.stderr.strip()}")
    return result.stdout


def list_files(repo: Path, untracked: bool = True) -> list[str]:
    """Tracked (+ untracked non-ignored) files that still exist."""
    args = ["ls-files", "-z", "--cached"] + (["--others", "--exclude-standard"] if untracked else [])
    out = git(repo, *args)
    return sorted({f for f in out.split("\0") if f and (repo / f).is_file() and not (repo / f).is_symlink()})


def changed_files(repo: Path, base: str) -> set[str]:
    """Files changed since the merge-base of BASE and HEAD, working tree and untracked files included."""
    if subprocess.run(["git", "-C", str(repo), "cat-file", "-e", f"{base}^{{commit}}"],
                      capture_output=True, check=False).returncode != 0:
        raise RuntimeError(f"base {base!r} is not a commit here - check out with fetch-depth: 0")
    merge_base = git(repo, "merge-base", base, "HEAD").strip()
    out = git(repo, "diff", "--name-only", "--no-renames", "-z", merge_base)
    out += git(repo, "ls-files", "-z", "--others", "--exclude-standard")
    return {f for f in out.split("\0") if f}


def read_text(path: Path) -> str | None:
    try:
        if path.stat().st_size > MAX_FILE_BYTES:
            return None
        return path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return None


def candidates(repo: Path, policy: Policy, files: list[str]) -> dict[str, str]:
    """{path: text} of the files in scope written in a supported language."""
    result = {}
    for rel in files:
        if not policy.in_scope(rel):
            continue
        name = rel.rsplit("/", 1)[-1]
        if "." in name.lstrip(".") and language(rel) is None and not name.startswith(("Dockerfile", "Containerfile")):
            continue  # an unsupported suffix - skip without reading
        text = read_text(repo / rel)
        if text is not None and language(rel, text):
            result[rel] = text
    return result


def scan(repo: Path, policy: Policy, files: list[str]) -> dict[str, Counter]:
    found = {}
    for rel, text in candidates(repo, policy, files).items():
        texts = Counter(t for _, t in disallowed_comments(rel, text, policy))
        if texts:
            found[rel] = texts
    return found


def load_baseline(repo: Path, policy: Policy) -> dict[str, Counter]:
    path = repo / policy.baseline_file
    if not path.is_file():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except ValueError as exc:
        raise RuntimeError(f"{policy.baseline_file}: {exc}") from exc
    if not isinstance(data, dict) or not all(isinstance(v, list) for v in data.values()):
        raise RuntimeError(f"{policy.baseline_file}: expected {{\"path\": [\"comment\", ...]}}")
    return {p: Counter(str(t) for t in texts) for p, texts in data.items()}


def save_baseline(repo: Path, policy: Policy, baseline: dict[str, Counter]) -> None:
    data = {p: sorted(texts.elements()) for p, texts in sorted(baseline.items()) if +texts}
    (repo / policy.baseline_file).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def prune(repo: Path, policy: Policy, scopes: list[str]) -> int:
    baseline = load_baseline(repo, policy)
    current = scan(repo, policy, list_files(repo, untracked=False))
    prefixes = tuple(Path(s).as_posix().rstrip("/") for s in scopes)

    def selected(path: str) -> bool:
        return not prefixes or any(path == p or path.startswith(p + "/") for p in prefixes)

    pruned = {p: (texts & current.get(p, Counter())) if selected(p) else texts for p, texts in baseline.items()}
    dropped = sum(sum(t.values()) for t in baseline.values()) - sum(sum(t.values()) for t in pruned.values())
    save_baseline(repo, policy, pruned)
    print(f"comments: pruned {dropped} baseline entr{'y' if dropped == 1 else 'ies'}")
    return 0


def move(repo: Path, policy: Policy, old: str, new: str) -> int:
    baseline = load_baseline(repo, policy)
    old, new = Path(old).as_posix(), Path(new).as_posix()
    baseline[new] = baseline.get(new, Counter()) + baseline.pop(old, Counter())
    save_baseline(repo, policy, baseline)
    print(f"comments: moved baseline entries {old} -> {new}")
    return 0


def init(repo: Path, policy: Policy) -> int:
    found = scan(repo, policy, list_files(repo, untracked=False))
    save_baseline(repo, policy, found)
    total = sum(sum(t.values()) for t in found.values())
    print(f"comments: {policy.baseline_file} written - {total} comment(s) in {len(found)} file(s)")
    return 0


def escape(value: str, prop: bool = False) -> str:
    value = value.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    return value.replace(":", "%3A").replace(",", "%2C") if prop else value


def run(repo: Path, base: str | None, mode: str, github: bool, out=sys.stdout) -> int:
    policy = load_policy(repo)
    has_baseline = (repo / policy.baseline_file).is_file()
    if mode == "off" or not policy.enabled:
        print(f"comments: skipped ({'mode off' if mode == 'off' else POLICY_FILE + ' enabled: false'})", file=out)
        return 0
    if mode == "auto":
        if not has_baseline and not (repo / POLICY_FILE).is_file():
            text = (f"comments: skipped - no {DEFAULT_BASELINE} or {POLICY_FILE}; opt in with "
                    "`check_comments.py --init` (or comments-mode: observe)")
            print(f"::notice title=comments::{escape(text)}" if github else text, file=out)
            return 0
        mode = "observe"
    baseline = load_baseline(repo, policy)
    changed: set[str] | None = None
    if base:
        try:
            changed = changed_files(repo, base)
        except RuntimeError as exc:
            if mode == "enforce":
                raise
            text = f"{exc} - whole tree, report only (observe mode)"
            print(f"::warning title=comments::{escape(text)}" if github else f"warning: {text}", file=out)
            base = None
    touched: list[tuple[str, int, str]] = []
    other: dict[str, int] = {}
    for rel, text in candidates(repo, policy, list_files(repo)).items():
        allowed = Counter(baseline.get(rel, Counter()))
        for line, comment in disallowed_comments(rel, text, policy):
            if allowed[comment] > 0:
                allowed[comment] -= 1
            elif changed is None or rel in changed:
                touched.append((rel, line, comment))
            else:
                other[rel] = other.get(rel, 0) + 1

    hint = "say it in code (names, types, tests) or write `WHY: <reason>` / `TODO(#issue)`"
    level = "error" if mode == "enforce" else "warning"
    for n, (rel, line, comment) in enumerate(touched):
        message = f"new comment: {comment[:120]} - {hint}"
        if mode == "observe":
            message += " (observe mode - would fail in enforce mode)"
        if github and n >= ANNOTATION_LIMIT:
            continue
        if github:
            print(f"::{level} file={escape(rel, True)},line={line},title=comments::{escape(message)}", file=out)
        else:
            print(f"{level}: {rel}:{line}: {message}", file=out)
    for n, (rel, count) in enumerate(sorted(other.items())):
        message = (f"{count} comment(s) outside {policy.baseline_file} (not touched by this change - fix when you "
                   "edit it, or run --init/--prune)")
        if github and n >= ANNOTATION_LIMIT:
            continue
        if github:
            print(f"::notice file={escape(rel, True)},title=comments::{escape(message)}", file=out)
        else:
            print(f"notice: {rel}: {message}", file=out)
    hidden = max(0, len(touched) - ANNOTATION_LIMIT) + max(0, len(other) - ANNOTATION_LIMIT)
    if github and hidden:
        print(f"comments: {hidden} more annotation(s) not shown - see the job summary", file=out)
    scope = f"base {base}" if base else "whole tree"
    status = "ok" if not touched and not other else f"{len(touched)} new, {sum(other.values())} in untouched files"
    baseline_note = "" if has_baseline else f", no {policy.baseline_file}"
    print(f"comments: {status} (mode {mode}, {scope}{baseline_note})", file=out)

    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if github and summary:
        with open(summary, "a", encoding="utf-8") as fh:
            fh.write("### Komentarze w kodzie (polityka komentarzy)\n\n")  # i18n-pl
            if not touched and not other:
                fh.write("Bez uwag.\n\n")  # i18n-pl
            else:
                fh.write(f"Tryb `{mode}`. Dozwolone: dyrektywy narzędzi, licencje, `TODO(#issue)`, "  # i18n-pl
                         "`WHY: <powód>`. Stare komentarze: `.comment-baseline.json`.\n\n")  # i18n-pl
                if touched:
                    fh.write("| | Plik | Komentarz |\n|---|---|---|\n")
                    icon = ":x:" if mode == "enforce" else ":warning:"
                    for rel, line, comment in touched[:200]:
                        shown = comment[:120].replace("|", "/").replace("`", "'")
                        fh.write(f"| {icon} | `{rel}:{line}` | {shown} |\n")
                    if len(touched) > 200:
                        fh.write(f"\n… i {len(touched) - 200} więcej.\n")  # i18n-pl
                    fh.write("\n")
                if other:
                    fh.write(f":information_source: {sum(other.values())} komentarz(y) w {len(other)} "  # i18n-pl
                             "niezmienionych plikach (kto dotyka, ten naprawia).\n\n")  # i18n-pl
    return 1 if touched and mode == "enforce" else 0


def self_test() -> int:
    """Sensitivity test: each case must give the expected exit code and output fragment."""
    env = {**os.environ, "GIT_CONFIG_GLOBAL": os.devnull, "GIT_CONFIG_NOSYSTEM": "1",
           "GIT_AUTHOR_NAME": "t", "GIT_AUTHOR_EMAIL": "t@example.invalid",
           "GIT_COMMITTER_NAME": "t", "GIT_COMMITTER_EMAIL": "t@example.invalid"}
    baseline = json.dumps({"app/old.py": ["legacy note"]})
    # (name, files, expected exit in enforce mode, output fragment)
    cases = [
        ("narration comment", {"app/a.py": "# save the invoice\nx = 1\n"}, 1, "app/a.py:1"),
        ("WHY with continuation", {"app/a.py": "# WHY: KSeF rejects 7E+1.\n# It wants fixed-point.\nx = 1\n"}, 0,
         "comments: ok"),
        ("TODO with issue", {"app/a.py": "x = 1  # TODO(#1) map rates\n"}, 0, "comments: ok"),
        ("TODO without issue", {"app/a.py": "x = 1  # TODO map rates\n"}, 1, "TODO map rates"),
        ("noqa directive", {"app/a.py": "import os  # noqa: F401\n"}, 0, "comments: ok"),
        ("baseline entry", {"app/old.py": "# legacy note\nx = 1\n", ".comment-baseline.json": baseline}, 0,
         "comments: ok"),
        ("beyond the baseline", {"app/old.py": "# legacy note\n# legacy note\nx = 1\n",
                                 ".comment-baseline.json": baseline}, 1, "app/old.py:2"),
        ("js line comment", {"web/a.ts": "// loop over rows\nfor (const r of rows) {}\n"}, 1, "loop over rows"),
        ("shell script", {"bin/run": "#!/bin/sh\n# install packages\nnpm ci\n"}, 1, "bin/run:2"),
        ("html comment", {"t/a.html": "{# show the total #}\n"}, 1, "show the total"),
    ]
    failures = 0
    with tempfile.TemporaryDirectory() as tmp:
        for n, (name, files, expected, fragment) in enumerate(cases):
            repo = Path(tmp) / str(n)
            repo.mkdir()
            subprocess.run(["git", "-C", str(repo), "init", "-q", "-b", "main"], env=env, check=True,
                           capture_output=True)
            for rel, text in files.items():
                (repo / rel).parent.mkdir(parents=True, exist_ok=True)
                (repo / rel).write_text(text, encoding="utf-8")
            buf = io.StringIO()
            code = run(repo, None, "enforce", False, buf)
            output = buf.getvalue()
            if code != expected or fragment not in output:
                failures += 1
                print(f"FAIL {name}: exit {code} (expected {expected}), fragment {fragment!r}\n{output}")
            else:
                print(f"ok   {name}")
    if failures:
        print(f"comments self-test: {failures} case(s) FAILED - the check is not sensitive, do not trust its result")
        return 2
    print("comments self-test: OK")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("repo", nargs="?", default=".", help="repository directory (default: .)")
    parser.add_argument("--base", help="base commit/branch of the change (PR base); without it: the whole tree")
    parser.add_argument("--mode", choices=("auto", "off", "observe", "enforce"), default="observe")
    parser.add_argument("--github", action="store_true", help="GitHub annotations and $GITHUB_STEP_SUMMARY")
    parser.add_argument("--self-test", action="store_true", help="sensitivity test on synthetic files")
    helpers = parser.add_mutually_exclusive_group()
    helpers.add_argument("--init", action="store_true", help="write the baseline from all tracked files")
    helpers.add_argument("--prune", nargs="*", metavar="PATH", help="drop baseline entries that are gone")
    helpers.add_argument("--move", nargs=2, metavar=("OLD", "NEW"), help="carry a renamed file's baseline entries")
    args = parser.parse_args(argv)
    if args.self_test:
        return self_test()
    repo = Path(args.repo)
    if not repo.is_dir():
        parser.error(f"not a directory: {repo}")
    try:
        policy = load_policy(repo)
        if args.init:
            return init(repo, policy)
        if args.prune is not None:
            return prune(repo, policy, args.prune)
        if args.move:
            return move(repo, policy, *args.move)
        return run(repo, args.base or None, args.mode, args.github)
    except RuntimeError as exc:
        print(f"comments: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
