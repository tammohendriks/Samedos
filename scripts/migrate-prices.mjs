/**
 * Migrations-Script: Lädt die Preisdaten 2026 aus der Preisliste in Sanity.
 *
 * Voraussetzung: Sanity-Token mit Schreibrecht
 *   1. sanity.io/manage → Projekt "etmanjr2" → API → Tokens → Add API Token (Rolle: Editor)
 *   2. Token setzen:  export SANITY_TOKEN="sk..."
 *   3. Ausführen:     node scripts/migrate-prices.mjs
 */

import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('Fehler: SANITY_TOKEN nicht gesetzt.\n  export SANITY_TOKEN="sk..."');
  process.exit(1);
}

const client = createClient({
  projectId: 'etmanjr2',
  dataset: 'production',
  apiVersion: '2026-04-20',
  token,
  useCdn: false,
});

// ─── G-Untersuchungen ─────────────────────────────────────────────────────────

const gUntersuchungen = {
  sektionen: [
    {
      titel: 'Grundsätzliches',
      zeilen: [
        { bezeichnung: 'Stundensatz (Beratung, Begehung, Schulung etc.)', preis: '150,00 €', einheit: 'pro Stunde' },
        { bezeichnung: 'Gefährdungsbeurteilung / Begutachtung / Beratung Mutterschutz', hinweis: 'nach Stundensatz und Aufwand, 150,00 €/Std.' },
      ],
    },
    {
      titel: 'Einzeluntersuchungen G1–G19',
      zeilen: [
        { code: 'G1.1', bezeichnung: 'Silikogener Staub', preis: '83,21 €' },
        { code: 'G1.2', bezeichnung: 'Asbestfaserhaltiger Staub', preis: '83,21 €' },
        { code: 'G1.3', bezeichnung: 'Künstlicher mineralischer Staub', preis: '83,21 €' },
        { code: 'G1.4', bezeichnung: 'Allgemeiner Staub', preis: '65,75 €' },
        { code: 'G2', bezeichnung: 'Blei oder seine Verbindungen', preis: '78,69 €', einheit: 'zzgl. Labor Blei' },
        { code: 'G3', bezeichnung: 'Bleialkyle', preis: '84,81 €', einheit: 'zzgl. Labor Blei' },
        { code: 'G4', bezeichnung: 'Gefahrstoffe, die Hautkrebs oder Krebsbildung hervorrufen', preis: '67,32 €' },
        { code: 'G5', bezeichnung: 'Glykoldinitrat / Glycerin', preis: '109,73 €' },
        { code: 'G6', bezeichnung: 'Schwefelkohlenstoff', preis: '100,72 €' },
        { code: 'G7 EU, NU', bezeichnung: 'Kohlenmonoxid', preis: '130,89 €' },
        { code: 'G7 NU', bezeichnung: 'Kohlenmonoxid (nur Anamnese)', preis: '49,83 €' },
        { code: 'G8', bezeichnung: 'Benzol', preis: '70,82 €', einheit: 'zzgl. Urin s. unten' },
        { code: 'G9 EU', bezeichnung: 'Quecksilber oder seine Verbindungen (o. Biomonitoring)', preis: '67,32 €' },
        { code: 'G9 NU', bezeichnung: 'Quecksilber oder seine Verbindungen (m. Biomonitoring)', preis: '142,52 €' },
        { code: 'G10 EU', bezeichnung: 'Methanol (o. Biomonitoring)', preis: '78,69 €' },
        { code: 'G10 NU', bezeichnung: 'Methanol (m. Biomonitoring)', preis: '118,04 €' },
        { code: 'G11 EU, NU', bezeichnung: 'Schwefelwasserstoff', preis: '71,96 €' },
        { code: 'G12 EU, NU', bezeichnung: 'Phosphor', preis: '78,69 €' },
        { code: 'G13 EU, NU', bezeichnung: 'Chloroplatinate', preis: '78,69 €' },
        { code: 'G14 EU', bezeichnung: 'Chlorkohlenwasserstoff', preis: '78,69 €' },
        { code: 'G15 EU', bezeichnung: 'Chrom-VI-Verbindungen', preis: '150,00 €', einheit: 'zzgl. Chrom im Urin' },
        { code: 'G15 NU', bezeichnung: 'Chrom-VI-Verbindungen', preis: '195,15 €' },
        { code: 'G16 EU, NU', bezeichnung: 'Arsen', preis: '105,55 €' },
        { code: 'G17', bezeichnung: 'Künstliche optische Strahlung', preis: '75,00 €' },
        { code: 'G19 EU', bezeichnung: 'Dimethylformamid (o. Biomonitoring)', preis: '63,83 €' },
        { code: 'G19 NU', bezeichnung: 'Dimethylformamid (m. Biomonitoring)', preis: '109,29 €' },
      ],
    },
    {
      titel: 'Einzeluntersuchungen G20–G46',
      zeilen: [
        { code: 'G20 EU, NU', bezeichnung: 'Lärm 1', preis: '40,00 €' },
        { code: 'G21 EU, NU', bezeichnung: 'Kälte', preis: '60,00 €' },
        { code: 'G22', bezeichnung: 'Säureschäden der Zähne', preis: '32,00 €' },
        { code: 'G23 EU, NU', bezeichnung: 'Obstruktive Atemwegserkrankungen', preis: '83,23 €' },
        { code: 'G24 EU, NU', bezeichnung: 'Hautbelastung', preis: '40,00 €' },
        { code: 'G25 EU, NU', bezeichnung: 'Fahren, Steuern, Überwachen (o. Perimetrie)', preis: '116,00 €' },
        { code: 'G26.1 EU, NU', bezeichnung: 'Atemschutzgeräte Gruppe 1', preis: '100,00 €' },
        { code: 'G26.2 EU, NU', bezeichnung: 'Atemschutzgeräte Gruppe 2', preis: '140,00 €' },
        { code: 'G26.3 EU, NU', bezeichnung: 'Atemschutzgeräte Gruppe 3', preis: '180,00 €' },
        { code: 'G27 EU', bezeichnung: 'Isocyanate', preis: '107,82 €' },
        { code: 'G27 NU', bezeichnung: 'Isocyanate', preis: '83,24 €' },
        { code: 'G28', bezeichnung: 'Sauerstoffreduzierte Atmosphäre', preis: '74,76 €' },
        { code: 'G29 EU', bezeichnung: 'Toluol und Xylol (o. Biomonitoring)', preis: '64,70 €' },
        { code: 'G29 NU', bezeichnung: 'Toluol und Xylol (m. Biomonitoring)', preis: '288,53 €' },
        { code: 'G30 EU, NU', bezeichnung: 'Hitzearbeiten (inkl. Rö-Thorax)', preis: '93,12 €', einheit: 'zzgl. Rö.' },
        { code: 'G31 EU, NU', bezeichnung: 'Überdruck (inkl. Rö. alle 5 J.)', preis: '164,90 €', einheit: 'zzgl. Rö.' },
        { code: 'G32 EU', bezeichnung: 'Cadmium', preis: '182,91 €' },
        { code: 'G32 NU', bezeichnung: 'Cadmium', preis: '217,88 €' },
        { code: 'G33 EU', bezeichnung: 'Aromatische Nitro- und Aminoverbindungen', preis: '95,30 €' },
        { code: 'G33 NU', bezeichnung: 'Aromatische Nitro- und Aminoverbindungen', preis: '105,27 €' },
        { code: 'G34 EU', bezeichnung: 'Fluor (o. Biomonitoring)', preis: '112,08 €' },
        { code: 'G34 NU', bezeichnung: 'Fluor (m. Biomonitoring)', preis: '151,24 €' },
        { code: 'G34 NU', bezeichnung: 'Fluor (alternative Variante)', preis: '126,95 €' },
        { code: 'G35 EU', bezeichnung: 'Ausland, Tropen', preis: '150,00 €' },
        { code: 'G35 NU', bezeichnung: 'Ausland, Tropen', preis: '173,37 €', einheit: 'ggf. zzgl. spez. Labor' },
        { code: 'G36 EU, NU', bezeichnung: 'Vinylchlorid', preis: '45,56 €' },
        { code: 'G37', bezeichnung: 'Bildschirmarbeit', preis: '50,00 €' },
        { code: 'G38 EU, NU', bezeichnung: 'Nickel', preis: '150,00 €', einheit: 'zzgl. Urin Nickel' },
        { code: 'G39 EU, NU', bezeichnung: 'Schweißrauche (inkl. Rö. alle 6 J.)', preis: '108,00 €', einheit: 'zzgl. Rö.' },
        { code: 'G40 EU, NU', bezeichnung: 'Krebserzeugende Stoffe', preis: '102,00 €' },
        { code: 'G41 EU, NU', bezeichnung: 'Absturzgefahr (bis 40 Jahre)', preis: '160,00 €' },
        { code: 'G41 EU, NU', bezeichnung: 'Absturzgefahr (ab 40 Jahre)', preis: '180,00 €' },
        { code: 'G42 EU, NU', bezeichnung: 'Infektionsgefährdung', preis: '135,00 €', einheit: 'zzgl. spez. Labor' },
        { code: 'G44 EU, NU', bezeichnung: 'Hartholzstaube', preis: '50,00 €' },
        { code: 'G45 EU', bezeichnung: 'Styrol', preis: '88,00 €' },
        { code: 'G45 NU', bezeichnung: 'Styrol', preis: '112,00 €' },
        { code: 'G46 EU, NU', bezeichnung: 'Belastung Muskel- und Skelettsystem', preis: '65,00 €' },
        { code: 'H9 u. G41 EU, NU', bezeichnung: 'Baumarbeiten, Absturzgefahr (bis 40 J.)', preis: '175,38 €' },
        { code: 'H9 u. G41 EU, NU', bezeichnung: 'Baumarbeiten, Absturzgefahr (ab 40 J.)', preis: '192,18 €' },
      ],
    },
    {
      titel: 'Kombinationsuntersuchungen',
      zeilen: [
        { code: 'G1.2, G4', bezeichnung: 'Asbestfaserhaltiger Staub, Gefahrstoffe Hautkrebs', preis: '150,53 €' },
        { code: 'G1.2, G4, G37', bezeichnung: 'Asbestfaserhaltiger Staub, Gefahrstoffe Hautkrebs, Bildschirmarbeit', preis: '190,53 €' },
        { code: 'G1.2, G41 EU/NU', bezeichnung: 'Asbestfaserhaltiger Staub, Absturzgefahr (bis 40 J.)', preis: '243,21 €' },
        { code: 'G1.2, G41 EU/NU', bezeichnung: 'Asbestfaserhaltiger Staub, Absturzgefahr (ab 40 J.)', preis: '263,21 €' },
        { code: 'G1.3, G26.2', bezeichnung: 'Künstlicher mineralischer Staub, Atemschutz Gruppe 2', preis: '223,21 €' },
        { code: 'G1.4, G20', bezeichnung: 'Allgemeiner Staub, Lärm 1', preis: '105,75 €' },
        { code: 'G1.4, G23, G26.2, G41, G46', bezeichnung: 'Allg. Staub, Atemwege, Atemschutz 2, Absturz (bis 40 J.), Muskel-Skelett', preis: '270,00 €' },
        { code: 'G1.4, G23, G26.2, G41, G46', bezeichnung: 'Allg. Staub, Atemwege, Atemschutz 2, Absturz (ab 40 J.), Muskel-Skelett', preis: '290,00 €' },
        { code: 'G1.4, G24, G25', bezeichnung: 'Allgemeiner Staub, Hautbelastung, Fahr-Steuer-Überwachung', preis: '171,75 €' },
        { code: 'G1.4, G24, G39', bezeichnung: 'Allgemeiner Staub, Hautbelastung, Schweißrauche', preis: '188,75 €' },
        { code: 'G1.4, G24, G41', bezeichnung: 'Allgemeiner Staub, Hautbelastung, Absturzgefahr (bis 40 J.)', preis: '240,75 €' },
        { code: 'G1.4, G24, G41', bezeichnung: 'Allgemeiner Staub, Hautbelastung, Absturzgefahr (ab 40 J.)', preis: '260,75 €' },
        { code: 'G1.4, G46', bezeichnung: 'Allgemeiner Staub, Muskel- und Skelettsystem', preis: '130,75 €' },
        { code: 'G4, G7, G15, G20, G24, G25, G26.2, G30, G37, G40, G41, G46', bezeichnung: 'Großpaket inkl. Hitzearbeiten, Absturzgefahr (bis 40 J.)', preis: '307,00 €' },
        { code: 'G4, G7, G15, G20, G24, G25, G26.2, G30, G37, G40, G41, G46', bezeichnung: 'Großpaket inkl. Hitzearbeiten, Absturzgefahr (ab 40 J.)', preis: '327,00 €' },
        { code: 'G4, G7, G15, G20, G24, G25, G26.2, G30, G39, G40, G41, G46', bezeichnung: 'Großpaket inkl. Schweißrauche, Absturzgefahr (bis 40 J.)', preis: '307,00 €' },
        { code: 'G4, G7, G15, G20, G24, G25, G26.2, G30, G39, G40, G41, G46', bezeichnung: 'Großpaket inkl. Schweißrauche, Absturzgefahr (ab 40 J.)', preis: '327,00 €' },
        { code: 'G4, G7, G20, G24, G25, G26.2, G39, G46', bezeichnung: 'Gefahrstoffe, Kohlenmonoxid, Lärm, Haut, Fahr-Steuer, Atemschutz 2, Schweißrauche, Muskel-Skelett', preis: '250,00 €' },
        { code: 'G4, G20, G25', bezeichnung: 'Gefahrstoffe, Lärm 1, Fahr-Steuer-Überwachung', preis: '198,32 €' },
        { code: 'G4, G20, G25, G37, G40, G46', bezeichnung: 'Gefahrstoffe, Lärm, Fahr-Steuer, Bildschirm, Krebs, Muskel-Skelett', preis: '263,00 €' },
        { code: 'G15, G20, G24, G25, G26.2, G30, G37, G41, G46', bezeichnung: 'Chrom VI, Lärm, Haut, Fahr-Steuer, Atemschutz 2, Hitze, Bildschirm, Absturz (bis 40 J.), Muskel-Skelett', preis: '270,00 €' },
        { code: 'G15, G20, G24, G25, G26.2, G30, G37, G41, G46', bezeichnung: 'Chrom VI, Lärm, Haut, Fahr-Steuer, Atemschutz 2, Hitze, Bildschirm, Absturz (ab 40 J.), Muskel-Skelett', preis: '290,00 €' },
        { code: 'G15, G20, G24, G25, G26.2, G39, G40', bezeichnung: 'Chrom VI, Lärm, Haut, Fahr-Steuer, Atemschutz 2, Schweißrauche, Krebs', preis: '287,00 €' },
        { code: 'G20, G23', bezeichnung: 'Lärm 1, obstruktive Atemwegserkrankung', preis: '123,23 €' },
        { code: 'G20, G23, G24', bezeichnung: 'Lärm 1, obstruktive Atemwegserkrankung, Hautbelastung', preis: '163,23 €' },
        { code: 'G20, G23, G24, G26.2, G27, G29, G37', bezeichnung: 'Lärm, Atemwege, Haut, Atemschutz 2, Isocyanate, Toluol/Xylol, Bildschirm', preis: '292,82 €' },
        { code: 'G20, G23, G24, G26.2, G27, G29', bezeichnung: 'Lärm, Atemwege, Haut, Atemschutz 2, Isocyanate, Toluol/Xylol', preis: '292,82 €' },
        { code: 'G20, G23, G25, G26.2, G29, G37, G42', bezeichnung: 'Lärm, Atemwege, Fahr-Steuer, Atemschutz 2, Toluol/Xylol, Bildschirm, Infektionsgefahr', preis: '320,00 €' },
        { code: 'G20, G24', bezeichnung: 'Lärm 1, Hautbelastung', preis: '80,00 €' },
        { code: 'G20, G24, G25', bezeichnung: 'Lärm 1, Hautbelastung, Fahr-Steuer-Überwachung', preis: '171,00 €' },
        { code: 'G20, G24, G25, G39', bezeichnung: 'Lärm, Haut, Fahr-Steuer, Schweißrauche', preis: '279,00 €' },
        { code: 'G20, G24, G25, G41, G46', bezeichnung: 'Lärm, Haut, Fahr-Steuer, Absturzgefahr (bis 40 J.), Muskel-Skelett', preis: '270,00 €' },
        { code: 'G20, G24, G25, G41, G46', bezeichnung: 'Lärm, Haut, Fahr-Steuer, Absturzgefahr (ab 40 J.), Muskel-Skelett', preis: '290,00 €' },
        { code: 'G20, G24, G25, G46', bezeichnung: 'Lärm, Hautbelastung, Fahr-Steuer, Muskel-Skelett', preis: '236,00 €' },
        { code: 'G20, G24, G26.2', bezeichnung: 'Lärm 1, Hautbelastung, Atemschutz Gruppe 2', preis: '195,00 €' },
        { code: 'G20, G24, G37, G46', bezeichnung: 'Lärm, Haut, Bildschirmarbeit, Muskel-Skelett', preis: '195,00 €' },
        { code: 'G20, G24, G41', bezeichnung: 'Lärm 1, Hautbelastung, Absturzgefahr (bis 40 J.)', preis: '215,00 €' },
        { code: 'G20, G24, G41', bezeichnung: 'Lärm 1, Hautbelastung, Absturzgefahr (ab 40 J.)', preis: '235,00 €' },
        { code: 'G20, G24, G46', bezeichnung: 'Lärm 1, Hautbelastung, Muskel- und Skelettsystem', preis: '145,00 €' },
        { code: 'G20, G25', bezeichnung: 'Lärm 1, Fahr-Steuer-Überwachung', preis: '131,00 €' },
        { code: 'G20, G25, G26.1, G37, G41', bezeichnung: 'Lärm, Fahr-Steuer, Atemschutz 1, Bildschirm, Absturzgefahr (bis 40 J.)', preis: '205,00 €' },
        { code: 'G20, G25, G26.1, G37, G41', bezeichnung: 'Lärm, Fahr-Steuer, Atemschutz 1, Bildschirm, Absturzgefahr (ab 40 J.)', preis: '225,00 €' },
        { code: 'G20, G25, G26.2, G37', bezeichnung: 'Lärm, Fahr-Steuer, Atemschutz 2, Bildschirmarbeit', preis: '185,00 €' },
        { code: 'G20, G25, G27', bezeichnung: 'Lärm 1, Fahr-Steuer-Überwachung, Isocyanate', preis: '238,82 €' },
        { code: 'G20, G25, G27, G37', bezeichnung: 'Lärm, Fahr-Steuer, Isocyanate, Bildschirmarbeit', preis: '253,82 €' },
        { code: 'G20, G25, G37', bezeichnung: 'Lärm 1, Fahr-Steuer-Überwachung, Bildschirmarbeit', preis: '146,00 €' },
        { code: 'G20, G25, G37, G39, G41', bezeichnung: 'Lärm, Fahr-Steuer, Bildschirm, Schweißrauche, Absturzgefahr (bis 40 J.)', preis: '313,00 €' },
        { code: 'G20, G25, G37, G39, G41', bezeichnung: 'Lärm, Fahr-Steuer, Bildschirm, Schweißrauche, Absturzgefahr (ab 40 J.)', preis: '333,00 €' },
        { code: 'G20, G25, G41', bezeichnung: 'Lärm 1, Fahr-Steuer-Überwachung, Absturzgefahr (bis 40 J.)', preis: '190,00 €' },
        { code: 'G20, G25, G41', bezeichnung: 'Lärm 1, Fahr-Steuer-Überwachung, Absturzgefahr (ab 40 J.)', preis: '210,00 €' },
        { code: 'G20, G26.1, G37, G41', bezeichnung: 'Lärm, Atemschutz 1, Bildschirm, Absturzgefahr (bis 40 J.)', preis: '205,00 €' },
        { code: 'G20, G26.1, G37, G41', bezeichnung: 'Lärm, Atemschutz 1, Bildschirm, Absturzgefahr (ab 40 J.)', preis: '225,00 €' },
        { code: 'G20, G27', bezeichnung: 'Lärm 1, Isocyanate', preis: '147,82 €' },
        { code: 'G20, G29, G42', bezeichnung: 'Lärm 1, Toluol und Xylol, Infektionsgefährdung', preis: '249,76 €' },
        { code: 'G20, G30, G39', bezeichnung: 'Lärm 1, Hitzearbeiten, Schweißrauche', preis: '241,12 €' },
        { code: 'G20, G37', bezeichnung: 'Lärm 1, Bildschirmarbeit', preis: '90,00 €' },
        { code: 'G20, G41', bezeichnung: 'Lärm 1, Absturzgefahr (bis 40 J.)', preis: '175,00 €' },
        { code: 'G20, G41', bezeichnung: 'Lärm 1, Absturzgefahr (ab 40 J.)', preis: '195,00 €' },
        { code: 'G20, G41, G46', bezeichnung: 'Lärm, Absturzgefahr (bis 40 J.), Muskel-Skelett', preis: '215,00 €' },
        { code: 'G20, G41, G46', bezeichnung: 'Lärm, Absturzgefahr (ab 40 J.), Muskel-Skelett', preis: '235,00 €' },
        { code: 'G24, G25', bezeichnung: 'Hautbelastung, Fahr-Steuer-Überwachung', preis: '156,00 €' },
        { code: 'G24, G25, G37', bezeichnung: 'Hautbelastung, Fahr-Steuer, Bildschirmarbeit', preis: '171,00 €' },
        { code: 'G24, G26.2', bezeichnung: 'Hautbelastung, Atemschutz Gruppe 2', preis: '180,00 €' },
        { code: 'G24, G26.3', bezeichnung: 'Hautbelastung, Atemschutz Gruppe 3', preis: '220,00 €' },
        { code: 'G24, G26.2, G34', bezeichnung: 'Hautbelastung, Atemschutz 2, Fluor', preis: '294,08 €' },
        { code: 'G24, G37', bezeichnung: 'Hautbelastung, Bildschirmarbeit', preis: '90,00 €' },
        { code: 'G24, G42', bezeichnung: 'Hautbelastung, Infektionsgefährdung', preis: '155,00 €' },
        { code: 'G24, G46', bezeichnung: 'Hautbelastung, Muskel- und Skelettsystem', preis: '105,00 €' },
        { code: 'G25, G37', bezeichnung: 'Fahr-Steuer-Überwachung, Bildschirmarbeit', preis: '131,00 €' },
        { code: 'G25, G37, G41', bezeichnung: 'Fahr-Steuer, Bildschirm, Absturzgefahr (bis 40 J.)', preis: '190,00 €' },
        { code: 'G25, G37, G41', bezeichnung: 'Fahr-Steuer, Bildschirm, Absturzgefahr (ab 40 J.)', preis: '210,00 €' },
        { code: 'G25, G39, G41', bezeichnung: 'Fahr-Steuer, Schweißrauche, Absturzgefahr (bis 40 J.)', preis: '303,00 €' },
        { code: 'G25, G39, G41', bezeichnung: 'Fahr-Steuer, Schweißrauche, Absturzgefahr (ab 40 J.)', preis: '323,00 €' },
        { code: 'G25, G41', bezeichnung: 'Fahr-Steuer-Überwachung, Absturzgefahr (bis 40 J.)', preis: '175,00 €' },
        { code: 'G25, G41', bezeichnung: 'Fahr-Steuer-Überwachung, Absturzgefahr (ab 40 J.)', preis: '195,00 €' },
        { code: 'G26.1, G37, G40', bezeichnung: 'Atemschutz 1, Bildschirm, Krebserzeugende Gefahrstoffe', preis: '217,00 €' },
        { code: 'G26.2, G27', bezeichnung: 'Atemschutz Gruppe 2, Isocyanate', preis: '247,82 €' },
        { code: 'G26.2, G37, G41', bezeichnung: 'Atemschutz 2, Bildschirm, Absturzgefahr (bis 40 J.)', preis: '190,00 €' },
        { code: 'G26.2, G37, G41', bezeichnung: 'Atemschutz 2, Bildschirm, Absturzgefahr (ab 40 J.)', preis: '210,00 €' },
        { code: 'G26.3, G37', bezeichnung: 'Atemschutz Gruppe 3, Bildschirmarbeit', preis: '195,00 €' },
        { code: 'G26.3, G41', bezeichnung: 'Atemschutz Gruppe 3, Absturzgefahr (bis 40 J.)', preis: '195,00 €' },
        { code: 'G26.3, G41', bezeichnung: 'Atemschutz Gruppe 3, Absturzgefahr (ab 40 J.)', preis: '215,00 €' },
        { code: 'G27 EU, G29 EU', bezeichnung: 'Isocyanate, Toluol und Xylol', preis: '122,82 €' },
        { code: 'G27 NU, G29 NU', bezeichnung: 'Isocyanate, Toluol und Xylol', preis: '163,53 €' },
        { code: 'G37, G39', bezeichnung: 'Bildschirmarbeit, Schweißrauche', preis: '158,00 €' },
        { code: 'G37, G39, G41', bezeichnung: 'Bildschirm, Schweißrauche, Absturzgefahr (bis 40 J.)', preis: '283,00 €' },
        { code: 'G37, G39, G41', bezeichnung: 'Bildschirm, Schweißrauche, Absturzgefahr (ab 40 J.)', preis: '303,00 €' },
        { code: 'G37, G40', bezeichnung: 'Bildschirmarbeit, Krebserzeugende Gefahrstoffe', preis: '117,00 €' },
        { code: 'SSt., G25, G26.2', bezeichnung: 'Strahlenschutz, Fahr-Steuer, Atemschutz Gruppe 2', preis: '275,00 €' },
      ],
    },
  ],
};

