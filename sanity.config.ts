import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
  projectId: 'etmanjr2',
  dataset: 'production',
  title: 'Samedos CMS',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalte')
          .items([
            S.documentTypeListItem('teamMember').title('Team'),
            S.documentTypeListItem('jobPosting').title('Stellenanzeigen'),
            S.documentTypeListItem('galleryImage').title('Galerie & Fotos'),
            S.documentListItem()
              .title('Website-Einstellungen')
              .id('siteSettings')
              .schemaType('siteSettings'),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
