# Klima-Kar — website

Website for **Klima-Kar**, a family car air-conditioning and parking-heater workshop in Wrocław
(ul. Grota-Roweckiego 129). Static Astro site in the **Szron** design ("frost": frosted glass over
an icy blue ground, the logo's blues doing all the colour work).

- **Production:** <https://klima-kar.wroclaw.pl/>. It still runs the **old website**, which stays
  the main source of truth for content (texts, prices, facts) until this site replaces it.
- **Preview of this site:** <http://demo.klima-kar.pl/>.
- **Brand sites** (one page each, same repo, same design): <https://webasto.wroclaw.pl/> and
  <https://eberspaecher.wroclaw.pl/>, built from `sites/`. Previews:
  <http://demo.klima-kar.pl/strony/webasto/> and <http://demo.klima-kar.pl/strony/eberspaecher/>.

## Tech stack

- **[Astro](https://astro.build/) 6**: static output, clean directory URLs (`/cennik/index.html`).
- **Styling**: one stylesheet, `src/styles/szron.css` (Szron tokens as CSS variables plus every
  `kk-` component class). `src/styles/global.css` is only a document reset. No Tailwind, no dark mode.
- **Fonts**: Onest (body) + Unbounded (display), from Google Fonts.
- **Icons**: [`lucide-astro`](https://lucide.dev/), 24px, stroke 1.8, always inside an IconTile.
- **Interactivity**: a few small vanilla scripts (burger menu, month banner, year timeline,
  gallery lightbox, click-to-load video, contact form). No client framework.
- **Contact form backend**: `public/contact.php` (PHP `mail()`), for OVH shared hosting.

## Design system

Everything about the design lives in `design/szron/`:

| File | What |
|---|---|
| `BRAND.md` | Brand book: content rules, colour, type, spacing, motion, and which components each subpage uses. Read it before changing any page. |
| `README.md` | The migration handoff and the list of fixes made to `szron.css` in `src/`. |
| `components/<Name>.html` + `.md` | Reference markup and usage rules for each component. |
| `homepage.dc.html` | The approved homepage design (source of truth for its markup). |
| `szron.css`, `tokens.json` | The original stylesheet and tokens. `src/styles/szron.css` is a patched copy. |

## Project structure

```
├── src/
│   ├── layouts/BaseLayout.astro   # <head>, SEO, JSON-LD, fonts, kk-root wrapper + ambient glows
│   ├── components/                # one Astro component per design-system component
│   │   ├── Header, Footer, PageHero, CTABanner
│   │   ├── Button, Badge, Chip, IconTile, SectionHeader
│   │   ├── Seasons (season module + month banner), LogoStrip, PhotoPanel
│   │   ├── ServiceCard, PartnerCard, ProductCard, GalleryGrid
│   │   ├── YearTimeline (homepage), HistoryTimeline (o-firmie), StatGrid
│   │   ├── ContentSection, FeatureList, FAQ, VideoFeature
│   │   ├── ProcessSteps ("Jak pracujemy"), MobileCallBar (mobile call button)
│   │   ├── PriceCards, PriceGroup (cennik)
│   │   └── ContactSection, ContactForm
│   ├── pages/                     # 17 routes
│   └── styles/                    # szron.css + global.css
├── public/
│   ├── images/                    # photos, product shots; images/brand/ = logos, K mark, snowflakes
│   ├── contact.php                # form handler
│   ├── .htaccess                  # old ?strona= URL redirects, HTTPS, gzip, caching, headers (OVH)
│   ├── CNAME                      # demo.klima-kar.pl (GitHub Pages)
│   ├── robots.txt, favicon.svg
│   ├── google9f5b4b661a30a4e0.html  # Search Console verification (same file as the old site)
├── design/szron/                  # design system and handoff (reference)
├── sites/                         # the two one-page brand sites (see "Brand sites" below)
├── scripts/og-images.mjs         # link-preview cards (1200×630): `npm run og` after changing one
├── archive/produkcja-2026-10-14.tar.gz  # old sites' code from OVH (www/, webasto/, eberspaecher/, pl/)
└── .github/workflows/deploy.yml   # GitHub Pages preview deploy
```

## Pages

| Page | URL |
|------|-----|
| Strona główna | `/` |
| Klimatyzacja | `/klimatyzacja/` |
| Konserwacja | `/konserwacja/` |
| Dezynfekcja klimatyzacji | `/dezynfekcja/` |
| Dezynfekcja TUNAP | `/tunap/` |
| Dezynfekcja BG | `/dezynfekcja-bg/` |
| Cennik | `/cennik/` |
| Jak pracujemy | `/jak-pracujemy/` |
| Ogrzewanie postojowe | `/ogrzewanie-postojowe/` |
| Webasto | `/webasto/` |
| Eberspächer | `/eberspacher/` |
| DEFA | `/defa/` |
| O firmie | `/o-firmie/` |
| Galeria | `/galeria/` |
| Gwarancja | `/gwarancja/` |
| Kontakt | `/kontakt/` |
| RODO | `/rodo/` |

## Brand sites (webasto.wroclaw.pl, eberspaecher.wroclaw.pl)

Two one-page sites for the authorised Webasto and Eberspächer service. They replace the old
HTML5 UP pages (`index.php` on the same OVH hosting) and reuse the main site's stylesheet,
components and data. Each is its own Astro build with its own domain and `dist-<name>/` output.

```
sites/
├── microsite.config.mjs      # shared Astro config (srcDir, outDir, domain, MICROSITE_BASE)
├── public/                   # copied into both builds: favicon, .htaccess, Google verification file
├── shared/                   # MicrositePage (all sections), MicroLayout, MicroHeader, MicroFooter, brand.ts
├── webasto/                  # astro.config.mjs, brand.ts (copy, photos), pages/, assets/ (old banner)
└── eberspaecher/             # same
```

- **Content:** `sites/<name>/brand.ts` holds what differs per brand. The copy comes from the old
  one-page sites plus the main site's heating pages. Shared data lives in `src/data/` and feeds both
  the main site and the brand sites: `sterowanie.ts` (controllers on /webasto/, /eberspacher/),
  `ogrzewanie.ts` ("Które ogrzewanie dla Ciebie"), `komunikat.ts` (notice, shown on all three),
  `strony.ts` (the three sites' URLs; each footer links to the others).
- **Prices:** the diagnostics price (250 zł brutto) and the installation range (od 6.500 zł) in
  `sites/shared/MicrositePage.astro` are copied from /cennik and /ogrzewanie-postojowe; update them together.
- **Images** are imported (`import x from '../../public/images/…'`), so each build ships only the
  files it uses, and paths follow `base`.
- **Contact:** no form (GitHub Pages and the old sites had none). "Napisz e-mail" opens a prepared
  e-mail with the old sites' enquiry list (marka, model, rocznik, silnik, klimatyzacja).
- **Measurement:** the same Google Tag Manager container and cookie banner as the main site
  (`src/components/ConsentHead.astro`, `CookieConsent.astro`), production builds only. The banner's policy
  link goes to the main site's /rodo/#cookies; "Ustawienia cookies" in the footer reopens it.

```bash
npm run dev:webasto          # http://localhost:4322
npm run dev:eberspaecher     # http://localhost:4323
npm run build:webasto        # → dist-webasto/
npm run build:eberspaecher   # → dist-eberspaecher/
npm run build:all            # main site + both brand sites
```

**Deploying a brand site** (only when the owner asks): build it without `PUBLIC_NOINDEX`, back up the
domain's directory on the OVH FTP, delete the old `index.php`, `assets/`, `images/`, `whcookies.js` and
`google.js`, then upload the contents of `dist-<name>/` (including `.htaccess`). The
`google9f5b4b661a30a4e0.html` Search Console file is kept. The brand sites link to
klima-kar.wroclaw.pl's new URLs (`/klimatyzacja/`, `/defa/`, `/rodo/`), so launch them together with
the main site or after it.

## Development

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

Node ≥ 22.12 (see `package.json` › `engines`).

## Deployment

### Preview: demo.klima-kar.pl (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site (`npm run build:demo`:
the main site plus both brand sites under `/strony/webasto/` and `/strony/eberspaecher/`) and publishes
it to GitHub Pages at <http://demo.klima-kar.pl/> (domain set by `public/CNAME`).
GitHub Pages serves static files only: `contact.php` does not run there, so the contact form
can't send on the demo. The workflow builds with `PUBLIC_NOINDEX=true`, so every demo page has
`<meta name="robots" content="noindex, nofollow">` and the preview stays out of Google.

### Production: klima-kar.wroclaw.pl (OVH web hosting)

The domain currently serves the old website. Replacing it with this site (the full step-by-step
launch checklist, in Polish, is `WDROZENIE.md`):

1. Before the switch, export Google Search Console data for the last 16 months (Skuteczność:
   pages, queries, clicks, impressions) to compare after the launch.
2. `npm run build` **without** `PUBLIC_NOINDEX` (check: `grep -r noindex dist` finds nothing).
3. Download a backup of the server's `www/` (old site and its `.htaccess`).
4. Delete the old site's files from `www/` (above all `index.php`). Then upload the **entire contents** of `dist/` (including `.htaccess` and the
   `google9f5b4b661a30a4e0.html` Search Console file; `CNAME` is only for GitHub Pages and can be
   skipped) over FTP/SFTP (FileZilla, Cyberduck, `lftp`).
5. PHP must be enabled (the default on OVH shared hosting).
6. `.htaccess` sends every old `/?strona=…` URL to its new page with one 301 (e.g.
   `?strona=klimatyzacja-samochodowa` → `/klimatyzacja/`, `?strona=bg` → `/dezynfekcja-bg/`,
   `?strona=promocja` → `/cennik/`), and handles HTTPS, www, gzip, caching and security headers.

After deploying, check that `/` loads, that `https://klima-kar.wroclaw.pl/?strona=cennik` lands on
`/cennik/`, that the form sends an e-mail (and "Odpowiedz" reaches the customer), that
`/sitemap-index.xml` is reachable and that HTTP redirects to HTTPS. Then submit
`sitemap-index.xml` in Search Console.

## SEO

Canonical URLs and the sitemap use the production domain (`site` in `astro.config.mjs`,
`siteUrl` in `BaseLayout`), also on the demo. Each page has a Polish title and meta description,
a canonical URL and Open Graph tags
(`pl_PL`). `BaseLayout` adds JSON-LD `AutoRepair` data (address, phones, opening hours,
services). `@astrojs/sitemap` generates the sitemap at build time.

## Contact form

`src/components/ContactForm.astro` validates on the client and posts JSON to `/contact.php`
with `fetch`. The fields are `name` and `email` (required), `car`, `message`, plus a hidden
`website` honeypot. The PHP handler:

- accepts POST only (405 otherwise);
- returns success silently when the honeypot is filled;
- sanitises input and requires `name` and `email`;
- emails `serwis@klima-kar.pl` via PHP `mail()`;
- returns JSON `{success, message}`, shown as a toast.
