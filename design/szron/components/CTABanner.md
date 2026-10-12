# CTABanner

A low frosted strip on a blue backlight that closes a subpage: a spinning snowflake disc, a question with the phone numbers under it, a phone button and a primary CTA.

## Markup
```html
<section class="kk-wrap kk-cta-wrap">
  <div aria-hidden="true" class="kk-glow" style="left:10%;top:-40px;width:520px;height:200px;background:var(--brand);opacity:.35;filter:blur(70px)"></div>
  <div aria-hidden="true" class="kk-glow" style="right:6%;top:0;width:420px;height:180px;background:var(--brand-ice);opacity:.35;filter:blur(70px)"></div>
  <div class="kk-frost kk-cta">
    <span class="kk-blue kk-cta-icon"><img src="flake-white.svg" alt="" class="kk-spin-fast"></span>
    <div class="kk-cta-text"><div class="kk-cta-title">Zapytaj o montaż lub naprawę</div><div class="kk-cta-sub">tel. 71 337 14 50 · kom. 605 594 506</div></div>
    <a href="tel:+48713371450" class="kk-cta-tel">…phone icon… 71 337 14 50</a>
    <a href="/kontakt" class="kk-btn kk-btn--primary kk-btn--lg">Umów wizytę</a>
  </div>
</section>
```

## The consumer provides
- The page's existing CTA title and subtitle (e.g. "Masz pytania o cennik?" / "Zadzwoń: 71 337 14 50 lub 605 594 506").
- The primary action label: "Umów wizytę" by default, or the page's own ("Skontaktuj się").

## Rules
- One per page, as the last section before the footer.
- The two glows sit behind the strip so the frost reads blue. Keep them.
- On mobile the strip becomes a rounded card and both actions go full width.
