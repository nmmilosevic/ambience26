/**
 * Scrape key marketing pages + a sample of project detail pages for gallery images.
 * Writes content-extract/page-media.json and content-extract/project-galleries.json
 */
import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "content-extract");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; AmbienceBot/1.0)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(new URL(res.headers.location, url).href).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} ${url}`));
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
    return "";
  }
}

function extractImages(html, base) {
  const urls = new Set();
  const re =
    /(?:src|data-src|data-lazy-src|href)=["']([^"']*\/wp-content\/uploads\/[^"']+\.(?:jpe?g|png|webp|gif))["']/gi;
  for (const m of html.matchAll(re)) {
    const full = abs(m[1], base);
    if (!full) continue;
    if (/logo|favicon|sprite|icon|emoji|avatar|gravatar|150x150|100x100|-\d+x\d+\./i.test(full))
      continue;
    urls.add(full.split("?")[0]);
  }
  // also background-image urls
  const bg = /url\((['"]?)([^)'"]*\/wp-content\/uploads\/[^)'"]+\.(?:jpe?g|png|webp))\1\)/gi;
  for (const m of html.matchAll(bg)) {
    const full = abs(m[2], base);
    if (!full) continue;
    if (/logo|favicon|sprite|icon|-\d+x\d+\./i.test(full)) continue;
    urls.add(full.split("?")[0]);
  }
  return [...urls];
}

const pages = [
  { key: "home", url: "https://ambiencehomedesign.com/" },
  { key: "about", url: "https://ambiencehomedesign.com/about-us/" },
  { key: "services", url: "https://ambiencehomedesign.com/services/" },
  { key: "team", url: "https://ambiencehomedesign.com/andrea-bock-team/" },
  { key: "testimonials", url: "https://ambiencehomedesign.com/testimonials/" },
  { key: "outlet", url: "https://ambiencehomedesign.com/design-product-sales/" },
  { key: "press", url: "https://ambiencehomedesign.com/press/" },
  { key: "careers", url: "https://ambiencehomedesign.com/career/" },
  { key: "contact", url: "https://ambiencehomedesign.com/contact/" },
  { key: "appointment", url: "https://ambiencehomedesign.com/request-an-appointment/" },
  { key: "projects", url: "https://ambiencehomedesign.com/projects/" },
];

// sample project detail pages from projects-all.json
const projectsAllPath = path.join(outDir, "projects-all.json");
const projectSamples = fs.existsSync(projectsAllPath)
  ? JSON.parse(fs.readFileSync(projectsAllPath, "utf8")).slice(0, 25)
  : [];

const pageMedia = {};
for (const page of pages) {
  try {
    const html = await get(page.url);
    const images = extractImages(html, page.url);
    pageMedia[page.key] = { url: page.url, images };
    console.log(`[page] ${page.key}: ${images.length} images`);
  } catch (err) {
    console.error(`[page fail] ${page.key}`, err.message);
    pageMedia[page.key] = { url: page.url, images: [], error: err.message };
  }
}

const galleries = {};
for (const p of projectSamples) {
  const url = p.href?.startsWith("http")
    ? p.href
    : `https://ambiencehomedesign.com/project/${p.slug}/`;
  try {
    const html = await get(url);
    const images = extractImages(html, url);
    galleries[p.slug] = { title: p.title, url, images };
    console.log(`[project] ${p.slug}: ${images.length} images`);
  } catch (err) {
    console.error(`[project fail] ${p.slug}`, err.message);
  }
}

fs.writeFileSync(path.join(outDir, "page-media.json"), JSON.stringify(pageMedia, null, 2));
fs.writeFileSync(
  path.join(outDir, "project-galleries.json"),
  JSON.stringify(galleries, null, 2),
);
console.log("Wrote page-media.json and project-galleries.json");