// ─── Sonderuntersuchungen ─────────────────────────────────────────────────────

const sonderuntersuchungen = {
  sektionen: [
    {
      titel: 'Tauglichkeitsuntersuchungen',
      zeilen: [
        { code: 'AWMF', bezeichnung: 'AWMF u. Offshore EU, NU', preis: '280,00 €' },
        { code: 'OEUK', bezeichnung: 'Offshore / OEUK / Chester Step', preis: '350,00 €' },
        { code: 'FEV', bezeichnung: 'Führerschein LKW, Bus, Personenbeförderung', preis: '180,00 €' },
        { code: 'MPU', bezeichnung: 'MPU', preis: '90,00 €' },
        { code: 'SSt.', bezeichnung: 'Strahlenschutz EU, NU', preis: '120,00 €', einheit: 'ggf. zzgl. Rö.' },
      ],
    },
    {
      titel: 'Diagnostik-Einzelleistungen',
      zeilen: [
        { code: 'Ergo', bezeichnung: 'Ergometrie', preis: '38,91 €' },
        { code: 'EKG', bezeichnung: 'EKG', preis: '22,13 €' },
        { code: 'Farbtafel', bezeichnung: 'Farbsehtest', preis: '8,78 €' },
        { code: 'Sehtest', bezeichnung: 'Einfacher Sehtest', preis: '36,78 €' },
        { code: 'Peri', bezeichnung: 'Perimetrie', preis: '50,54 €' },
        { code: 'Hörtest', bezeichnung: 'Hörtest', preis: '13,82 €' },
        { code: 'LuFu', bezeichnung: 'Lungenfunktion', preis: '33,41 €' },
        { code: 'Rö', bezeichnung: 'Rö-Thorax', preis: '62,00 €' },
        { code: 'SCC', bezeichnung: 'Schweißaufsicht Sehtest', preis: '20,00 €' },
        { code: 'DIN', bezeichnung: 'DIN EN ISO 9712', preis: '45,51 €' },
        { code: 'GMP', bezeichnung: 'GMP Qualitätskontrolle', preis: '55,00 €' },
      ],
    },
    {
      titel: 'Impfleistungen',
      zeilen: [
        { code: 'Beratung', bezeichnung: 'Impfberatung', preis: '65,00 €' },
        { code: 'Impfen', bezeichnung: 'Impfen (je Injektion)', preis: '25,17 €' },
        { code: 'Beschein.', bezeichnung: 'Bescheinigung Bildschirmbrille, Med. Cert., Drogentestnachweis etc.', preis: '15,00 €' },
      ],
    },
    {
      titel: 'Weitere Untersuchungen',
      zeilen: [
        { code: 'Tauch', bezeichnung: 'Tauchtauglichkeits-Untersuchung', preis: '106,88 €', einheit: 'zzgl. Labor' },
        { code: 'Sport', bezeichnung: 'Untersuchung für Sportbootführerschein', preis: '105,00 €', einheit: 'zzgl. Labor' },
      ],
    },
  ],
};

