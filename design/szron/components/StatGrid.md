# StatGrid

Centered eyebrow, h2 and text, followed by a wide frost bar of four facts. Each fact is a large gradient number with a label, divided by hairlines.

## Markup
```html
<section class="kk-wrap kk-stats">
  <p class="kk-eyebrow">O firmie</p><h2 class="kk-h2">Dlaczego Klima-Kar?</h2><p>…</p>
  <div class="kk-frost kk-stats-bar">
    <div><span class="kk-stat-n kk-grad">1989</span><span class="kk-stat-l">początki w chłodnictwie</span></div> …
  </div>
  <div style="margin-top:28px"><a class="kk-btn kk-btn--primary">Skontaktuj się z nami</a></div>
</section>
```

## The consumer provides
- Exactly four facts: 1989 "początki w chłodnictwie", 2 "autoryzacje partnerskie", Wrocław "siedziba od 1999", Rodzinna "firma dwupokoleniowa".

## Rules
- Never label 1989 as the founding year.
- No invented numbers. Every fact must already appear elsewhere on the site.
- On mobile the bar becomes 2×2.
