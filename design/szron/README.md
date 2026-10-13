# Szron redesign — migration handoff

Status (2026-10-12): the **Szron** design and all its components are chosen, and the Astro site in `src/` has been migrated to it (see "Migration done" at the end).

- Design system (brand book, tokens, 27 components with live previews, assets): https://claude.ai/artifact/VN7mKsrvHdtzkwbfakVQet ("Klima-Kar Szron"). It is private to the owner.
- Design canvas: https://claude.ai/artifact/JFSeGxhcABBowJsRhuEBbu. Page "3 · Szron" holds the approved homepage (desktop + mobile). Page "4 · Nowe komponenty" holds the subpage component options.

Everything needed is in this folder, so the migration does not depend on the artifacts.

## Files here

| File | What |
|---|---|
| `BRAND.md` | The brand book (copy of the design system README): content rules, colour, surfaces, type, radii, spacing, imagery, motion, focus, icons, homepage order and **the page-by-page subpage composition**. Read it first. |
| `szron.css` | Single stylesheet to import: Google Fonts (Onest + Unbounded) + every token as a CSS variable + every `kk-` component class, mobile rules included. |
| `tokens.json` | Tokens with usage notes and contrast ratios. |
| `components/<Name>.html` | Reference markup for each of the 27 components, with image URLs already pointing at final site paths. Interactive ones include the preview's vanilla JS. |
| `components/<Name>.md` | Usage rules for each component: what the consumer provides, variants, do/don't. |
| `homepage.dc.html` | The approved homepage exactly as on the canvas (Claude Design format: `{{holes}}`, `<sc-if>`, `<sc-for>`, logic in `renderVals()` at the bottom). Source of truth for homepage markup **and copy**. |
| `blob-map.json` | Every `/_blob/<id>` (canvas and design system) → `{file, url, copy_from}`. `url` is the final site path. `copy_from` is set when the file must first be copied into `public/`. |
| `assets/` | Files not yet in `public/`: `lato-1.webp` (AI-generated summer photo), snowflakes, K marks, logo variants, partner logos (colour + white). The Eberspächer SVG here is the one the design uses. |

## Decisions (final)

1. **Homepage = Szron, verbatim.** Port `homepage.dc.html` into `src/pages/index.astro`. Do not carry over anything from the old homepage.
2. **Subpages keep their copy** (with the fact fixes) and are rebuilt from the design system; see `BRAND.md` › Subpages for which components each page uses. Do not imitate the old layouts.
3. **No dark mode.** Remove the toggle, the `kk-theme` script in `BaseLayout.astro`, the toggles in `Header.astro` and every `[data-theme='dark']` style.
4. **Fonts:** Onest (body) + Unbounded (display) replace Barlow / Barlow Condensed.
5. **Chosen subpage variants** (from canvas page 4): PageHero **A**, CTABanner **B**, PriceTable **C**, FeatureList **B**, ProductCard **A**, ContentSection **A**, FAQ **A**, StatGrid **B**, HistoryTimeline **A**, VideoFeature **B**. Only these are in the design system and `szron.css`.
6. **Facts:**
   - Klima-Kar started in **1999**. 1989 is "Początki w chłodnictwie", never the founding year.
   - Always **"Ogrzewanie postojowe"**.
   - Repairs mean a new part first, regeneration only as a fallback ("Skuteczne naprawy").
   - R744/CO₂ and EV service is a differentiator.
   - Cabin filters are in stock and fitted on the spot.
   - In the price list the group "Naprawy i regeneracja" is shown as "Naprawy". Its rows and prices are unchanged.

## Migration steps

### 1. Foundation
- `cp design/szron/szron.css src/styles/szron.css` and import it in `BaseLayout.astro`. Swap the Barlow `<link>` for Onest + Unbounded (preconnect + `<link>`; the `@import` at the top of `szron.css` can then go).
- Remove the old `@theme` palette, the semantic tokens and the dark-mode CSS in `global.css` once no page uses them. Tailwind may stay for utilities, but colours, radii and shadows come only from the Szron `--` tokens.
- `BaseLayout`:
  - Wrap the body content in `<div class="kk-root kk-dots">`.
  - Add the two ambient glows at the top: the two `kk-drift` divs right after `.kk-root` in `homepage.dc.html`.
  - Delete the theme script.
- Assets: `mkdir -p public/images/brand && cp design/szron/assets/*.svg public/images/brand/ && cp design/szron/assets/lato-1.webp public/images/`. After that, every `url` in `blob-map.json` resolves.

### 2. Components
Build one Astro component per design-system component, from `components/<Name>.html` + `.md`. Use props for content and slots for free markup. Icons come from `lucide-astro` at stroke 1.8.

