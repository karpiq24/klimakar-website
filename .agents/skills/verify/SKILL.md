---
name: verify
description: Build and check the Klima-Kar site and brand sites before a PR (npm run verify = PR CI), then look at the changed pages in a preview.
---

# Verify a change

`npm run verify` runs exactly what `.github/workflows/pr-checks.yml` runs. It must pass before a PR.

| Step | Command | Proves |
|---|---|---|
| PHP syntax | `npm run check:php` | `public/contact.php`, `public/panel/api.php` parse (`php -l`) |
| Types | `npm run check:types` | `astro check`: 0 errors in `.astro`/`.ts` |
| Build | `npm run build:all` | main site (17 pages) and both brand sites build |
| Links | `npm run check:links` | every internal link and `#fragment` in `dist*/` resolves |

Not in CI (needs the private repo in `private/`): `npm run check:ads` after changing copy, prices,
address, hours, phone numbers or page URLs (AGENTS.md › Checks before committing).

## Run it in a container

There is no `compose.dev.yml`; don't run npm on the host. The node image has no PHP, so add it:

```sh
docker run --rm -v "$PWD":/w -w /w node:22-bookworm-slim sh -c '
  apt-get update -qq && apt-get install -y -qq php-cli >/dev/null &&
  npm ci --no-audit --no-fund && npm run verify; s=$?
  chown -R '"$(id -u):$(id -g)"' node_modules .astro dist* 2>/dev/null; exit $s'
```

To lint PHP alone without installing it (`php -l` takes one file per call):
`docker run --rm -v "$PWD":/w -w /w php:8.3-cli sh -c 'for f in public/contact.php public/panel/api.php; do php -l "$f" || exit 1; done'`.

## Look at the change

A build passing is not enough for page changes. Serve the built folder (`dist/`, or
`dist-<brand>/` for a brand site) with any static server reachable from your browser, or use the branch
preview where one exists (`npm run preview` serves only `dist/` and binds to localhost), and open the changed pages at 1440px and 390px (also ~1024/1366 for grids and bars). Check:

- no text overflows its column; Szron look (`kk-` classes) unchanged elsewhere;
- copy, prices and facts exactly as before unless the task changed them;
- the contact form and /panel/ need PHP, so they only work on the server; check their markup only.

Report in the PR: commands with their result, pages and widths looked at, or "brak (powód)".
