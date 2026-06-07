export type ContactSubjectKey =
  | 'vorsorge'
  | 'offshore'
  | 'bgm'
  | 'psychologie'
  | 'termin'
  | 'allgemein'
  | 'sonstiges';

export interface ContactSubject {
  key: ContactSubjectKey;
  /** URL-param values that should resolve to this subject. Matched
   *  case-insensitive with hyphens/underscores/spaces normalised away. */
  paramAliases: string[];
  labelDE: string;
  labelEN: string;
  /** Pre-filled example body. Empty/undefined → user writes from scratch. */
  messageDE?: string;
  messageEN?: string;
}

export const contactSubjects: ContactSubject[] = [
  {
    key: 'vorsorge',
    paramAliases: [
      'vorsorge',
      'Vorsorgeuntersuchung',
      'Arbeitsmedizinische-Vorsorge',
      'Occupational-Health-Examination',
    ],
    labelDE: 'Arbeitsmedizinische Vorsorge / G-Untersuchung',
    labelEN: 'Occupational Health Examination / G-Examination',
    messageDE:
      'Hallo,\n\nwir benötigen arbeitsmedizinische Vorsorgeuntersuchungen für unsere Mitarbeitenden.\n\n• Anzahl Mitarbeitende: \n• Art der Untersuchung (z. B. G25, G37, G41, G42): \n• Wunschtermin / Zeitraum: \n• Ort: in Ihrer Praxis / bei uns vor Ort\n\nBitte um Rückmeldung mit Terminvorschlägen.\n\nVielen Dank!',
    messageEN:
      'Hello,\n\nwe need occupational health examinations for our employees.\n\n• Number of employees: \n• Type of examination (e.g., G25, G37, G41, G42): \n• Preferred date / time frame: \n• Location: at your practice / on-site at our company\n\nPlease get back to us with suggested appointments.\n\nThank you!',
  },
  {
    key: 'offshore',
    paramAliases: [
      'offshore',
      'Offshore-Untersuchung',
      'Offshore-Tauglichkeitsuntersuchung',
      'Offshore-Medical',
      'OGUK',
      'OEUK',
    ],
    labelDE: 'Offshore-Untersuchung (OGUK/OEUK, AWMF, Hardanger)',
    labelEN: 'Offshore Medical (OGUK/OEUK, AWMF, Hardanger)',
    messageDE:
      'Hallo,\n\nich benötige eine Offshore-Tauglichkeitsuntersuchung.\n\n• Standard: OGUK/OEUK / AWMF / Hardanger / NOGEPA\n• Geplanter Einsatz (Region und Datum): \n• Wunschtermin für die Untersuchung: \n• Aktuelles Zertifikat vorhanden? Ja / Nein, abgelaufen am: \n\nVielen Dank für eine schnelle Rückmeldung!',
    messageEN:
      'Hello,\n\nI need an offshore fitness-to-work medical examination.\n\n• Standard: OGUK/OEUK / AWMF / Hardanger / NOGEPA\n• Planned deployment (region and date): \n• Preferred examination date: \n• Existing certificate? Yes / No, expired on: \n\nThank you for a quick reply!',
  },
  {
    key: 'bgm',
    paramAliases: [
      'bgm',
      'BGM',
      'BGM-Erstgespräch',
      'BGM-Erstgespraech',
      'Betriebliches-Gesundheitsmanagement',
      'Workplace-Health-Management',
      'BGM-Initial-Consultation',
    ],
    labelDE: 'Betriebliches Gesundheitsmanagement (BGM)',
    labelEN: 'Workplace Health Management (BGM)',
    messageDE:
      'Hallo,\n\nwir interessieren uns für ein BGM-Erstgespräch für unser Unternehmen.\n\n• Branche / Tätigkeitsbereich: \n• Anzahl Mitarbeitende: \n• Aktuelle Themen / Schwerpunkte (z. B. Gefährdungsbeurteilung psychischer Belastung, Ergonomie, BEM-Begleitung): \n• Bestehende BGM-Maßnahmen: \n\nBitte um Rückmeldung für ein unverbindliches Erstgespräch.\n\nDanke!',
    messageEN:
      'Hello,\n\nwe are interested in an initial BGM consultation for our company.\n\n• Industry / type of business: \n• Number of employees: \n• Current focus areas (e.g., psychological risk assessment, ergonomics, reintegration management): \n• Existing BGM measures in place: \n\nPlease get back to us for a non-binding initial consultation.\n\nThank you!',
  },
  {
    key: 'psychologie',
    paramAliases: [
      'psychologie',
      'Psychologische-Beratung',
      'Psychological-Counseling',
      'Psychological-Counselling',
      'Coaching',
    ],
    labelDE: 'Psychologische Beratung / Coaching',
    labelEN: 'Psychological Counseling / Coaching',
    messageDE:
      'Hallo,\n\nich interessiere mich für ein vertrauliches Erstgespräch.\n\n• Anliegen (kurz): \n• Es geht um: mich selbst / einen:eine Beschäftigte:n unseres Unternehmens\n• Wunsch nach Online- oder Präsenztermin: \n• Wunschtermin / Zeitraum: \n\nGerne nehme ich auch ein Erstgespräch unter ärztlicher Schweigepflicht in Anspruch.\n\nVielen Dank!',
    messageEN:
      'Hello,\n\nI am interested in a confidential initial consultation.\n\n• Topic (briefly): \n• This is about: myself / an employee at our company\n• Preference for online or in-person session: \n• Preferred date / time frame: \n\nI also welcome an initial consultation under medical confidentiality.\n\nThank you!',
  },
  {
    key: 'termin',
    paramAliases: ['termin', 'Terminanfrage', 'Appointment-Request'],
    labelDE: 'Allgemeine Terminanfrage',
    labelEN: 'General appointment request',
    messageDE:
      'Hallo,\n\nich möchte einen Termin bei Samedos vereinbaren.\n\n• Worum es geht: \n• Wunschtermin / Zeitraum: \n\nBitte um Rückmeldung mit Terminvorschlägen.\n\nDanke!',
    messageEN:
      'Hello,\n\nI would like to schedule an appointment at Samedos.\n\n• Reason: \n• Preferred date / time frame: \n\nPlease get back to us with suggested appointments.\n\nThank you!',
  },
  {
    key: 'allgemein',
    paramAliases: ['allgemein', 'Allgemeine-Frage', 'General-Enquiry'],
    labelDE: 'Allgemeine Frage',
    labelEN: 'General enquiry',
  },
  {
    key: 'sonstiges',
    paramAliases: ['sonstiges', 'Sonstiges', 'Other'],
    labelDE: 'Sonstiges',
    labelEN: 'Other',
  },
];

/** Resolve a URL-param value (e.g. `?betreff=BGM-Erstgespräch`) to a subject.
 *  Case-insensitive, ignores hyphens / underscores / spaces. */
export function findSubjectByParam(value: string | null): ContactSubject | undefined {
  if (!value) return undefined;
  const normalize = (s: string) => s.toLowerCase().replace(/[-_\s]/g, '');
  const needle = normalize(value);
  return contactSubjects.find((s) =>
    s.paramAliases.some((alias) => normalize(alias) === needle),
  );
}

export function findSubjectByKey(key: string): ContactSubject | undefined {
  return contactSubjects.find((s) => s.key === key);
}
