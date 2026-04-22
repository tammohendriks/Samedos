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
    sitemap({
      filter: (page) =>
        !page.includes('/impressum') &&
        !page.includes('/en/legal-notice') &&
        !page.includes('/studio') &&
        !page.includes('/api/'),
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-DE',
          en: 'en-US',
        },
      },
    }),
    sanity({
      projectId: 'etmanjr2',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/studio',
    }),
  ],

  adapter: vercel(),
});
