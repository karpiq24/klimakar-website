# Hero

Centered opener: Badge, a gradient display headline, a lead sentence and two buttons. There is no photo, because the page's ambient blue glows carry the colour.

## Markup
```html
<section class="kk-wrap kk-hero">
  <span class="kk-badge kk-frost">…</span>
  <h1 class="kk-h1 kk-grad">Klimatyzacja i ogrzewanie Twojego auta</h1>
  <p class="kk-lead">…</p>
  <div class="kk-actions"><a class="kk-btn kk-btn--primary kk-btn--lg">Umów wizytę</a><a class="kk-btn kk-btn--frost kk-btn--lg">Zobacz cennik</a></div>
</section>
```

## Rules
- Homepage only. Subpages use PageHero (see the migration notes): eyebrow + `kk-h1` without the gradient, a lead, and an optional photo in a frost frame.
- The headline is ≤ 6 words. `kk-grad` paints `navy`→`brand` top to bottom.
- Two ambient glows sit behind the page top: `brand-ice` at 0.35 (top right) and `brand` at 0.18 (left), both `kk-drift`.
