import manifest from "../../content-extract/media-manifest.json";
import invalidMedia from "../../content-extract/invalid-media.json";

const map = manifest as Record<string, string>;

/**
 * Page-URL downloads that were saved with a .jpg extension. They 200 as
 * HTML, so the browser shows a broken-image icon. Never serve them.
 */
const invalid = new Set(invalidMedia as string[]);

/** Local `/media/...` → original WordPress CDN URL (built once from manifest). */
const localToRemote: Record<string, string> = {};
for (const [remote, local] of Object.entries(map)) {
  if (!localToRemote[local]) localToRemote[local] = remote;
}

/**
 * On Vercel Hobby, `public/media` (~490MB) exceeds the 100MB static upload
 * limit. `.vercelignore` drops those files from the deploy; we serve the
 * same assets from ambiencehomedesign.com instead. Partner marks stay local
 * (~2MB) and are not ignored.
 */
const useRemoteMedia =
  process.env.NEXT_PUBLIC_REMOTE_MEDIA === "1" ||
  process.env.VERCEL === "1";

function usable(src: string): string {
  if (!src || invalid.has(src)) return "";
  if (src === "/media/partners/.png") return "";
  return src;
}

/**
 * Resolve a path for `<img>` / `next/image` / download links.
 * Local partner marks stay on-origin; other `/media` paths become CDN URLs
 * when remote media is enabled.
 */
export function resolveMediaSrc(src: string | undefined | null): string {
  const cleaned = usable(typeof src === "string" ? src.trim() : "");
  if (!cleaned) return "";

  if (
    useRemoteMedia &&
    cleaned.startsWith("/media/") &&
    !cleaned.startsWith("/media/partners/")
  ) {
    return localToRemote[cleaned] ?? cleaned;
  }

  return cleaned;
}

/** Resolve a remote Ambience CDN URL to a local /media path when available. */
export function media(url: string | undefined | null): string {
  if (!url) return "";

  // Already a local path (or partner mark)
  if (url.startsWith("/media/")) return resolveMediaSrc(url);

  // Prefer the original remote URL on Vercel — do not rewrite to a missing local file
  if (useRemoteMedia && /^https?:\/\//i.test(url)) {
    const local = map[url];
    if (local && invalid.has(local)) return "";
    return url;
  }

  const resolved = map[url] ?? url;
  return resolveMediaSrc(resolved);
}

export function mediaList(urls: string[]): string[] {
  return urls.map(media).filter(Boolean);
}
