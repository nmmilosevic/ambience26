"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type MediaImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/**
 * Local `/media` and `/brand` assets bypass the Next image optimizer.
 * Turbopack `/_next/image` often returns 200 with Content-Length: 0 for
 * local JPEGs; keep serving files directly until that is fixed upstream.
 *
 * Defaults favour LCP and bandwidth: async decode, high fetch priority only
 * when `priority` is set, lazy load otherwise. Callers that warm below-fold
 * plates should pass `loading="eager"` + `fetchPriority="auto"` — avoid
 * stacking extra `priority` (Next injects a high preload that fights LCP).
 *
 * Empty or failed sources render nothing — never a broken-image icon or
 * gray stamp for a missing asset.
 */
export function MediaImage({
  src,
  alt,
  unoptimized,
  priority,
  loading,
  decoding,
  fetchPriority,
  sizes,
  onError,
  style,
  ...rest
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);
  const usable = typeof src === "string" ? src.trim() : "";

  if (!usable || failed) return null;

  const isLocal =
    usable.startsWith("/media/") || usable.startsWith("/brand/");

  const isPriority = Boolean(priority);

  return (
    <Image
      {...rest}
      src={usable}
      alt={alt}
      priority={isPriority}
      // Spread-safe: local media always bypasses the broken optimizer
      unoptimized={isLocal || Boolean(unoptimized)}
      decoding={decoding ?? "async"}
      loading={loading ?? (isPriority ? "eager" : "lazy")}
      fetchPriority={fetchPriority ?? (isPriority ? "high" : "auto")}
      // Sensible default for `fill` callers that forget sizes
      sizes={sizes ?? (rest.fill ? "100vw" : undefined)}
      style={style}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}
