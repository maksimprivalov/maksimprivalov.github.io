// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL, BASE_PATH } from './src/config.ts';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  // Explicit: with Astro 6.4, @astrojs/mdx 5 otherwise sees `gfm` as undefined and skips
  // remark-gfm (no tables in MDX).
  integrations: [mdx({ gfm: true })],
  vite: {
    plugins: [tailwindcss()],
  },
});
