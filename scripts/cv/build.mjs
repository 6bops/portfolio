#!/usr/bin/env node
// Builds the five public CV PDFs in public/cv/ from content.mjs.
// Writes each variant to HTML in a temporary folder (never in public/) and
// prints it to PDF with headless Chrome. No npm dependencies.
//
//   node scripts/cv/build.mjs            build all variants
//   node scripts/cv/build.mjs --html DIR also keep the HTML in DIR

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { VARIANTS } from "./content.mjs";
import { renderCv } from "./template.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = join(root, "public", "cv");

const htmlFlag = process.argv.indexOf("--html");
const keepHtmlDir = htmlFlag > -1 ? resolve(process.argv[htmlFlag + 1]) : null;

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const hit = candidates.find((p) => existsSync(p));
  if (!hit) throw new Error("Chrome not found. Set CHROME_PATH.");
  return hit;
}

function chromeMajor(chrome) {
  try {
    const v = execFileSync(chrome, ["--version"], { encoding: "utf8" });
    return Number((v.match(/(\d+)\./) || [])[1]) || 0;
  } catch {
    return 0;
  }
}

const chrome = findChrome();
// --no-pdf-header-footer replaced --print-to-pdf-no-header in Chrome 111.
const noHeader = chromeMajor(chrome) >= 111 ? "--no-pdf-header-footer" : "--print-to-pdf-no-header";

const work = mkdtempSync(join(tmpdir(), "cv-build-"));
mkdirSync(outDir, { recursive: true });
if (keepHtmlDir) mkdirSync(keepHtmlDir, { recursive: true });

try {
  for (const v of VARIANTS) {
    const html = join(work, `${v.slug}.html`);
    const pdf = join(outDir, `${v.slug}.pdf`);
    writeFileSync(html, renderCv(v));
    if (keepHtmlDir) copyFileSync(html, join(keepHtmlDir, `${v.slug}.html`));
    execFileSync(
      chrome,
      [
        "--headless",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=${join(work, "profile")}`,
        noHeader,
        `--print-to-pdf=${pdf}`,
        pathToFileURL(html).href,
      ],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
    console.log(`wrote public/cv/${v.slug}.pdf`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