// ─── Labor ────────────────────────────────────────────────────────────────────

const labor = {
  sektionen: [
    {
      titel: 'Laborpakete für G-Untersuchungen',
      zeilen: [
        { bezeichnung: 'Kleines Labor: kl. BB, Krea, GPT, γ-GT, HbA1c', preis: '24,00 €' },
        { bezeichnung: 'Labor G35 (Auslandstauglichkeit)', preis: '113,70 €' },
        { bezeichnung: 'Labor G42 (Infektionskrankheiten)', preis: '109,72 €' },
        { bezeichnung: 'Strahlenschutz-Labor: BSG, Urin, gr. BB, TSH, Quick, PTT', preis: '30,00 €' },
        { bezeichnung: 'Hepatitis A oder B Titer', preis: '24,00 €' },
        { bezeichnung: 'Vitamin B12', preis: '42,00 €' },
        { bezeichnung: 'Vitamin D3', preis: '55,00 €' },
      ],
    },
    {
      titel: 'Blut- und Urinuntersuchungen',
      zeilen: [
        { bezeichnung: 'Blei (EDTA, Vollblut)', preis: '40,00 €' },
        { bezeichnung: 'Urin-Stix', preis: '9,00 €' },
        { bezeichnung: 'CDT (Urin)', preis: '45,00 €' },
        { bezeichnung: 'Nickel im Urin', preis: '72,00 €' },
        { bezeichnung: 'Chrom im Urin', preis: '44,00 €' },
        { bezeichnung: 'Aluminium im Urin', preis: '44,00 €' },
        { bezeichnung: 'Alu, Chrom, Nickel im Urin (Kombination)', preis: '160,00 €' },
        { bezeichnung: 'Fluorid im Urin', preis: '45,00 €' },
        { bezeichnung: 'Benzol im Urin (f. G8)', preis: '46,00 €' },
        { bezeichnung: 't-Muconsäure im Urin (f. G8)', preis: '46,00 €' },
        { bezeichnung: 'Phenylmerkaptursäure im Urin (f. G8)', preis: '46,00 €' },
        { bezeichnung: 'Toluol im Serum (f. G29)', preis: '70,00 €' },
        { bezeichnung: 'Xylol im Serum (f. G29)', preis: '70,00 €' },
        { bezeichnung: 'Drogenscreening (groß, Urin)', preis: '75,00 €', einheit: 'im Labor / 25,00 € in Praxis' },
      ],
    },
  ],
};

