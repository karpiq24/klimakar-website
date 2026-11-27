import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFileSync } from 'node:fs';
import { cssTarget } from '../css-target.mjs';

export function microsite(name, domain) {
  return defineConfig({
    site: `https://${domain}`,
    base: process.env.MICROSITE_BASE ?? '/',
    srcDir: `./sites/${name}`,
    publicDir: './sites/public',
    outDir: `./dist-${name}`,
    cacheDir: `./node_modules/.astro-${name}`,
    output: 'static',
    vite: { build: { cssTarget } },
    integrations: [sitemap(), {
      name: 'contact-php',
      hooks: { 'astro:build:done': ({ dir }) => copyFileSync('public/contact.php', new URL('contact.php', dir)) },
    }],
  });
}
