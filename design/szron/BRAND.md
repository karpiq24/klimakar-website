Klima-Kar is a family car air-conditioning and parking-heater workshop in Wrocław. The **Szron** ("frost") language is light frosted glass over an icy blue ground, with the logo's blues doing all the colour work. It should feel cold, clean and technical, never sterile: glows drift, snowflakes turn, and the page follows the seasons.

## Content fundamentals

- **Polish, informal "Ty".** Address the driver directly: "Twojego auta", "Zadzwoń, napisz lub odwiedź nas", "Wypełnij formularz, a odpowiemy na Twoje zapytanie."
- **Concrete over clever.** Name refrigerants (R12, R134a, R1234yf, R744), brands (Webasto, Eberspächer, DEFA) and methods (TUNAP, ultradźwięki, hamownia). Season lines are the only wordplay: "Latem chłodzimy." / "Zimą grzejemy."
- **Sentence case** for headings, with no trailing period, except the two season lines, which end with one. Eyebrows are UPPERCASE via CSS; write them in normal case.
- **CTAs are imperatives:** "Umów wizytę", "Zobacz cennik", "Wyślij zapytanie". Add " →" only when the link leaves the section.
- **Fixed facts.** In refrigeration since 1989; Klima-Kar since 1999. Never call 1989 the founding year. Say "Ogrzewanie postojowe", never "Ogrzewacze postojowe". Cabin filters are in stock and fitted on the spot. Repairs replace parts with new ones first and regenerate only as a fallback. R744/CO₂ and EV service are the differentiator, so give them prominence, but state equipment and experience, never "one of the few in Poland".
- **No emoji, no exclamation marks, no invented stats.**

## Visual foundations

