/**
 * Full-site scrape of ambiencehomedesign.com
 *
 * 1. Collects every URL from Yoast sitemaps
 * 2. Pulls the entire WP media library via REST API (~3k items)
 * 3. Scrapes every page + project HTML for embedded images
 * 4. Writes comprehensive JSON into content-extract/
 *
 * Usage: node scripts/scrape-full-site.mjs
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

const UA =
  "Mozilla/5.0 (compatible; AmbienceArchiveBot/1.0; +local-redesign)";

fs.mkdirSync(outDir, { recursive: true });

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 8) return reject(new Error(`Too many redirects: ${url}`));
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: { "User-Agent": UA, Accept: "*/*" },
        timeout: 90000,
      },
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
          resolve({
            body: Buffer.concat(chunks).toString("utf8"),
            headers: res.headers,
          }),
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

function fetchJson(url) {
  return fetchText(url).then(({ body, headers }) => ({
    data: JSON.parse(body),
    headers,
  }));
}

function abs(u, base) {
  try {
    return new URL(u, base).href;
  } catch {
    return "";
  }
}

/** Prefer full-size originals: strip WordPress -123x456 before extension. */
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
  // srcset entries
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
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

async function mapPool(items, concurrency, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

async function collectSitemapUrls() {
  console.log("\n=== Sitemaps ===");
  const index = await fetchText(`${BASE}/sitemap_index.xml`);
  const sitemapUrls = extractLocs(index.body);
  const all = new Set();
  for (const sm of sitemapUrls) {
    try {
      const { body } = await fetchText(sm);
      const locs = extractLocs(body);
      locs.forEach((u) => all.add(u));
      console.log(`  ${sm.split("/").pop()}: ${locs.length} urls`);
      await sleep(150);
    } catch (err) {
      console.error(`  fail ${sm}: ${err.message}`);
    }
  }
  return [...all];
}

async function fetchAllMediaLibrary() {
  console.log("\n=== WP Media Library (REST) ===");
  const firstUrl = `${BASE}/wp-json/wp/v2/media?per_page=100&page=1&_fields=id,source_url,mime_type,title,alt_text,slug,date,media_details,link`;
  const first = await fetchJson(firstUrl);
  const total = Number(first.headers["x-wp-total"] || 0);
  const totalPages = Number(first.headers["x-wp-totalpages"] || 1);
  console.log(`  total attachments: ${total} across ${totalPages} pages`);

  const items = [...first.data];
  for (let page = 2; page <= totalPages; page++) {
    const url = `${BASE}/wp-json/wp/v2/media?per_page=100&page=${page}&_fields=id,source_url,mime_type,title,alt_text,slug,date,media_details,link`;
    try {
      const { data } = await fetchJson(url);
      items.push(...data);
      if (page % 5 === 0 || page === totalPages) {
        console.log(`  fetched page ${page}/${totalPages} (items=${items.length})`);
      }
      await sleep(120);
    } catch (err) {
      console.error(`  page ${page} failed: ${err.message}`);
      await sleep(800);
      try {
        const { data } = await fetchJson(url);
        items.push(...data);
      } catch (err2) {
        console.error(`  retry failed page ${page}: ${err2.message}`);
      }
    }
  }

  return items.map((item) => {
    const details = item.media_details || {};
    const full =
      details?.sizes?.full?.source_url ||
      item.source_url ||
      "";
    return {
      id: item.id,
      slug: item.slug,
      date: item.date,
      mimeType: item.mime_type,
      title: item.title?.rendered || "",
      alt: item.alt_text || "",
      link: item.link,
      sourceUrl: full ? toOriginal(full) : "",
      width: details.width || null,
      height: details.height || null,
      filesize: details.filesize || null,
    };
  });
}

function categorizeUrl(url) {
  try {
    const p = new URL(url).pathname.replace(/\/+$/, "") || "/";
    if (p === "" || p === "/") return "home";
    if (p.startsWith("/project/")) return "project";
    if (p.includes("project")) return "projects-index";
    if (p.startsWith("/category/") || p.startsWith("/project_category/"))
      return "taxonomy";
    if (/\/\d{4}\/\d{2}\//.test(p) || p.includes("/blog")) return "post";
    return "page";
  } catch {
    return "other";
  }
}

async function scrapePages(urls) {
  console.log(`\n=== Scraping ${urls.length} HTML pages ===`);
  const pageMedia = {};
  const projectGalleries = {};
  const projects = [];

  await mapPool(urls, 4, async (url, idx) => {
    const kind = categorizeUrl(url);
    // Skip attachment permalink pages — media API already covers those
    if (
      kind === "taxonomy" ||
      /\/attachment\//i.test(url) ||
      /-\d+\/?$/.test(url) && url.includes("uploads")
    ) {
      // still scrape project + marketing pages
    }
    // Only scrape meaningful content pages (not every attachment page)
    const pathname = new URL(url).pathname;
    const isAttachmentPage =
      !pathname.startsWith("/project/") &&
      !pathname.startsWith("/projects") &&
      !pathname.startsWith("/about") &&
      !pathname.startsWith("/service") &&
      !pathname.startsWith("/team") &&
      !pathname.startsWith("/andrea") &&
      !pathname.startsWith("/testimonial") &&
      !pathname.startsWith("/press") &&
      !pathname.startsWith("/career") &&
      !pathname.startsWith("/contact") &&
      !pathname.startsWith("/design-product") &&
      !pathname.startsWith("/request") &&
      !pathname.startsWith("/refurbishment") &&
      pathname !== "/" &&
      !pathname.startsWith("/blog") &&
      !/\/(20\d{2})\//.test(pathname) &&
      kind !== "page" &&
      kind !== "project" &&
      kind !== "projects-index" &&
      kind !== "post" &&
      kind !== "home";

    // Heuristic: skip Yoast attachment pages (they are /slug/ without known prefixes)
    // Attachment sitemap URLs look like /some-image-name/ — skip those without known content prefixes
    const knownPrefixes = [
      "/",
      "/about",
      "/service",
      "/andrea",
      "/team",
      "/testimonial",
      "/press",
      "/career",
      "/contact",
      "/design-product",
      "/request",
      "/project",
      "/refurbishment",
      "/outlet",
      "/privacy",
      "/cookie",
      "/terms",
      "/legal",
      "/blog",
      "/news",
      "/category",
      "/showroom",
      "/journal",
      "/magazine",
    ];
    const isKnown =
      pathname === "/" ||
      knownPrefixes.some(
        (p) => p !== "/" && (pathname === p || pathname.startsWith(p + "/")),
      ) ||
      /\/(20\d{2})\//.test(pathname);

    if (!isKnown) {
      return;
    }

    try {
      const { body } = await fetchText(url);
      const images = extractImagesFromHtml(body, url);
      const titleMatch = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch
        ? titleMatch[1].replace(/\s*[|\-–].*$/, "").replace(/<[^>]+>/g, "").trim()
        : "";

      if (kind === "project" || pathname.startsWith("/project/")) {
        const slug = pathname.split("/").filter(Boolean).pop();
        projectGalleries[slug] = { title, url, images };
        projects.push({
          title: title || slug,
          slug,
          href: url,
          image: images[0] || "",
          category: "unknown",
        });
        console.log(
          `  [project ${idx + 1}] ${slug}: ${images.length} images`,
        );
      } else {
        const key =
          pathname === "/"
            ? "home"
            : pathname.replace(/^\/|\/$/g, "").replace(/\//g, "__");
        pageMedia[key] = { url, title, images };
        console.log(`  [page ${idx + 1}] ${key}: ${images.length} images`);
      }
      await sleep(80);
    } catch (err) {
      console.error(`  fail ${url}: ${err.message}`);
    }
  });

  return { pageMedia, projectGalleries, projects };
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

async function refreshProjectIndexes() {
  console.log("\n=== Project index pages ===");
  const pages = [
    {
      url: `${BASE}/projects-residential-ambience/`,
      category: "residential",
    },
    { url: `${BASE}/projects-commercial/`, category: "commercial" },
    { url: `${BASE}/refurbishment/`, category: "refurbishment" },
    { url: `${BASE}/projects/`, category: "all" },
  ];
  const all = [];
  for (const page of pages) {
    try {
      const { body } = await fetchText(page.url);
      const items = scrapeBlurbs(body, page.url, page.category);
      console.log(`  ${page.category}: ${items.length}`);
      if (page.category !== "all") {
        all.push(...items);
        fs.writeFileSync(
          path.join(outDir, `projects-${page.category}.json`),
          JSON.stringify(items, null, 2),
        );
      }
    } catch (err) {
      console.error(`  fail ${page.category}: ${err.message}`);
    }
  }
  // dedupe
  const seen = new Set();
  const deduped = all.filter((i) => {
    if (seen.has(i.slug)) return false;
    seen.add(i.slug);
    return true;
  });
  fs.writeFileSync(
    path.join(outDir, "projects-all.json"),
    JSON.stringify(deduped, null, 2),
  );
  return deduped;
}

async function main() {
  console.log("Full-site scrape starting…");

  const sitemapUrls = await collectSitemapUrls();
  fs.writeFileSync(
    path.join(outDir, "sitemap-urls.json"),
    JSON.stringify({ scrapedAt: new Date().toISOString(), urls: sitemapUrls }, null, 2),
  );

  const mediaLibrary = await fetchAllMediaLibrary();
  fs.writeFileSync(
    path.join(outDir, "media-library.json"),
    JSON.stringify(
      {
        scrapedAt: new Date().toISOString(),
        total: mediaLibrary.length,
        items: mediaLibrary,
      },
      null,
      2,
    ),
  );

  const imageItems = mediaLibrary.filter(
    (m) =>
      m.sourceUrl &&
      (m.mimeType?.startsWith("image/") ||
        m.mimeType?.startsWith("video/") ||
        /\.(jpe?g|png|webp|gif|avif|mp4|webm)$/i.test(m.sourceUrl)),
  );
  const pdfItems = mediaLibrary.filter((m) => m.mimeType === "application/pdf");
  console.log(
    `  usable media files: ${imageItems.length} images/videos, ${pdfItems.length} pdfs`,
  );

  const indexedProjects = await refreshProjectIndexes();

  // Build scrape target list: known content pages + all projects from sitemap
  const projectUrls = sitemapUrls.filter((u) => {
    const p = new URL(u).pathname;
    return (
      p.startsWith("/project/") &&
      !p.includes("/attachment/") &&
      p !== "/project/"
    );
  });
  const pageUrls = sitemapUrls.filter((u) => {
    const p = new URL(u).pathname;
    if (p.startsWith("/project/")) return false;
    if (p.startsWith("/project_category/")) return false;
    if (p.startsWith("/category/")) return false;
    if (p.startsWith("/sdm_")) return false;
    // skip attachment-looking short slugs from attachment sitemap — handled by media API
    // Keep page-sitemap + post-sitemap URLs: we'll filter in scrapePages via knownPrefixes
    return true;
  });

  // Prefer page-sitemap + post-sitemap + project-sitemap only for HTML scrape
  // Re-fetch those specifically for a clean list
  const contentSitemaps = [
    `${BASE}/page-sitemap.xml`,
    `${BASE}/post-sitemap.xml`,
    `${BASE}/project-sitemap.xml`,
  ];
  const contentUrls = new Set();
  for (const sm of contentSitemaps) {
    try {
      const { body } = await fetchText(sm);
      extractLocs(body).forEach((u) => contentUrls.add(u));
    } catch (err) {
      console.error(`sitemap fail ${sm}: ${err.message}`);
    }
  }
  // Always include key marketing URLs
  [
    `${BASE}/`,
    `${BASE}/about-us/`,
    `${BASE}/services/`,
    `${BASE}/andrea-bock-team/`,
    `${BASE}/testimonials/`,
    `${BASE}/design-product-sales/`,
    `${BASE}/press/`,
    `${BASE}/career/`,
    `${BASE}/contact/`,
    `${BASE}/request-an-appointment/`,
    `${BASE}/projects/`,
    `${BASE}/projects-residential-ambience/`,
    `${BASE}/projects-commercial/`,
    `${BASE}/refurbishment/`,
  ].forEach((u) => contentUrls.add(u));

  const { pageMedia, projectGalleries, projects } = await scrapePages([
    ...contentUrls,
  ]);

  // Merge category info from index scrape into galleries
  const bySlug = Object.fromEntries(indexedProjects.map((p) => [p.slug, p]));
  for (const [slug, gal] of Object.entries(projectGalleries)) {
    if (bySlug[slug]) {
      gal.category = bySlug[slug].category;
      gal.listTitle = bySlug[slug].title;
      if (!gal.title) gal.title = bySlug[slug].title;
    }
  }

  // Ensure projects from sitemap that failed HTML scrape still appear
  for (const url of projectUrls) {
    const slug = new URL(url).pathname.split("/").filter(Boolean).pop();
    if (!projectGalleries[slug]) {
      projectGalleries[slug] = {
        title: bySlug[slug]?.title || slug,
        url,
        images: bySlug[slug]?.image ? [bySlug[slug].image] : [],
        category: bySlug[slug]?.category || "unknown",
        error: "html-scrape-missed",
      };
    }
  }

  fs.writeFileSync(
    path.join(outDir, "page-media.json"),
    JSON.stringify(pageMedia, null, 2),
  );
  fs.writeFileSync(
    path.join(outDir, "project-galleries.json"),
    JSON.stringify(projectGalleries, null, 2),
  );

  // Master URL inventory for downloader
  const allUrls = new Set();
  for (const m of mediaLibrary) {
    if (m.sourceUrl && isUsefulMedia(m.sourceUrl)) allUrls.add(m.sourceUrl);
  }
  for (const page of Object.values(pageMedia)) {
    for (const u of page.images || []) allUrls.add(u);
  }
  for (const gal of Object.values(projectGalleries)) {
    for (const u of gal.images || []) allUrls.add(u);
  }
  for (const p of indexedProjects) {
    if (p.image) allUrls.add(p.image);
  }

  const inventory = {
    scrapedAt: new Date().toISOString(),
    counts: {
      sitemapUrls: sitemapUrls.length,
      mediaLibrary: mediaLibrary.length,
      mediaDownloadCandidates: allUrls.size,
      pagesScraped: Object.keys(pageMedia).length,
      projectGalleries: Object.keys(projectGalleries).length,
      indexedProjects: indexedProjects.length,
    },
    urls: [...allUrls].sort(),
  };
  fs.writeFileSync(
    path.join(outDir, "media-inventory.json"),
    JSON.stringify(inventory, null, 2),
  );

  console.log("\n=== Summary ===");
  console.log(JSON.stringify(inventory.counts, null, 2));
  console.log(`\nWrote files to ${outDir}`);
  console.log("Next: node scripts/download-media.mjs");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
