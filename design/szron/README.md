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
  - `.kk-years` lays out any number of year buttons in equal columns (was fixed at three; the homepage
    YearTimeline has four since the 2009 authorisation got its own year); on mobile they form a 2×2 grid. Each `.kk-year` is a top-aligned flex column, so years line up when one label wraps to more lines (buttons centre their content by default).
  - mobile: `.kk-products` (ProductCard grid) stacks the cards in one column instead of the side-scrolling
    row (owner, 2026-10-13: no horizontal scroll anywhere).
  - `.kk-headbar` makes the header wrapper sticky (UX request, 2026-10-14); once scrolled (`is-stuck`) the
    pill uses `--frost-form`, a `--brand-line` border and the new `--shadow-sticky` token, so it stands
    out from the light ground and white cards (it blended in with the white frost edge), and the mobile menu scrolls if taller than
    the screen. On mobile `.kk-headbar.is-hidden` slides it away while scrolling down and back on scroll up,
    so it and the bottom call bar don't both cover the content (owner, 2026-10-14). `.kk-nav--pill` / `.kk-nav-pill` is the floating highlight that slides between nav links
    (set up by `src/scripts/header.ts`; without JS the current link keeps its own white background).
    `global.css` adds `scroll-padding-top` so anchors land below the header.
  - the two page-background glows behind the header are classes (`.kk-glow--top-ice`, `.kk-glow--top-brand`,
    were inline styles in the layouts); on mobile they are smaller and fainter (owner, 2026-10-14: the
    760px ice glow turned the whole top of the phone screen blue). Desktop is unchanged.

## Changes after the migration (owner requests, 2026-10-12)

These differ from `homepage.dc.html` and the component previews on purpose. Don't revert them from the design files.

- **Homepage hero:** the badge reads "Działamy od 1999 roku · Wrocław" (was "W chłodnictwie od 1989 roku"), and the company tagline "Komfortowy klimat w zasięgu ręki" sits under the h1.
- **Footer:** Klima-Kar logo 46px.
- **Contact map:** the live Google Maps embed replaces the placeholder photo; the embed's own "Otwórz w Mapach" link replaces the overlaid pill.
- **Cennik:** a fourth refrigerant card, R744 (wybrane modele pojazdów, 900 zł).
- **Klimatyzacja:** a "Ważna informacja dla naszych Klientów" ContentSection (full service only, own parts only), with a warning IconTile through ContentSection's `icon` slot.
- **Gwarancja:** the "Części dostarczone przez klienta" answer now states the own-parts-only rule.
- **Ogrzewanie postojowe:** "Serwisujemy ponadto ogrzewania Ardic." is a frost pill under the brand cards.
- **Eberspächer:** EasyStart Pro product card (Eberspächer press packshot, features from the Polish operating manual); EasyStart Web subscription "129 zł rocznie (cena na dzień …)".
- **Photos:** `webastoauto.jpg` is used only for Webasto/heating in general. Eberspächer uses `eberspacher-zima.jpg` and DEFA uses `defa-warmup.jpg` (manufacturer press images; FeatureList takes an `image` prop for this).
- **Headings:** Unbounded's "j" has no descender hook by design; the owner chose to keep it.

### Owner requests, 2026-10-13

