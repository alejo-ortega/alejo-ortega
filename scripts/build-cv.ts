/**
 * Genera los CV en PDF (ES y EN) en public/.
 *
 *   npm run cv
 *
 * Imprime el HTML de `cv/render.ts` con Chromium headless (binario configurable
 * con CHROME_PATH) y verifica el resultado con las herramientas de poppler
 * (pdfinfo, pdffonts, pdftohtml, pdftotext). Si falta alguna, avisa y sigue.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { cvLocales, getCv } from "../cv/content";
import { renderCv } from "../cv/render";
import type { Locale } from "../lib/i18n";

const chrome = process.env.CHROME_PATH ?? "chromium";
const outDir = resolve(process.cwd(), "public");
const workDir = mkdtempSync(join(tmpdir(), "cv-"));
const errors: string[] = [];

const fail = (lang: Locale, message: string) =>
  errors.push(`[${lang}] ${message}`);

function run(cmd: string, args: string[], timeout = 90_000) {
  return spawnSync(cmd, args, { encoding: "utf8", timeout });
}

function printPdf(lang: Locale) {
  const html = join(workDir, `cv-${lang}.html`);
  const pdf = join(outDir, `Alejo-Ortega-CV-${lang.toUpperCase()}.pdf`);
  writeFileSync(html, renderCv(lang));

  const result = run(chrome, [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=5000",
    `--user-data-dir=${join(workDir, `profile-${lang}`)}`,
    `--print-to-pdf=${pdf}`,
    pathToFileURL(html).href,
  ]);
  if (result.error || result.status !== 0) {
    throw new Error(
      `No se pudo generar el PDF (${lang}) con "${chrome}": ${
        result.error?.message ?? result.stderr
      }`,
    );
  }
  return pdf;
}

function verify(lang: Locale, pdf: string) {
  const cv = getCv(lang);

  const info = run("pdfinfo", [pdf]);
  if (info.error) {
    console.warn("  (pdfinfo no disponible: se omite la verificación)");
    return { links: [] as string[] };
  }
  const pages = Number(/^Pages:\s+(\d+)/m.exec(info.stdout)?.[1]);
  const size = /^Page size:\s+([\d.]+) x ([\d.]+)/m.exec(info.stdout);
  const title = /^Title:\s+(.*)$/m.exec(info.stdout)?.[1]?.trim();
  if (pages !== 1) fail(lang, `tiene ${pages} páginas (debe ser 1)`);
  if (
    !size ||
    Math.abs(Number(size[1]) - 595) > 2 ||
    Math.abs(Number(size[2]) - 842) > 2
  ) {
    fail(lang, `tamaño de página inesperado: ${size?.[0]}`);
  }
  if (title !== cv.title) fail(lang, `título PDF inesperado: "${title}"`);

  const fonts = run("pdffonts", [pdf]).stdout.split("\n").slice(2);
  const rows = fonts.filter((line) => line.trim());
  if (rows.length === 0) fail(lang, "no hay fuentes embebidas");
  for (const row of rows) {
    if (/\s+no\s+(yes|no)\s+(yes|no)\s+\d+\s+\d+\s*$/.test(row)) {
      fail(lang, `fuente sin embeber: ${row.trim()}`);
    }
  }

  const xml = run("pdftohtml", ["-xml", "-i", "-stdout", pdf]).stdout;
  const links = [...xml.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).sort();
  const expected = cv.contacts.map((c) => c.href).sort();
  if (JSON.stringify(links) !== JSON.stringify(expected)) {
    fail(lang, `links inesperados: ${links.join(", ")}`);
  }

  // -raw: orden del flujo de contenido, que sigue el DOM (el que leen los ATS).
  const textOut = run("pdftotext", ["-raw", pdf, "-"]).stdout;
  const flat = textOut.replace(/\s+/g, " ");
  const probes = [
    cv.name.first,
    cv.role,
    ...cv.contacts.map((c) => c.label),
    ...cv.experience.map((j) => j.company),
    ...cv.education.map((c) => c.issuer),
  ];
  for (const probe of probes) {
    // Algunos textos están en mayúsculas por CSS, así que se compara sin distinguir caso.
    if (!flat.toLowerCase().includes(probe.toLowerCase())) {
      fail(lang, `texto no extraíble: "${probe}"`);
    }
  }
  // Orden de lectura: los títulos numerados 01…06 deben aparecer en orden.
  const headings = [
    cv.sections.profile,
    cv.sections.experience,
    cv.sections.approach,
    cv.sections.stack,
    cv.sections.education,
    cv.sections.languages,
  ];
  const positions = headings.map((label, i) =>
    flat.search(new RegExp(`0${i + 1}\\s*${label}`, "i")),
  );
  if (positions.some((p, i) => p < 0 || (i > 0 && p < positions[i - 1]))) {
    fail(lang, `orden de lectura inesperado (posiciones: ${positions.join(", ")})`);
  }

  return { links };
}

/** Misma estructura (secciones, roles, viñetas, chips) en ambos idiomas. */
function checkParity() {
  const shape = (lang: Locale) => {
    const cv = getCv(lang);
    return JSON.stringify({
      experience: cv.experience.map((j) => j.bullets.length),
      stack: cv.stack.map((g) => g.items),
      education: cv.education.length,
      languages: cv.languages.length,
      approach: cv.approach.length,
      contacts: cv.contacts.map((c) => c.href),
    });
  };
  const [first, ...rest] = cvLocales;
  for (const lang of rest) {
    if (shape(lang) !== shape(first)) {
      errors.push(`la estructura de ${lang} no coincide con ${first}`);
    }
  }
}

try {
  checkParity();
  for (const lang of cvLocales) {
    console.log(`Generando CV ${lang.toUpperCase()}…`);
    const pdf = printPdf(lang);
    const { links } = verify(lang, pdf);
    console.log(`  ✓ ${pdf.replace(process.cwd() + "/", "")} (${links.length} links)`);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

if (errors.length) {
  console.error("\nProblemas encontrados:\n" + errors.map((e) => `  ✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log("\nListo: ambos PDFs verificados.");