// ─── Impfungen ────────────────────────────────────────────────────────────────

const impfungen = {
  sektionen: [
    {
      titel: 'Schutzimpfungen',
      zeilen: [
        { bezeichnung: 'Influvac m. Kanüle (unter 60 Jahre)', preis: '45,00 €' },
        { bezeichnung: 'Efluelda (über 60 Jahre)', preis: '60,00 €' },
        { bezeichnung: 'Boostrix Polio', preis: '45,00 €' },
        { bezeichnung: 'Boostrix (Covaxis)', preis: '40,00 €' },
        { bezeichnung: 'FSME (Encepur)', preis: '60,00 €' },
        { bezeichnung: 'Twinrix', preis: '110,00 €' },
        { bezeichnung: 'Havrix (Hepatitis A)', preis: '95,00 €' },
        { bezeichnung: 'Engerix B (Hepatitis B)', preis: '97,00 €' },
        { bezeichnung: 'Tollwut (Rabipur)', preis: '102,00 €' },
        { bezeichnung: 'MMR', preis: '60,00 €' },
        { bezeichnung: 'Cholera (Dukoral)', preis: '85,00 €' },
        { bezeichnung: 'Japanische Enzephalitis (Ixario)', preis: '100,00 €' },
        { bezeichnung: 'Meningokokken (Nimenrix)', preis: '54,00 €' },
        { bezeichnung: 'Typhus (Typhoral Kps.)', hinweis: 'auf Anfrage' },
        { bezeichnung: 'Typhus (Typhim Injektion)', preis: '36,00 €' },
        { bezeichnung: 'Dengue-Fieber (Qdenga)', hinweis: 'auf Anfrage' },
        { bezeichnung: 'Pneumokokken (Prevenar 20)', hinweis: 'auf Anfrage' },
        { bezeichnung: 'Herpes zoster (Shingrix)', preis: '295,00 €' },
        { bezeichnung: 'Varizellen (Varivax)', hinweis: 'auf Anfrage' },
      ],
    },
  ],
};

