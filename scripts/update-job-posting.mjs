// Run with: SANITY_WRITE_TOKEN=<token> node scripts/update-job-posting.mjs
// Get token: sanity.io/manage → Projekt etmanjr2 → API → Tokens → Add API token (Editor)
import { createClient } from '@sanity/client';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('❌ SANITY_WRITE_TOKEN fehlt. Beispiel:');
  console.error('   SANITY_WRITE_TOKEN=sk... node scripts/update-job-posting.mjs');
  process.exit(1);
}

const client = createClient({
  projectId: 'etmanjr2',
  dataset: 'production',
  apiVersion: '2026-04-20',
  token,
  useCdn: false,
});

const DOC_ID = '30a2f141-5d3f-4e8a-8cd7-b24fce6e4afe';

function mdToPortableText(text) {
  const paragraphs = text.split('\n\n').filter((p) => p.trim());
  return paragraphs.map((para, i) => {
    const parts = para.split(/\*\*(.*?)\*\*/g);
    const children = parts
      .map((part, j) => (part ? { _type: 'span', _key: `s${i}${j}`, text: part, marks: j % 2 === 1 ? ['strong'] : [] } : null))
      .filter(Boolean);
    return { _type: 'block', _key: `b${i}`, style: 'normal', children, markDefs: [] };
  });
}

const descriptionMd = `Samedos ist im **Oktober 2025** gegründet worden — wir sind ein kleines, modernes Team aus vier Leuten (darunter ein Arzt) und bauen gerade eine arbeitsmedizinische Praxis auf, die anders tickt als das, was man aus Klinik oder Hausarztpraxis kennt. Keine Schichtdienste, keine Wochenenden, keine Bereitschaft. Dafür viel Abwechslung, direkte Wege und die Chance, ein Unternehmen **von Anfang an mitzuprägen**.`;

const whatToExpectMd = `**Kein Tag ist wie der andere.** Wir sind regelmäßig bei unseren Kunden vor Ort — auf Baustellen, im Bremer Hafen, in Werkhallen, Büros oder wo immer wir gebraucht werden. Dort führen wir arbeitsmedizinische Vorsorgeuntersuchungen durch: Hör- und Sehtests, Blutabnahmen und weitere Diagnostik. Was du auf diesen Einsätzen erlebst, ist wirklich außergewöhnlich — du bekommst Einblicke in Branchen, Firmen und Arbeitswelten, die die meisten Menschen nie zu sehen bekommen.

**Zwischen den Außeneinsätzen** arbeitest du in unserer Praxis in **Bremen-Findorff** — ruhiger, strukturierter, mit Kaffee in der Hand. Hier beantwortest du Kundenanfragen per Mail und Telefon, stimmst dich mit den betreuten Unternehmen ab, pflegst die Patientendaten und führst Untersuchungen in unserem Untersuchungsraum durch.`;

const tasksOutdoor = [
  'Durchführung arbeitsmedizinischer Untersuchungen beim Kunden vor Ort',
  'Hör- und Sehtests, Blutabnahmen, EKG, Lungenfunktion und weitere Diagnostik',
  'Vorbereitung und Nachbereitung der mobilen Einsätze',
  'Fahrten zu den Einsatzorten im Großraum Bremen',
];

const tasksOffice = [
  'Betreuung der Patient*innen vor, während und nach den Untersuchungen',
  'Telefon- und Mailkorrespondenz mit betreuten Unternehmen',
  'Termin- und Einsatzkoordination',
  'Dokumentation und Datenpflege',
  'Allgemeine Unterstützung im Praxisalltag',
];

const requirements = [
  'Abgeschlossene Ausbildung als Medizinische Fachangestellte (m/w/d) oder vergleichbare Qualifikation — arbeitsmedizinische Vorerfahrung ist nicht notwendig, wir zeigen dir alles',
  'Führerschein Klasse B (für unsere Außeneinsätze unverzichtbar)',
  'Freude an Abwechslung und die Bereitschaft, mal rauszufahren',
  'Teamgeist, Eigeninitiative und Zuverlässigkeit — bei vier Leuten zählt jede*r',
  'Freundliches, professionelles Auftreten im direkten Kundenkontakt',
];

const benefits = [
  'Abwechslung statt Routine — ein Arbeitsplatz, der nie langweilig wird',
  'Planbare Arbeitszeiten — kein Wochenenddienst, keine Nachtdienste, keine Bereitschaft',
  'Echte Mitgestaltung — deine Ideen zählen, Wege sind kurz, Entscheidungen fallen schnell',
  'Flexibles Arbeitszeitmodell — 20 bis 40 Stunden die Woche, darüber lässt sich entspannt reden',
  'Faire, leistungsgerechte Vergütung',
  'Wellpass zur Unterstützung deiner Gesundheit und Fitness',
  'Moderne Ausstattung und digitale Arbeitsabläufe',
  'Weiterentwicklung — wir unterstützen Fortbildungen und arbeitsmedizinische Zusatzqualifikationen',
  'Zentrale Praxis in Bremen-Findorff — gut erreichbar mit ÖPNV, Parkplätze in der Nähe',
];

console.log(`🔄 Aktualisiere Stellenanzeige (${DOC_ID})...`);

await client
  .patch(DOC_ID)
  .set({
    teaser: 'Arbeitsmedizinische Assistenz (m/w/d) in Vollzeit oder Teilzeit — abwechslungsreich, mobil und mit direktem Kundenkontakt in Bremen und Umgebung.',
    description: mdToPortableText(descriptionMd),
    whatToExpect: mdToPortableText(whatToExpectMd),
    tasksOutdoor,
    tasksOffice,
    requirements,
    benefits,
    scope: 'Vollzeit / Teilzeit',
    location: 'Bremen',
    publishedAt: new Date().toISOString(),
    validThrough: '2026-07-22',
  })
  .unset(['tasks'])
  .commit();

console.log('✅ Fertig! Stellenanzeige wurde in Sanity aktualisiert.');
