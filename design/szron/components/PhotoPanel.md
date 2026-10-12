# PhotoPanel

A 40px-radius section container with a full-bleed seasonal photo under a pale `ground` veil. Frost cards and the section header sit on top.

## Markup
```html
<div class="kk-photopanel">
  <img src="lato-1.webp" alt="" aria-hidden="true">
  <div class="kk-veil" aria-hidden="true"></div>   <!-- kk-veil--heat on the heating panel -->
  <div class="kk-shead">…</div>
  <div class="kk-svc">…cards…</div>
  <div class="kk-photopanel-cta"><a class="kk-btn kk-btn--primary">…</a></div>
</div>
```

## The consumer provides
- A decorative photo (empty `alt`): `lato-1.webp` for air conditioning, `webastoauto.jpg` for heating.

## Rules
- The summer photo is for AC sections, the winter photo for heating sections; never mix them.
- Use `kk-veil` (0.9 → 0.66) over the summer photo and `kk-veil--heat` (0.88 → 0.62) over the winter photo.
- Content inside is frost or brand surfaces only. Never put bare body text straight on the photo, apart from the section header.
