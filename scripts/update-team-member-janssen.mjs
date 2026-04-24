// Run with: SANITY_WRITE_TOKEN=<token> node scripts/update-team-member-janssen.mjs
// Get token: sanity.io/manage → Projekt etmanjr2 → API → Tokens → Add API token (Editor)
import { createClient } from '@sanity/client';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('❌ SANITY_WRITE_TOKEN fehlt.');
  process.exit(1);
}

const client = createClient({
  projectId: 'etmanjr2',
  dataset: 'production',
  apiVersion: '2026-04-20',
  token,
  useCdn: false,
});

const DOC_ID = '3509d6c5-2809-4f6a-97fa-467287bc40f5';

function mdToPortableText(text, keyPrefix = 'b') {
  const paragraphs = text.split('\n\n').filter((p) => p.trim());
  return paragraphs.map((para, i) => {
    const parts = para.split(/\*\*(.*?)\*\*/g);
    const children = parts
      .map((part, j) => (part ? { _type: 'span', _key: `${keyPrefix}s${i}${j}`, text: part, marks: j % 2 === 1 ? ['strong'] : [] } : null))
      .filter(Boolean);
    return { _type: 'block', _key: `${keyPrefix}${i}`, style: 'normal', children, markDefs: [] };
  });
}

const langBioMd = `Seit mehr als 20 Jahren bin ich als Arbeitsmediziner in Bremen und Umgebung tätig. Meine Expertise liegt im Bereich **Arbeits- und Gesundheitsschutz** — in der Betreuung mittelständischer und großer Unternehmen, der Beratung zu Sicherheitsbestimmungen und der Durchführung gesetzlich vorgeschriebener Vorsorgeuntersuchungen. Neben meiner Tätigkeit als Facharzt für Arbeitsmedizin bin ich Facharzt für Allgemeinmedizin und Sportmedizin — diese hausärztliche Perspektive prägt die Art, wie ich Arbeitsmedizin verstehe: pragmatisch, menschlich, am Alltag der Mitarbeiter*innen orientiert.

Zu meinen Schwerpunkten zählen **Offshore Medicals**, **Strahlenschutzuntersuchungen**, reisemedizinische Begutachtungen und die arbeitsmedizinische Zusammenhangsbegutachtung. Zusätzlich bringe ich Kompetenzen im Betrieblichen Eingliederungsmanagement (BEM), in der Gefährdungsbeurteilung, in der Sportmedizin und in der Chirotherapie mit. Fremdsprachen Englisch, Spanisch und Niederländisch ergänzen das Portfolio — ein Vorteil bei internationalen Kunden und Crews.

Mit **Samedos** habe ich 2025 den Schritt gewagt, eine moderne arbeitsmedizinische Praxis in Bremen-Findorff aufzubauen, die mehr kann als Routine-Check-ups. Gemeinsam mit einem kleinen, eingespielten Team begleiten wir Unternehmen in allen Fragen des Arbeits- und Gesundheitsschutzes — von der ersten Gefährdungsbeurteilung bis zur Wiedereingliederung nach längerer Krankheit.

Haben Sie Fragen zu einer bestimmten Untersuchung oder möchten Sie einen Termin vereinbaren? Unser Team ist für Sie da — rufen Sie uns gerne an, wir nehmen uns Zeit.`;

const langBioEnMd = `For more than 20 years I have been working as an occupational physician in Bremen and the surrounding region. My expertise lies in **occupational health and safety** — supporting small to large companies, advising on safety regulations and performing legally required preventive examinations. Alongside my work as a specialist in occupational medicine, I am also a specialist in general medicine and sports medicine — a family doctor's perspective that shapes how I understand occupational health: pragmatic, human, grounded in the day-to-day reality of employees.

My key focus areas include **offshore medicals**, **radiation protection examinations**, travel medicine assessments and occupational causation reports. I also bring expertise in company reintegration management (BEM), risk assessments, sports medicine and chirotherapy. English, Spanish and Dutch round out the portfolio — a real advantage with international clients and crews.

With **Samedos** I took the step in 2025 to build a modern occupational medicine practice in Bremen-Findorff that does more than routine check-ups. Together with a small, well-coordinated team we support companies on every question of occupational health and safety — from the first risk assessment to returning to work after a long illness.

Do you have questions about a specific examination, or would you like to book an appointment? Our team is here for you — give us a call, we take the time.`;

const schwerpunkte = [
  'Offshore Medicals',
  'Strahlenschutzuntersuchungen',
  'Reisemedizinische Begutachtungen',
  'Arbeitsmedizinische Zusammenhangsbegutachtung',
  'Betriebliches Eingliederungsmanagement (BEM)',
  'Gefährdungsbeurteilungen',
  'Sportmedizin',
  'Chirotherapie / Manuelle Medizin',
];

const schwerpunkteEN = [
  'Offshore medicals',
  'Radiation protection examinations',
  'Travel medicine assessments',
  'Occupational causation reports',
  'Company reintegration management (BEM)',
  'Risk assessments',
  'Sports medicine',
  'Chirotherapy / manual medicine',
];