- **Linked cards:** every ServiceCard/PartnerCard with `href` ends in "Dowiedz się więcej →" (it wasn't clear they were links).
- **R744 spotlight** (homepage and /klimatyzacja): chip "Doświadczenie w R744" and "Mamy specjalistyczny sprzęt do układów R744 i duże doświadczenie w ich serwisie" replace "Nieliczni w Polsce" / "jako jeden z nielicznych warsztatów w Polsce".
- **Jak pracujemy:** new ProcessSteps section (przyjęcie → diagnostyka i wycena → telefon i decyzja klienta → naprawa) on the homepage (before the gallery) and on /klimatyzacja, plus a new page /jak-pracujemy/. The "Ważna informacja" box on /klimatyzacja moved there as "Zasady przyjmowania zleceń"; its last sentence no longer promises "bezawaryjnie".
- **Klimatyzacja:** "Napełnianie i serwis układu" chip is "od 250 zł" (the lowest refrigerant price; "od 200 zł" was never on the old site) and links to /cennik.
- **Cennik:** "Zakres obsługi układu klimatyzacji" restored from the old site; title "Cennik usług 2026" and a "Ceny aktualne na dzień …" date (hand-set at first; now automatic, see below).
- **Ogrzewanie postojowe:** "Które ogrzewanie dla Ciebie" tiles (wodne: auta osobowe; powietrzne: firmy, floty, kampery). Fuel costs are given in litres only; the złoty figures based on 5 zł/l are gone.
- **Contact form:** optional phone, optional VIN, preferred contact (e-mail/telefon; phone becomes required for telefon). "odpiszemy w ciągu 1 dnia roboczego" is now "odpowiemy na Twoje zapytanie". `contact.php` sets Reply-To to the customer.
- **Mobile:** a fixed "Zadzwoń do serwisu" call bar below 760px.
- **Homepage About:** "oraz jesteśmy partnerem sprzedażowym DEFA" removed; the sentence now names only the Webasto and Eberspächer authorisations.
- **SEO:** page titles name the service and Wrocław; the demo is `noindex`; JSON-LD coordinates corrected to 51.05556, 17.03197 (OpenStreetMap for ul. Grota-Roweckiego 129).

### Owner decisions from the content audit, 2026-10-13

The owner went through an audit of the new site against the old one (39 findings) and decided each point.

- **History:** 2008 is "Rozbudowa serwisu" (two lifts, heaters added to the offer); the Webasto and Eberspächer authorisation is its own year, **2009**, on the homepage YearTimeline and on /o-firmie. Its image `2009-autoryzacja.webp` is the two white brand logos on the Szron gradient (composed from `public/images/brand/`).
- **Cennik:** "Robocizna — Standardowa roboczogodzina 250 zł" is back; the refrigerant section is labelled "samochody osobowe"; the ultrasonic disinfection row describes how it is done (mist from an ultrasonic device with the blower on), not its purpose; no "ceny orientacyjne", but "Ceny brutto" stays.
- **Webasto:** Telestart T91 and ThermoCall are no longer sold. They come last, greyed out, with a "Produkt wycofany" chip (ProductCard `retired`). MultiControl has no "Wbudowany czujnik temperatury". ThermoConnect and EasyStart Web both list "Wbudowana karta eSIM" (owner, 2026-10-16; was "Nie wymaga karty SIM") and the LED push button.
- **Klimatyzacja:** components are listed as replaced, never repaired; we repair only compressors and hoses.
- **Ogrzewanie postojowe:** the air-heater tile says most repairs are done the same day so the van can get back on the road ("Serwis w trybie pilnym" and "Niezawodne" are gone).
- **Kontakt:** only "w dzielnicy Krzyki"; there is no other street to enter from and no customer car park claim.
- **Galeria:** no YouTube film; no Webasto or TUNAP press photos among "Nasze realizacje".
- **Price dates:** every "na dzień …" next to a price shows today's date (`src/components/Today.astro`, set in the browser; the build date is the no-JS fallback), and the /cennik title year follows it. Earlier the date was set by hand. When prices change, update /cennik first.
- **History:** /o-firmie 1993 shows `manometry50p.webp`.
- **Disinfection:** describe how it is done, not what it is for. Ultrasonic: mist from an ultrasonic device with the blower on (/cennik row and /klimatyzacja card). TUNAP: a spray lance at high pressure straight onto the evaporator, hence the most effective against fungi, mould and bacteria (new first section on /tunap, its meta description and price row, the /cennik row, and the cards on the homepage and /klimatyzacja).
- **Dezynfekcja BG:** no "Zobacz cennik" button; the BG price sheet image is now a PriceGroup table (129 / 219 / 299 zł) on that page only, not on /cennik. "Dlaczego dezynfekcja BG?" is rewritten (the BG Poland marketing paragraph is gone): BG is used where the evaporator is hard to reach and TUNAP can't be done; Frigi-Clean foam goes into the evaporator housing through a tube, then Frigi-Fresh is sprayed into the fresh-air intake with the blower on. Facts from bgpoland.pl and bgprod.com.
- **Galeria:** 10 photos for now; more will be added later.
- **Komunikat:** `src/data/komunikat.ts` replaces the old site's `komunikat.html` (closures, heat-wave delays). Empty text hides it.
- Kept as they are, by decision: the "Gwarancja na usługi" block and FAQ on /gwarancja, the T91/T99 split, the Webasto/Eberspächer "Nasze usługi" cards (minus "Pełna"), "liderem" on /o-firmie, the Instagram link, and the shortened controller texts (no ThermoConnect extras, no intro sentences).

### Brand sites, 2026-10-13

- webasto.wroclaw.pl and eberspaecher.wroclaw.pl are rebuilt in Szron as one-page sites (`sites/`,
  see the main README). `szron.css` is unchanged; their own layout (editorial hero over a wide photo
  with the partner plate, model ticker, bento service grid, water/air heaters in the season-module
  halves) is scoped CSS in `sites/shared/MicrositePage.astro`, using tokens only.
- The main site's footer bottom bar links both brand sites ("Nasze serwisy"); their footers link back.
- **Heater models** (owner request): "Które ogrzewanie dla Ciebie" shows the models we fit as ProductCards
  (`HeaterModels.astro`, data in `src/data/ogrzewanie.ts`). Wodne: Webasto Thermo Top Evo, Eberspächer
  Hydronic S3. Powietrzne: Webasto Air Top Pro 25, Eberspächer Airtronic S3 D2L. /ogrzewanie-postojowe
  shows one model per type with a Webasto | Eberspächer pill switch (both cards switch together; the owner
  rejected 4 narrow tiles and wide photo-left rows). /webasto/, /eberspacher/ and each brand site show only
  that brand's two models in the season-module halves (`HeaterTypes.astro`), one per half.
  Owner feedback: models of one type use the same "Label: value" rows in the same order and words (only
  values differ, labels bold via ProductCard `labels`), and each card is chipped "Przykładowy model". Features and packshots come from webasto.com and
  eberspaecher.com (product pages, datasheets, press releases, Media service).

### Owner corrections, 2026-10-14

- **Ogrzewanie postojowe:** the PageHero photo is `2009-autoryzacja.webp` (the same as 2009 in the history), not the workshop photo.
- **Airtronic S3 D2L:** automatic altitude correction up to 3000 m n.p.m. (owner; the datasheet table says 4000 m). Its controls list the EasyStart Remote or Remote+ remote; no "R+ TP7" (owner, 2026-10-16).
- **Eberspächer controllers** (main site and brand site): EasyStart Pro no longer lists "Sterowanie maksymalnie dwoma urządzeniami grzewczymi". EasyStart Select and Timer show "Odczyt błędów urządzenia" instead of the feedback function; Remote+ lists it too; Remote keeps "Funkcja informacji zwrotnej". EasyStart Web: "Aplikacja dostępna w Google Play i App Store" replaces "Bezpłatna aplikacja na smartfony" (it needs a subscription).
- **Mobile call bar:** it slides away while the homepage hero buttons or the brand-site hero's "Zadzwoń"
  button (`data-callbar-hide`) are on screen, so the first screen stays clean and doesn't show two blue
  call buttons (owner, 2026-10-14). Near the
  contact card and the CTABanner it stays, by the owner's choice. Its shadow is the new `--shadow-callbar` token: a white
  ring plus a navy drop shadow, so it stays distinct over brand-blue cards (it used `--shadow-brand` and
  blended in). The mobile header has no phone button; the call bar covers it.

### Disinfection overview, 2026-10-14

- **/dezynfekcja/** (new, also the Google Ads landing page for "Odgrzybianie i dezynfekcja"): methods in the
  owner's order, TUNAP (recommended, the one brand card) › ultradźwiękowa › BG, then the /cennik disinfection
  rows. Copy is recombined from /tunap/, /dezynfekcja-bg/, /klimatyzacja/, /konserwacja/ and /cennik/.
- **Ozonowanie** is offered only as an add-on to a regular disinfection and is not promoted (owner): one
  `kk-fineprint` line under the method cards, nothing else (no card, heading, price, image, hero, CTA or meta text).
- **Ultrasound does not remove fungus** (owner): the device only turns the disinfecting liquid into a mist. Never
  write "odgrzybimy … ultradźwiękami"; "metodą ultradźwiękową" is only the method's name and is fine
  ("Odgrzybimy klimatyzację metodą TUNAP lub ultradźwiękową", the /dezynfekcja/ hero lead and the May tip in
  `Seasons.astro`).
- Linked from the header match list, the footer, the /klimatyzacja/ ultrasonic card and the /cennik "Dezynfekcja"
  group (`PriceGroup` `link` prop). /tunap/ and /dezynfekcja-bg/ breadcrumbs go through it.
  `szron.css` is unchanged.

### Cookies and measurement, 2026-10-14

- Production builds of the main site and both brand sites load Google Tag Manager (`GTM-WCWVTWN`: Google Ads
  conversions, GA4) behind Consent Mode v2 (`ConsentHead.astro`, in BaseLayout and MicroLayout).
  `CookieConsent.astro` is a frost-form card, bottom left; on phones it is full width above the call bar. "Odrzuć" is the neutral `kk-btn--frost` button and "Akceptuj" the primary one (owner, 2026-10-14); both have the same size and sit side by side, so rejecting is as easy as accepting (EU requirement).
  "Ustawienia cookies" in every footer and on /rodo/ (new "Pliki cookies i narzędzia Google" section) reopens it;
  on the brand sites the banner's policy link goes to the main site's /rodo/#cookies.
  `szron.css` is unchanged; the styles are scoped in the component.

### Content corrections, 2026-10-15

- Street name is hyphenated everywhere: "ul. Grota-Roweckiego 129" (TERYT spelling). The design files still say
  "Grota Roweckiego"; don't copy that back.
- TUNAP: the lance works with workshop compressed air, so no "pod wysokim ciśnieniem".
- R12 itself is banned: the site names R134a, R1234yf, R744 and "zamiennik R12", and /klimatyzacja/ mentions
  the R12 → R134a retrofit. R744 service has no UV dye.
- "Jak pracujemy": booking by phone or e-mail, cars are also taken without an appointment.
- /gwarancja/: the 24 months cover every service and part, not only AC repairs (owner, 2026-10-15):
  "24 miesiące gwarancji na wykonane usługi"; title and meta description say the same.
- /konserwacja/: oil circulates with the refrigerant (it isn't part of it); the yearly loss is permeation
  through rubber and seals, not "parowanie".
- /rodo/ rewritten as a full art. 13 clause (owner, 2026-10-15): purposes with legal bases (b, c, f, a),
  recipients (OVH, accounting/IT, Google), transfer outside the EEA (DPF), retention, objection and consent
  withdrawal rights, no automated decisions. GTM stays in advanced Consent Mode (loads before consent,
  cookieless pings, `url_passthrough`); the cookies section describes that and the Google Maps embed.
  If ConsentHead changes, update that section.
