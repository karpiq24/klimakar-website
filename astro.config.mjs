// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { cssTarget } from './css-target.mjs';

export default defineConfig({
  site: 'https://klima-kar.wroclaw.pl',
  output: 'static',
  build: {
    format: 'directory',
  },
  vite: { build: { cssTarget } },
  // WHY: /panel/ is noindex and kept out of robots.txt, which would advertise it; the sitemap must skip it too.
  integrations: [sitemap({ filter: (page) => !page.includes('/panel/') })],
});
