// Record the intrinsic size of every image under public/images so <img> tags can
// carry width/height. Without them a lazy image reserves no height until it
// decodes, so anything below it jumps — which breaks scroll-to-section and hurts
// CLS site-wide. Run after adding images: node scripts/image-manifest.mjs
import { readdir, writeFile } from "node:fs/promises";
import { join, extname, relative } from "node:path";
import sharp from "sharp";

const ROOT = "public/images";
const OUT = "src/data/imageSizes.json";
const EXT = new Set([".webp", ".png", ".jpg", ".jpeg", ".svg"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.name.startsWith(".")) continue;
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (EXT.has(extname(entry.name).toLowerCase())) out.push(p);
  }
  return out;
}

const files = (await walk(ROOT)).sort();
const sizes = {};

for (const file of files) {
  try {
    const { width, height } = await sharp(file).metadata();
    if (!width || !height) continue;
    sizes[`/${relative("public", file)}`] = [width, height];
  } catch {
    // Unreadable or vector without intrinsic size — skip; the img just won't
    // get dimensions and behaves as it does today.
  }
}

await writeFile(OUT, `${JSON.stringify(sizes, null, 0)}\n`);
console.log(`${Object.keys(sizes).length} images → ${OUT}`);
