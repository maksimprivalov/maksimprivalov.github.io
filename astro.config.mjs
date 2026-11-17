// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL, BASE_PATH } from './src/config.ts';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
