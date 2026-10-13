# Klima-Kar — website

Website for **Klima-Kar**, a family car air-conditioning and parking-heater workshop in Wrocław
(ul. Grota Roweckiego 129). Static Astro site in the **Szron** design ("frost": frosted glass over
an icy blue ground, the logo's blues doing all the colour work).

- **Production:** <https://klima-kar.wroclaw.pl/>. It still runs the **old website**, which stays
  the main source of truth for content (texts, prices, facts) until this site replaces it.
- **Preview of this site:** <http://demo.klima-kar.pl/>.

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
│   │   ├── PriceCards, PriceGroup (cennik)
│   │   └── ContactSection, ContactForm
│   ├── pages/                     # 15 routes
│   └── styles/                    # szron.css + global.css
├── public/
│   ├── images/                    # photos, product shots; images/brand/ = logos, K mark, snowflakes
│   ├── contact.php                # form handler
│   ├── .htaccess                  # HTTPS redirect, gzip, caching, security headers (OVH)
│   ├── CNAME                      # demo.klima-kar.pl (GitHub Pages)
│   ├── robots.txt, favicon.svg
├── design/szron/                  # design system and handoff (reference)
├── content/www/                   # copy of the old website source (reference; the live site wins)
└── .github/workflows/deploy.yml   # GitHub Pages preview deploy
```

## Pages

| Page | URL |
|------|-----|
| Strona główna | `/` |
| Klimatyzacja | `/klimatyzacja/` |
| Konserwacja | `/konserwacja/` |
| Dezynfekcja TUNAP | `/tunap/` |
| Dezynfekcja BG | `/dezynfekcja-bg/` |
| Cennik | `/cennik/` |
| Ogrzewanie postojowe | `/ogrzewanie-postojowe/` |
| Webasto | `/webasto/` |
| Eberspächer | `/eberspacher/` |
| DEFA | `/defa/` |
| O firmie | `/o-firmie/` |
| Galeria | `/galeria/` |
| Gwarancja | `/gwarancja/` |
| Kontakt | `/kontakt/` |
| RODO | `/rodo/` |

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

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it
to GitHub Pages at <http://demo.klima-kar.pl/> (domain set by `public/CNAME`).
GitHub Pages serves static files only: `contact.php` does not run there, so the contact form
can't send on the demo.

### Production: klima-kar.wroclaw.pl (OVH web hosting)

The domain currently serves the old website. Replacing it with this site:

1. `npm run build`.
2. Upload the **entire contents** of `dist/` (including `.htaccess`) to the hosting `www/`
   directory over FTP/SFTP (FileZilla, Cyberduck, `lftp`).
3. PHP must be enabled (the default on OVH shared hosting).
4. `.htaccess` handles the HTTPS redirect, gzip, browser caching and security headers.

After deploying, check that `/` loads, `/contact.php` answers a POST, `/sitemap-index.xml`
is reachable and HTTP redirects to HTTPS.

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