| Astro component | From | Replaces |
|---|---|---|
| `Header.astro` (+ mobile menu script) | Header | Header.astro (drop dark toggle) |
| `Footer.astro` | Footer | Footer.astro |
| `Button`, `Badge`, `Chip`, `IconTile`, `SectionHeader` | same names | ad-hoc Tailwind |
| `PageHero.astro` (breadcrumbs built in) | PageHero (A) | PageHero.astro + Breadcrumb.astro |
| `Seasons.astro` (SeasonModule + MonthBanner, client script) | SeasonModule, MonthBanner | — |
| `LogoStrip`, `PhotoPanel`, `PartnerCard`, `ServiceCard` (variant prop: standard/brand/spotlight/image) | same | PartnerCard.astro, ServiceCard.astro |
| `GalleryGrid`, `YearTimeline` (homepage), `HistoryTimeline` (o-firmie) | Gallery, YearTimeline, HistoryTimeline (A) | Timeline.astro |
| `ContactSection.astro` + `ContactForm.astro` | ContactPanel | restyle; keep field names + `contact.php` |
| `CTABanner.astro` | CTABanner (B) | CTABanner.astro |
| `PriceTable.astro` (`PriceCards` + `PriceGroup`) | PriceTable (C) | PriceTable.astro |
| `FeatureList`, `ProductCard`, `ContentSection`, `FAQ`, `StatGrid`, `VideoFeature` | same | StatCard.astro + inline page markup |

### 3. Homepage
Port `homepage.dc.html` top to bottom: Header › Hero › Seasons + MonthBanner › LogoStrip › Services PhotoPanel › Heating PhotoPanel › Gallery › About (YearTimeline) › Contact › Footer.

Dynamic parts become vanilla scripts:
- **Month and season:** `renderVals` › `M` (12 rows) sets the month text, CTA, bar segments, `is-now` and the "Teraz" chip on the client (not at build time).
- **Year timeline:** 4.5s cycle; a click restarts it; respect reduced motion.
- **Burger menu:** toggle `hidden` and `aria-expanded`.

Link targets: `/klimatyzacja`, `/ogrzewanie-postojowe`, `/webasto`, `/eberspacher`, `/defa`, `/cennik`, `/galeria`, `/o-firmie`, `/kontakt`, `/tunap`, `/dezynfekcja-bg`, `/konserwacja`.

### 4. Subpages
Follow `BRAND.md` › Subpages: every page is Header › PageHero › content › CTABanner › Footer. Keep each page's copy, data arrays and prices exactly; only the markup changes.

### 5. Check
- `npm run build` passes.
- Every page looks right at 1440px and 390px; compare the homepage with the canvas boards.
- No `/_blob/`, Barlow, `data-theme` or `kk-theme` is left.
- No "rok założenia" with 1989, no "Ogrzewacze postojowe".
- Then deploy to demo.klima-kar.pl for the owner.

## Already applied to `src/` (2026-10-12)

Fact fixes only. Files:
- `Footer.astro`
- `o-firmie.astro`: 1989 timeline title and StatCard.
- `klimatyzacja.astro`: meta, hero text, and the "Skuteczne naprawy" card without the regeneration price.
- `index.astro`: badge, stats, "Ogrzewanie postojowe", "Skuteczne naprawy".

Verified: `npm run build` passes (Node 22.23.1, 15 pages), and the built HTML has no "rok założenia", "Ogrzewacze postojowe" or "działamy od 1989".

## Migration done (2026-10-12)

All five steps are complete: 15 pages build, and each was checked at 1440px and 390px (later also at 800, 1024, 1280, 1366 and 1920px). The site is merged into `main` and published at <http://demo.klima-kar.pl/> on every push (`.github/workflows/deploy.yml`).

