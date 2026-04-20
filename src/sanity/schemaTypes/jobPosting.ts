import { defineType, defineField } from 'sanity';

export const jobPosting = defineType({
  name: 'jobPosting',
  title: 'Stellenanzeige',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'active',
      title: 'Aktiv (öffentlich sichtbar)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Kurzbeschreibung',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'tasks',
      title: 'Aufgaben',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'requirements',
      title: 'Anforderungen',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'scope',
      title: 'Umfang',
      type: 'string',
      options: {
        list: [
          { title: 'Vollzeit', value: 'Vollzeit' },
          { title: 'Teilzeit', value: 'Teilzeit' },
          { title: 'Minijob', value: 'Minijob' },
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Standort',
      type: 'string',
      initialValue: 'Bremen',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      type: 'datetime',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'scope', active: 'active' },
    prepare({ title, subtitle, active }) {
      return { title, subtitle: `${active ? '✅' : '⏸'} ${subtitle ?? ''}` };
    },
  },
});
