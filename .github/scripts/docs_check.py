#!/usr/bin/env python3
# Vendored copy of klima-kar/platform-ci@e5d776cc6189273de29b41bc7e8b5c0fb1ec2744 actions/docs-budget/docs_check.py (infra#681).
# Do not edit here: change platform-ci first, then copy again and update the SHA above. CI runs the base-branch copy.
"""Docs budget: Markdown stays small and durable, so agents do not grow documentation on every commit
(klima-kar/infra#681).

1. Size: every .md file in scope <= max_bytes (default 15 000 B). Files already larger are frozen in
   .docs-baseline.json ({"path": max_allowed_bytes}): they may shrink, never grow past their entry.
2. Ephemeral names: a new SPEC.md, task.md, TODO.md, PLAN.md, *_PLAN.md, *_REPORT.md, RECON.md, STATE.md, HISTORY.md
   or deploy/*.md (case-insensitive) is rejected - plans, reports and status belong in GitHub Issues, deployment
   details in klima-kar/infra.
Config (optional) .github/docs-budget.json: max_bytes, exclude / extra_exclude, forbidden_patterns /
extra_forbidden_patterns (exclude and forbidden_patterns replace the defaults, extra_* add to them), allow_names
(file names or globs that may use a forbidden name), baseline_file (default .docs-baseline.json). Globs as in
gate_files.py: `*` and `?` within a path segment, `**` across segments; a pattern without `/` matches a name at any
depth; a pattern also matches everything below a directory it names.

"Who touches, fixes": with --base, sizes count only for files the change touches and names only for files it adds;
the rest are notices. Without --base the whole tree counts (local runs, pre-commit, push).
Modes: observe (default; findings are warnings, exit 0) and enforce (findings fail, exit 1).
Baseline helpers: --init (freezes every oversized file at its size), --prune (drops entries of files that are gone or
fit the budget and lowers the others to their current size; never adds).
--self-test runs the sensitivity test on synthetic repositories (exit 2 when the check no longer trips).

Standalone on purpose (Python 3.9+ stdlib, git), like agents_check.py: public repositories copy it and run the
base-branch copy. Read only (apart from the baseline helpers); runs nothing from the repository.
Exit: 0 = ok or observe mode, 1 = findings in enforce mode, 2 = usage error or failed self-test.
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
from dataclasses import dataclass
from pathlib import Path

CONFIG_FILE = ".github/docs-budget.json"
DEFAULT_BASELINE = ".docs-baseline.json"
DEFAULT_MAX_BYTES = 15_000
DEFAULT_EXCLUDE = ["CHANGELOG.md", "content/", "input/", "build/", "dist/", "node_modules/", "vendor/", ".venv/",
                   "tests/golden/", "**/rules/srd-*/", "**/posnet/docs/"]
DEFAULT_FORBIDDEN = ["SPEC.md", "task.md", "TODO.md", "PLAN.md", "*_PLAN.md", "*_REPORT.md", "RECON.md", "STATE.md",
                     "HISTORY.md", "**/deploy/**/*.md"]
SUFFIXES = (".md",)


def glob_to_regex(pattern: str, ignore_case: bool = False) -> re.Pattern[str]:
    pattern = pattern.strip().rstrip("/")
    anchored = "/" in pattern
    pattern = pattern.lstrip("/")
    out, i = "", 0
    while i < len(pattern):
        if pattern.startswith("**/", i):
            out, i = out + "(?:.*/)?", i + 3
        elif pattern.startswith("**", i):
            out, i = out + ".*", i + 2
        elif pattern[i] == "*":
            out, i = out + "[^/]*", i + 1
        elif pattern[i] == "?":
            out, i = out + "[^/]", i + 1
        else:
            out, i = out + re.escape(pattern[i]), i + 1
    return re.compile(("^" if anchored else "^(?:.*/)?") + out + "(?:/.*)?$", re.I if ignore_case else 0)


class Config:
    def __init__(self, data: dict | None = None):
        data = data or {}
        self.max_bytes = int(data.get("max_bytes", DEFAULT_MAX_BYTES))
        self.exclude = [str(p) for p in data.get("exclude", DEFAULT_EXCLUDE)] + \
            [str(p) for p in data.get("extra_exclude", [])]
        self.forbidden = [str(p) for p in data.get("forbidden_patterns", DEFAULT_FORBIDDEN)] + \
            [str(p) for p in data.get("extra_forbidden_patterns", [])]
        self.allow_names = [str(p) for p in data.get("allow_names", [])]
        self.baseline_file = str(data.get("baseline_file", DEFAULT_BASELINE))
        self._exclude = [glob_to_regex(p) for p in self.exclude]
        self._forbidden = [(p, glob_to_regex(p, ignore_case=True)) for p in self.forbidden]
        self._allow = [glob_to_regex(p) for p in self.allow_names]

    def in_scope(self, path: str) -> bool:
        return path.lower().endswith(SUFFIXES) and not any(r.match(path) for r in self._exclude)

    def forbidden_pattern(self, path: str) -> str | None:
        if any(r.match(path) for r in self._allow):
            return None
        return next((p for p, r in self._forbidden if r.match(path)), None)


@dataclass
class Finding:
    path: str
    message: str
    counts: bool  # True = the change touched it (or no base): error in enforce mode


def load_config(repo: Path) -> Config:
    path = repo / CONFIG_FILE
    if not path.is_file():
        return Config()
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise ValueError("not a JSON object")
        return Config(data)
    except (ValueError, TypeError) as exc:
        raise RuntimeError(f"{CONFIG_FILE}: {exc}") from exc


def git(repo: Path, *args: str, check: bool = True) -> str:
    result = subprocess.run(["git", "-C", str(repo), "-c", "core.quotePath=false", *args],
                            capture_output=True, text=True, check=False)
    if check and result.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)}: {result.stderr.strip()}")
    return result.stdout


def list_files(repo: Path, untracked: bool = True) -> list[str]:
    args = ["ls-files", "-z", "--cached"] + (["--others", "--exclude-standard"] if untracked else [])
    out = git(repo, *args)
    return sorted({f for f in out.split("\0") if f and (repo / f).is_file() and not (repo / f).is_symlink()})


def changed_files(repo: Path, base: str) -> tuple[set[str], set[str]]:
    """(changed, added) since the merge-base of BASE and HEAD, working tree and untracked files included."""
    if subprocess.run(["git", "-C", str(repo), "cat-file", "-e", f"{base}^{{commit}}"],
                      capture_output=True, check=False).returncode != 0:
        raise RuntimeError(f"base {base!r} is not a commit here - check out with fetch-depth: 0")
    merge_base = git(repo, "merge-base", base, "HEAD").strip()
    untracked = {f for f in git(repo, "ls-files", "-z", "--others", "--exclude-standard").split("\0") if f}
    changed = {f for f in git(repo, "diff", "--name-only", "--no-renames", "-z", merge_base).split("\0") if f}
    added = {f for f in git(repo, "diff", "--name-only", "--no-renames", "--diff-filter=A", "-z",
                              merge_base).split("\0") if f}
    return changed | untracked, added | untracked


def load_baseline(repo: Path, config: Config) -> dict[str, int]:
    path = repo / config.baseline_file
    if not path.is_file():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise ValueError("not a JSON object")
        return {str(k): int(v) for k, v in data.items()}
    except (ValueError, TypeError) as exc:
        raise RuntimeError(f"{config.baseline_file}: expected {{\"path\": max_bytes}} ({exc})") from exc


def save_baseline(repo: Path, config: Config, baseline: dict[str, int]) -> None:
    text = json.dumps(dict(sorted(baseline.items())), ensure_ascii=False, indent=2) + "\n"
    (repo / config.baseline_file).write_text(text, encoding="utf-8")


def sizes(repo: Path, config: Config, files: list[str]) -> dict[str, int]:
    return {rel: (repo / rel).stat().st_size for rel in files if config.in_scope(rel)}


def init(repo: Path, config: Config) -> int:
    baseline = {rel: size for rel, size in sizes(repo, config, list_files(repo, untracked=False)).items()
                if size > config.max_bytes}
    save_baseline(repo, config, baseline)
    print(f"docs-budget: {config.baseline_file} written - {len(baseline)} oversized file(s) frozen")
    return 0


def prune(repo: Path, config: Config) -> int:
    baseline = load_baseline(repo, config)
    current = sizes(repo, config, list_files(repo, untracked=False))
    pruned = {rel: min(cap, current[rel]) for rel, cap in baseline.items()
              if rel in current and current[rel] > config.max_bytes}
    save_baseline(repo, config, pruned)
    lowered = sum(1 for rel, cap in pruned.items() if cap < baseline[rel])
    print(f"docs-budget: pruned {len(baseline) - len(pruned)} entr{'y' if len(baseline) - len(pruned) == 1 else 'ies'}"
          f", lowered {lowered}")
    return 0


def escape(value: str, prop: bool = False) -> str:
    value = value.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    return value.replace(":", "%3A").replace(",", "%2C") if prop else value


def check(repo: Path, base: str | None, config: Config) -> list[Finding]:
    baseline = load_baseline(repo, config)
    files = list_files(repo)
    changed = added = None
    if base:
        changed, added = changed_files(repo, base)
    findings = []
    for rel, size in sizes(repo, config, files).items():
        cap = max(config.max_bytes, baseline.get(rel, 0))
        if size > cap:
            frozen = f" (frozen at {baseline[rel]} B in {config.baseline_file} - it may only shrink)" \
                if rel in baseline else ""
            findings.append(Finding(rel, f"{rel}: {size} B > {cap} B{frozen} - keep docs short: move status and plans "
                                    "to GitHub Issues, split or trim the file",
                                    changed is None or rel in changed))
        pattern = config.forbidden_pattern(rel)
        if pattern and (added is None or rel in added):
            findings.append(Finding(rel, f"{rel}: ephemeral doc name ({pattern}) - plans, reports and status belong "
                                    "in GitHub Issues, deployment details in klima-kar/infra; allow it in "
                                    f"{CONFIG_FILE} (allow_names) only if the repository really needs it", True))
    return findings


def run(repo: Path, base: str | None, mode: str, github: bool, out=sys.stdout) -> int:
    config = load_config(repo)
    if base:
        try:
            findings = check(repo, base, config)
        except RuntimeError as exc:
            if mode == "enforce" or "fetch-depth" not in str(exc):
                raise
            text = f"{exc} - whole tree, report only (observe mode)"
            print(f"::warning title=docs-budget::{escape(text)}" if github else f"warning: {text}", file=out)
            base = None
            findings = check(repo, None, config)
    else:
        findings = check(repo, None, config)
    counted = [f for f in findings if f.counts]
    notices = [f for f in findings if not f.counts]
    level = "error" if mode == "enforce" else "warning"
    for f in counted:
        message = f.message if mode == "enforce" else f.message + " (observe mode - would fail in enforce mode)"
        if github:
            print(f"::{level} file={escape(f.path, True)},title=docs-budget::{escape(message)}", file=out)
        else:
            print(f"{level}: {message}", file=out)
    for f in notices:
        message = f.message + " (not touched by this change - fix when you edit it)"
        if github:
            print(f"::notice file={escape(f.path, True)},title=docs-budget::{escape(message)}", file=out)
        else:
            print(f"notice: {message}", file=out)
    scope = f"base {base}" if base else "whole tree"
    status = "ok" if not findings else f"{len(counted)} in this change, {len(notices)} other"
    print(f"docs-budget: {status} (mode {mode}, {scope}, max {config.max_bytes} B)", file=out)

    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if github and summary:
        with open(summary, "a", encoding="utf-8") as fh:
            fh.write("### Budżet dokumentacji (.md)\n\n")  # i18n-pl
            if not findings:
                fh.write("Bez uwag.\n\n")  # i18n-pl
            else:
                fh.write(f"Tryb `{mode}`, limit {config.max_bytes} B na plik. Plany, raporty i stan prac idą do "  # i18n-pl
                         "GitHub Issues, szczegóły wdrożeń do `klima-kar/infra`.\n\n| | Problem |\n|---|---|\n")  # i18n-pl
                for f in counted + notices:
                    icon = (":x:" if mode == "enforce" else ":warning:") if f.counts else ":information_source:"
                    shown = f.message.replace("|", "/").replace("\r", " ").replace("\n", " ")
                    fh.write(f"| {icon} | {shown} |\n")
                fh.write("\n")
    return 1 if counted and mode == "enforce" else 0


def self_test() -> int:
    """Sensitivity test: each case must give the expected exit code and output fragment."""
    env = {**os.environ, "GIT_CONFIG_GLOBAL": os.devnull, "GIT_CONFIG_NOSYSTEM": "1",
           "GIT_AUTHOR_NAME": "t", "GIT_AUTHOR_EMAIL": "t@example.invalid",
           "GIT_COMMITTER_NAME": "t", "GIT_COMMITTER_EMAIL": "t@example.invalid"}

    def sh(repo: Path, *args: str) -> None:
        subprocess.run(["git", "-C", str(repo), *args], env=env, check=True, capture_output=True)

    def write(repo: Path, rel: str, text: str) -> None:
        (repo / rel).parent.mkdir(parents=True, exist_ok=True)
        (repo / rel).write_text(text, encoding="utf-8")

    big = "x" * (DEFAULT_MAX_BYTES + 1)
    frozen = {"docs/old.md": "y" * 20_000, DEFAULT_BASELINE: json.dumps({"docs/old.md": 20_000})}
    # (name, files in the base commit, files changed in the PR, expected exit in enforce mode, output fragment)
    cases = [
        ("oversized .md added", {"README.md": "# r\n"}, {"docs/a.md": big}, 1, "docs/a.md: 15001 B"),
        (".md at the limit", {"README.md": "# r\n"}, {"docs/a.md": "x" * DEFAULT_MAX_BYTES}, 0, "docs-budget: ok"),
        ("baseline file shrunk", frozen, {"docs/old.md": "y" * 19_000}, 0, "docs-budget: ok"),
        ("baseline file grown", frozen, {"docs/old.md": "y" * 20_001}, 1, "frozen at 20000 B"),
        ("oversized file not touched", {"docs/b.md": big}, {"README.md": "x"}, 0, "notice: docs/b.md"),
        ("new SPEC.md", {"README.md": "# r\n"}, {"SPEC.md": "# s\n"}, 1, "ephemeral doc name"),
        ("new deploy/unraid.md", {"README.md": "# r\n"}, {"deploy/unraid.md": "# d\n"}, 1, "deploy/unraid.md"),
        ("new lower-case plan", {"README.md": "# r\n"}, {"docs/x_plan.md": "# p\n"}, 1, "*_PLAN.md"),
        ("excluded CHANGELOG.md", {"README.md": "# r\n"}, {"CHANGELOG.md": big}, 0, "docs-budget: ok"),
    ]
    failures = 0
    with tempfile.TemporaryDirectory() as tmp:
        for n, (name, base_state, change, expected, fragment) in enumerate(cases):
            repo = Path(tmp) / str(n)
            repo.mkdir()
            sh(repo, "init", "-q", "-b", "main")
            for rel, text in base_state.items():
                write(repo, rel, text)
            sh(repo, "add", "-A")
            sh(repo, "commit", "-q", "-m", "base")
            sh(repo, "switch", "-q", "-c", "change")
            for rel, text in change.items():
                write(repo, rel, text)
            sh(repo, "add", "-A")
            sh(repo, "commit", "-q", "-m", "change")
            buf = io.StringIO()
            code = run(repo, "main", "enforce", False, buf)
            output = buf.getvalue()
            if code != expected or fragment not in output:
                failures += 1
                print(f"FAIL {name}: exit {code} (expected {expected}), fragment {fragment!r}\n{output}")
            else:
                print(f"ok   {name}")
    if failures:
        print(f"docs-budget self-test: {failures} case(s) FAILED - the check is not sensitive, do not trust its result")
        return 2
    print("docs-budget self-test: OK")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("repo", nargs="?", default=".", help="repository directory (default: .)")
    parser.add_argument("--base", help="base commit/branch of the change (PR base); without it: the whole tree")
    parser.add_argument("--mode", choices=("observe", "enforce"), default="observe")
    parser.add_argument("--github", action="store_true", help="GitHub annotations and $GITHUB_STEP_SUMMARY")
    parser.add_argument("--self-test", action="store_true", help="sensitivity test on synthetic repositories")
    helpers = parser.add_mutually_exclusive_group()
    helpers.add_argument("--init", action="store_true", help="freeze every oversized tracked file in the baseline")
    helpers.add_argument("--prune", action="store_true", help="drop or lower baseline entries (never adds)")
    args = parser.parse_args(argv)
    if args.self_test:
        return self_test()
    repo = Path(args.repo)
    if not repo.is_dir():
        parser.error(f"not a directory: {repo}")
    try:
        config = load_config(repo)
        if args.init:
            return init(repo, config)
        if args.prune:
            return prune(repo, config)
        return run(repo, args.base or None, args.mode, args.github)
    except RuntimeError as exc:
        print(f"docs-budget: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
