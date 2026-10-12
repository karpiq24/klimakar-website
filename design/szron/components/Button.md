# Button

Pill-shaped call to action in two fills: solid `brand` (primary) and frosted glass (secondary).

## Markup
```html
<a href="/kontakt" class="kk-btn kk-btn--primary kk-btn--lg">Umów wizytę</a>
<a href="/cennik" class="kk-btn kk-btn--frost kk-btn--lg">Zobacz cennik</a>
<a href="/galeria" class="kk-link">Zobacz całą galerię →</a>
```

## The consumer provides
- The element: `<a>` for navigation, `<button type="submit">` in forms (the class resets border and font).
- A label in Polish imperative ("Umów wizytę", "Zobacz cennik", "Wyślij zapytanie"). Arrows (`→`) only on "see more" CTAs that leave the section.

## Sizes
- `kk-btn--lg` (17px × 30px padding): hero and form submit.
- default (14px × 24px): section CTAs, About.
- `kk-btn--sm` (13px × 22px, 15px text): the header CTA.

## Rules
- One primary per group; pair it with at most one frost button.
- Hover lifts 2px; never change the colour on hover.
- `kk-link` is the text-only variant for "see all" links next to section headings.
