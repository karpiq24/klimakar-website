# ContactPanel

The contact section: two blurred blue glows behind one large frost panel holding info tiles, a map and the enquiry form. The glows give the frost a blue backlight, which improves contrast.

## Parts
- `kk-glow kk-glow--brand kk-drift` + `kk-glow kk-glow--ice kk-drift2`: placed before the panel, inside a `position:relative` section.
- `kk-contact` (frost, 40px radius): two flexible columns, 420px minimum each.
- `kk-info` tiles (`frost-tile`, 0.88) in a 2×2 grid; `kk-map` with an "Otwórz w Mapach ↗" pill.
- `kk-form` (`frost-form`, 0.92, `shadow-form`) with `kk-field` labels and `kk-input` controls.

## The consumer provides
- Contact data (address, two phones, e-mail, hours). Keep it identical everywhere; the footer repeats it.
- The form's `action`. The repo posts to `public/contact.php`; keep field names compatible with `ContactForm.astro`.

## Rules
- Never put the form directly on `frost` (0.58). Over the glows it needs the 0.92 surface.
- Use the same panel on /kontakt, with the h2 as the page h1.
