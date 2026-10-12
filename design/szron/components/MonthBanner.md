# MonthBanner

Frost strip under the seasons module showing the current month, a one-sentence seasonal tip, a 12-segment year bar and a CTA. It makes the page change through the year.

## The consumer provides
- The month table (12 rows: name, season, tip, CTA label). The canonical copy lives in `design/szron/homepage.dc.html` (`renderVals` › `M`) and in this preview's script.
- The current month index. Compute it on the client (`new Date().getMonth()`) so a static build doesn't freeze the month.
- Bar state: the current month gets `kk-seg on`, earlier months `kk-seg past`, later months plain `kk-seg`.
- Icon: snowflake (`flake-white.svg`, `kk-spin-fast`) in winter months, the sun SVG in summer months.

## Rules
- The CTA always ends with " →" and links to the matching service page.
- On mobile the CTA drops under the text, full width.
