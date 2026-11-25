// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { cssTarget } from './css-target.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://klima-kar.wroclaw.pl',
  output: 'static',
  build: {
    format: 'directory',
  },
  vite: { build: { cssTarget } },
  // The owner's panel stays out of the sitemap (and is noindex; not in robots.txt, which would advertise it).
  integrations: [sitemap({ filter: (page) => !page.includes('/panel/') })],
});
