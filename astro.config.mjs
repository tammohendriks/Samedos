// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'https://samedos.de',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    sanity({
      projectId: 'etmanjr2',
      dataset: 'production',
      useCdn: false,
    }),
  ],

  adapter: vercel(),
});
