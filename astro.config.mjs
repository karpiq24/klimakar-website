// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://klima-kar.wroclaw.pl',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
});
