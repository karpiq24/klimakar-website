# SeasonModule

Two linked halves, "Latem chłodzimy." and "Zimą grzejemy.", inside one frost frame, joined by a spinning-snowflake knob. The current season is tinted and carries a "Teraz" chip.

## The consumer provides
- The current season: add `is-now` to that `.kk-half` and render the `kk-chip--now` chip in it. Months 3–8 are summer (lato); 9–2 are winter (zima). Use the same table as MonthBanner.
- Links: summer → /klimatyzacja, winter → /ogrzewanie-postojowe.
- Photos: `lato-1.webp` (summer, AI-generated to match) and `webastoauto.jpg` (winter), shown at 16:7.

## Rules
- Both titles must fit on one line (`kk-sh` is `nowrap`; 6.4cqi on mobile).
- Always follow it with MonthBanner.
- On mobile the halves stack and the knob hides.
