import galleries from "../../content-extract/project-galleries.json";
import { media } from "./media";

type GalleryEntry = {
  title?: string;
  url?: string;
  images?: string[];
  category?: string;
};

const galleryMap = galleries as Record<string, GalleryEntry>;

export function getProjectGallery(slug: string): string[] {
  const direct = galleryMap[slug];
  if (direct?.images?.length) {
    return mediaListUnique(direct.images);
  }

  const byUrl = Object.values(galleryMap).find((entry) => {
    const url = entry.url ?? "";
    return url.includes(`/project/${slug}`) || url.includes(`/projects/${slug}`);
  });

  if (byUrl?.images?.length) {
    return mediaListUnique(byUrl.images);
  }

  return [];
}

/**
 * WordPress extracts often prepend logos and ~510px sidebar crops (`-der-`,
 * banners, laterals). Upscaling those as full-bleed gallery plates looks soft
 * and wastes the first ImageReveal slot before real photography starts.
 */
const GALLERY_NOISE =
  /logo|icona|favicon|cropped-icon|feature-right|right-banner|top-der|-516(?:-|\.)|(?:^|[-_/])(?:banner|lateral|dere?)(?:[-_.]|$)/i;

function mediaListUnique(urls: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of urls) {
    const resolved = media(url);
    if (!resolved) continue;
    // Unmapped remotes 404 (e.g. deleted WP uploads). Stay on local /media.
    if (!resolved.startsWith("/media/")) continue;
    if (GALLERY_NOISE.test(resolved)) continue;
    if (seen.has(resolved)) continue;
    seen.add(resolved);
    out.push(resolved);
  }
  return out;
}