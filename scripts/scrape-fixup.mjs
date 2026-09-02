/**
 * Fix-up pass after scrape-full-site.mjs:
 * - Re-scrape all marketing / content pages (fixed URL matching)
 * - Rebuild project galleries from project-sitemap only (no /attachment/ junk)
 * - Rebuild media-inventory.json from library + pages + galleries
 *
 * Usage: node scripts/scrape-fixup.mjs
 */
import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "content-extract");
const BASE = "https://ambiencehomedesign.com";
const UA = "Mozilla/5.0 (compatible; AmbienceArchiveBot/1.0; +local-redesign)";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 8) return reject(new Error(`Too many redirects: ${url}`));
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      { headers: { "User-Agent": UA, Accept: "*/*" }, timeout: 90000 },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          const next = new URL(res.headers.location, url).href;
          res.resume();
          return fetchText(next, redirects + 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve(Buffer.concat(chunks).toString("utf8")),
        );
      },
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error(`Timeout ${url}`));
    });
  });
}

function abs(u, base) {
  try {
    return new URL(u, base).href;
  } catch {
    return "";
  }
}

function toOriginal(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    u.search = "";
    u.pathname = u.pathname.replace(/-\d+x\d+(?=\.[a-zA-Z0-9]+$)/, "");
    return u.href;
  } catch {
    return url;
  }
}

function isUsefulMedia(url) {
  if (!url) return false;
  if (!/\/wp-content\/uploads\//i.test(url)) return false;
  if (/\.(svg|ico)$/i.test(url)) return false;
  if (/favicon|sprite|emoji|gravatar|woocommerce|smush/i.test(url)) return false;
  return true;
}

function extractImagesFromHtml(html, base) {
  const urls = new Set();
  const attrs =
    /(?:src|data-src|data-lazy-src|data-original|data-large_image|data-full-url|href)=["']([^"']*\/wp-content\/uploads\/[^"']+)["']/gi;
  for (const m of html.matchAll(attrs)) {
    const full = abs(m[1], base);
    if (!isUsefulMedia(full)) continue;
    if (/\.(jpe?g|png|webp|gif|avif|mp4|webm|pdf)$/i.test(full)) {
      urls.add(toOriginal(full));
    }
  }
  const bg =
    /url\((['"]?)([^)'"]*\/wp-content\/uploads\/[^)'"]+\.(?:jpe?g|png|webp|gif|avif))\1\)/gi;
  for (const m of html.matchAll(bg)) {
    const full = abs(m[2], base);
    if (!isUsefulMedia(full)) continue;
    urls.add(toOriginal(full));
  }
  const srcset = /srcset=["']([^"']+)["']/gi;
  for (const m of html.matchAll(srcset)) {
    for (const part of m[1].split(",")) {
      const raw = part.trim().split(/\s+/)[0];
      const full = abs(raw, base);
      if (!isUsefulMedia(full)) continue;
      if (/\.(jpe?g|png|webp|gif|avif)$/i.test(full)) urls.add(toOriginal(full));
    }
  }
  return [...urls];
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) =>
    m[1].trim(),
  );
}

function pageKey(url) {
  const p = new URL(url).pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  return p.replace(/^\//, "").replace(/\//g, "__");
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
      image: img ? toOriginal(abs(img, base)) : "",
      category,
    });
  }
  const seen = new Set();
  return items.filter((i) => {
    if (seen.has(i.slug)) return false;
    seen.add(i.slug);
    return true;
  });
}

async function mapPool(items, concurrency, fn) {
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
}

