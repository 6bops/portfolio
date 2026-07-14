// Convert every PNG under public/images to WebP, capping the longest edge at
// 2000px (ample for 2x retina at the sizes these render). Run: node scripts/optimize-images.mjs
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public/images";
const MAX_EDGE = 2000;
const QUALITY = 82;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (extname(entry.name).toLowerCase() === ".png") out.push(p);
  }
  return out;
}

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;

const files = await walk(ROOT);
let before = 0;
let after = 0;

for (const png of files.sort()) {
  const webp = png.replace(/\.png$/i, ".webp");
  const srcBytes = (await stat(png)).size;
  const img = sharp(png);
  const { width, height } = await img.metadata();
  const resize =
    Math.max(width, height) > MAX_EDGE
      ? { width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true }
      : null;

  await (resize ? img.resize(resize) : img).webp({ quality: QUALITY, effort: 6 }).toFile(webp);

  const outBytes = (await stat(webp)).size;
  await unlink(png); // drop the original PNG

  before += srcBytes;
  after += outBytes;
  console.log(`${png}  ${kb(srcBytes)} → ${kb(outBytes)}  (${Math.round((1 - outBytes / srcBytes) * 100)}% smaller)`);
}

console.log(`\n${files.length} images: ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(1)}MB  (${Math.round((1 - after / before) * 100)}% smaller)`);
