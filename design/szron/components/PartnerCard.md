# PartnerCard

A denser frost card (`frost-card`) for each heater brand: logo, category line, description and three tags. It lives in the heating PhotoPanel under the h2 "Ogrzewanie postojowe".

## Markup
```html
<a href="/webasto" class="kk-frost kk-card kk-partner">
  <span class="kk-partner-logo"><img src="webasto.svg" alt="Webasto" class="kk-lw"></span>
  <span class="kk-partner-kind">Niezależne ogrzewanie spalinowe</span>
  <p>…</p>
  <span class="kk-chips"><span class="kk-chip kk-chip--tag">Montaż</span>…</span>
</a>
```

## Rules
- The logo slot is a fixed 52px, with balanced logo heights (30 / 46 / 50px), so the category lines align across the row.
- Name the category "Ogrzewanie postojowe", never "Ogrzewacze postojowe".
- On mobile the cards stack vertically. No horizontal scrolling.
