# Klima-Kar — Website Rebuild

Modern website for **Klima-Kar**, an HVAC/AC service business in Wroclaw, Poland. Rebuilt from the ground up with a state-of-the-art design system and optimized tech stack.

## Tech Stack

- **Static Site Generator**: [Astro](https://astro.build/) v5 — zero client JS by default, outputs static HTML
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 + CSS custom properties (design tokens)
- **Icons**: [Lucide](https://lucide.dev/) (stroke-width 1.5)
- **Typography**: Barlow (body) + Barlow Condensed (display) via Google Fonts
- **Contact Form Backend**: PHP (`mail()`) — compatible with OVH shared hosting
- **Hosting Target**: OVH Web Hosting (Apache, PHP)

## Project Structure

```
├── src/
│   ├── layouts/         # BaseLayout (SEO, dark mode, JSON-LD)
│   ├── components/      # Shared Astro components
│   │   ├── Header.astro, Footer.astro
│   │   ├── PageHero.astro, ServiceCard.astro, PartnerCard.astro
│   │   ├── PriceTable.astro, Timeline.astro, CTABanner.astro
│   │   ├── StatCard.astro, Breadcrumb.astro
│   │   └── ContactSection.astro, ContactForm.astro
│   ├── pages/           # 13 route pages
│   ├── styles/          # global.css with design tokens
│   └── assets/logos/    # 5 SVG logo variants
├── public/
│   ├── images/          # Photos, product images, gallery
│   ├── contact.php      # Form handler backend
│   ├── .htaccess        # HTTPS redirect, gzip, caching
│   ├── robots.txt
│   └── favicon.svg
├── content/www/         # Old website source (reference only)
└── klima-kar-design-system/  # Design handoff (reference only)
```

## Design Tokens

Colors, typography, spacing, shadows, and radii are defined in `src/styles/global.css`:

- **Brand colors**: Blue scale (#1C5EA6 primary, #3388BF secondary, #40B0D9 accent) from logo
- **Dark scale**: From #060D16 (deepest) to #E8EFF4 (lightest neutral)
- **Status**: Success/warning/error semantic colors
- **Partner brands**: Webasto #C8001E, Eberspächer #E85D00, DEFA #006BB4
- **Fonts**: Barlow Condensed (display), Barlow (body)
- **Dark mode**: `[data-theme="dark"]` overrides on `<html>`, persisted via `localStorage` key `kk-theme`

## Pages

| Page | URL |
|------|-----|
| Strona główna | `/` |
| Klimatyzacja | `/klimatyzacja/` |
| Konserwacja | `/konserwacja/` |
| Cennik | `/cennik/` |
| Ogrzewanie postojowe | `/ogrzewanie-postojowe/` |
| Webasto | `/webasto/` |
| Eberspacher | `/eberspacher/` |
| DEFA | `/defa/` |
| O firmie | `/o-firmie/` |
| Gwarancja | `/gwarancja/` |
| Kontakt | `/kontakt/` |
| Galeria | `/galeria/` |
| RODO | `/rodo/` |

## Development

```bash
npm install
npm run dev        # Start dev server at localhost:4321
```

## Build

```bash
npm run build      # Output to dist/
```

The build produces:
- 13 static HTML pages with clean URLs (e.g. `/cennik/index.html`)
- Optimized assets in `dist/_astro/` (CSS, hashed filenames)
- `images/` directory with all photos/logos
- `contact.php` (form handler)
- `.htaccess` (HTTPS, gzip, caching, security headers)
- `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml`
- `favicon.svg`

## Deploy to OVH Hosting

1. Run `npm run build` locally.
2. Upload the **entire contents** of `dist/` to your OVH hosting `www/` directory via FTP/SFTP.
   - The included `SETUP_FTP.sh` script can mount OVH FTP locally for easier syncing (Linux only, requires `curlftpfs`).
   - Otherwise, use FileZilla / Cyberduck / `lftp`.
3. Verify PHP is enabled on the hosting plan (default on OVH shared hosting).
4. The `.htaccess` file handles HTTPS redirect, gzip compression, browser caching, and security headers automatically.
5. The contact form posts to `/contact.php` and emails `serwis@klima-kar.pl` via PHP `mail()`.

### File checklist after deployment
- `index.html` at root → loads home page
- `contact.php` accessible at `/contact.php` (test via curl POST)
- `sitemap-index.xml` accessible (Google Search Console)
- `.htaccess` in place (verify HTTPS redirect works)

## SEO

Each page has:
- Polish meta title & description
- Canonical URL
- Open Graph tags (locale `pl_PL`)
- JSON-LD `AutoRepair` / `LocalBusiness` schema (in `BaseLayout`)
- BreadcrumbList structured data (in `Breadcrumb` component)

The sitemap is auto-generated at build time by `@astrojs/sitemap`.

## Contact Form

The contact form (`src/components/ContactForm.astro`) posts JSON to `/contact.php` via `fetch`. The PHP handler:
- Validates HTTP method (POST only, returns 405 otherwise)
- Sanitizes input via `htmlspecialchars(strip_tags(trim(...)))`
- Checks honeypot field (silently returns success for bots)
- Validates required fields (name, phone, service)
- Emails `serwis@klima-kar.pl` via native `mail()`
- Returns JSON `{success, message}` for the frontend toast

No external dependencies — pure PHP, OVH-compatible.
