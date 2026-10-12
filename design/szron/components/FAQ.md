# FAQ

Questions in one frost panel as native `<details>` accordions. The first is open, and the plus icon turns into a brand-filled × when open. It needs no JavaScript.

## Markup
```html
<div class="kk-frost kk-faq">
  <details open><summary>Okres gwarancji<span class="kk-round">…plus icon…</span></summary><p>…</p></details>
  <details><summary>Czy gwarancja obejmuje inne podzespoły niż naprawiane?<span class="kk-round">…</span></summary><p>…</p></details>
</div>
```

## The consumer provides
- Question/answer pairs verbatim. On gwarancja these are the four h4 sections of "Szczegóły gwarancji".

## Rules
- Open the first item only.
- Answers are plain paragraphs. Several paragraphs are fine inside one `<details>`.
