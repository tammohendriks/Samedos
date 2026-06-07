// Pre-process source images into a sane working size + format for the Astro
// asset pipeline. Run on demand when new originals come in.
//
// Usage:
//   node scripts/preprocess-images.mjs <source> <target> <preset>
//
// Presets:
//   hero    — JPG, max 2400px long edge, q85 (no alpha)
//   gallery — JPG, max 2400px long edge, q85 (no alpha)
//   team    — PNG (alpha preserved), max 1000px long edge, palette-optimised
//   teamWebp — WebP, max 1000px long edge, q82 (alpha preserved)
//   heroAlpha — PNG (alpha preserved), max 2000px long edge, palette-optimised
//   og      — JPG, exactly 1200×630, q85

import sharp from 'sharp';
import { glob } from 'glob';
import { basename, extname, join } from 'node:path';
import { mkdir, stat } from 'node:fs/promises';

const PRESETS = {
  hero:       { maxDimension: 2400, format: 'jpeg', quality: 85 },
  gallery:    { maxDimension: 2400, format: 'jpeg', quality: 85 },
  team:       { maxDimension: 1000, format: 'png',  quality: 85 },
  teamWebp:   { maxDimension: 1000, format: 'webp', quality: 82 },
  heroAlpha:  { maxDimension: 2000, format: 'png',  quality: 85 },
  og:         { width: 1200, height: 630, format: 'jpeg', quality: 85 },
};

const [, , sourceDir, targetDir, presetName] = process.argv;
if (!sourceDir || !targetDir || !presetName) {
  console.error('Usage: node scripts/preprocess-images.mjs <source> <target> <preset>');
  console.error(`Presets: ${Object.keys(PRESETS).join(' | ')}`);
  process.exit(1);
}

const preset = PRESETS[presetName];
if (!preset) {
  console.error(`Unknown preset: ${presetName}`);
  process.exit(1);
}

await mkdir(targetDir, { recursive: true });

const files = await glob(`${sourceDir}/**/*.{jpg,jpeg,png,webp}`, {
  nocase: true,
  windowsPathsNoEscape: true,
});

if (files.length === 0) {
  console.error(`No images found in ${sourceDir}`);
  process.exit(1);
}

console.log(`📸 Found ${files.length} image(s). Preset: ${presetName}`);

let totalIn = 0;
let totalOut = 0;

for (const file of files) {
  const { size: inSize } = await stat(file);
  totalIn += inSize;

  const name = basename(file, extname(file));
  const ext = preset.format === 'jpeg' ? 'jpg' : preset.format;
  const out = join(targetDir, `${name}.${ext}`);

  let pipe = sharp(file);

  if (preset.width && preset.height) {
    pipe = pipe.resize(preset.width, preset.height, { fit: 'cover', position: 'centre' });
  } else {
    pipe = pipe.resize({
      width: preset.maxDimension,
      height: preset.maxDimension,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  if (preset.format === 'jpeg') {
    pipe = pipe.jpeg({ quality: preset.quality, mozjpeg: true });
  } else if (preset.format === 'png') {
    pipe = pipe.png({ quality: preset.quality, compressionLevel: 9, palette: true });
  } else if (preset.format === 'webp') {
    pipe = pipe.webp({ quality: preset.quality });
  }

  await pipe.toFile(out);
  const { size: outSize } = await stat(out);
  totalOut += outSize;

  const reduction = ((1 - outSize / inSize) * 100).toFixed(0);
  const pad = (s) => s.padEnd(28);
  console.log(
    `  ${pad(name + '.' + ext)}  ${(inSize / 1024 / 1024).toFixed(2).padStart(6)} MB → ${(outSize / 1024).toFixed(0).padStart(5)} KB  (-${reduction}%)`,
  );
}

console.log(
  `\n✅ Total: ${(totalIn / 1024 / 1024).toFixed(1)} MB → ${(totalOut / 1024 / 1024).toFixed(2)} MB  ` +
  `(-${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`,
);
