# Bilder im Projekt

## Wo welche Bilder liegen

```
public/
├── Titelbild.png            ── NEIN, hat hier nicht mehr was zu suchen
├── images/team/*.png        ── Team-Fallbacks (palette-optimiert, ~250 KB)
├── favicon.png               ── Browser-Icon
├── logo-*.svg                ── Logos (SVG, nicht anfassen)
└── og-default.jpg            ── Social Media (1200×630)

src/assets/images/
└── hero/Titelbild.png        ── Hero-Bild für Astro-Pipeline (alpha, 490 KB Source)
```

**Faustregel:**
- **statisch + immer sichtbar (Hero, Logos, Icons)** → `src/assets/` + Astro `<Image>` (Pipeline generiert WebP/AVIF + responsive srcset)
- **dynamisch (Pfade aus CMS, Fallbacks)** → `public/images/` + plain `<img>`
- **Sanity-CDN-URLs** → mit `optimizedSanityImage()` umwickeln

## Astro `<Image>` für statische Bilder

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/images/hero/my-image.png';
---

<Image
  src={myImage}
  alt="Aussagekräftiger Alt-Text"
  widths={[440, 720, 1080]}
  sizes="(max-width: 1024px) 440px, 540px"
  formats={['webp']}
  quality={80}
  loading="lazy"
/>
```

**LCP-Bild** (above the fold, sofort sichtbar): zusätzlich
```astro
loading="eager"
fetchpriority="high"
decoding="async"
```

## Sanity-Bilder optimieren

```astro
---
import { optimizedSanityImage } from '../sanity/client';
---

<img
  src={optimizedSanityImage(doctor?.photo?.asset?.url, { width: 720, quality: 80 })}
  alt="..."
  loading="lazy"
/>
```

`optimizedSanityImage()` hängt `?w=720&q=80&auto=format&fit=max` an die Sanity-CDN-URL und lässt Sanity das passende Format (WebP/AVIF je nach Browser) ausliefern. Übergibt fremde URLs unverändert weiter, sodass Fallback-Pfade wie `/images/team/joerg-janssen.png` mit demselben Aufruf weiter funktionieren.

## Neue Bilder hinzufügen

### Statisches Hero/Gallery-Bild

1. Original (kein Limit für Auflösung) in temporären Ordner ablegen.
2. Pre-Processing laufen lassen:
   ```bash
   node scripts/preprocess-images.mjs <quell> src/assets/images/<kategorie> <preset>
   ```
   Verfügbare Presets: `hero` | `gallery` | `team` | `teamWebp` | `heroAlpha` | `og`
3. In Astro-File mit `<Image>` einbinden (siehe oben).

### Team-Foto

Team-Bilder leben in `public/images/team/` als Fallback. Primärquelle ist Sanity Studio.

```bash
# Neues Foto vorbereiten (alpha bleibt erhalten, palette-optimiert auf ~250 KB)
node scripts/preprocess-images.mjs <quell-ordner> public/images/team team
```

### OG-Image

```bash
node scripts/preprocess-images.mjs <quell> public/ og
mv public/og-default.jpg.tmp public/og-default.jpg   # falls überschreiben
```

## Sharp-Presets im Detail

| Preset | Format | Max-Größe | Quality | Wofür |
|---|---|---|---|---|
| `hero` | JPG | 2400 px (lange Kante) | 85 | Hero ohne Alpha |
| `heroAlpha` | PNG (palette) | 2000 px | 85 | Hero mit Alpha (Cutout) |
| `gallery` | JPG | 2400 px | 85 | Inhaltsbilder |
| `team` | PNG (palette) | 1000 px | 85 | Team-Cutouts (Alpha-Kanal) |
| `teamWebp` | WebP | 1000 px | 82 | Falls man PNG-Quantisierung nicht mag |
| `og` | JPG | 1200×630 (crop) | 85 | Social-Media-Cards |

Sharp läuft als devDependency (`sharp`, `glob`). Build-Server (Vercel) braucht nichts davon — das Skript läuft nur lokal beim Vorbereiten neuer Files.