- Components live in `src/components/` (one per design-system component, plus `PriceCards`/`PriceGroup` and `Seasons`). Tailwind is removed; `src/styles/global.css` is only a document reset.
- `src/styles/szron.css` is this folder's `szron.css` with these fixes, found while checking pages:
  - font `@import` removed (the fonts are `<link>`ed in `BaseLayout`);
  - `.kk-root` uses `overflow: clip`, so the ContentSection heading can stick;
  - `:where(.kk-root) a` resets link colour without overriding `.kk-btn--primary`, `.kk-link` and `.kk-cta-tel`;
  - `.kk-round.kk-blue` sets the brand background (the burger rendered white on white);
  - `.kk-article p`, `.kk-stats p` and `.kk-video p` skip `.kk-eyebrow` (they turned eyebrows grey and 17px);
  - mobile: buttons may wrap, the month-banner CTA spans the full width, and StatGrid numbers scale down;
  - `.kk-h2`, `.kk-pagehero-title` and `.kk-card-title` get `overflow-wrap: break-word` as a safety net;
  - `.kk-foot-bottom a` has no underline, as on the approved homepage;
  - `.kk-grad` pads its box by `.16em` top and bottom (cancelled by negative margins): `background-clip: text` only paints inside the box, so descenders of the hero h1 and the StatGrid numbers were cut;
  - StatGrid numbers are `clamp(22px, 3.1cqi, 44px)` (were up to 64px), so "Wrocław" and "Rodzinna" fit their quarter of the bar at every width;
  - footer logos are larger (20 / 31 / 33px, same 24:37:40 balance) and wrap when narrow;
  - `.kk-price-cards--2` is a 2-column variant of the refrigerant price cards (four cards on /cennik);
  - `.kk-more` is the "Dowiedz się więcej →" line that ServiceCard and PartnerCard show when they link
    somewhere (brand blue; white on brand and spotlight cards; underlined on card hover).

## Changes after the migration (owner requests, 2026-10-12)

These differ from `homepage.dc.html` and the component previews on purpose. Don't revert them from the design files.

- **Homepage hero:** the badge reads "Działamy od 1999 roku · Wrocław" (was "W chłodnictwie od 1989 roku"), and the company tagline "Komfortowy klimat w zasięgu ręki" sits under the h1.
- **Footer:** Klima-Kar logo 46px.
- **Contact map:** the live Google Maps embed replaces the placeholder photo; the embed's own "Otwórz w Mapach" link replaces the overlaid pill.
- **Cennik:** a fourth refrigerant card, R744 (wybrane modele pojazdów, 900 zł).
- **Klimatyzacja:** a "Ważna informacja dla naszych Klientów" ContentSection (full service only, own parts only), with a warning IconTile through ContentSection's `icon` slot.
- **Gwarancja:** the "Części dostarczone przez klienta" answer now states the own-parts-only rule.
- **Ogrzewanie postojowe:** "Serwisujemy ponadto ogrzewania Ardic." is a frost pill under the brand cards.
- **Eberspächer:** EasyStart Pro product card (Eberspächer press packshot, features from the Polish operating manual); EasyStart Web subscription "129 zł rocznie (cena na dzień 12.10.2026)".
- **Photos:** `webastoauto.jpg` is used only for Webasto/heating in general. Eberspächer uses `eberspacher-zima.jpg` and DEFA uses `defa-warmup.jpg` (manufacturer press images; FeatureList takes an `image` prop for this).
- **Headings:** Unbounded's "j" has no descender hook by design; the owner chose to keep it.

### Owner requests, 2026-10-13

- **Linked cards:** every ServiceCard/PartnerCard with `href` ends in "Dowiedz się więcej →" (it wasn't clear they were links).
- **R744 spotlight** (homepage and /klimatyzacja): chip "Doświadczenie w R744" and "Mamy specjalistyczny sprzęt do układów R744 i duże doświadczenie w ich serwisie" replace "Nieliczni w Polsce" / "jako jeden z nielicznych warsztatów w Polsce".
- **Jak pracujemy:** new ProcessSteps section (przyjęcie → diagnostyka i wycena → telefon i decyzja klienta → naprawa) on the homepage (before the gallery) and on /klimatyzacja, plus a new page /jak-pracujemy/. The "Ważna informacja" box on /klimatyzacja moved there as "Zasady przyjmowania zleceń"; its last sentence no longer promises "bezawaryjnie".
- **Klimatyzacja:** "Napełnianie i serwis układu" chip is "od 250 zł" (the lowest refrigerant price; "od 200 zł" was never on the old site) and links to /cennik.
- **Cennik:** "Zakres obsługi układu klimatyzacji" restored from the old site; title "Cennik usług 2026" and a hand-set "Ceny aktualne na dzień …" date.
- **Ogrzewanie postojowe:** "Które ogrzewanie dla Ciebie" tiles (wodne: auta osobowe; powietrzne: firmy, floty, kampery). Fuel costs are given in litres only; the złoty figures based on 5 zł/l are gone.
- **Contact form:** optional phone, optional VIN, preferred contact (e-mail/telefon; phone becomes required for telefon). "odpiszemy w ciągu 1 dnia roboczego" is now "odpowiemy na Twoje zapytanie". `contact.php` sets Reply-To to the customer.
- **Mobile:** a fixed "Zadzwoń do serwisu" call bar below 760px.
- **SEO:** page titles name the service and Wrocław; the demo is `noindex`; JSON-LD coordinates corrected to 51.05556, 17.03197 (OpenStreetMap for ul. Grota-Roweckiego 129).
