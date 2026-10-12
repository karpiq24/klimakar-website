# YearTimeline

A frost-framed 4:3 photo that crossfades between eras, controlled by three year buttons. The active year is filled `brand` with a 4.5s progress bar, and the timeline advances on its own.

## The consumer provides
- 3 rows of {year, label, photo, alt}. Current rows: 1989 "Początki w chłodnictwie" (tata.webp, object-position 0% 30% so the standing man shows), 1999 "Start Klima-Kar" (1999.webp), 2008 "Autoryzacja Webasto" (war.jpg).
- A script that cycles every 4500ms. Clicking a year selects it and restarts the timer. Keep `aria-pressed` in sync.

## Rules
- 1989 is the start of the family's experience. The business, Klima-Kar, started in 1999.
- Under `prefers-reduced-motion` the bar is shown full and the photos don't zoom. Keep auto-advance off there.
- On /o-firmie this can grow to the full timeline. Keep the same button style and add rows in the same 3-column grid.