const MARKETING_PAGES = [
  `${BASE}/`,
  `${BASE}/about-us/`,
  `${BASE}/services/`,
  `${BASE}/andrea-bock-team/`,
  `${BASE}/testimonials/`,
  `${BASE}/design-product-sales/`,
  `${BASE}/press/`,
  `${BASE}/career/`,
  `${BASE}/join-the-team/`,
  `${BASE}/contact/`,
  `${BASE}/request-an-appointment/`,
  `${BASE}/projects/`,
  `${BASE}/projects-residential-ambience/`,
  `${BASE}/projects-commercial/`,
  `${BASE}/refurbishment/`,
  `${BASE}/bathrooms/`,
  `${BASE}/marketing-material/`,
  `${BASE}/newsletter/`,
  `${BASE}/showroom-video-1/`,
  `${BASE}/showroom-video-2/`,
  `${BASE}/privacy-policy/`,
  `${BASE}/cookies-policy/`,
  `${BASE}/legal-notice/`,
  `${BASE}/terms-conditions/`,
];

async function main() {
  console.log("Fix-up scrape…");

  // 1) Project URLs from project-sitemap only (exclude /attachment/)
  const projectXml = await fetchText(`${BASE}/project-sitemap.xml`);
  const projectUrls = extractLocs(projectXml).filter((u) => {
    const p = new URL(u).pathname;
    return (
      p.startsWith("/project/") &&
      !p.includes("/attachment/") &&
      p !== "/project/"
    );
  });
  console.log(`Project URLs: ${projectUrls.length}`);

  // 2) Refresh category indexes
  const indexPages = [
    {
      url: `${BASE}/projects-residential-ambience/`,
      category: "residential",
    },
    { url: `${BASE}/projects-commercial/`, category: "commercial" },
    { url: `${BASE}/refurbishment/`, category: "refurbishment" },
  ];
  const indexed = [];
  for (const page of indexPages) {
    try {
      const html = await fetchText(page.url);
      const items = scrapeBlurbs(html, page.url, page.category);
      console.log(`  index ${page.category}: ${items.length}`);
      indexed.push(...items);
      fs.writeFileSync(
        path.join(outDir, `projects-${page.category}.json`),
        JSON.stringify(items, null, 2),
      );
    } catch (err) {
      console.error(`  index fail ${page.category}: ${err.message}`);
    }
  }
  const seenSlug = new Set();
  const indexedProjects = indexed.filter((i) => {
    if (seenSlug.has(i.slug)) return false;
    seenSlug.add(i.slug);
    return true;
  });
  fs.writeFileSync(
    path.join(outDir, "projects-all.json"),
    JSON.stringify(indexedProjects, null, 2),
  );
  const bySlug = Object.fromEntries(indexedProjects.map((p) => [p.slug, p]));

  // 3) Scrape every project detail page
  const projectGalleries = {};
  await mapPool(projectUrls, 4, async (url, idx) => {
    const slug = new URL(url).pathname.split("/").filter(Boolean).pop();
    try {
      const html = await fetchText(url);
      const images = extractImagesFromHtml(html, url);
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch
        ? titleMatch[1]
            .replace(/\s*[|\-–].*$/, "")
            .replace(/<[^>]+>/g, "")
            .trim()
        : bySlug[slug]?.title || slug;
      projectGalleries[slug] = {
        title,
        url,
        images,
        category: bySlug[slug]?.category || "unknown",
      };
      console.log(
        `  [project ${idx + 1}/${projectUrls.length}] ${slug}: ${images.length} imgs`,
      );
      await sleep(60);
    } catch (err) {
      console.error(`  fail ${slug}: ${err.message}`);
      projectGalleries[slug] = {
        title: bySlug[slug]?.title || slug,
        url,
        images: bySlug[slug]?.image ? [bySlug[slug].image] : [],
        category: bySlug[slug]?.category || "unknown",
        error: err.message,
      };
    }
  });
  fs.writeFileSync(
    path.join(outDir, "project-galleries.json"),
    JSON.stringify(projectGalleries, null, 2),
  );

  // 4) Also pull page-sitemap (real pages only, not direct upload URLs)
  const pageXml = await fetchText(`${BASE}/page-sitemap.xml`);
  const postXml = await fetchText(`${BASE}/post-sitemap.xml`);
  const fromSitemaps = [...extractLocs(pageXml), ...extractLocs(postXml)].filter(
    (u) => {
      try {
        const p = new URL(u).pathname;
        if (p.includes("/wp-content/")) return false;
        if (/\.(jpe?g|png|webp|gif|pdf|mp4)$/i.test(p)) return false;
        return true;
      } catch {
        return false;
      }
    },
  );
  const pageTargets = [...new Set([...MARKETING_PAGES, ...fromSitemaps])];

  const pageMedia = {};
  await mapPool(pageTargets, 4, async (url, idx) => {
    try {
      const html = await fetchText(url);
      const images = extractImagesFromHtml(html, url);
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch
        ? titleMatch[1]
            .replace(/\s*[|\-–].*$/, "")
            .replace(/<[^>]+>/g, "")
            .trim()
        : "";
      const key = pageKey(url);
      pageMedia[key] = { url, title, images };
      console.log(
        `  [page ${idx + 1}/${pageTargets.length}] ${key}: ${images.length} imgs`,
      );
      await sleep(60);
    } catch (err) {
      console.error(`  page fail ${url}: ${err.message}`);
    }
  });
  // Keep short keys the Next.js app already uses (about, team, …)
  const pageAliases = {
    about: "about-us",
    team: "andrea-bock-team",
    outlet: "design-product-sales",
    careers: "career",
    appointment: "request-an-appointment",
  };
  for (const [short, real] of Object.entries(pageAliases)) {
    if (pageMedia[real]) {
      pageMedia[short] = { ...pageMedia[real], aliasOf: real };
    }
  }

  fs.writeFileSync(
    path.join(outDir, "page-media.json"),
    JSON.stringify(pageMedia, null, 2),
  );

  // Keep old project list slugs pointed at canonical galleries
  const galleryAliases = {
    "coworking-space": "centro-polo-coworking",
    "luxury-villas": "luxury-estate-agent-office-design",
    "bathrooms-temp": "bathrooms-ambience-home-design",
    "kitchens-2": "kitchens-ambience-home-design",
  };
  for (const [short, real] of Object.entries(galleryAliases)) {
    if (projectGalleries[real]) {
      projectGalleries[short] = { ...projectGalleries[real], aliasOf: real };
    }
  }
  fs.writeFileSync(
    path.join(outDir, "project-galleries.json"),
    JSON.stringify(projectGalleries, null, 2),
  );

  // 5) Rebuild inventory from media library + scrapes
  const libraryPath = path.join(outDir, "media-library.json");
  const library = fs.existsSync(libraryPath)
    ? JSON.parse(fs.readFileSync(libraryPath, "utf8"))
    : { items: [] };

  const allUrls = new Set();
  for (const m of library.items || []) {
    if (m.sourceUrl && isUsefulMedia(m.sourceUrl)) allUrls.add(m.sourceUrl);
  }
  for (const page of Object.values(pageMedia)) {
    for (const u of page.images || []) allUrls.add(toOriginal(u));
  }
  for (const gal of Object.values(projectGalleries)) {
    for (const u of gal.images || []) allUrls.add(toOriginal(u));
  }
  for (const p of indexedProjects) {
    if (p.image) allUrls.add(toOriginal(p.image));
  }

  const inventory = {
    scrapedAt: new Date().toISOString(),
    counts: {
      mediaLibrary: (library.items || []).length,
      mediaDownloadCandidates: allUrls.size,
      pagesScraped: Object.keys(pageMedia).length,
      projectGalleries: Object.keys(projectGalleries).length,
      indexedProjects: indexedProjects.length,
      projectImagesTotal: Object.values(projectGalleries).reduce(
        (n, g) => n + (g.images?.length || 0),
        0,
      ),
    },
    urls: [...allUrls].sort(),
  };
  fs.writeFileSync(
    path.join(outDir, "media-inventory.json"),
    JSON.stringify(inventory, null, 2),
  );

  console.log("\n=== Fix-up summary ===");
  console.log(JSON.stringify(inventory.counts, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
