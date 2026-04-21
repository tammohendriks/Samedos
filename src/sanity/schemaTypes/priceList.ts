import { defineType, defineField } from 'sanity';
import { PdfDownloadHint } from './components/PdfDownloadHint';

export const priceList = defineType({
  name: 'priceList',
  title: 'Preislisten',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
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
                      name: 'code',
                      title: 'Untersuchung',
                      type: 'string',
                      description: 'Bei G-Untersuchungen: DGUV-Code (z.B. "G 24"). Bei Sonderuntersuchungen: Kurzbezeichnung der Leistung.',
                    }),
                    defineField({
                      name: 'bezeichnung',
                      title: 'Bezeichnung',
                      type: 'string',
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
      name: 'pdfDownload',
      title: 'PDF herunterladen',
      type: 'string',
      components: {
        input: PdfDownloadHint,
      },
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
        title: labels[title] ?? (title || 'Neue Preisliste'),
        subtitle: updatedAt ? `Stand: ${updatedAt}` : 'Noch kein Datum',
      };
    },
  },
});
