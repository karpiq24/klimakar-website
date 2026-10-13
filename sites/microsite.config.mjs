// Shared Astro config for the one-page brand sites (webasto.wroclaw.pl, eberspaecher.wroclaw.pl).
// Each site has a tiny astro.config.mjs in sites/<name>/ that calls this. Paths are relative to the
// repo root, so run the builds from there (npm run build:webasto, npm run build:eberspaecher).
// MICROSITE_BASE sets a sub-path for previews (the demo deploy puts them under /strony/<name>/).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export function microsite(name, domain) {
  return defineConfig({
    site: `https://${domain}`,
    base: process.env.MICROSITE_BASE ?? '/',
    srcDir: `./sites/${name}`,
    publicDir: './sites/public',
    outDir: `./dist-${name}`,
    cacheDir: `./node_modules/.astro-${name}`,
    output: 'static',
    integrations: [sitemap()],
  });
}
