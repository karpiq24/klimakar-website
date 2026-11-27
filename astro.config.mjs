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
  // WHY: a robots.txt entry would advertise /panel/ to crawlers, so it is hidden only by noindex and this filter.
  integrations: [sitemap({ filter: (page) => !page.includes('/panel/') })],
});
