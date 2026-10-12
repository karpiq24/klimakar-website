# ServiceCard

A linked card for one service, in four variants that share a 3-column grid (`kk-svc`).

## Variants
| Variant | Classes | Use |
|---|---|---|
| Standard | `kk-frost kk-card kk-svc-card` | Most services |
| Brand | `kk-card kk-blue kk-svc-card kk-svc-card--brand` | One "available now" offer per grid (Filtry kabinowe). It carries the white mark `kk-svc-mark`, static and tilted −12°, never spinning |
| Spotlight | `kk-card kk-svc-card kk-svc-card--spotlight kk-svc-wide` | The differentiator (R744 / EV), two columns wide, navy gradient, outlined "CO₂", fact tags |
| Image | `kk-frost kk-card kk-svc-card kk-svc-card--image` | A service with a real workshop photo (Skuteczne naprawy) |

## Homepage layout
Row 1: Brand · Standard · Standard. Row 2: Spotlight (span 2) · Image. On mobile everything stacks in one column, in that order.

## The consumer provides
- Icon (IconTile), title (`kk-card-title`, ≤ 5 words), 1–3 sentences of copy in `kk-svc-text`, and the link target.

## Rules
- At most one brand card and one spotlight card per grid.
- The spotlight copy stays in the card's lower-left. Its top-right corner (`brand-sky`) is too light for `on-navy-muted` text.
- Repairs: lead with replacing the part with a new one. Regeneration is the fallback, never the headline.
