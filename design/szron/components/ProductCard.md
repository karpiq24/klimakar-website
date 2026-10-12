# ProductCard

A grid of product cards: a white photo field, the product type as a tag, the name, and the full feature checklist. Used for heater controllers and DEFA modules.

## Markup
```html
<div class="kk-products">
  <a href="#" class="kk-frost kk-card kk-product">
    <span class="kk-product-shot"><img src="MC.jpg" alt="MultiControl"></span>
    <span class="kk-product-body">
      <span class="kk-chip kk-chip--tag">Programator z wyświetlaczem</span>
      <span class="kk-product-name">MultiControl</span>
      <ul class="kk-product-feats"><li><span class="kk-check">✓</span>Menu w języku polskim</li>…</ul>
    </span>
  </a> …
</div>
```

## The consumer provides
- For each product: name, type, image and features, from the page's data arrays (`webasto.astro` / `eberspacher.astro` controllers, `defa.astro` modules). For DEFA the "features" are the module description, rendered as one paragraph in place of the list.
- Product photos sit on white with `object-fit: contain`. They are packshots, not scenes.

## Rules
- 3 columns on desktop. On mobile the cards become a horizontal swipe row (82% width each).
- Keep every feature line. Don't trim the list to make the cards equal height.
