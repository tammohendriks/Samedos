import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Startseite — Hero-Bild',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero-Bild Alt-Text',
      type: 'string',
      initialValue: 'Das Samedos-Team',
    }),
  ],
  preview: {
    select: { title: 'heroImageAlt', media: 'heroImage' },
    prepare: () => ({ title: 'Website-Einstellungen' }),
  },
});
