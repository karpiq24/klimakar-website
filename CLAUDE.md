# Klima-Kar website: notes for Claude

Static Astro 6 site in the **Szron** design, plus two one-page brand sites in `sites/`
(webasto.wroclaw.pl, eberspaecher.wroclaw.pl; see README › Brand sites). `README.md` covers the stack, structure and deploy;
`design/szron/BRAND.md` is the brand book. Read it before changing a page.

## Content

- Since 2026-10-15 this site is live at <https://klima-kar.wroclaw.pl/>, so the repo is the source
  of truth for content. The old site's code (and the old brand sites') is in
  `archive/produkcja-2026-10-14.tar.gz`. Owner corrections recorded below and in
  `design/szron/README.md` override it.
- All copy is Polish, informal "Ty" in marketing text. Never invent copy, numbers or facts.
  Subpages keep their existing text, data and prices exactly; only markup changes.
- Fixed facts:
  - Klima-Kar started in **1999**. 1989 is only "Początki w chłodnictwie", never the founding year.
  - Always "Ogrzewanie postojowe", never "Ogrzewacze postojowe".
  - Repairs replace parts with new ones first; regeneration is only the fallback ("Skuteczne naprawy").
  - R744/CO₂ and EV service is the differentiator. Cabin filters are in stock, fitted on the spot.
  - Only full on-site service with the workshop's own parts; no customer-supplied parts.
- Company tagline: "Komfortowy klimat w zasięgu ręki" (under the homepage h1).
- No unprovable comparisons ("jeden z nielicznych w Polsce") and no absolute promises
  ("bezawaryjnie", reply "w ciągu 1 dnia"). Name the equipment and experience instead.
- "Ceny aktualne na dzień …" (on /cennik and the EasyStart Web subscription) always shows today's
  date, set in the browser by `Today.astro` (owner's decision, 2026-10-13). The site's prices are
  the ones in force, so when prices change, update /cennik first.
- No emoji and no exclamation marks in new copy. Motifs: car, AC and heating only.
- Prices on /cennik are copied exactly. Never round or rephrase them.
- Don't use one brand's photos on another brand's page (`webastoauto.jpg` is Webasto's).

## Design and code

- Colours, radii, shadows and component classes come only from `src/styles/szron.css`
  (`kk-` classes, `--` tokens). No Tailwind, no dark mode, no other hues; `#1C5EA6` leads.
- Build pages from the components in `src/components/`. Subpages are always
  Header › PageHero › content › CTABanner › Footer (see BRAND.md › Subpages).
- `src/styles/szron.css` is a patched copy of `design/szron/szron.css`. When you change it,
  add the change to the list in `design/szron/README.md`.
- Post-migration owner decisions that differ from the design files are listed in
  `design/szron/README.md` › "Changes after the migration". Don't revert them.
- Icons: `lucide-astro`, 24px, stroke 1.8. Interactive bits are small vanilla `<script>`s.
- Gradient text (`kk-grad`) clips to its box; the class pads for descenders. Keep that.

## Checks before committing

- `npm run build` passes (17 pages); after changes to `sites/`, `src/data/` or shared components,
  `npm run build:all` too.
- Look at changed pages at 1440px and 390px (and ~1024/1366 for anything in grids or bars).
  No text may overflow its column; long Polish words in display headings may need a soft
  hyphen (`{"Bezpieczeń\u00ADstwo"}`; a JS expression, since quoted attributes don't unescape).
- No `/_blob/`, Barlow, `data-theme` or `kk-theme`; no "rok założenia" with 1989.
- Google Ads texts are copied from the site (`ads/campaigns.yaml`, workflow in `ads/README.md`).
  After changing copy, prices, address, hours, phone numbers or page URLs, run `npm run check:ads`,
  update the affected ad texts and add the Ads change to `ads/CHANGES.md` › Pending. Never change
  anything in Google Ads itself without the user's yes.

## Brand sites

- Old sources: `archive/produkcja-2026-10-14.tar.gz`. `/mnt/klimakar/` is the live production
  hosting now; never modify it unless the user asks for an upload.
- Same rules as the main site: Szron classes only, copy from the old sites or the main site.
  Per-brand content goes in `sites/<name>/brand.ts`; anything shared with the main site in `src/data/`.
- Each brand page shows only its own brand's photos and products. No links to the other brand, DEFA
  or air conditioning anywhere (owner, 2026-10-13); the footer links only to the main site.

## Git and deploy

- Pushing to `main` deploys the preview to http://demo.klima-kar.pl/, brand sites under `/strony/<name>/` (GitHub Pages, built with
  `PUBLIC_NOINDEX=true` so every page has `noindex`; PHP and the
  contact form don't run there).
- Production is https://klima-kar.wroclaw.pl/ on OVH and serves this site since 2026-10-15
  (brand sites too). Uploading changes means copying the changed files of `dist/` (or `dist-<name>/`)
  there; only when the user asks. Build without `PUBLIC_NOINDEX`, never delete/mirror on the server,
  see README › Deployment.
