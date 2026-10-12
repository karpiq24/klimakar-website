# Header

Floating frosted pill: logo, six nav links and the "Umów wizytę" CTA. Below 760px it becomes a phone button and a burger that opens a frosted menu.

## Markup
```html
<header class="kk-header kk-frost">
  <a href="/" class="kk-header-logo"><img src="logo-color.svg" alt="Klima-Kar"></a>
  <nav class="kk-nav"><a href="/" aria-current="page">Strona główna</a>…</nav>
  <a href="/kontakt" class="kk-btn kk-btn--primary kk-btn--sm">Umów wizytę</a>
  <div class="kk-burger">
    <a href="tel:+48713371450" class="kk-round">…phone icon…</a>
    <button class="kk-round kk-blue" aria-expanded="false">…burger…</button>
  </div>
</header>
<nav class="kk-mnav kk-frost" hidden>…same links… <a class="kk-btn kk-btn--primary">Umów wizytę</a></nav>
```

## The consumer provides
- `aria-current="page"` on the active link. It renders as a white pill in `brand`.
- A small script toggling `hidden` on `.kk-mnav` and `aria-expanded` on the burger.

## Nav items (fixed)
Strona główna · Klimatyzacja · Ogrzewanie · O firmie · Cennik · Kontakt.
