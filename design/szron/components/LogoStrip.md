# LogoStrip

The three partner logos in one centered row. Each logo has its own height so the three look the same size.

## Markup
```html
<div class="kk-logos">
  <img src="webasto.svg" alt="Webasto" class="kk-lw">
  <img src="eberspacher.svg" alt="Eberspächer" class="kk-le">
  <img src="defa.svg" alt="DEFA" class="kk-ld">
</div>
```

## Sizes (keep the 24 : 37 : 40 ratio)
| Context | Webasto `kk-lw` | Eberspächer `kk-le` | DEFA `kk-ld` |
|---|---|---|---|
| Strip, desktop | 42px | 65px | 70px |
| Strip, mobile | 6.2cqi | 9.5cqi | 10.3cqi (one row, no wrap) |
| PartnerCard | 30px | 46px | 50px |
| Footer | 15px | 19px | 19px |

## Rules
- Never set all three to the same height: Webasto is a wide wordmark, DEFA a compact block, and only the bottom half of Eberspächer is text.
- Always in this order: Webasto, Eberspächer, DEFA.
