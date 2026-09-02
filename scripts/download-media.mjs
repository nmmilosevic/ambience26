/**
 * Collects all ambiencehomedesign.com media URLs from content-extract + src/content,
 * downloads them into public/media/, and writes a URL → local path manifest.
 */
import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "media");
const manifestPath = path.join(root, "content-extract", "media-manifest.json");

const URL_RE =
  /https?:\/\/(?:images\.)?ambiencehomedesign\.com\/[^\s"'\\)]+/gi;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(json|ts|tsx|md|mjs|js)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

function collectUrls() {
  // Prefer the full-site inventory when present (complete media library + page scrape)
  const inventoryPath = path.join(root, "content-extract", "media-inventory.json");
  if (fs.existsSync(inventoryPath)) {
    try {
      const inv = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
      if (Array.isArray(inv.urls) && inv.urls.length > 0) {
        console.log(`Using media-inventory.json (${inv.urls.length} urls)`);
        return inv.urls;
      }
    } catch {
      /* fall through */
    }
  }

  const files = [
    ...walk(path.join(root, "content-extract")),
    ...walk(path.join(root, "src", "content")),
  ];
  const urls = new Set();
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(URL_RE)) {
      let url = match[0].replace(/[),.;]+$/, "");
      try {
        const u = new URL(url);
        u.hash = "";
        // Prefer full-size originals (strip WP -123x456)
        u.pathname = u.pathname.replace(/-\d+x\d+(?=\.[a-zA-Z0-9]+$)/, "");
        urls.add(u.href);
      } catch {
        /* ignore */
      }
    }
  }
  return [...urls];
}

function localName(url) {
  const u = new URL(url);
  const base = path.basename(u.pathname) || "asset";
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "-");
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 8);
  const ext = path.extname(safe) || ".jpg";
  const stem = path.basename(safe, ext).slice(0, 80);
  return `${stem}-${hash}${ext}`;
}

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error(`Too many redirects: ${url}`));
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; AmbienceMediaBot/1.0; +local-dev)",
          Accept: "image/*,video/*,*/*",
        },
        timeout: 60000,
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          const next = new URL(res.headers.location, url).href;
          res.resume();
          return fetchBuffer(next, redirects + 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      },
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error(`Timeout: ${url}`));
    });
  });
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const urls = collectUrls();
  console.log(`Found ${urls.length} unique media URLs`);

  const manifest = {};
  let ok = 0;
  let fail = 0;

  // Concurrency pool
  const concurrency = 10;
  let i = 0;

  async function worker() {
    while (i < urls.length) {
      const idx = i++;
      const url = urls[idx];
      const name = localName(url);
      const dest = path.join(outDir, name);
      const publicPath = `/media/${name}`;

      if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
        manifest[url] = publicPath;
        ok++;
        console.log(`[skip] ${name}`);
        continue;
      }

      try {
        const buf = await fetchBuffer(url);
        fs.writeFileSync(dest, buf);
        manifest[url] = publicPath;
        ok++;
        console.log(`[ok] ${name} (${Math.round(buf.length / 1024)}kb)`);
      } catch (err) {
        fail++;
        console.error(`[fail] ${url} → ${err.message}`);
      }
    }
  }

  await Promise.all(
    Array.from({ length: concurrency }, () => worker()),
  );

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ok=${ok} fail=${fail}`);
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
