import { defineType, defineField } from 'sanity';

const richTextBlock = {
  type: 'block' as const,
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [
      { title: 'Fett', value: 'strong' },
      { title: 'Kursiv', value: 'em' },
    ],
    annotations: [],
  },
};

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team-Mitglied',
  type: 'document',
  groups: [
    { name: 'basis',          title: 'Basis' },
    { name: 'profil',         title: 'Profil-Seite' },
    { name: 'qualifikationen', title: 'Qualifikationen' },
  ],
  fields: [
    // ── Basis ──────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Name (mit Titel)',
      type: 'string',
      description: 'z.B. "Dr. med. Jörg Janssen"',
      validation: (r) => r.required(),
      group: 'basis',
    }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      description: 'Bestimmt die URL /ueber-uns/<slug>. Nur für Mitglieder mit eigener Profilseite nötig.',
      options: { source: 'name', maxLength: 96 },
      group: 'basis',
    }),
    defineField({
      name: 'position',
      title: 'Position / Rolle',
      type: 'string',
      description: 'Kurz-Rolle auf Team-Kachel, z.B. "Leitender Arzt & Gründer"',
      validation: (r) => r.required(),
      group: 'basis',
    }),
    defineField({
      name: 'jobTitle',
      title: 'Berufsbezeichnung (SEO / Schema.org)',
      type: 'string',
      description: 'z.B. "Facharzt für Arbeitsmedizin"',
      group: 'basis',
    }),
    defineField({
      name: 'bio',
      title: 'Kurz-Bio (für Team-Kachel & Teaser)',
      type: 'text',
      rows: 3,
      group: 'basis',
    }),
    defineField({
      name: 'bioEN',
      title: 'Kurz-Bio (English)',
      type: 'text',
      rows: 3,
      description: 'English translation of the short bio for the /en/about/<slug> page.',
      group: 'basis',
    }),
    defineField({
      name: 'photo',
      title: 'Porträtfoto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          type: 'string',
          description: 'Beschreibung des Bildes für Screenreader und SEO',
        }),
      ],
      group: 'basis',
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      initialValue: 99,
      group: 'basis',
    }),
    defineField({
      name: 'aktiv',
      title: 'Aktiv / sichtbar auf Website',
      type: 'boolean',
      initialValue: true,
      group: 'basis',
    }),

    // ── Profil-Seite ───────────────────────────────────────────────
    defineField({
      name: 'langBio',
      title: 'Lang-Bio (Profilseite)',
      type: 'array',
      description: 'Mehrere Absätze, persönlicher Ton. Fett und kursiv möglich.',
      of: [richTextBlock],
      group: 'profil',
    }),
    defineField({
      name: 'langBioEN',
      title: 'Lang-Bio (Profilseite, English)',
      type: 'array',
      description: 'English translation for the /en/about/<slug> page.',
      of: [richTextBlock],
      group: 'profil',
    }),
    defineField({
      name: 'sprachen',
      title: 'Sprachen',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Deutsch',       value: 'de' },
          { title: 'Englisch',      value: 'en' },
          { title: 'Spanisch',      value: 'es' },
          { title: 'Niederländisch', value: 'nl' },
          { title: 'Französisch',   value: 'fr' },
        ],
      },
      group: 'profil',
    }),
    defineField({
      name: 'schwerpunkte',
      title: 'Schwerpunkte',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Fachliche Spezialisierungen',
      group: 'profil',
    }),
    defineField({
      name: 'schwerpunkteEN',
      title: 'Schwerpunkte (English)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'English labels for the specialisations, same order as DE',
      group: 'profil',
    }),
    defineField({
      name: 'telefon',
      title: 'Telefon (optional)',
      type: 'string',
      group: 'profil',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail (optional)',
      type: 'string',
      group: 'profil',
    }),

    // ── Qualifikationen ────────────────────────────────────────────
    defineField({
      name: 'qualifikationen',
      title: 'Qualifikationen & Weiterbildungen',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'qualifikation',
          fields: [
            defineField({
              name: 'titel',
              title: 'Bezeichnung',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'institution',
              title: 'Institution',
              type: 'string',
            }),
            defineField({
              name: 'ort',
              title: 'Ort',
              type: 'string',
            }),
            defineField({
              name: 'jahr',
              title: 'Jahr',
              type: 'number',
            }),
            defineField({
              name: 'kategorie',
              title: 'Kategorie',
              type: 'string',
              options: {
                list: [
                  { title: 'Facharztausbildung',     value: 'facharzt' },
                  { title: 'Zusatzqualifikation',    value: 'zusatz' },
                  { title: 'Ermächtigung',           value: 'ermaechtigung' },
                  { title: 'Approbation / Ausbildung', value: 'ausbildung' },
                  { title: 'Promotion',              value: 'promotion' },
                  { title: 'Sonstige Weiterbildung', value: 'sonstige' },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'offshoreRelevant',
              title: 'Auf Offshore-Seite anzeigen',
              type: 'boolean',
              description: 'Wenn aktiv, erscheint diese Qualifikation auch im E-A-T-Block der Offshore-Seite.',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'titel', subtitle: 'institution', jahr: 'jahr' },
            prepare({ title, subtitle, jahr }) {
              return {
                title,
                subtitle: [subtitle, jahr].filter(Boolean).join(' · '),
              };
            },
          },
        },
      ],
      group: 'qualifikationen',
    }),
  ],
  orderings: [
    { title: 'Reihenfolge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'position', media: 'photo' },
  },
});
