import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://rajpatil.dev',
  // Zero client framework. Any JS on a page is hand-written and page-scoped.
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  integrations: [sitemap()],
});
