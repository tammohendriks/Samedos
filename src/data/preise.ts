export interface PreisZeile {
  code?: string;
  bezeichnung: string;
  preis?: string;
  einheit?: string;
  hinweis?: string;
}

export interface PreisSektion {
  titel: string;
  zeilen: PreisZeile[];
}

export interface PreisTabelleDaten {
  sektionen: PreisSektion[];
  spalten?: string[];
}

export const gUntersuchungen: PreisTabelleDaten = {
  spalten: ['Bezeichnung', 'Preis (netto)'],
  sektionen: [
    {
      titel: 'Grundsätzliches',
      zeilen: [
        { bezeichnung: 'Stundensatz (Beratung, Begehung, Schulung etc.)', preis: '150,00 €', einheit: 'pro Stunde' },
        { bezeichnung: 'Gefährdungsbeurteilung', preis: '150,00 €', einheit: 'pro Stunde' },
        { bezeichnung: 'Fahrtkosten', hinweis: 'nach Aufwand' },
      ],
    },
    {
      titel: 'Einzel-Vorsorgeuntersuchungen',
      zeilen: [
        { bezeichnung: 'G 1.1 – Mineralischer Staub (Silikose)', preis: '94,07 €' },
        { bezeichnung: 'G 1.2 – Mineralischer Staub (Asbest)', preis: '94,07 €' },
        { bezeichnung: 'G 1.3 – Mineralischer Staub (allg. Staub)', preis: '77,28 €' },
        { bezeichnung: 'G 1.4 – Wechselschicht-Tätigkeit', preis: '50,00 €' },
        { bezeichnung: 'G 2 – Blei', preis: '94,07 €' },
        { bezeichnung: 'G 3 – Bleialkyle', preis: '94,07 €' },
        { bezeichnung: 'G 4 – Quecksilber', preis: '94,07 €' },
        { bezeichnung: 'G 5 – Glykoldinitrat / Nitroglyzerin', preis: '74,02 €' },
        { bezeichnung: 'G 6 – Schwefelkohlenstoff', preis: '81,55 €' },
        { bezeichnung: 'G 7 – Kohlenmonoxid', preis: '77,28 €' },
        { bezeichnung: 'G 8 – Benzol, Toluol, Xylol', preis: '94,07 €' },
        { bezeichnung: 'G 9 – Trichlor-Ethylen', preis: '94,07 €' },
        { bezeichnung: 'G 10 – Methanol', preis: '94,07 €' },
        { bezeichnung: 'G 11 – Dimethylformamid', preis: '94,07 €' },
        { bezeichnung: 'G 12 – Organische Phosphorverbindungen', preis: '94,07 €' },
        { bezeichnung: 'G 13 – Tetrachlorkohlenstoff u. ä.', preis: '94,07 €' },
        { bezeichnung: 'G 14 – Trichlormethan', preis: '94,07 €' },
        { bezeichnung: 'G 15 – Chrom und seine Verbindungen', preis: '94,07 €' },
        { bezeichnung: 'G 16 – Arsen', preis: '94,07 €' },
        { bezeichnung: 'G 17 – Hartholzstaub', preis: '82,42 €' },
        { bezeichnung: 'G 18 – Nickel', preis: '94,07 €' },
        { bezeichnung: 'G 19 – Dimethylaminoethanol', preis: '94,07 €' },
        { bezeichnung: 'G 20 – Lärm', preis: '71,13 €' },
        { bezeichnung: 'G 21 – Kältearbeiten', preis: '74,02 €' },
        { bezeichnung: 'G 22 – Säuren', preis: '74,02 €' },
        { bezeichnung: 'G 23 – Obstruktive Atemwegserkrankungen', preis: '77,28 €' },
        { bezeichnung: 'G 24 – Hauterkrankungen', preis: '67,85 €' },
        { bezeichnung: 'G 25 – Fahr-, Steuer- und Überwachungstätigkeiten', preis: '120,22 €' },
        { bezeichnung: 'G 26 – Atemschutzgeräte', preis: '88,43 €' },
        { bezeichnung: 'G 27 – Isocyanate', preis: '94,07 €' },
        { bezeichnung: 'G 28 – Formaldehyd', preis: '81,55 €' },
        { bezeichnung: 'G 29 – Benzolhomologe Styrol', preis: '94,07 €' },
        { bezeichnung: 'G 30 – Hitzearbeiten', preis: '74,02 €' },
        { bezeichnung: 'G 31 – Überdruck', preis: '81,55 €' },
        { bezeichnung: 'G 32 – Cadmium', preis: '94,07 €' },
        { bezeichnung: 'G 33 – Butanol', preis: '94,07 €' },
        { bezeichnung: 'G 34 – Fluor', preis: '81,55 €' },
        { bezeichnung: 'G 35 – Arbeitsaufenthalt im Ausland', preis: '77,28 €' },
        { bezeichnung: 'G 36 – Vinylchlorid', preis: '94,07 €' },
        { bezeichnung: 'G 37 – Bildschirmarbeitsplätze', preis: '67,85 €' },
        { bezeichnung: 'G 38 – Nickelverbindungen', preis: '94,07 €' },
        { bezeichnung: 'G 39 – Schweißrauche', preis: '94,07 €' },
        { bezeichnung: 'G 40 – Krebserzeugende Gefahrstoffe', preis: '94,07 €' },
        { bezeichnung: 'G 41 – Arbeiten mit Absturzgefahr', preis: '94,07 €' },
        { bezeichnung: 'G 42 – Infektionskrankheiten', preis: '73,17 €' },
        { bezeichnung: 'G 43 – Tätigkeiten mit Weichmachern', preis: '94,07 €' },
        { bezeichnung: 'G 44 – Butan-2-on', preis: '94,07 €' },
        { bezeichnung: 'G 45 – Styrol', preis: '94,07 €' },
        { bezeichnung: 'G 46 – Belastungen des Muskel-Skelett-Systems', preis: '67,85 €' },
        { bezeichnung: 'H 9 – Nacht- und Schichtarbeit', preis: '67,85 €' },
      ],
    },
    {
      titel: 'Kombi-Untersuchungen (Beispiele)',
      zeilen: [
        { bezeichnung: 'G 20 + G 26 (Lärm + Atemschutz)', preis: '133,03 €' },
        { bezeichnung: 'G 20 + G 37 (Lärm + Bildschirm)', preis: '116,22 €' },
        { bezeichnung: 'G 20 + G 41 (Lärm + Absturz)', preis: '133,03 €' },
        { bezeichnung: 'G 25 + G 26 (Fahr/Steuer + Atemschutz)', preis: '175,63 €' },
        { bezeichnung: 'G 25 + G 41 (Fahr/Steuer + Absturz)', preis: '175,63 €' },
        { bezeichnung: 'G 26 + G 41 (Atemschutz + Absturz)', preis: '141,38 €' },
        { bezeichnung: 'G 20 + G 25 (Lärm + Fahr/Steuer)', preis: '165,53 €' },
        { bezeichnung: 'G 20 + G 26 + G 41 (Lärm + Atemschutz + Absturz)', preis: '166,43 €' },
        { bezeichnung: 'G 20 + G 25 + G 26 (Lärm + Fahr/Steuer + Atemschutz)', preis: '199,03 €' },
        { bezeichnung: 'G 20 + G 25 + G 41 (Lärm + Fahr/Steuer + Absturz)', preis: '199,03 €' },
        { bezeichnung: 'G 20 + G 25 + G 26 + G 41', preis: '199,03 €' },
        { bezeichnung: 'G 25 + G 26 + G 41 (Fahr/Steuer + Atemschutz + Absturz)', preis: '187,53 €' },
        { bezeichnung: 'G 42 + G 35 (Infektionskrankheiten + Auslandsaufenthalt)', preis: '117,45 €' },
      ],
    },
  ],
};

