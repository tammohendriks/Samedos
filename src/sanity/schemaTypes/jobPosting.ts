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
      name: 'teaser',
      title: 'Kurzbeschreibung (Stellenübersicht)',
      type: 'text',
      rows: 2,
      description: 'Kurzer Satz, der in der Stellenübersicht unter dem Titel erscheint.',
    }),
    defineField({
      name: 'description',
      title: 'Einleitungstext',
      type: 'array',
      description: 'Einführender Text am Anfang der Stellenanzeige. Fett, kursiv und Absätze möglich.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Fett', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: 'whatToExpect',
      title: 'Was dich bei uns erwartet',
      type: 'array',
      description: 'Beschreibung des Arbeitsalltags. Fett und kursiv möglich.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Fett', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: 'tasksOutdoorTitle',
      title: 'Überschrift Aufgaben-Gruppe 1',
      type: 'string',
      description: 'Frei wählbare Überschrift, z.B. "Im Außendienst"',
      initialValue: 'Im Außendienst',
    }),
    defineField({
      name: 'tasksOutdoor',
      title: 'Aufgaben – Gruppe 1',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tasksOfficeTitle',
      title: 'Überschrift Aufgaben-Gruppe 2',
      type: 'string',
      description: 'Frei wählbare Überschrift, z.B. "In der Praxis in Findorff"',
      initialValue: 'In der Praxis in Findorff',
    }),
    defineField({
      name: 'tasksOffice',
      title: 'Aufgaben – Gruppe 2',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'requirements',
      title: 'Was du mitbringst',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'benefits',
      title: 'Was du bei uns bekommst',
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
          { title: 'Vollzeit / Teilzeit', value: 'Vollzeit / Teilzeit' },
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
      name: 'startDate',
      title: 'Besetzung ab',
      type: 'string',
      description: 'Z.B. "Ab sofort", "Zum nächstmöglichen Zeitpunkt", "01.06.2026"',
      initialValue: 'Ab sofort',
    }),
    defineField({
      name: 'salaryMin',
      title: 'Gehalt – Minimum (für Google for Jobs)',
      type: 'number',
      description: 'Untere Bandbreite, z.B. 2400. Wird intern für die Google-Anzeige genutzt — auf der Website selbst wird das Gehalt nicht ausgespielt.',
    }),
    defineField({
      name: 'salaryMax',
      title: 'Gehalt – Maximum',
      type: 'number',
      description: 'Obere Bandbreite, z.B. 3200.',
    }),
    defineField({
      name: 'salaryUnit',
      title: 'Gehalt – Einheit',
      type: 'string',
      options: {
        list: [
          { title: 'pro Monat',  value: 'MONTH' },
          { title: 'pro Jahr',   value: 'YEAR' },
          { title: 'pro Stunde', value: 'HOUR' },
        ],
      },
      initialValue: 'MONTH',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      type: 'datetime',
    }),
    defineField({
      name: 'validThrough',
      title: 'Gültig bis (Google for Jobs)',
      type: 'date',
      description: '⚠️ Wichtig: Ohne dieses Datum fliegt die Stelle nach ~60 Tagen aus Google for Jobs. Empfehlung: 90 Tage ab Veröffentlichung.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'scope', active: 'active' },
    prepare({ title, subtitle, active }) {
      return { title, subtitle: `${active ? '✅' : '⏸'} ${subtitle ?? ''}` };
    },
  },
});
