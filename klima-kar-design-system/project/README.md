# Klima-Kar Design System

## Company Context

**Klima-Kar** is a Wrocław-based automotive workshop operating since 2001, located at ul. Gen. Stefana Grota-Roweckiego 129, Wrocław, Poland. The company specialises in:

- **Air conditioning systems** — diagnostics, leak testing, recharging, sanitisation, compressor regeneration, hose repair, radiator replacement
- **Parking heater systems** — installation, repair, consulting for passenger and commercial vehicles
- **Authorised service partner** for three premium brands: **Webasto**, **Eberspächer**, and **DEFA** — covering warranty and post-warranty repairs of combustion and electric independent heating systems

The business has a single physical location and a single product surface: a **company website** (informational + service catalogue + contact).

### Source Materials

- Logo SVGs provided directly: `assets/logo_name.svg`, `assets/logo_noname.svg`, `assets/logo_round.svg`, `assets/logo_white.svg`, `assets/logo_white_noname.svg`
- No codebase or Figma link provided; design system is inferred from logos and company description

---

## Content Fundamentals

### Tone & Voice

- **Professional but accessible** — the brand speaks to everyday car owners who may not know technical jargon; explanations are clear and reassuring
- **Authoritative** — 20+ years of experience; references to authorised partner status convey expertise
- **Local and trustworthy** — Wrocław-specific, family-workshop feel without being folksy
- **No emoji** — none in the logo system; not appropriate for the automotive service context
- **Polish primary language** — copy is written in Polish (formal/neutral register, "Państwa samochód", not "Twój samochód" in formal contexts)

### Casing

- Brand name: **Klima-Kar** (hyphenated, Title Case) — never "klima-kar" or "KLIMA KAR"
- Service headings: Sentence case in Polish — "Diagnostyka układu klimatyzacji"
- All-caps used sparingly, only in logomark itself

### Copy Examples

- "Kompleksowa obsługa klimatyzacji samochodowej" (Comprehensive car A/C service)
- "Autoryzowany serwis Webasto, Eberspächer i DEFA"
- "Działamy od 2001 roku"
- "Wrocław, ul. Gen. Stefana Grota-Roweckiego 129"

---

## Visual Foundations

### Colors

| Role | Value | Notes |
|---|---|---|
| Primary Blue | `#1C5EA6` | Confirmed from logo SVG stroke; main brand color |
| Dark Navy | `#0D1B2E` | Logo car body & wordmark (st0 class) |
| Medium Blue | `#2F7DD4` | Gear & airflow accents (st1 class) |
| Accent Steel | `#7AAED4` | Smaller detail elements (st2 class) |
| Off-White | `#F4F7FB` | Page backgrounds, light surfaces |
| White | `#FFFFFF` | Reversed logo surfaces, cards |
| Text Body | `#1A2A3A` | Body copy, dark on light |
| Text Muted | `#5A7080` | Captions, secondary info |

### Typography

- **Display / Headings**: Barlow Condensed (Bold, Semi-Bold) — matches the condensed bold letterforms of the wordmark. *Google Fonts substitution — original font files not provided.*
- **Body**: Barlow (Regular 400, Medium 500) — same family, wider variant for readability
- **Mono/Technical**: Not used in this brand

### Spacing System

Base unit: `8px`. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px

### Backgrounds

- Light pages: near-white `#F4F7FB` with white card surfaces
- Dark/hero sections: `#0D1B2E` navy with primary blue accents
- No gradients in the logo; avoid heavy gradients in UI
- No hand-drawn illustrations; no background textures used

### Animations & Interactions

- Minimal animation — professional automotive service context
- Hover: slight darken on buttons, subtle shadow increase on cards
- Transitions: 150–200ms ease-out; no bounces
- Press/active: scale(0.98) + darker background

### Borders & Corners

- Cards: `border-radius: 6px` (subtle, not bubbly)
- Buttons: `border-radius: 4px`
- Pills/badges: `border-radius: 999px` (mirrors the pill shapes in the logo's airflow motif)
- Borders: `1px solid` light grey or blue tint; no heavy outlines

### Cards

- White background, `border-radius: 6px`, `box-shadow: 0 2px 8px rgba(13,27,46,0.10)`
- Hover: `box-shadow: 0 6px 20px rgba(13,27,46,0.15)`
- No colored left-border accent

### Imagery

- Photography: clean, well-lit workshop/automotive imagery; neutral to slightly cool tone
- No warm filters; no grain; no B&W
- Brand mark used on dark surfaces with white logo variant

### Iconography — see ICONOGRAPHY section below

---

## Iconography

No proprietary icon set or icon font was provided. The logo mark contains two custom visual motifs:

1. **Airflow pills** — rounded pill/capsule shapes in varying sizes, arranged around the car silhouette, representing air circulation and A/C flow. These are a core brand visual element.
2. **Gear/Snowflake hybrid** — a hexagonal gear-snowflake mark inside the circular badge, representing both heating (gear/mechanical) and cooling (snowflake).

### Icon System for UI

- **Recommended**: [Lucide Icons](https://lucide.dev/) via CDN — stroke-based, clean, professional weight matching the brand
- Usage: `stroke-width: 1.5`, color inherits from context (`currentColor`)
- No emoji icons; no PNG icons
- CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`

### Logo Variants

| File | Use Case |
|---|---|
| `assets/logo_name.svg` | Primary — full logo with wordmark, on white/light backgrounds |
| `assets/logo_noname.svg` | Icon-only mark (no wordmark), on white/light |
| `assets/logo_round.svg` | Circular badge variant |
| `assets/logo_white.svg` | Full logo on dark/navy backgrounds |
| `assets/logo_white_noname.svg` | Icon-only on dark backgrounds |

---

## File Index

```
README.md                    — This file; brand overview + design guidance
SKILL.md                     — Agent skill definition
colors_and_type.css          — CSS custom properties for colors & typography
assets/
  logo_name.svg              — Full logo (dark)
  logo_noname.svg            — Icon only (dark)
  logo_round.svg             — Round badge
  logo_white.svg             — Full logo (white, for dark bg)
  logo_white_noname.svg      — Icon only (white, for dark bg)
preview/
  colors-brand.html          — Brand color swatches
  colors-semantic.html       — Semantic color tokens
  type-scale.html            — Heading & body type specimens
  type-families.html         — Font family showcase
  spacing-tokens.html        — Spacing scale tokens
  shadows-radii.html         — Shadow & border-radius system
  logo-showcase.html         — All logo variants
  buttons.html               — Button states
  badges-pills.html          — Badges and status pills
  cards.html                 — Card components
  form-inputs.html           — Form field components
  nav.html                   — Navigation bar
ui_kits/
  website/
    README.md                — UI kit guide
    index.html               — Interactive website prototype
    Header.jsx               — Site header + nav
    Hero.jsx                 — Hero section
    ServicesGrid.jsx         — Services cards grid
    ContactSection.jsx       — Contact + map section
    Footer.jsx               — Site footer
```
