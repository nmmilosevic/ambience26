import manifest from "../../content-extract/media-manifest.json";
import invalidMedia from "../../content-extract/invalid-media.json";

const map = manifest as Record<string, string>;

/**
 * Page-URL downloads that were saved with a .jpg extension. They 200 as
 * HTML, so the browser shows a broken-image icon. Never serve them.
 */
const invalid = new Set(invalidMedia as string[]);

function usable(src: string): string {
  if (!src || invalid.has(src)) return "";
  if (src === "/media/partners/.png") return "";
  return src;
}

/** Resolve a remote Ambience CDN URL to a local /media path when available. */
export function media(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("/media/")) return usable(url);
  const resolved = map[url] ?? url;
  return usable(resolved);
}

export function mediaList(urls: string[]): string[] {
  return urls.map(media).filter(Boolean);
}
