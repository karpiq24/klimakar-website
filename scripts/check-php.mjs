// Runs `php -l` (syntax check) on every PHP file in the repo. Part of `npm run verify` and the PR checks.
// Needs the PHP CLI (preinstalled on GitHub's ubuntu-latest). Usage: npm run check:php
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const SKIP = new Set(['.git', 'node_modules', 'private', 'prywatne', '.astro']);
const isBuildDir = (name) => name === 'dist' || name.startsWith('dist-');

function findPhp(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP.has(entry.name) && !isBuildDir(entry.name)) findPhp(join(dir, entry.name), out);
    } else if (entry.name.endsWith('.php')) out.push(join(dir, entry.name));
  }
  return out;
}

const version = spawnSync('php', ['--version'], { encoding: 'utf8' });
if (version.error || version.status !== 0) {
  console.error('php not found: install the PHP CLI (or run in a container with PHP) to lint the PHP files.');
  process.exit(1);
}

const files = findPhp('.').sort();
if (files.length === 0) {
  console.error('No PHP files found; expected at least public/contact.php.');
  process.exit(1);
}

let failed = 0;
for (const file of files) {
  const res = spawnSync('php', ['-l', file], { encoding: 'utf8' });
  if (res.status !== 0) {
    failed++;
    const why = res.error ? res.error.message : res.signal ? `killed by ${res.signal}` : '';
    process.stderr.write(`${res.stdout ?? ''}${res.stderr ?? ''}${why ? `${file}: ${why}\n` : ''}`);
  }
}
console.log(`${version.stdout.split('\n')[0]}: ${files.length - failed}/${files.length} PHP files OK`);
process.exit(failed ? 1 : 0);
