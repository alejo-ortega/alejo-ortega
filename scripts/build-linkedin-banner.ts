/** Vector master + LinkedIn-ready PNG. Run: npm run banner */
import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { parse, type Font } from "opentype.js";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const width = 1584;
const height = 396;
const outDir = resolve("public/brand");
const basename = "Alejo-Ortega-LinkedIn";

const font = (family: string, file: string) => {
  const buffer = readFileSync(
    require.resolve(`@fontsource/${family}/files/${file}.woff`),
  );
  return parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
};

const sans = font("instrument-sans", "instrument-sans-latin-400-normal");
const medium = font("instrument-sans", "instrument-sans-latin-500-normal");
const serif = font("instrument-serif", "instrument-serif-latin-400-italic");
const mono = font("jetbrains-mono", "jetbrains-mono-latin-400-normal");

// Latin copy needs only glyph mapping and pair kerning, not GSUB shaping.
function glyphRun(face: Font, value: string, size: number) {
  const glyphs = [...value].map((character) => face.charToGlyph(character));
  let advance = 0;
  const run = glyphs.map((glyph, index) => {
    if (index > 0) advance += face.getKerningValue(glyphs[index - 1], glyph) * size / face.unitsPerEm;
    const x = advance;
    advance += (glyph.advanceWidth ?? 0) * size / face.unitsPerEm;
    return { glyph, x };
  });
  return { run, advance };
}

// Outline every glyph: portable, fully vector artwork, no external font loads.
function text(
  face: Font,
  value: string,
  x: number,
  y: number,
  size: number,
  fill: string,
) {
  return glyphRun(face, value, size).run.map(({ glyph, x: offset }) => {
    const path = glyph.getPath(x + offset, y, size);
    const box = path.getBoundingBox();
    if (box.x1 < 0 || box.x2 > width - 64 || box.y1 < 0 || box.y2 > height - 32) {
      throw new Error(`Text exceeds safe bounds: ${value}`);
    }
    return `<path fill="${fill}" d="${path.toPathData(3)}"/>`;
  }).join("\n");
}

async function main() {
  const nameX = 624;
  const nameSize = 88;
  const surnameX = nameX + glyphRun(medium, "Alejo", nameSize).advance + 21;
  const dotX = surnameX + glyphRun(serif, "Ortega", nameSize).advance + 4;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">Alejo Ortega — Full Stack Developer</title>
  <desc id="desc">AI &amp; OSS Enthusiast. React · Next.js · Node.js · TypeScript · React Native. Dark background with subtle blue orbital geometry; lower-left area intentionally clear for the LinkedIn profile photo.</desc>
  <defs>
    <radialGradient id="glow" cx="28%" cy="0%" r="72%" gradientTransform="translate(0 .0) scale(1 .95)">
      <stop stop-color="#4c8df6" stop-opacity=".11"/>
      <stop offset=".55" stop-color="#4c8df6" stop-opacity=".025"/>
      <stop offset="1" stop-color="#4c8df6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="grid" x2="0" y2="1">
      <stop stop-color="#222226" stop-opacity=".65"/>
      <stop offset="1" stop-color="#222226" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="orbit" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#4c8df6" stop-opacity=".06"/>
      <stop offset=".45" stop-color="#4c8df6" stop-opacity=".38"/>
      <stop offset="1" stop-color="#4c8df6" stop-opacity=".02"/>
    </linearGradient>
    <linearGradient id="orbitFade" x2="0" y2="1">
      <stop stop-color="white"/>
      <stop offset=".48" stop-color="white"/>
      <stop offset=".88" stop-color="black"/>
    </linearGradient>
    <mask id="geometryMask"><rect width="560" height="396" fill="url(#orbitFade)"/></mask>
  </defs>

  <rect width="1584" height="396" fill="#0a0a0b"/>
  <rect width="1584" height="396" fill="url(#glow)"/>
  <path d="M96 0V396 M416 0V396 M736 0V396 M1056 0V396 M1376 0V396" stroke="url(#grid)" fill="none"/>

  <!-- Quiet geometric signature. Nothing essential in the profile-photo area. -->
  <g mask="url(#geometryMask)" fill="none">
    <circle cx="318" cy="196" r="146" stroke="#222b3b" stroke-width="1"/>
    <circle cx="318" cy="196" r="112" stroke="url(#orbit)" stroke-width="1"/>
    <ellipse cx="318" cy="196" rx="180" ry="55" transform="rotate(-38 318 196)" stroke="url(#orbit)" stroke-width="1"/>
    <path d="M306 50h24 M318 38v24" stroke="#4c8df6" stroke-opacity=".65"/>
    <circle cx="407" cy="128" r="3" fill="#4c8df6" stroke="none"/>
    <circle cx="407" cy="128" r="8" stroke="#4c8df6" stroke-opacity=".15"/>
  </g>

  <!-- Website signature: Instrument Sans + blue Instrument Serif italic. -->
  <path d="M624 78h32" stroke="#4c8df6" stroke-width="2"/>
  ${text(medium, "Alejo", nameX, 166, nameSize, "#ededed")}
  ${text(serif, "Ortega", surnameX, 166, nameSize, "#4c8df6")}
  ${text(medium, ".", dotX, 166, nameSize, "#4c8df6")}
  ${text(sans, "Full Stack Developer", nameX, 221, 31, "#ededed")}
  ${text(sans, "AI & OSS Enthusiast", nameX, 255, 22, "#8a8a93")}
  <path d="M624 285H1472" stroke="#222226"/>
  ${text(mono, "React · Next.js · Node.js · TypeScript · React Native", nameX, 319, 16, "#8a8a93")}
</svg>
`;

  await mkdir(outDir, { recursive: true });
  const svgPath = resolve(outDir, `${basename}.svg`);
  const pngPath = resolve(outDir, `${basename}.png`);
  await writeFile(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);

  const metadata = await sharp(pngPath).metadata();
  if (metadata.width !== width || metadata.height !== height) {
    throw new Error("Unexpected LinkedIn banner dimensions");
  }
  console.log(`Generated ${width} × ${height}:\n${svgPath}\n${pngPath}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
