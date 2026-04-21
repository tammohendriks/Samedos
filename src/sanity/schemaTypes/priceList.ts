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
      name: 'pdf',
      title: 'PDF-Datei',
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
