/**
 * Rewrites ambiencehomedesign.com media URLs in src/content to local /media paths
 * using content-extract/media-manifest.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifestPath = path.join(root, "content-extract", "media-manifest.json");
const contentDir = path.join(root, "src", "content");

if (!fs.existsSync(manifestPath)) {
  console.error("Missing media-manifest.json — run download-media.mjs first");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
// Longest URLs first to avoid partial replacements
const entries = Object.entries(manifest).sort(
  (a, b) => b[0].length - a[0].length,
);

function rewriteFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  let changed = 0;
  for (const [remote, local] of entries) {
    if (text.includes(remote)) {
      const next = text.split(remote).join(local);
      if (next !== text) {
        changed += (text.length - next.length) / (remote.length - local.length) || 1;
        text = next;
      }
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, text);
    console.log(`updated ${path.relative(root, filePath)}`);
  }
}

for (const name of fs.readdirSync(contentDir)) {
  if (/\.(ts|tsx|json)$/.test(name)) {
    rewriteFile(path.join(contentDir, name));
  }
}

console.log("Rewrite complete");
