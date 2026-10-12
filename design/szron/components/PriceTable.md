# PriceTable

Prices in two tiers. The three refrigerant services are big price cards with the car years and an outlined refrigerant code. Every other group is a frost card with dotted leaders between service and price.

## Markup
```html
<div class="kk-price-cards">
  <div class="kk-frost kk-card kk-price-card">
    <span class="kk-price-ghost" aria-hidden="true">R134a</span>
    <span class="kk-price-code">R134a</span>
    <span class="kk-chip kk-chip--tag">Auta od 1993 r. do 2014 r. …</span>
    <span class="kk-price-big">250 zł</span>
    <span class="kk-price-extra">+ 40 zł/100g powyżej 50g</span>
    <span class="kk-price-svc">Serwis układu, uzupełnienie czynnika R134a, oleju, UV</span>
  </div> …
</div>
<div class="kk-price-groups">
  <div><div class="kk-frost kk-price-group">
    <div class="kk-price-head"><span class="kk-price-title">Dezynfekcja</span><span class="kk-price-note">…optional note…</span></div>
    <div class="kk-price-row"><span class="kk-price-item">…service…</span><span class="kk-price-dots" aria-hidden="true"></span><span class="kk-price-value">150 zł<small>…extra…</small></span></div>
  </div></div>
</div>
```

## The consumer provides
- Groups from `cennik.astro`, with prices copied exactly. Never round or rephrase a price.
- Refrigerant cards: R134a, R1234yf and R12, in that order. Groups: Dezynfekcja, Diagnostyka usterek, Naprawy, Ogrzewanie postojowe, each with its note.

## Rules
- The repairs group is titled "Naprawy" (not "Naprawy i regeneracja"). Its regeneration rows stay, with their prices.
- Prices are in `brand` with tabular figures. On mobile the dots hide and the price drops under the service.
- Single-service pages (dezynfekcja-bg, tunap) use one `kk-price-group`.