**Colour.** `brand` (#1C5EA6) leads every page: primary buttons, eyebrows, icon strokes, active states. `brand-sky` and `brand-ice` come from the logo and appear only as glows, gradients and pulse dots, never as text. Headings are `navy`, body copy is `text-muted`, and leads are `text-strong`. The page ground is `ground` with a 22px `brand-dot` grid (`kk-dots`). No other hues: partner red and orange appear only inside the partner logos.

**Surfaces.** Everything floats on frost:
- `frost` (0.58 white, 22px backdrop blur, `frost-edge` border, `shadow-frost`) is the default.
- `frost-card` (0.72) is for cards on photos, `frost-tile` (0.88) and `frost-form` (0.92) are for content over the blue backlight.
- Exactly one solid `brand` card per grid. A navy spotlight card marks the single differentiator.

**Backlight.** Large blurred ellipses (`kk-glow` + `kk-drift`, `blur-glow`) in `brand` (≈0.4) and `brand-ice` (≈0.35) sit behind frost wherever text density is high: page top, contact. They make frost read blue and lift contrast.

**Type.**
- Display: Unbounded 600, tight negative tracking. Styles are `display-hero`, `heading-section`, `heading-season`, `heading-spotlight`, `heading-card-lg`, `month-name` and `card-title`.
- Body: Onest 400–600 at 16px/1.6.
- Display sizes are fluid in `cqi` against the `.kk-root` container. Their exact clamps are in each style's usage note.
- The hero h1 alone gets the `navy`→`brand` gradient (`kk-grad`).

**Radii.** Radii are big and nested: 40 panel › 36 season/footer › 30 card › 28 small card › 22 photo › 16 icon/input › pill. A photo inside a frame takes the frame radius minus the 8px `frame-inset`.

**Spacing.**
- Sections start `section-y` (clamp 72→120px) apart; About and Contact use `section-y-lg`.
- Content sits in `kk-wrap` (max `wrap-max`, fluid `gutter`).
- Grids use `grid-gap` 14px (services: `svc-gap` 16px).

**Imagery.**
- Real workshop and customer-car photos in natural colour. No duotone, no blue filters, no stock.
- Seasonal photos (`lato-1.webp` summer, `webastoauto.jpg` winter) are a matched pair. Use them behind PhotoPanels and in the season module.
- Photos always sit inside a frost frame or a rounded `radius-photo` crop.

**Motion.**
- Slow and ambient: glows drift 16–22s, the hero snowflake turns 40s, small flakes 10s, live dots pulse 1.8s.
- Cards lift 6px on hover (`shadow-lift`); buttons lift 2px.
- The About timeline advances every 4.5s.
- Everything stops under `prefers-reduced-motion`.

**Focus.** A 3px solid `brand` outline with a 3px offset on every interactive element. On `ground` and frost it is 5.9:1. Inputs instead show a `brand` border plus the `shadow-field-focus` halo.

**Motifs.** Car, AC and heating only: the snowflake (`flake-*.svg`), the sun SVG, the K mark, refrigerant codes and CO₂. No cinema, film or ticket metaphors.

## Iconography

- Line icons in Lucide style: 24px, stroke 1.8, round caps and joins, `currentColor`. Use `lucide-astro`, already in the repo.
- Always inside an IconTile (`kk-ico`) on cards.
- Brand motifs are SVG files under assets › Motifs (snowflake in blue, sky and white) and assets › Logos (full logo, K mark).
- The season sun is an inline SVG (see SeasonModule).
- Partner logos are only the files in assets › Partners, at the balanced heights in LogoStrip.

## Components

Every component is a set of `kk-` classes in `components/bundle.css` over `tokens.css`. There is no JavaScript framework. Interactive parts (burger menu, month banner, year timeline) need a few lines of vanilla JS, shown in their previews. Wrap every page in `<div class="kk-root kk-dots">` so the container queries and `cqi` sizes work.

- **Actions & labels:** Button, Badge, Chip, IconTile
- **Layout:** SectionHeader, PhotoPanel
- **Navigation:** Header, Footer
- **Cards:** ServiceCard (standard, brand, spotlight, image), PartnerCard
- **Sections:** Hero, SeasonModule, MonthBanner, LogoStrip, Gallery, YearTimeline, ContactPanel
- **Subpages:** PageHero (with breadcrumbs), CTABanner, PriceTable, FeatureList, ProductCard, ContentSection, FAQ, StatGrid, HistoryTimeline, VideoFeature

## Homepage order

Header › Hero › SeasonModule + MonthBanner › LogoStrip › Services PhotoPanel (summer photo, ServiceCards) › Heating PhotoPanel ("Ogrzewanie postojowe", PartnerCards, winter photo) › Gallery › About (YearTimeline + copy) › ContactPanel › Footer.

## Subpages

Every subpage keeps its existing copy (with the fixed facts) and is rebuilt from these components. The sequence is always: Header › PageHero › content sections › CTABanner › Footer.

| Page | Content sections |
|---|---|
| Klimatyzacja | Services PhotoPanel (summer) with ServiceCards, incl. brand (filters) and spotlight (R744/EV); FeatureList where the page lists benefits |
| Ogrzewanie postojowe | Heating PhotoPanel with PartnerCards › FeatureList (Zalety) › ContentSection × n (wodne, powietrzne, koszty, rozbudowa) |
| Webasto, Eberspächer | ServiceCards (Nasze usługi) › ProductCard grid (Systemy sterowania) |
| DEFA | ContentSection (System DEFA WarmUp) › ProductCard (modules) › FeatureList (Korzyści) |
| Konserwacja, TUNAP, Dezynfekcja BG | ContentSection × n › FeatureList for lists › PriceTable group where prices exist |
| Cennik | PriceTable (refrigerant cards + groups) |
| Galeria | VideoFeature › Gallery (all photos) |
| O firmie | HistoryTimeline › StatGrid |
| Kontakt | ContactPanel › ContentSection (Jak do nas dojechać?) |
| Gwarancja | ContentSection (services / parts / conditions) › FAQ (Szczegóły gwarancji) |
| RODO | ContentSection × n |
