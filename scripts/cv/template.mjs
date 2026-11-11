// HTML template for one CV variant. Single column, real text, no images or
// icons, standard headings, A4. Printed to PDF by build.mjs.

import { B, CONTACT, EDUCATION, JOBS, SKILLS } from "./content.mjs";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const bullet = (id) => {
  if (!(id in B)) throw new Error(`Unknown bullet id: ${id}`);
  return `<li>${esc(B[id])}</li>`;
};

const job = (key, ids) => {
  const j = JOBS[key];
  if (!j) throw new Error(`Unknown job: ${key}`);
  return `
  <section class="job">
    <div class="job-head">
      <h3><span class="org">${esc(j.org)}</span> <span class="sep">|</span> ${esc(j.title)}</h3>
      <p class="dates">${esc(j.dates)}</p>
    </div>
    ${j.intro ? `<p class="intro">${esc(j.intro)}</p>` : ""}
    <ul>${ids.map(bullet).join("")}</ul>
  </section>`;
};

const sections = (v) => ({
  work: `
  <section class="block">
    <h2>Work history</h2>
    ${Object.entries(v.jobs)
      .map(([k, ids]) => job(k, ids))
      .join("")}
  </section>`,
  projects: `
  <section class="block">
    <h2>Other projects</h2>
    <ul>${v.projects.map(bullet).join("")}</ul>
  </section>`,
  education: `
  <section class="block">
    <h2>Education</h2>
    <ul class="edu">${EDUCATION.map(
      ([what, where, year]) =>
        `<li><strong>${esc(what)}</strong>, ${esc(where)}, ${esc(year)}</li>`,
    ).join("")}</ul>
  </section>`,
});

export function renderCv(v) {
  const c = CONTACT;
  const s = sections(v);
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<title>${esc(c.name)} CV, ${esc(v.headline)}</title>
<meta name="author" content="${esc(c.name)}">
<style>
  @page { size: A4; margin: 11mm 13mm 11mm 13mm; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 8.8pt;
    line-height: 1.3;
    font-variant-ligatures: none;
    font-feature-settings: "liga" 0, "clig" 0;
    color: #1b1b1b;
    background: #fff;
  }
  a { color: inherit; text-decoration: none; }
  header { margin-bottom: 7pt; }
  h1 { font-size: 19pt; line-height: 1.1; margin: 0; font-weight: 700; letter-spacing: -0.2pt; }
  .legal { margin: 1.5pt 0 0; color: #555; font-size: 8.4pt; }
  .headline { margin: 4pt 0 0; font-size: 11pt; font-weight: 600; color: #1d3f72; }
  .contact { margin: 3pt 0 0; font-size: 8.6pt; color: #333; }
  .contact .sep, h3 .sep { color: #999; padding: 0 2pt; }
  h2 {
    font-size: 9.6pt; text-transform: uppercase; letter-spacing: 0.7pt;
    margin: 7pt 0 3pt; padding-bottom: 1.5pt;
    border-bottom: 0.6pt solid #b9c2cf; color: #1d3f72;
    break-after: avoid; page-break-after: avoid;
  }
  p { margin: 0; }
  .profile { text-align: left; }
  .skills { margin: 0; padding: 0; list-style: none; }
  .skills li { margin: 0 0 1.6pt; }
  .skills strong { font-weight: 600; }
  .job { margin: 0 0 4pt; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; break-after: avoid; page-break-after: avoid; }
  h3 { font-size: 9.4pt; margin: 0; font-weight: 400; }
  h3 .org { font-weight: 700; }
  .dates { white-space: nowrap; color: #444; font-size: 8.6pt; }
  .intro { margin: 1pt 0 1.5pt; color: #333; font-style: italic; break-after: avoid; page-break-after: avoid; }
  ul { margin: 1.5pt 0 0; padding-left: 11pt; }
  li { margin: 0 0 1.4pt; break-inside: avoid; page-break-inside: avoid; }
  .job ul li:first-child { break-before: avoid; }
  ul.edu { list-style: none; padding-left: 0; }
  ul.edu li { margin-bottom: 1pt; }
</style>
</head>
<body>
<header>
  <h1>${esc(c.name)}</h1>
  <p class="legal">Legal name: ${esc(c.legalName)}</p>
  <p class="headline">${esc(v.headline)}</p>
  <p class="contact">${esc(c.location)}<span class="sep">|</span><a href="mailto:${esc(c.email)}">${esc(c.email)}</a><span class="sep">|</span><a href="tel:${esc(c.phone.replace(/\s+/g, ""))}">${esc(c.phone)}</a><span class="sep">|</span><a href="https://${esc(c.site)}">${esc(c.site)}</a><span class="sep">|</span><a href="https://www.${esc(c.linkedin)}">${esc(c.linkedin)}</a></p>
</header>
<section class="block">
  <h2>Profile</h2>
  <p class="profile">${esc(v.profile)}</p>
</section>
<section class="block">
  <h2>Skills</h2>
  <ul class="skills">${v.skills
    .map((k) => {
      const [label, text] = SKILLS[k];
      return `<li><strong>${esc(label)}:</strong> ${esc(text)}</li>`;
    })
    .join("")}</ul>
</section>
${v.order.map((k) => s[k]).join("\n")}
</body>
</html>`;
}