// offshoreRelevant marks the qualifications that should appear in the
// E-A-T block on /leistungen/offshore-untersuchung. Jörg can toggle this
// per qualification directly in Sanity later.
const qualifikationen = [
  // Facharzt
  { titel: 'Facharzt für Arbeitsmedizin',     institution: 'Ärztekammer Hamburg',        ort: 'Hamburg',  jahr: 2004, kategorie: 'facharzt',      offshoreRelevant: true },
  { titel: 'Facharzt für Allgemeinmedizin',   institution: 'Ärztekammer Niedersachsen',  ort: 'Hannover', jahr: 2002, kategorie: 'facharzt',      offshoreRelevant: true },

  // Zusatzqualifikationen
  { titel: 'Sportmedizin',                                                                institution: 'Ärztekammer Hamburg',        ort: 'Hamburg',  jahr: 2004, kategorie: 'zusatz',        offshoreRelevant: true },
  { titel: 'Manuelle Medizin / Chirotherapie',                                            institution: 'Ärztekammer Niedersachsen',  ort: 'Hannover', jahr: 2010, kategorie: 'zusatz',        offshoreRelevant: false },
  { titel: 'Zusatzbezeichnung Qualitätsmanagement',                                       institution: 'Ärztekammer Niedersachsen',  ort: 'Hannover', jahr: 2002, kategorie: 'zusatz',        offshoreRelevant: false },
  { titel: 'Arbeitsmedizinische Zusammenhangsbegutachtung',                               institution: 'DGAUM',                      ort: 'Düsseldorf', jahr: 2006, kategorie: 'zusatz',      offshoreRelevant: false },
  { titel: 'Certified Disability Management Professional (CDMP)',                         institution: 'IDMSC',                      ort: 'Köln',     jahr: 2005, kategorie: 'zusatz',        offshoreRelevant: false },
  { titel: 'Personzentrierter / Systemischer Coach',                                      institution: 'Der W.E.G. e.V.',            ort: 'Bremen',   jahr: 2013, kategorie: 'zusatz',        offshoreRelevant: false },
  { titel: 'Psychologischer Berater',                                                     institution: 'Der W.E.G. e.V.',            ort: 'Bremen',   jahr: 2010, kategorie: 'zusatz',        offshoreRelevant: false },
  { titel: 'Fachkunde im Strahlenschutz (Notfalldiagnostik)',                              institution: 'Landesärztekammer Hessen',   ort: 'Frankfurt', jahr: 1999, kategorie: 'zusatz',       offshoreRelevant: true },
  { titel: 'Rettungsdienst',                                                              institution: 'Landesärztekammer Hessen',   ort: 'Frankfurt', jahr: 1999, kategorie: 'zusatz',       offshoreRelevant: true },

  // Ermächtigung
  { titel: 'Ermächtigung zur Überwachung beruflich strahlenexponierter Personen',         institution: 'Ärztekammer Bremen',         ort: 'Bremen',   jahr: 2013, kategorie: 'ermaechtigung', offshoreRelevant: true },

  // Ausbildung
  { titel: 'Approbation als Arzt',                                                        institution: 'Landesprüfungsamt für Heilberufe', ort: 'Hannover', jahr: 1998, kategorie: 'ausbildung', offshoreRelevant: false },

  // Promotion
  { titel: 'Promotion zum Dr. med.',                                                      institution: 'Medizinische Fakultät der Georg-August-Universität Göttingen', ort: 'Göttingen', jahr: 1997, kategorie: 'promotion',   offshoreRelevant: false },
].map((q, i) => ({ _type: 'qualifikation', _key: `q${i}`, ...q }));

console.log(`🔄 Aktualisiere Dr. Jörg Janssen (${DOC_ID})...`);

await client
  .patch(DOC_ID)
  .set({
    name: 'Dr. med. Jörg Janssen',
    position: 'Leitender Arzt & Gründer',
    jobTitle: 'Facharzt für Arbeitsmedizin',
    bio: 'Facharzt für Arbeitsmedizin und Allgemeinmedizin mit über 20 Jahren Erfahrung in Bremen und Umgebung. Gründer von Samedos mit Schwerpunkt auf Offshore-Untersuchungen, Strahlenschutz und Reisemedizin.',
    bioEN: 'Specialist in occupational and general medicine with over 20 years of experience in Bremen and the surrounding region. Founder of Samedos, focusing on offshore examinations, radiation protection and travel medicine.',
    slug: { _type: 'slug', current: 'dr-joerg-janssen' },
    aktiv: true,
    order: 1,
    langBio: mdToPortableText(langBioMd, 'de'),
    langBioEN: mdToPortableText(langBioEnMd, 'en'),
    sprachen: ['de', 'en', 'es', 'nl'],
    schwerpunkte,
    schwerpunkteEN,
    qualifikationen,
  })
  .commit();

console.log('✅ Fertig! Dr. Jörg Janssen wurde in Sanity aktualisiert.');
console.log('👉 Foto bitte anschließend im Sanity Studio hochladen (Feld "Porträtfoto").');
