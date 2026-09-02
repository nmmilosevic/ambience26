/**
 * Recompress oversized project-gallery JPEGs in place.
 * Keeps filenames (MediaImage is unoptimized; no path rewrites).
 * Max edge 1920, mozjpeg q=80 — photography still sharp on retina, ~2–4× smaller.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "content-extract/media-manifest.json"), "utf8"),
);
const galleries = JSON.parse(
  fs.readFileSync(path.join(root, "content-extract/project-galleries.json"), "utf8"),
);
const projectsPath = path.join(root, "src/content/projects.ts");
const projectsSrc = fs.readFileSync(projectsPath, "utf8");

const MIN_BYTES = 750_000;
const MAX_EDGE = 1920;
const QUALITY = 80;

const GALLERY_NOISE =
  /logo|icona|favicon|cropped-icon|feature-right|right-banner|top-der|-516(?:-|\.)|(?:^|[-_/])(?:banner|lateral|dere?)(?:[-_.]|$)/i;

function resolve(url) {
  if (!url) return null;
  if (url.startsWith("/media/")) return url;
  return manifest[url] ?? null;
}

const targets = new Set();

for (const entry of Object.values(galleries)) {
  for (const url of entry.images ?? []) {
    const resolved = resolve(url);
    if (!resolved?.startsWith("/media/")) continue;
    if (GALLERY_NOISE.test(resolved)) continue;
    targets.add(resolved);
  }
}

for (const match of projectsSrc.matchAll(/"image":\s*"(\/media\/[^"]+)"/g)) {
  targets.add(match[1]);
}

let compressed = 0;
let skipped = 0;
let saved = 0;
const failures = [];

for (const mediaPath of [...targets].sort()) {
  const abs = path.join(root, "public", mediaPath.replace(/^\//, ""));
  if (!fs.existsSync(abs)) {
    skipped += 1;
    continue;
  }
  const before = fs.statSync(abs).size;
  if (before < MIN_BYTES) {
    skipped += 1;
    continue;
  }
  if (!/\.jpe?g$/i.test(abs)) {
    skipped += 1;
    continue;
  }

  try {
    const input = fs.readFileSync(abs);
    const image = sharp(input, { failOn: "none" }).rotate();
    const meta = await image.metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    let pipeline = sharp(input, { failOn: "none" }).rotate();
    if (w > MAX_EDGE || h > MAX_EDGE) {
      pipeline = pipeline.resize({
        width: w >= h ? MAX_EDGE : undefined,
        height: h > w ? MAX_EDGE : undefined,
        fit: "inside",
        withoutEnlargement: true,
      });
    }
    const out = await pipeline
      .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();

    // Only write if we actually save bandwidth (keep original if worse)
    if (out.length >= before * 0.92) {
      skipped += 1;
      continue;
    }
    fs.writeFileSync(abs, out);
    compressed += 1;
    saved += before - out.length;
    const pct = Math.round((1 - out.length / before) * 100);
    console.log(
      `${(before / 1e6).toFixed(2)}→${(out.length / 1e6).toFixed(2)} MB (−${pct}%)  ${mediaPath}`,
    );
  } catch (err) {
    failures.push(`${mediaPath}: ${err.message}`);
  }
}

console.log(
  `\nDone. compressed=${compressed} skipped=${skipped} saved=${(saved / 1e6).toFixed(1)} MB failures=${failures.length}`,
);
if (failures.length) {
  console.error(failures.slice(0, 10).join("\n"));
  process.exitCode = 1;
}
