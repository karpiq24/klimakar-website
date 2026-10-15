// Link-preview images (Open Graph, 1200×630) for the main site and the two brand sites.
// Renders a small Szron HTML card per site in headless Chrome, then saves it as JPEG with sharp.
// Run from the repo root after changing a card: `npm run og` (needs network for Google Fonts).
// Chrome: set CHROME=/path/to/chrome, otherwise the Playwright headless shell or google-chrome is used.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const file = (p) => pathToFileURL(join(root, p)).href;

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const pw = join(homedir(), '.cache/ms-playwright');
  if (existsSync(pw)) {
    for (const dir of readdirSync(pw).filter((d) => d.startsWith('chromium_headless_shell')).sort().reverse()) {
      for (const sub of readdirSync(join(pw, dir))) {
        const bin = join(pw, dir, sub, 'chrome-headless-shell');
        if (existsSync(bin)) return bin;
      }
    }
  }
  return 'google-chrome';
}

// Facebook shows link images at 1.91:1 in posts, but crops them to a centred square elsewhere (comments,
// some feed layouts). So every card keeps its text, logo and badge inside the centred 630×630 square
// (SAFE, with margin), and only decorative photos sit in the side bands that a square crop cuts off.
// Facebook caches images by URL: after changing the main card, give it a new file name (-v3, …) and update
// the default in src/layouts/BaseLayout.astro. The brand cards get a new hashed URL from Astro by themselves.
const W = 1200;
const H = 630;
const SAFE = 560; // width of the text column, centred; fits a 1:1 crop (630px) with 35px to spare per side

const flake = `<img src="${file('public/images/brand/flake-blue.svg')}" alt="">`;
const side = (where, src, position = '50% 50%') => `
  <figure aria-hidden="true" class="kk-frost kk-frame og-side og-side--${where}">
    <div class="kk-frame-photo og-photo"><img src="${file(src)}" alt="" style="object-position:${position}"></div>
  </figure>`;

const cards = [
  {
    out: 'public/images/og/klima-kar-v2.jpg',
    text: `
      <img class="og-logo" src="${file('public/images/brand/logo-color.svg')}" alt="">
      <h1 class="kk-h1 kk-grad og-h1">Klimatyzacja<br>i ogrzewanie<br>Twojego auta</h1>
      <p class="og-tagline">Komfortowy klimat w zasięgu ręki</p>
      <span class="kk-badge kk-frost og-badge">${flake}Działamy od 1999 roku · Wrocław</span>`,
    sides: [side('left', 'public/images/lato-1.webp', '30% 50%'), side('right', 'public/images/webastoauto.jpg', '36% 50%')],
  },
  ...[
    {
      key: 'webasto', name: 'Webasto', logo: 'webasto.svg', cls: 'kk-lw',
      left: ['public/images/webastoauto.jpg', '36% 50%'], right: ['sites/webasto/assets/flagi.jpg', '62% 50%'],
    },
    {
      key: 'eberspaecher', name: 'Eberspächer', logo: 'eberspacher.svg', cls: 'kk-le',
      left: ['public/images/eberspacher-zima.jpg', '22% 50%'], right: ['sites/eberspaecher/assets/easyscan.jpg', '44% 50%'],
    },
  ].map((b) => ({
    out: `sites/${b.key}/assets/og.jpg`,
    text: `
      <span class="og-plate-logo"><img src="${file(`public/images/brand/${b.logo}`)}" alt="" class="${b.cls}"></span>
      <h1 class="kk-h1 kk-grad og-h1 og-h1--brand${b.name.length > 8 ? ' og-h1--long' : ''}">${b.name}<br>Wrocław</h1>
      <p class="og-tagline og-tagline--brand">Autoryzowany Serwis ${b.name}</p>
      <p class="og-lead">Naprawy gwarancyjne i pogwarancyjne, montaż.</p>
      <span class="kk-badge kk-frost og-badge">${flake}Klima-Kar · Działamy od 1999 roku</span>`,
    sides: [side('left', ...b.left), side('right', ...b.right)],
  })),
];

const page = (card) => `<!DOCTYPE html>
<html lang="pl"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&family=Onest:wght@400;500;600;700&display=block">
<link rel="stylesheet" href="${file('src/styles/global.css')}">
<link rel="stylesheet" href="${file('src/styles/szron.css')}">
<style>
  html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; }
  .og { box-sizing: border-box; width: ${W}px; height: ${H}px; display: flex; align-items: center; justify-content: center; }
  .og-text { position: relative; width: ${SAFE}px; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .og-logo { height: 54px; margin-bottom: 30px; }
  .og-h1 { font-size: 54px; }
  .og-h1--brand { font-size: 72px; }
  .og-h1--brand.og-h1--long { font-size: 60px; }
  .og-tagline { margin: 22px 0 0; font-family: var(--font-display); font-weight: 600; font-size: 22px; line-height: 1.2; letter-spacing: -.025em; color: var(--brand); }
  .og-tagline--brand { margin-top: 20px; }
  .og-lead { margin: 10px 0 0; font-size: 19px; color: var(--text-muted); }
  .og-badge { margin-top: 30px; font-size: 16px; padding: 8px 20px 8px 10px; }
  .og-badge img { width: 24px; height: 24px; }
  .og-plate-logo { display: flex; align-items: center; justify-content: center; min-width: 200px; height: 84px; padding: 0 26px; margin-bottom: 28px; border-radius: var(--radius-icon); background: var(--white); box-shadow: var(--shadow-frost); }
  .og-plate-logo .kk-lw { height: 36px; }
  .og-plate-logo .kk-le { height: 54px; }
  /* Decorative side photos: they end at x=270 / start at x=930, outside the centred 630px square (285–915). */
  .og-side { position: absolute; top: 60px; width: 330px; height: ${H - 120}px; margin: 0; }
  .og-side--left { left: -60px; }
  .og-side--right { right: -60px; }
  .og-photo { aspect-ratio: auto; height: 100%; }
  .og-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style></head>
<body><div class="kk-root kk-dots og">
  <div aria-hidden="true" class="kk-glow" style="left:240px;top:-260px;width:720px;height:560px;background:var(--brand-ice);opacity:.3;filter:blur(var(--blur-glow))"></div>
  <div aria-hidden="true" class="kk-glow" style="left:300px;top:380px;width:600px;height:460px;background:var(--brand);opacity:.16;filter:blur(var(--blur-glow))"></div>
  ${card.sides.join('')}
  <div class="og-text">${card.text}</div>
</div></body></html>`;

const chrome = findChrome();
const tmp = mkdtempSync(join(tmpdir(), 'kk-og-'));
for (const [i, card] of cards.entries()) {
  const html = join(tmp, `card-${i}.html`);
  const png = join(tmp, `card-${i}.png`);
  writeFileSync(html, page(card));
  execFileSync(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    `--window-size=${W},${H}`, '--virtual-time-budget=8000', `--screenshot=${png}`, pathToFileURL(html).href,
  ], { stdio: 'ignore' });
  const out = join(root, card.out);
  mkdirSync(dirname(out), { recursive: true });
  await sharp(png).resize(W, H, { fit: 'cover', position: 'top' }).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  console.log(card.out);
}
