import { useFormValue } from 'sanity';
import type { StringInputProps } from 'sanity';

interface PreisZeile {
  code?: string;
  bezeichnung?: string;
  bezeichnungEN?: string;
  preis?: string;
  einheit?: string;
  hinweis?: string;
}

interface PreisSektion {
  titel?: string;
  titelEN?: string;
  zeilen?: PreisZeile[];
}

const categoryLabelsDE: Record<string, string> = {
  'g-untersuchungen': 'G-Untersuchungen',
  'sonderuntersuchungen': 'Sonderuntersuchungen',
  'labor': 'Labor',
  'impfungen': 'Impfungen',
};

const categoryLabelsEN: Record<string, string> = {
  'g-untersuchungen': 'G-Examinations',
  'sonderuntersuchungen': 'Special Examinations',
  'labor': 'Laboratory',
  'impfungen': 'Vaccinations',
};

const categoryDescsDE: Record<string, string> = {
  'g-untersuchungen': 'Arbeitsmedizinische Vorsorge- und Eignungsuntersuchungen gemäß DGUV Grundsätzen.',
  'sonderuntersuchungen': 'Spezielle arbeitsmedizinische Untersuchungen auf Einzelanfrage.',
  'labor': 'Labordiagnostik im Rahmen arbeitsmedizinischer Vorsorge.',
  'impfungen': 'Schutzimpfungen im betriebsärztlichen Kontext.',
};

