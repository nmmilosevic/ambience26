import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "content-extract");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location).then(resolve, reject);
        }
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve(d));
      })
      .on("error", reject);
  });
}

function abs(u, base) {
  try {
    return new URL(u, base).href;
  } catch {
    return u;
  }
}

function scrapeBlurbs(html, base, category) {
  const items = [];
  const parts = html.split(/et_pb_blurb\b/);
  for (const p of parts.slice(1)) {
    const href = (p.match(/href="([^"]*\/project\/[^"]+)"/) || [])[1];
    const titleRaw = (p.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1];
    if (!href || !titleRaw) continue;
    const title = titleRaw.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const img =
      (p.match(/(?:src|data-src)="([^"]*uploads[^"]+)"/) || [])[1] ||
      (p.match(/url\((['"]?)([^)'"]*uploads[^)'"]+)\1\)/) || [])[2];
    const full = abs(href, base);
    const slug = full.split("/").filter(Boolean).pop();
    items.push({
      title,
      slug,
      href: full,
      image: img ? abs(img, base) : "",
      category,
    });
  }
  // dedupe by slug
  const seen = new Set();
  return items.filter((i) => {
    if (seen.has(i.slug)) return false;
    seen.add(i.slug);
    return true;
  });
}

const pages = [
  {
    url: "https://ambiencehomedesign.com/projects-residential-ambience/",
    category: "residential",
  },
  {
    url: "https://ambiencehomedesign.com/projects-commercial/",
    category: "commercial",
  },
  {
    url: "https://ambiencehomedesign.com/refurbishment/",
    category: "refurbishment",
  },
];

const all = [];
for (const page of pages) {
  const html = await get(page.url);
  const items = scrapeBlurbs(html, page.url, page.category);
  console.log(page.category, items.length);
  all.push(...items);
  fs.writeFileSync(
    path.join(outDir, `projects-${page.category}.json`),
    JSON.stringify(items, null, 2)
  );
}

fs.writeFileSync(path.join(outDir, "projects-all.json"), JSON.stringify(all, null, 2));
console.log("total", all.length);
