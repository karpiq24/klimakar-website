# ContentSection

Long text on one frost panel: the eyebrow and h2 stick on the left, paragraphs (max 64ch) sit on the right, and one key rule can be highlighted in a brand-tinted callout.

## Markup
```html
<section class="kk-wrap"><div class="kk-frost kk-article">
  <div class="kk-article-side"><p class="kk-eyebrow">Ogrzewanie postojowe</p><h2 class="kk-h2">Jak działa ogrzewanie wodne?</h2></div>
  <div><p>…</p><p>…</p>
    <div class="kk-callout"><span class="kk-check">…icon…</span><span>Warto pamiętać o zasadzie „czas ogrzewania = czas jazdy”…</span></div></div>
</div></section>
```

## The consumer provides
- The section's existing heading and paragraphs, unchanged. Lists inside use `kk-checklist`.
- Optionally one callout per section, for a sentence the page already contains (a rule, a footnote, a condition).

## Rules
- Use it for every long-form block: how heating works, costs, konserwacja articles, TUNAP, gwarancja terms, RODO, "Jak do nas dojechać?".
- Stack several ContentSections with `section-y` spacing. Don't merge unrelated headings into one panel.
- On mobile the heading stops sticking and sits above the text.
