import { useFormValue } from 'sanity';
import type { StringInputProps } from 'sanity';

const categoryLabels: Record<string, string> = {
  'g-untersuchungen': 'G-Untersuchungen',
  'sonderuntersuchungen': 'Sonderuntersuchungen',
  'labor': 'Labor',
  'impfungen': 'Impfungen',
};

export function PdfDownloadHint(_props: StringInputProps) {
  const category = useFormValue(['category']) as string | undefined;
  const label = category ? categoryLabels[category] : null;

  return (
    <div style={{
      padding: '16px',
      background: '#f0f4f8',
      borderRadius: '8px',
      border: '1px solid #dce4ed',
      fontFamily: 'sans-serif',
    }}>
      {label ? (
        <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#444', lineHeight: '1.5' }}>
          Nach dem Veröffentlichen die Preisseite öffnen, den Tab{' '}
          <strong style={{ color: '#142B49' }}>{label}</strong>{' '}
          wählen und <em>„Als PDF speichern"</em> klicken. Das Deckblatt wird automatisch korrekt befüllt.
        </p>
      ) : (
        <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#888' }}>
          Zuerst eine Kategorie auswählen, dann steht der PDF-Download bereit.
        </p>
      )}
      <a
        href="https://samedos.de/preise"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 18px',
          background: '#142B49',
          color: 'white',
          borderRadius: '20px',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 500,
        }}
      >
        Preisseite öffnen →
      </a>
    </div>
  );
}
