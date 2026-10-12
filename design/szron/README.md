# Szron redesign — migration handoff

Status (2026-10-12): the **Szron** design and all its components are chosen. This folder holds everything needed to rebuild the Astro site on it. Nothing in `src/` has been migrated yet; only the fact fixes listed at the end are applied there.

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

They were not built locally; the session had no Node.
