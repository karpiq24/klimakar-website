// Checks internal links in the built sites: every root-relative or relative href/src/srcset in the
// HTML must resolve to a file in the same dist directory, and every #fragment to an id on the target page.
// Usage: npm run check:links [-- dist dist-webasto ...]   (default: dist dist-webasto dist-eberspaecher)
// External (http/https), mailto:, tel: and data: links are not checked.
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, posix } from 'node:path';

const dirs = process.argv.slice(2).length ? process.argv.slice(2) : ['dist', 'dist-webasto', 'dist-eberspaecher'];
const errors = [];
let pagesChecked = 0;
let linksChecked = 0;

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

// Maps a URL path (already decoded, without query/fragment) to a file inside root, or null.
function resolveFile(root, urlPath) {
  const rel = urlPath.replace(/^\/+/, '');
  const candidates = urlPath.endsWith('/') || rel === '' ? [join(root, rel, 'index.html')] : [join(root, rel), join(root, rel, 'index.html')];
  return candidates.find((p) => existsSync(p) && statSync(p).isFile()) ?? null;
}

// Comments and script bodies are not markup: strings in them must not count as links or anchors.
const markupOnly = (html) => html.replace(/<!--[\s\S]*?-->/g, '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
// Attribute value, quoted or not, with optional spaces around "=".
const attr = (names) => new RegExp(`\\s(?:${names})\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'gi');

const idCache = new Map();
function idsOf(file) {
  if (!idCache.has(file)) {
    const html = markupOnly(readFileSync(file, 'utf8'));
    const ids = [...html.matchAll(attr('id'))].map((m) => m[1] ?? m[2] ?? m[3]);
    const anchorNames = [...html.matchAll(/<a\b[^>]*>/gi)].flatMap((tag) => [...tag[0].matchAll(attr('name'))].map((m) => m[1] ?? m[2] ?? m[3]));
    idCache.set(file, new Set([...ids, ...anchorNames]));
  }
  return idCache.get(file);
}

function references(html) {
  const refs = [];
  for (const m of html.matchAll(attr('href|src|poster|data-src'))) refs.push(m[1] ?? m[2] ?? m[3]);
  for (const m of html.matchAll(attr('srcset'))) {
    for (const part of (m[1] ?? m[2] ?? m[3]).split(',')) refs.push(part.trim().split(/\s+/)[0]);
  }
  return refs.filter(Boolean);
}

function decode(fn, value, where, errs) {
  try {
    return fn(value);
  } catch {
    errs.push(`${where}: malformed percent-encoding in "${value}"`);
    return null;
  }
}

for (const root of dirs) {
  if (!existsSync(root)) {
    errors.push(`${root}: directory not found (run the build first)`);
    continue;
  }
  for (const file of htmlFiles(root)) {
    pagesChecked++;
    const pageUrl = '/' + posix.relative(root, file).split(/[\\/]/).join('/').replace(/index\.html$/, '');
    const html = markupOnly(readFileSync(file, 'utf8'));
    for (const raw of references(html)) {
      const ref = raw.replace(/&amp;/g, '&');
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(ref)) continue; // external or special scheme
      linksChecked++;
      const [beforeHash, fragment] = ref.split('#', 2);
      const urlPath = decode(decodeURI, beforeHash.split('?')[0], file, errors);
      if (urlPath === null) continue;
      const absolute = urlPath === '' ? pageUrl : urlPath.startsWith('/') ? urlPath : posix.join(posix.dirname(pageUrl + 'x'), urlPath) + (urlPath.endsWith('/') ? '/' : '');
      const target = resolveFile(root, absolute);
      if (!target) {
        errors.push(`${file}: broken link "${raw}" (no file for ${absolute})`);
        continue;
      }
      const id = fragment ? decode(decodeURIComponent, fragment, file, errors) : null;
      // "#" and "#top" always scroll to the top of the page (HTML spec), so they need no element.
      if (id && id.toLowerCase() !== 'top' && target.endsWith('.html') && !idsOf(target).has(id)) {
        errors.push(`${file}: broken anchor "${raw}" (no #${fragment} in ${target})`);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} broken internal link(s) in ${pagesChecked} page(s).`);
  process.exit(1);
}
console.log(`OK: ${linksChecked} internal links in ${pagesChecked} pages (${dirs.join(', ')}).`);