export const sonderuntersuchungen: PreisTabelleDaten = {
  spalten: ['Bezeichnung', 'Preis (netto)'],
  sektionen: [
    {
      titel: 'Spezial-Tauglichkeitsuntersuchungen',
      zeilen: [
        { bezeichnung: 'AWMF / Offshore-Tauglichkeit', preis: '280,00 €' },
        { bezeichnung: 'FEV / Feuerwehrtauglichkeit', preis: '180,00 €' },
        { bezeichnung: 'Einstellungsuntersuchung allgemein', preis: '150,00 €' },
        { bezeichnung: 'Triebfahrzeugführer (TfZ)', preis: '250,00 €' },
        { bezeichnung: 'Gefahrgutfahrer ADR', preis: '120,00 €' },
        { bezeichnung: 'Hafenarbeiter', preis: '120,00 €' },
        { bezeichnung: 'Kranführer', preis: '120,00 €' },
        { bezeichnung: 'Flurförderfahrzeuge', preis: '90,00 €' },
      ],
    },
    {
      titel: 'Diagnostik-Einzelleistungen',
      zeilen: [
        { bezeichnung: 'EKG (Ruhe)', preis: '22,13 €' },
        { bezeichnung: 'EKG (Belastung / Ergometrie)', preis: '56,04 €' },
        { bezeichnung: 'Lungenfunktion (Spirometrie)', preis: '33,41 €' },
        { bezeichnung: 'Audiometrie (Hörtest)', preis: '22,79 €' },
        { bezeichnung: 'Sehtest (Visus, Farbsehen, Stereosehen)', preis: '18,00 €' },
        { bezeichnung: 'Blutdruckmessung', preis: '5,00 €' },
        { bezeichnung: 'Urinuntersuchung (Stix)', preis: '5,00 €' },
        { bezeichnung: 'Blutentnahme (venös)', preis: '8,00 €' },
        { bezeichnung: 'Blutentnahme (kapillär)', preis: '5,50 €' },
        { bezeichnung: 'Röntgen Thorax (2 Ebenen, inkl. Befundung)', hinweis: 'Zuweisung extern' },
      ],
    },
    {
      titel: 'Bescheinigungen & Gutachten',
      zeilen: [
        { bezeichnung: 'Ärztliche Bescheinigung (einfach)', preis: '20,00 €' },
        { bezeichnung: 'Ärztliches Attest / Gutachten (kurz)', preis: '50,00 €' },
        { bezeichnung: 'Ausführliches Gutachten', preis: '150,00 €', einheit: 'ab' },
        { bezeichnung: 'Zweitmeinung / Beratung', preis: '150,00 €', einheit: 'pro Stunde' },
      ],
    },
    {
      titel: 'Freizeit-Tauglichkeit',
      zeilen: [
        { bezeichnung: 'Sport-/Tauchtauglichkeit', preis: '120,00 €' },
        { bezeichnung: 'Piloten-Tauglichkeit (privat, LAPL)', preis: '150,00 €' },
        { bezeichnung: 'Führerscheingutachten (MPU-Vorbereitung)', preis: '150,00 €', einheit: 'ab' },
      ],
    },
  ],
};

