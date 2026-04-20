// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://samedos.de',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap(),
    sanity({
      projectId: 'etmanjr2',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/studio',
    }),
  ],

  adapter: vercel(),
});
