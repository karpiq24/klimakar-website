# HistoryTimeline

The full company history: a vertical gradient axis down the middle, a brand year disc on the axis for each entry, and frost cards alternating left and right with the era photo where one exists.

## Markup
```html
<div class="kk-history">
  <div class="kk-history-item">
    <span class="kk-history-year kk-blue">1989</span>
    <div class="kk-frost kk-history-card"><img src="tata.webp" alt="…" style="object-position:0% 30%">
      <div class="kk-history-body"><h3>Początek wolnej Polski i początki w chłodnictwie</h3><p>…</p></div></div>
  </div> …
</div>
```

## The consumer provides
- Entries in order: 1989, 1993, 1999, 2008, Dziś. Titles and descriptions come from `o-firmie.astro`, with the 1989 title fixed.
- Photos where available (1989 tata.webp, 1999 1999.webp, Dziś dron). Cards without a photo stay text-only.

## Rules
- On desktop odd entries sit left and even entries right. On mobile the axis moves to the left edge and all cards stack on the right.
- The homepage keeps the compact YearTimeline. This component is for /o-firmie.
