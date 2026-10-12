# IconTile

A 54px rounded square holding one 24px line icon. Every service card leads with one.

## Markup
```html
<span class="kk-ico"><svg width="24" height="24" stroke="currentColor" stroke-width="1.8" …></svg></span>
```

## The consumer provides
- One Lucide-style line icon (stroke 1.8, round caps, `currentColor`). The Astro repo already ships `lucide-astro`.

## Rules
- Inside a `kk-card`, hovering the card fills the tile with `brand` and turns the icon white.
- On the brand card use `kk-ico--on-brand`; on the spotlight card use `kk-ico--on-navy`.
- In the seasons module the tile becomes a 60px white circle (handled by `.kk-half .kk-ico`).
