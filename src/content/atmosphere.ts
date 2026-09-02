import pageMediaRaw from "../../content-extract/page-media.json";
import galleriesRaw from "../../content-extract/project-galleries.json";
import { media, mediaList } from "@/lib/media";
import type { ProjectCategory } from "@/content/site";

type PageMediaFile = Record<
  string,
  { url: string; images: string[]; title?: string; error?: string }
>;

type GalleryFile = Record<
  string,
  { title: string; url: string; images: string[] }
>;

/**
 * App pages use short keys (about, team, …). The scrape stores WordPress
 * slugs (about-us, andrea-bock-team, …). Map so we don't wipe page imagery.
 */
const PAGE_KEY_ALIASES: Record<string, string> = {
  about: "about-us",
  team: "andrea-bock-team",
  outlet: "design-product-sales",
  careers: "career",
  appointment: "request-an-appointment",
};

/**
 * Some project list slugs are old / redirect targets. Point them at the
 * canonical gallery we scraped from the live site.
 */
const GALLERY_SLUG_ALIASES: Record<string, string> = {
  "coworking-space": "centro-polo-coworking",
  "luxury-villas": "luxury-estate-agent-office-design",
  "bathrooms-temp": "bathrooms-ambience-home-design",
  "kitchens-2": "kitchens-ambience-home-design",
};

const pageMedia = pageMediaRaw as PageMediaFile;
const galleries = galleriesRaw as GalleryFile;

/**
 * WordPress pages mix photography with chrome: 140px partner tiles, 300px
 * job icons, award badges, magazine marks. Those look fine as small UI on
 * the official site, but they turn muddy when we stretch them to a hero.
 */
function isChromeAsset(src: string): boolean {
  return /logo|favicon|icona|cropped-icon|award|essential|bloomberg|sprite|gravatar|\.svg$/i.test(
    src,
  );
}

function isDisplayPhoto(src: string): boolean {
  if (!src || isChromeAsset(src)) return false;
  if (/\.png$/i.test(src)) return false;
  if (/partners\//i.test(src)) return false;
  if (
    /supplier|utopia|140x140|150x150|300x300|architect-300|interior-desinger|admin-300|reception-300|installations-300|banner-der/i.test(
      src,
    )
  ) {
    return false;
  }
  // Official services page uses 380px column crops - not hero photography.
  if (/services-(?:1-right|[23])-/i.test(src)) return false;
  return true;
}

/**
 * Full-size interiors from the live WordPress library (already in /media).
 * Used when a page's scraped image list starts with logos or thumbnails.
 */
const PAGE_HERO_OVERRIDES: Record<string, string> = {
  about:
    "https://ambiencehomedesign.com/wp-content/uploads/2024/03/about-us.jpg",
  "about-us":
    "https://ambiencehomedesign.com/wp-content/uploads/2024/03/about-us.jpg",
  services:
    "https://ambiencehomedesign.com/wp-content/uploads/2018/02/ambience-home-design-service.jpg",
  careers:
    "https://ambiencehomedesign.com/wp-content/uploads/2019/10/staff-ambience-home-design.jpg",
  career:
    "https://ambiencehomedesign.com/wp-content/uploads/2019/10/staff-ambience-home-design.jpg",
  press:
    "https://ambiencehomedesign.com/wp-content/uploads/2024/07/featured-la-zagaleta-ambience-home-design.jpg",
  appointment:
    "https://ambiencehomedesign.com/wp-content/uploads/2025/07/appe.jpg",
  "request-an-appointment":
    "https://ambiencehomedesign.com/wp-content/uploads/2025/07/appe.jpg",
};

const CATEGORY_HERO_OVERRIDES: Record<ProjectCategory, string> = {
  residential:
    "https://ambiencehomedesign.com/wp-content/uploads/2023/03/home-slider-2.jpg",
  commercial:
    "https://ambiencehomedesign.com/wp-content/uploads/2024/05/Ambience-New-Showroom-Night-HD-9-1.jpg",
  refurbishment:
    "https://ambiencehomedesign.com/wp-content/uploads/2018/02/ambience-home-design-service.jpg",
};

function resolvePageKey(key: string): string {
  return PAGE_KEY_ALIASES[key] ?? key;
}

function resolveGallerySlug(slug: string): string {
  return GALLERY_SLUG_ALIASES[slug] ?? slug;
}

export function pageImages(key: string): string[] {
  const resolved = resolvePageKey(key);
  const raw = pageMedia[resolved]?.images ?? pageMedia[key]?.images ?? [];
  const local = mediaList(raw);
  const photos = local.filter(isDisplayPhoto);
  return photos.length ? photos : local.filter((src) => !isChromeAsset(src));
}

export function pageHeroImage(key: string, fallback?: string): string {
  const resolved = resolvePageKey(key);
  const override = PAGE_HERO_OVERRIDES[key] ?? PAGE_HERO_OVERRIDES[resolved];
  if (override) return media(override);
  return (
    pageImages(key)[0] ||
    media(fallback) ||
    pageImages("home")[0] ||
    ""
  );
}

export function categoryHeroImage(category: ProjectCategory): string {
  return media(CATEGORY_HERO_OVERRIDES[category]);
}

/** Body / band shots after the hero - never repeats the hero image */
export function pageContentImages(key: string, exclude: string[] = []): string[] {
  const hero = pageHeroImage(key);
  const skip = new Set([hero, ...exclude].filter(Boolean));
  return pageImages(key).filter((src) => !skip.has(src));
}

export function pageBandImages(key: string, count = 3): string[] {
  const content = pageContentImages(key);
  if (content.length >= count) return content.slice(0, count);
  // Fall back to other pages' content if this page is thin
  const home = pageContentImages("home");
  const merged = [...content];
  for (const src of home) {
    if (merged.length >= count) break;
    if (!merged.includes(src) && src !== pageHeroImage(key)) merged.push(src);
  }
  return merged.slice(0, count);
}

export function projectGallery(slug: string): string[] {
  const resolved = resolveGallerySlug(slug);
  const raw =
    galleries[resolved]?.images ?? galleries[slug]?.images ?? [];
  const local = mediaList(raw);
  const photos = local.filter((src) => !isChromeAsset(src));
  return photos.length ? photos : local;
}

/** Prefer gallery shots that aren't tiny logos / awards when possible */
export function projectGalleryPhotos(slug: string, limit = 12): string[] {
  const all = projectGallery(slug);
  const photos = all.filter(isDisplayPhoto);
  return (photos.length ? photos : all).slice(0, limit);
}
