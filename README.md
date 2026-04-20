# samedos-website

Website der Samedos GmbH — Arbeitsmedizin, Bremen.

## Tech-Stack

- [Astro](https://astro.build) (SSG)
- [Tailwind CSS v4](https://tailwindcss.com)
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

## Setup

```bash
npm install
npm run dev      # Dev-Server auf http://localhost:4321
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal vorschauen
```

## Projektstruktur

```
src/
  layouts/
    BaseLayout.astro       # HTML-Shell, Fonts, Meta-Tags
  components/
    Header.astro           # Sticky Header mit Navigation
    Footer.astro           # Footer mit Kontakt & Links
    Hero.astro             # Hero-Sektion Startseite
    Stats.astro            # Kennzahlen-Leiste
    ValueCard.astro        # Einzelne Wertkarte
    ServiceCard.astro      # Einzelne Leistungskarte
    CtaBand.astro          # Karriere CTA-Banner
  pages/
    index.astro            # Startseite
    leistungen/index.astro
    ueber-uns.astro
    karriere/index.astro
    kontakt.astro
    impressum.astro
    datenschutz.astro
  styles/
    global.css             # Tailwind-Import + @theme (Farben, Fonts)
  assets/                  # Logos, Bilder (noch zu befüllen)
```

## Farben & Fonts

Definiert in `src/styles/global.css` über Tailwind v4 `@theme`:

| Token          | Wert      | Klasse         |
|----------------|-----------|----------------|
| Navy (Primär)  | `#142B49` | `bg-navy`      |
| Navy-2         | `#29466B` | `bg-navy-2`    |
| Mint (Akzent)  | `#64C5AE` | `bg-mint`      |
| Mint Soft      | `#E8F6F2` | `bg-mint-soft` |
| Muted Text     | `#5B6B82` | `text-muted`   |

Fonts: `font-heading` = League Spartan, `font-sans` = DM Sans (Standard)

## Noch ausstehend (Phase 2)

- [ ] Sanity CMS (Team, Stellenanzeigen)
- [ ] Kontaktformular mit Resend
- [ ] Karriere-Bewerbungsformular
- [ ] Detailseiten für Leistungskategorien
- [ ] JSON-LD strukturierte Daten
- [ ] Vercel-Deployment + Domain-Umzug
