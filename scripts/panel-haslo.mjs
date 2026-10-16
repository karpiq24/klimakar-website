// Makes the panel password file (public/panel/api.php): `npm run panel:haslo` generates a random
// password, `npm run panel:haslo -- "<hasło>"` uses your own. Writes, into prywatne/ (git-ignored):
//   klimakar-panel.php  → upload to the FTP root, NEXT TO www/ (not into it); only the hash is inside
//   panel-haslo.txt     → the password, for the owner; don't upload it
// A new password replaces the old one as soon as the new klimakar-panel.php is uploaded.
import { pbkdf2Sync, randomBytes, randomInt } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';

const ITERATIONS = 200_000;
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';
const group = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');
const password = process.argv[2] || Array.from({ length: 4 }, group).join('-');
if (password.length < 12) {
  console.error('Hasło musi mieć co najmniej 12 znaków.');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');
const stored = `pbkdf2_sha256$${ITERATIONS}$${salt.toString('base64')}$${hash.toString('base64')}`;

mkdirSync('prywatne', { recursive: true });
writeFileSync('prywatne/klimakar-panel.php', `<?php\n// Panel hasło (hash), from scripts/panel-haslo.mjs. Lives next to www/, never inside it.\nreturn ['haslo' => '${stored}'];\n`);
writeFileSync('prywatne/panel-haslo.txt', `${password}\n`, { mode: 0o600 });
console.log('Zapisano prywatne/klimakar-panel.php (wgraj do katalogu głównego FTP, obok www/)');
console.log('oraz prywatne/panel-haslo.txt (hasło dla właściciela, nie wgrywaj).');
