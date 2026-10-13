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

const flake = `<img src="${file('public/images/brand/flake-blue.svg')}" alt="">`;
const photo = (src, caption, position = '50% 50%') => `
  <figure class="kk-frost kk-frame og-frame">
    <div class="kk-frame-photo og-photo"><img src="${file(src)}" alt="" style="object-position:${position}"></div>
    ${caption ? `<figcaption class="kk-frost og-cap">${caption}</figcaption>` : ''}
  </figure>`;

const cards = [
  {
    out: 'public/images/og/klima-kar.jpg',
    text: `
      <img class="og-logo" src="${file('public/images/brand/logo-color.svg')}" alt="">
      <h1 class="kk-h1 kk-grad og-h1">Klimatyzacja i ogrzewanie Twojego auta</h1>
      <p class="og-tagline">Komfortowy klimat w zasięgu ręki</p>
      <span class="kk-badge kk-frost og-badge">${flake}Działamy od 1999 roku · Wrocław</span>`,
    media: `<div class="og-stack">
      ${photo('public/images/lato-1.webp', 'Latem chłodzimy.')}
      ${photo('public/images/webastoauto.jpg', 'Zimą grzejemy.')}
    </div>`,
  },
  ...[
    { key: 'webasto', name: 'Webasto', logo: 'webasto.svg', cls: 'kk-lw', photo: 'public/images/webastoauto.jpg', position: '50% 50%' },
    { key: 'eberspaecher', name: 'Eberspächer', logo: 'eberspacher.svg', cls: 'kk-le', photo: 'public/images/eberspacher-zima.jpg', position: '50% 60%' },
  ].map((b) => ({
    out: `sites/${b.key}/assets/og.jpg`,
    text: `
      <span class="kk-badge kk-frost og-badge og-badge--top">${flake}Klima-Kar · Działamy od 1999 roku</span>
      <h1 class="kk-h1 kk-grad og-h1 og-h1--brand${b.name.length > 8 ? ' og-h1--long' : ''}">${b.name}<br>Wrocław</h1>
      <p class="og-tagline">Autoryzowany Serwis ${b.name}</p>
      <p class="og-lead">Naprawy gwarancyjne i pogwarancyjne, montaż.</p>`,
    media: `<div class="og-single">
      ${photo(b.photo, '', b.position)}
      <span class="kk-frost og-plate"><span class="og-plate-logo"><img src="${file(`public/images/brand/${b.logo}`)}" alt="" class="${b.cls}"></span></span>
    </div>`,
  })),
];

const page = (card) => `<!DOCTYPE html>
<html lang="pl"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&family=Onest:wght@400;500;600;700&display=block">
<link rel="stylesheet" href="${file('src/styles/global.css')}">
<link rel="stylesheet" href="${file('src/styles/szron.css')}">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  .og { box-sizing: border-box; width: 1200px; height: 630px; display: grid; grid-template-columns: 600px minmax(0, 1fr); align-items: center; gap: 40px; padding: 0 56px 0 64px; }
  .og-text { position: relative; display: flex; flex-direction: column; align-items: flex-start; }
  .og-logo { height: 62px; margin-bottom: 34px; }
  .og-h1 { font-size: 58px; }
  .og-h1--brand { font-size: 84px; }
  .og-h1--brand.og-h1--long { font-size: 72px; }
  .og-tagline { margin: 22px 0 0; font-family: var(--font-display); font-weight: 600; font-size: 26px; line-height: 1.2; letter-spacing: -.025em; color: var(--brand); }
  .og-lead { margin: 12px 0 0; font-size: 21px; color: var(--text-muted); }
  .og-badge { margin-top: 34px; font-size: 17px; padding: 8px 20px 8px 10px; }
  .og-badge img { width: 26px; height: 26px; }
  .og-badge--top { margin: 0 0 30px; }
  .og-media { position: relative; }
  .og-frame { position: relative; margin: 0; }
  .og-photo { aspect-ratio: auto; }
  .og-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .og-stack { display: grid; gap: 16px; }
  .og-stack .og-photo { height: 222px; }
  .og-single .og-photo { height: 470px; }
  .og-cap { position: absolute; left: 22px; bottom: 22px; margin: 0; border-radius: var(--radius-pill); padding: 8px 18px; font-family: var(--font-display); font-weight: 600; font-size: 18px; letter-spacing: -.01em; color: var(--navy); background: var(--frost-tile); }
  .og-plate { position: absolute; left: -36px; bottom: 34px; border-radius: var(--radius-card-sm); padding: 12px; background: var(--frost-tile); }
  .og-plate-logo { display: flex; align-items: center; justify-content: center; min-width: 210px; height: 92px; padding: 0 26px; border-radius: var(--radius-icon); background: var(--white); }
  .og-plate-logo .kk-lw { height: 38px; }
  .og-plate-logo .kk-le { height: 58px; }
</style></head>
<body><div class="kk-root kk-dots og">
  <div aria-hidden="true" class="kk-glow" style="right:-160px;top:-160px;width:760px;height:640px;background:var(--brand-ice);opacity:.35;filter:blur(var(--blur-glow))"></div>
  <div aria-hidden="true" class="kk-glow" style="left:-220px;top:300px;width:620px;height:520px;background:var(--brand);opacity:.18;filter:blur(var(--blur-glow))"></div>
  <div class="og-text">${card.text}</div>
  <div class="og-media">${card.media}</div>
</div></body></html>`;

const chrome = findChrome();
const tmp = mkdtempSync(join(tmpdir(), 'kk-og-'));
for (const [i, card] of cards.entries()) {
  const html = join(tmp, `card-${i}.html`);
  const png = join(tmp, `card-${i}.png`);
  writeFileSync(html, page(card));
  execFileSync(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    '--window-size=1200,630', '--virtual-time-budget=8000', `--screenshot=${png}`, pathToFileURL(html).href,
  ], { stdio: 'ignore' });
  const out = join(root, card.out);
  mkdirSync(dirname(out), { recursive: true });
  await sharp(png).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  console.log(card.out);
}
