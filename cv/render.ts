import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Locale } from "@/lib/i18n";
import { getCv } from "./content";

// `npm run cv` se ejecuta siempre desde la raíz del proyecto.
const root = process.cwd();

const fontFile = (pkg: string, file: string) =>
  pathToFileURL(
    resolve(root, "node_modules/@fontsource", pkg, "files", file),
  ).href;

/** Mismas familias que el sitio, servidas desde node_modules (build offline y reproducible). */
const fontFaces = [
  ["Instrument Sans", 400, "normal", "instrument-sans", "instrument-sans-latin-400-normal.woff2"],
  ["Instrument Sans", 500, "normal", "instrument-sans", "instrument-sans-latin-500-normal.woff2"],
  ["Instrument Sans", 600, "normal", "instrument-sans", "instrument-sans-latin-600-normal.woff2"],
  ["Instrument Serif", 400, "italic", "instrument-serif", "instrument-serif-latin-400-italic.woff2"],
  ["JetBrains Mono", 400, "normal", "jetbrains-mono", "jetbrains-mono-latin-400-normal.woff2"],
  ["JetBrains Mono", 500, "normal", "jetbrains-mono", "jetbrains-mono-latin-500-normal.woff2"],
]
  .map(
    ([family, weight, style, pkg, file]) =>
      `@font-face{font-family:"${family}";font-weight:${weight};font-style:${style};font-display:block;src:url("${fontFile(pkg as string, file as string)}") format("woff2");}`,
  )
  .join("\n");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const list = (items: string[], render: (item: string) => string) =>
  items.map((item) => `<li>${render(item)}</li>`).join("");

/** Genera el HTML autocontenido del CV en el idioma pedido. */
export function renderCv(lang: Locale): string {
  const cv = getCv(lang);
  const e = escapeHtml;
  const css = readFileSync(resolve(root, "cv/cv.css"), "utf8");
  const photo = pathToFileURL(resolve(root, "public/alejo.jpg")).href;

  const jobs = cv.experience
    .map(
      (job) => `
      <article class="job">
        <div class="job-head">
          <h3>${e(job.role)}</h3>
          <span class="period">${e(job.period)}</span>
        </div>
        <p class="company">${e(job.company)}</p>
        <ul>${list(job.bullets, (b) => e(b))}</ul>
      </article>`,
    )
    .join("");

  const stack = cv.stack
    .map(
      (group) => `
      <div class="group">
        <p class="group-label">${e(group.label)}</p>
        <ul class="chips">${list(group.items, (i) => e(i))}</ul>
      </div>`,
    )
    .join("");

  return `<!doctype html>
<html lang="${cv.lang}">
<head>
<meta charset="utf-8">
<title>${e(cv.title)}</title>
<meta name="author" content="Alejo Ortega">
<style>
${fontFaces}
${css}
</style>
</head>
<body>
<div class="page">
  <header class="header">
    <div>
      <h1 class="name"><span>${e(cv.name.first)}</span><span class="last">${e(cv.name.last)}.</span></h1>
      <p class="role">${e(cv.role)}</p>
      <p class="meta">${e(cv.location)} · ${e(cv.age)}</p>
    </div>
    <img class="photo" src="${photo}" alt="${e(`${cv.name.first} ${cv.name.last}`)}">
  </header>

  <nav class="contacts" aria-label="Contact">
    ${cv.contacts.map((c) => `<a href="${e(c.href)}">${e(c.label)}</a>`).join("\n    ")}
  </nav>

  <div class="body">
    <main>
      <section>
        <h2><span class="n">01</span>${e(cv.sections.profile)}</h2>
        <p class="summary">${e(cv.summary)}</p>
      </section>
      <section>
        <h2><span class="n">02</span>${e(cv.sections.experience)}</h2>
        ${jobs}
      </section>
      <section>
        <h2><span class="n">03</span>${e(cv.sections.approach)}</h2>
        <ul class="approach">${list(cv.approach, (a) => e(a))}</ul>
      </section>
    </main>

    <aside class="side">
      <section>
        <h2><span class="n">04</span>${e(cv.sections.stack)}</h2>
        ${stack}
      </section>
      <section>
        <h2><span class="n">05</span>${e(cv.sections.education)}</h2>
        <ul class="edu">${cv.education
          .map(
            (c) =>
              `<li><p class="t">${e(c.title)}</p><p class="i">${e(c.issuer)}</p></li>`,
          )
          .join("")}</ul>
      </section>
      <section>
        <h2><span class="n">06</span>${e(cv.sections.languages)}</h2>
        <ul class="langs">${cv.languages
          .map(
            (l) =>
              `<li><span class="l">${e(l.name)}</span><span class="v">${e(l.level)}</span></li>`,
          )
          .join("")}</ul>
      </section>
    </aside>
  </div>
</div>
</body>
</html>
`;
}