const categoryDescsEN: Record<string, string> = {
  'g-untersuchungen': 'Occupational health and fitness-for-work examinations following DGUV guidelines.',
  'sonderuntersuchungen': 'Specialised occupational health examinations available on request.',
  'labor': 'Laboratory diagnostics in the context of occupational health care.',
  'impfungen': 'Vaccinations in the context of occupational medicine.',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const extraColHeader: Record<string, string | null> = {
  'g-untersuchungen': 'Code',
  'sonderuntersuchungen': 'Examination',
};

function generatePrintHTML(
  category: string,
  sektionen: PreisSektion[],
  lang: 'de' | 'en'
): string {
  const labels = lang === 'en' ? categoryLabelsEN : categoryLabelsDE;
  const descs  = lang === 'en' ? categoryDescsEN  : categoryDescsDE;

  const label = labels[category] ?? category;
  const desc  = descs[category]  ?? '';

  const extraHeader   = extraColHeader[category] ?? null;
  const firstColHeader = lang === 'en'
    ? (category === 'labor' ? 'Laboratory Service' : 'Description')
    : (category === 'labor' ? 'Laborleistung' : 'Bezeichnung');
  const priceHeader = lang === 'en' ? 'Price (net)' : 'Preis (netto)';

  const tableBlocks = sektionen
    .map((sektion) => {
      const sektionTitle = (lang === 'en' && sektion.titelEN) ? sektion.titelEN : (sektion.titel ?? '');

      const rows = (sektion.zeilen ?? [])
        .map((zeile, i) => {
          const preisCell = zeile.preis
            ? `${escapeHtml(zeile.preis)}${zeile.einheit ? `<span class="einheit"> ${escapeHtml(zeile.einheit)}</span>` : ''}`
            : `<span class="hinweis">${escapeHtml(zeile.hinweis ?? '–')}</span>`;
          const codeCell = extraHeader
            ? `<td class="td-code">${escapeHtml(zeile.code ?? '')}</td>`
            : '';
          const bezeichnung = (lang === 'en' && zeile.bezeichnungEN) ? zeile.bezeichnungEN : (zeile.bezeichnung ?? '');
          return `<tr class="${i % 2 === 1 ? 'alt' : ''}">
            ${codeCell}
            <td>${escapeHtml(bezeichnung)}</td>
            <td class="td-right">${preisCell}</td>
          </tr>`;
        })
        .join('\n');

      const extraTh = extraHeader
        ? `<th class="th-code">${escapeHtml(extraHeader)}</th>`
        : '';

      return `
      <div class="section">
        <div class="section-header">
          <span class="section-title">${escapeHtml(sektionTitle)}</span>
        </div>
        <table>
          <thead>
            <tr>
              ${extraTh}
              <th class="th-left">${escapeHtml(firstColHeader)}</th>
              <th class="th-right">${escapeHtml(priceHeader)}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
    })
    .join('\n');

  const isEN = lang === 'en';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <title>${isEN ? 'Price List' : 'Preisliste'} ${escapeHtml(label)} – Samedos</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 10pt; color: #222; print-color-adjust: exact; -webkit-print-color-adjust: exact; }

    /* ── Deckblatt ── */
    .cover {
      height: 297mm; background: #142B49;
      display: flex; flex-direction: column;
      padding: 2cm 1.5cm 1.5cm;
      page-break-after: always; break-after: page;
      overflow: hidden; position: relative;
    }
    .cover-logo { font-size: 22pt; font-weight: 800; color: #fff; letter-spacing: .03em; }
    .cover-tagline { color: #64c5ae; font-size: 9pt; margin-top: 4pt; }
    .cover-spacer { flex: 1; min-height: 40pt; }
    .cover-label { font-size: 8pt; font-weight: 700; color: #64c5ae; letter-spacing: .16em; text-transform: uppercase; margin-bottom: 12pt; }
    .cover-title { font-size: 44pt; font-weight: 800; color: #fff; line-height: 1.05; margin-bottom: 20pt; max-width: 380pt; }
    .cover-line { width: 44pt; height: 3pt; background: #64c5ae; margin-bottom: 18pt; }
    .cover-desc { font-size: 10.5pt; color: rgba(255,255,255,.72); line-height: 1.65; max-width: 310pt; }
    .cover-footer { border-top: .5pt solid rgba(255,255,255,.18); padding-top: 14pt; margin-top: auto; }
    .cover-footer p { font-size: 8pt; color: rgba(255,255,255,.55); margin-bottom: 2pt; }
    .cover-footer .stand { color: #64c5ae; font-weight: 600; margin-top: 3pt; }
    .circle { position: absolute; border-radius: 50%; }
    .circle1 { right: -60pt; bottom: 60pt; width: 230pt; height: 230pt; background: rgba(41,70,107,.55); }
    .circle2 { right: -100pt; bottom: -50pt; width: 290pt; height: 290pt; background: rgba(41,70,107,.35); }

    /* ── Inhaltsseiten ── */
    .content { padding: 1.5cm 1.5cm 2cm; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 12pt; border-bottom: 1.5pt solid #142B49; margin-bottom: 18pt; }
    .page-header-logo { font-size: 14pt; font-weight: 800; color: #142B49; letter-spacing: .03em; }
    .page-header-right { text-align: right; font-size: 8.5pt; color: #555; line-height: 1.7; }
    .page-header-right .cat { font-weight: 700; font-size: 11pt; color: #142B49; display: block; margin-bottom: 3pt; }

    /* ── Tabellen ── */
    .section { margin-bottom: 18pt; page-break-inside: avoid; }
    .section-header { background: #f4f7fa; border-left: 3pt solid #64c5ae; padding: 5pt 8pt; }
    .section-title { font-weight: 700; font-size: 9pt; color: #142B49; }
    table { width: 100%; border-collapse: collapse; font-size: 9pt; }
    th { font-weight: 600; color: #142B49; padding: 5pt 8pt; border: .5pt solid #ccc; background: #f8fafc; }
    .th-left { text-align: left; }
    .th-right { text-align: right; white-space: nowrap; }
    .th-code { text-align: left; white-space: nowrap; width: 56pt; }
    td { padding: 5pt 8pt; border: .5pt solid #ccc; color: #444; }
    .td-right { text-align: right; font-weight: 500; color: #142B49; white-space: nowrap; }
    .td-code { white-space: nowrap; width: 56pt; font-size: 8pt; color: #666; font-family: monospace; }
    .einheit { font-size: 7.5pt; color: #888; font-weight: 400; }
    .hinweis { font-weight: 400; color: #888; }
    tr.alt { background: #f8fafc; }
    .footnote { font-size: 7.5pt; color: #666; margin-top: 8pt; }
  </style>
</head>
<body>

  <!-- Deckblatt -->
  <div class="cover">
    <div>
      <div class="cover-logo">SAMEDOS</div>
      <div class="cover-tagline">${isEN ? 'Occupational Medicine · Bremen' : 'Arbeitsmedizin · Bremen'}</div>
    </div>
    <div class="cover-spacer"></div>
    <div>
      <div class="cover-label">${isEN ? 'PRICE LIST 2026' : 'PREISLISTE 2026'}</div>
      <div class="cover-title">${escapeHtml(label)}</div>
      <div class="cover-line"></div>
      <div class="cover-desc">${escapeHtml(desc)}</div>
    </div>
    <div class="cover-spacer"></div>
    <div class="cover-footer">
      <p>Samedos GmbH · Timmersloher Straße 82, 28215 Bremen</p>
      <p>${isEN ? 'Phone +49 421 63997-76 · info@samedos.de · www.samedos.de' : 'Telefon 0421 63997761 · info@samedos.de · www.samedos.de'}</p>
      <p class="stand">${isEN ? 'As of: April 2026' : 'Stand: April 2026'}</p>
    </div>
    <div class="circle circle1"></div>
    <div class="circle circle2"></div>
  </div>

  <!-- Inhaltsseiten -->
  <div class="content">
    <div class="page-header">
      <div class="page-header-logo">SAMEDOS</div>
      <div class="page-header-right">
        <span class="cat">${escapeHtml(label)}</span>
        ${isEN
          ? `All prices excl. VAT · As of: April 2026<br>Samedos GmbH · Timmersloher Str. 82 · 28215 Bremen<br>info@samedos.de · +49 421 63997-76`
          : `Alle Preise zzgl. MwSt. · Stand: April 2026<br>Samedos GmbH · Timmersloher Str. 82 · 28215 Bremen<br>info@samedos.de · 0421 63997761`
        }
      </div>
    </div>
    ${tableBlocks}
    <p class="footnote">${isEN ? '* All prices excl. VAT.' : '* Alle Preise zzgl. MwSt.'}</p>
  </div>

  <script>window.addEventListener('load', () => window.print());<\/script>
</body>
</html>`;
}

export function PdfDownloadHint(_props: StringInputProps) {
  const category = useFormValue(['category']) as string | undefined;
  const sektionen = useFormValue(['sektionen']) as PreisSektion[] | undefined;

  const label = category ? (categoryLabelsDE[category] ?? category) : null;
  const hasData = sektionen && sektionen.length > 0;

  function openPreview(lang: 'de' | 'en') {
    if (!category || !sektionen?.length) return;
    const html = generatePrintHTML(category, sektionen, lang);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) {
      win.addEventListener('load', () => setTimeout(() => URL.revokeObjectURL(url), 2000), { once: true });
    }
  }

  const btnStyle = (primary: boolean): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '8px 18px',
    background: primary ? '#142B49' : 'transparent',
    color: primary ? 'white' : '#142B49',
    border: primary ? 'none' : '1.5px solid #142B49',
    borderRadius: '20px', cursor: 'pointer',
    fontSize: '13px', fontWeight: 500,
  });

  return (
    <div style={{ padding: '16px', background: '#f0f4f8', borderRadius: '8px', border: '1px solid #dce4ed', fontFamily: 'sans-serif' }}>
      <p style={{ fontWeight: 600, fontSize: '13px', color: '#142B49', marginBottom: '8px' }}>
        PDF Vorschau
      </p>

      {!category && (
        <p style={{ fontSize: '12px', color: '#888' }}>
          Zuerst eine Kategorie auswählen.
        </p>
      )}

      {category && !hasData && (
        <p style={{ fontSize: '12px', color: '#888' }}>
          Zuerst Preisabschnitte mit Zeilen hinzufügen.
        </p>
      )}

      {category && hasData && (
        <>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5', marginBottom: '12px' }}>
            Öffnet eine Druckvorschau für <strong style={{ color: '#142B49' }}>{label}</strong> —
            identisch mit der späteren PDF auf der Website.
            Im neuen Tab auf <em>„Als PDF speichern"</em> klicken.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => openPreview('de')} type="button" style={btnStyle(true)}>
              ↓ Deutsch
            </button>
            <button onClick={() => openPreview('en')} type="button" style={btnStyle(false)}>
              ↓ English
            </button>
          </div>
        </>
      )}
    </div>
  );
}
