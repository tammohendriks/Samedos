import { defineType, defineField } from 'sanity';

export const priceList = defineType({
  name: 'priceList',
  title: 'Preislisten',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          { title: 'G-Untersuchungen', value: 'g-untersuchungen' },
          { title: 'Sonderuntersuchungen', value: 'sonderuntersuchungen' },
          { title: 'Labor', value: 'labor' },
          { title: 'Impfungen', value: 'impfungen' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sektionen',
      title: 'Preisabschnitte',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'preisSektion',
          title: 'Abschnitt',
          fields: [
            defineField({
              name: 'titel',
              title: 'Titel',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'zeilen',
              title: 'Preiszeilen',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'preisZeile',
                  title: 'Zeile',
                  fields: [
                    defineField({
                      name: 'bezeichnung',
                      title: 'Bezeichnung',
                      type: 'string',
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      name: 'preis',
                      title: 'Preis (z.B. "94,07 €")',
                      type: 'string',
                    }),
                    defineField({
                      name: 'einheit',
                      title: 'Einheit (z.B. "pro Stunde")',
                      type: 'string',
                    }),
                    defineField({
                      name: 'hinweis',
                      title: 'Hinweis (z.B. "auf Anfrage")',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: { title: 'bezeichnung', subtitle: 'preis' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'titel' },
          },
        },
      ],
    }),
    defineField({
      name: 'pdf',
      title: 'PDF-Datei (optional)',
      description: 'Alternativ zum Online-Bearbeiten: PDF hochladen (ersetzt die Tabelle durch einen Download-Link)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'updatedAt',
      title: 'Zuletzt aktualisiert',
      type: 'date',
    }),
  ],
  preview: {
    select: { title: 'category', updatedAt: 'updatedAt' },
    prepare({ title, updatedAt }) {
      const labels: Record<string, string> = {
        'g-untersuchungen': 'G-Untersuchungen',
        'sonderuntersuchungen': 'Sonderuntersuchungen',
        'labor': 'Labor',
        'impfungen': 'Impfungen',
      };
      return {
        title: labels[title] ?? title,
        subtitle: updatedAt ? `Stand: ${updatedAt}` : 'Noch kein Datum',
      };
    },
  },
});
