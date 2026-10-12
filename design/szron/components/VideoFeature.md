# VideoFeature

Text and video side by side: eyebrow, h2, the gallery's invitation and a primary button on the left, and a poster image in a frost frame with a brand play disc on the right. It links to the YouTube film.

## Markup
```html
<section class="kk-wrap"><div class="kk-video">
  <div><p class="kk-eyebrow">Galeria</p><h2 class="kk-h2">Nasz serwis w obiektywie</h2><p>Chcesz zobaczyć nasz serwis na żywo? …</p><a class="kk-btn kk-btn--primary">Umów wizytę</a></div>
  <div class="kk-frost kk-video-frame"><a href="https://www.youtube.com/watch?v=yUBazwim6so" class="kk-video-poster" aria-label="Odtwórz: Klima-Kar — film z warsztatu"><img src="dron-1-1536x960.webp" alt=""><span class="kk-video-play kk-blue">▶</span></a></div>
</div></section>
```

## The consumer provides
- The video URL and a poster photo.

## Rules
- In the Astro site, a click on the poster may swap in the YouTube iframe (`youtube-nocookie.com`, `autoplay=1`). Until then show only the poster, so no YouTube scripts load before the click.
- On mobile the text sits above the video.
