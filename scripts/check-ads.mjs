// Validates ads/campaigns.yaml and lists ad groups whose site pages changed since the last sync
// with Google Ads. Usage: npm run check:ads [-- --since <git rev>]
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { parse } from 'yaml';

const FILE = 'ads/campaigns.yaml';
const ads = parse(readFileSync(FILE, 'utf8'));
const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

// Google Ads limits.
const LIMITS = { headline: 30, description: 90, sitelink: 25, sitelinkLine: 35, callout: 25, snippet: 25, keyword: 80 };

// Site copy rules (CLAUDE.md, design/szron/README.md) that apply to ad text too.
const BANNED = [
  [/!/, 'no exclamation marks'],
  [/1989/, 'Klima-Kar started in 1999'],
  [/\d\s*zł|\bzł\b/, 'no prices in ads (they live on /cennik/)'],
  [/\bogrzewacz/i, '"Ogrzewanie postojowe", never "ogrzewacze"'],
  [/Grota Roweckiego/, 'street is "Grota-Roweckiego"'],
  [/wysokim ciśnieniem/, 'TUNAP lance: no "pod wysokim ciśnieniem"'],
  [/(?<!zamiennik )\bR12\b/, 'R12 only as "zamiennik R12"'],
  [/ultradźwiękami/, 'ultrasound only makes a mist: "metodą ultradźwiękową", not "ultradźwiękami"'],
  [/ozon/i, 'ads never mention ozonowanie (keywords may)'],
  [/bezawaryjn|nielicznych|w ciągu 1 dnia/i, 'no absolute promises or unprovable comparisons'],
];

function checkText(where, text, limit) {
  if (typeof text !== 'string' || !text.trim()) return err(where, 'empty text');
  if ([...text].length > limit) err(where, `"${text}" is ${[...text].length} chars (max ${limit})`);
  for (const [re, why] of BANNED) if (re.test(text)) err(where, `"${text}": ${why}`);
}

function pageFile(url) {
  if (typeof url !== 'string' || !url.startsWith('/') || !url.endsWith('/')) return null;
  const name = url === '/' ? 'index' : url.slice(1, -1);
  return `src/pages/${name}.astro`;
}

function checkUrl(where, url) {
  const file = pageFile(url);
  if (!file) err(where, `URL "${url}" must be a site path with a trailing slash, e.g. /cennik/`);
  else if (!existsSync(file)) err(where, `URL "${url}" has no page (${file})`);
}

function checkSources(where, sources = []) {
  for (const s of sources) if (!existsSync(s)) err(where, `source ${s} does not exist`);
}

const headlineText = (h) => (typeof h === 'string' ? h : h?.text);
const shared = ads.shared?.headlines ?? [];
shared.forEach((h, i) => checkText(`shared.headlines[${i}]`, headlineText(h), LIMITS.headline));
checkSources('shared', ads.shared?.sources);

const campaignNames = new Set();
for (const c of ads.campaigns ?? []) {
  campaignNames.add(c.name);
  for (const g of c.ad_groups ?? []) {
    const where = `${c.name} › ${g.name}`;
    checkUrl(where, g.final_url);
    checkSources(where, g.sources);
    const heads = [...shared, ...(g.headlines ?? [])].map(headlineText);
    if (heads.length < 3 || heads.length > 15) err(where, `${heads.length} headlines with shared ones (3–15)`);
    (g.headlines ?? []).forEach((h) => checkText(where, headlineText(h), LIMITS.headline));
    const descs = g.descriptions ?? [];
    if (descs.length < 2 || descs.length > 4) err(where, `${descs.length} descriptions (2–4)`);
    descs.forEach((d) => checkText(where, d, LIMITS.description));
    for (const list of [heads, descs]) {
      const seen = new Set();
      for (const t of list) {
        const key = t?.toLowerCase();
        if (seen.has(key)) err(where, `duplicate "${t}"`);
        seen.add(key);
      }
    }
    for (const k of g.keywords ?? []) {
      if (k.length > LIMITS.keyword || k.split(/\s+/).length > 10) err(where, `keyword "${k}" too long`);
    }
  }
}

for (const s of ads.sitelinks ?? []) {
  const where = `sitelink ${s.text}`;
  checkText(where, s.text, LIMITS.sitelink);
  checkText(where, s.line1, LIMITS.sitelinkLine);
  checkText(where, s.line2, LIMITS.sitelinkLine);
  checkUrl(where, s.url);
  if (s.campaigns !== 'all') {
    for (const name of s.campaigns ?? []) if (!campaignNames.has(name)) err(where, `unknown campaign "${name}"`);
  }
}
for (const c of ads.callouts ?? []) checkText('callout', c, LIMITS.callout);
for (const sn of ads.structured_snippets ?? []) for (const v of sn.values) checkText(`snippet ${sn.header}`, v, LIMITS.snippet);

// What changed on the site since the campaigns were last synced with Ads.
const sinceArg = process.argv.indexOf('--since');
const since = sinceArg > 0 ? process.argv[sinceArg + 1] : ads.synced_commit;
let changed = null;
if (since) {
  try {
    changed = new Set(execFileSync('git', ['diff', '--name-only', since], { encoding: 'utf8' }).split('\n').filter(Boolean));
  } catch {
    err('synced_commit', `git does not know "${since}"`);
  }
}

if (errors.length) {
  console.error(`${FILE}: ${errors.length} problem(s)\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`${FILE}: OK (status: ${ads.status})`);
}

if (!since) {
  console.log('Not synced with Ads yet (synced_commit is null); nothing to compare.');
} else if (changed) {
  const hits = [];
  if (changed.has(FILE)) hits.push(`${FILE} itself: apply the edits in Ads, then set synced_commit`);
  const touched = (files) => [...new Set(files)].filter((f) => changed.has(f));
  const sharedHits = touched(ads.shared?.sources ?? []);
  if (sharedHits.length) hits.push(`shared headlines (every ad group): ${sharedHits.join(', ')}`);
  for (const c of ads.campaigns ?? []) {
    for (const g of c.ad_groups ?? []) {
      const t = touched([...(g.sources ?? []), pageFile(g.final_url)]);
      if (t.length) hits.push(`${c.name} › ${g.name}: ${t.join(', ')}`);
    }
  }
  for (const s of ads.sitelinks ?? []) {
    const t = touched([pageFile(s.url)]);
    if (t.length) hits.push(`sitelink ${s.text}: ${t.join(', ')}`);
  }
  console.log(hits.length
    ? `Changed since ${since}; check these against the site:\n` + hits.map((h) => `  - ${h}`).join('\n')
    : `No ad-related changes since ${since}.`);
}