export const labor: PreisTabelleDaten = {
  spalten: ['Leistung', 'Preis (netto, zzgl. MwSt.)'],
  sektionen: [
    {
      titel: 'Labor-Pakete für G-Untersuchungen',
      zeilen: [
        { bezeichnung: 'Labor-Paket: kl. BB, Krea, GPT, γ-GT, HbA1c', preis: '24,00 €' },
        { bezeichnung: 'Labor G35 (Auslandstauglichkeit)', preis: '113,70 €' },
        { bezeichnung: 'Labor G42 (Infektionskrankheiten)', preis: '109,72 €' },
        { bezeichnung: 'Labor Strahlenschutz (BSG, gr. BB, TSH, Quick, PTT)', preis: '30,00 €' },
      ],
    },
    {
      titel: 'Einzelne Laborleistungen',
      zeilen: [
        { bezeichnung: 'Hepatitis A oder B Titer', preis: '24,00 €' },
        { bezeichnung: 'Vitamin B12', preis: '42,00 €' },
        { bezeichnung: 'Vitamin D3', preis: '55,00 €' },
        { bezeichnung: 'Blei (EDTA, Vollblut)', preis: '40,00 €' },
        { bezeichnung: 'Urin-Stix', preis: '9,00 €' },
        { bezeichnung: 'CDT (Urin)', preis: '45,00 €' },
        { bezeichnung: 'Nickel im Urin', preis: '72,00 €' },
        { bezeichnung: 'Chrom im Urin', preis: '44,00 €' },
        { bezeichnung: 'Aluminium im Urin', preis: '44,00 €' },
        { bezeichnung: 'Alu / Chrom / Nickel im Urin (Kombination)', preis: '45,00 €' },
        { bezeichnung: 'Fluorid im Urin', preis: '46,00 €' },
        { bezeichnung: 'Benzol im Urin (G8)', preis: '46,00 €' },
        { bezeichnung: 't-Muconsäure im Urin (G8)', preis: '46,00 €' },
        { bezeichnung: 'Phenylmerkaptursäure im Urin (G8)', preis: '70,00 €' },
        { bezeichnung: 'Toluol im Serum (G29)', preis: '70,00 €' },
        { bezeichnung: 'Xylol im Serum (G29)', preis: '75,00 €', hinweis: 'im Labor' },
        { bezeichnung: 'Drogenscreening (groß, Urin)', hinweis: 'auf Anfrage' },
      ],
    },
  ],
};