// ─── Migration ────────────────────────────────────────────────────────────────

const categories = [
  { category: 'g-untersuchungen', data: gUntersuchungen },
  { category: 'sonderuntersuchungen', data: sonderuntersuchungen },
  { category: 'labor', data: labor },
  { category: 'impfungen', data: impfungen },
];

function addKeys(sektionen) {
  return sektionen.map((sektion, si) => ({
    _type: 'preisSektion',
    _key: `sektion-${si}`,
    titel: sektion.titel,
    zeilen: sektion.zeilen.map((zeile, zi) => ({
      _type: 'preisZeile',
      _key: `zeile-${si}-${zi}`,
      ...zeile,
    })),
  }));
}

async function migrate() {
  for (const { category, data } of categories) {
    const existing = await client.fetch(
      `*[_type == "priceList" && category == $cat][0]{ _id }`,
      { cat: category }
    );

    const sektionen = addKeys(data.sektionen);
    const updatedAt = '2026-04-22';

    if (existing?._id) {
      await client.patch(existing._id).set({ sektionen, updatedAt }).commit();
      console.log(`✓ Aktualisiert: ${category}`);
    } else {
      await client.create({ _type: 'priceList', category, sektionen, updatedAt });
      console.log(`✓ Erstellt: ${category}`);
    }
  }

  console.log('\nMigration abgeschlossen.');
  console.log('Hinweis: Ein neues Vercel-Deployment auslösen damit die Preise live sind.');
}

migrate().catch((err) => {
  console.error('Fehler:', err.message);
  process.exit(1);
});
