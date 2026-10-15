// Writes Google Ads bulk-upload CSVs (Narzędzia › Działania zbiorcze › Przesłane pliki) from
// ads/campaigns.yaml into ads/upload/. Upload them in file-name order. Everything is created as
// "Add" with paused campaigns; for later edits in existing campaigns, change the rows in Ads instead.
// Usage: npm run ads:csv [-- --season oct_mar|apr_sep]   (default: by today's month)
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { parse } from 'yaml';

const ads = parse(readFileSync('ads/campaigns.yaml', 'utf8'));
const OUT = 'ads/upload';

const seasonArg = process.argv.indexOf('--season');
const month = new Date().getMonth() + 1;
const season = seasonArg > 0 ? process.argv[seasonArg + 1] : month >= 4 && month <= 9 ? 'apr_sep' : 'oct_mar';
if (!['oct_mar', 'apr_sep'].includes(season)) throw new Error(`unknown season "${season}"`);

// Ads location targets use the English geo names.
function location(text) {
  const radius = /^Wrocław \+ (\d+) km$/.exec(text);
  if (radius) return `${radius[1]} | km | Wroclaw, Lower Silesian Voivodeship, Poland`;
  if (text === 'cała Polska') return 'Poland';
  throw new Error(`no Ads location for "${text}"`);
}

const MATCH = { phrase: 'Phrase match', exact: 'Exact match', broad: 'Broad match' };
const headlineText = (h) => (typeof h === 'string' ? h : h.text);

const files = {
  '1-kampanie.csv': [['Row Type', 'Action', 'Campaign status', 'Campaign', 'Campaign type', 'Networks', 'Budget',
    'Budget type', 'Bid strategy type', 'Language', 'Location', 'EU political ads']],
  '2-grupy-reklam.csv': [['Row Type', 'Action', 'Ad group status', 'Campaign', 'Ad group', 'Ad group type']],
  '3-slowa-kluczowe.csv': [['Row Type', 'Action', 'Keyword status', 'Campaign', 'Ad group', 'Keyword', 'Type']],
  '4-wykluczenia.csv': [['Row Type', 'Action', 'Keyword status', 'Level', 'Campaign', 'Ad group', 'Negative keyword', 'Type']],
  '5-reklamy.csv': [['Row Type', 'Action', 'Ad status', 'Campaign', 'Ad group', 'Ad type',
    ...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`),
    ...Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`),
    ...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1} position`),
    'Final URL']],
};

function negatives(campaign, lists) {
  for (const list of lists) {
    for (const [match, words] of Object.entries(list ?? {})) {
      if (!MATCH[match]) throw new Error(`${campaign}: unknown match type "${match}"`);
      for (const w of words) files['4-wykluczenia.csv'].push(['Negative keyword', 'Add', 'Enabled', 'Campaign', campaign, '', w, MATCH[match]]);
    }
  }
}

const shared = ads.shared?.headlines ?? [];
for (const c of ads.campaigns) {
  files['1-kampanie.csv'].push(['Campaign', 'Add', 'Paused', c.name, 'Search', 'Google search',
    c.budget[season].toFixed(2), 'Daily', 'Maximize clicks', 'pl', location(c.location), 'No']);
  const brand = c.name === 'Marka';
  negatives(c.name, [c.negatives, ads.negatives_account, brand ? null : ads.negatives_non_brand]);

  for (const g of c.ad_groups) {
    files['2-grupy-reklam.csv'].push(['Ad group', 'Add', 'Enabled', c.name, g.name, 'Standard']);
    for (const match of ['phrase', 'exact']) {
      for (const k of g.keywords) files['3-slowa-kluczowe.csv'].push(['Keyword', 'Add', 'Enabled', c.name, g.name, k, MATCH[match]]);
    }
    const heads = [...g.headlines, ...shared];
    if (heads.length > 15) throw new Error(`${c.name} › ${g.name}: ${heads.length} headlines`);
    const pad = (list, n) => [...list, ...Array(n - list.length).fill('')];
    files['5-reklamy.csv'].push(['Ad', 'Add', 'Enabled', c.name, g.name, 'Responsive search ad',
      ...pad(heads.map(headlineText), 15),
      ...pad(g.descriptions, 4),
      ...pad(heads.map((h) => (typeof h === 'string' ? '' : String(h.pin ?? ''))), 15),
      ads.domain + g.final_url]);
  }
}

// The same rows in one file (Ads reads each row by its Row Type), for a single upload.
const columns = [...new Set(Object.values(files).flatMap((rows) => rows[0]))];
files['0-wszystko.csv'] = [columns, ...Object.values(files).flatMap(([head, ...rows]) =>
  rows.map((r) => columns.map((col) => (head.includes(col) ? r[head.indexOf(col)] : ''))))];

const cell = (v) => (/[",\n;]/.test(v) ? `"${v.replaceAll('"', '""')}"` : v);
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const [name, rows] of Object.entries(files)) {
  writeFileSync(`${OUT}/${name}`, rows.map((r) => r.map((v) => cell(String(v))).join(',')).join('\r\n') + '\r\n');
  console.log(`${OUT}/${name}: ${rows.length - 1} rows`);
}
console.log(`Budgets: ${season}. Not in the CSVs (set in Ads by hand): bid limit, location option "presence",`
  + ' sitelinks, callouts, snippets, call asset, images.');
