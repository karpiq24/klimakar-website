# SectionHeader

Opens every section: an uppercase eyebrow, a display h2 and an optional one-to-two-sentence description pushed to the right.

## Markup
```html
<div class="kk-shead">
  <div><p class="kk-eyebrow">Usługi</p><h2 class="kk-h2">Kompleksowy serwis klimatyzacji</h2></div>
  <p>Napełnianie, diagnostyka, naprawy…</p>
</div>
```

## The consumer provides
- Eyebrow: 1–4 words, naming the section ("Usługi", "Galeria", "O nas", "Kontakt") or listing brands ("Webasto · Eberspächer · DEFA").
- h2: sentence case, no trailing period, ≤ 6 words where possible.
- Optional description (≤ 440px), or a `kk-link` in its place ("Zobacz całą galerię →").

## Rules
- Don't repeat the h2's words in the eyebrow.
- On mobile the description wraps under the heading.
