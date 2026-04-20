import { defineType, defineField } from 'sanity';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team-Mitglied',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: 'Reihenfolge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'position', media: 'photo' },
  },
});
