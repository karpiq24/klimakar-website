# PageHero

Opens every subpage: breadcrumbs, eyebrow, title, lead and two buttons on the left, with a photo in a frost frame on the right. A spinning-snowflake disc and a floating frost tag sit on the photo.

## Markup
```html
<section class="kk-wrap">
  <nav class="kk-crumbs" aria-label="Okruszki"><a href="/">Strona główna</a><span aria-hidden="true">/</span><span aria-current="page">Klimatyzacja</span></nav>
  <div class="kk-pagehero">
    <div><p class="kk-eyebrow">Usługi</p><h1 class="kk-pagehero-title">Klimatyzacja samochodowa</h1><p class="kk-lead">…</p><div class="kk-actions">…</div></div>
    <div class="kk-pagehero-photo">
      <div class="kk-frost kk-frame"><div class="kk-frame-photo"><img src="…" alt="…"></div></div>
      <span class="kk-blue kk-pagehero-disc"><img src="flake-white.svg" alt="" class="kk-spin"></span>
      <span class="kk-frost kk-pagehero-tag"><b class="kk-blue">✓ icon</b>R12 · R134a · R1234yf · R744</span>
    </div>
  </div>
</section>
```

## The consumer provides
- Breadcrumb trail. The last item is `<span aria-current="page">` and renders as a brand pill.
- Eyebrow (section: "Usługi", "Ogrzewanie postojowe", "O firmie"), the page's existing title as h1 (no `<br>`), its existing description as the lead, and 1–2 buttons.
- A photo, 5:4. Take the page's own image; the winter photo works for heating pages.
- Tag text: one short fact line for the page (refrigerants, a partner name, "Autoryzowany serwis").

## Rules
- Only the homepage uses the centered Hero. Every other page uses this component.
- The h1 has no gradient.
- Pages with no photo (rodo, gwarancja) drop the right column. The text then spans the full width at max 760px.
