"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { MediaImage } from "./MediaImage";

type BrandLogoProps = {
  /** White mark for void bands / over photography */
  onDark?: boolean;
  className?: string;
  priority?: boolean;
};

/**
 * Official Ambience Home Design stacked wordmark from ambiencehomedesign.com
 * (AMBIENCE / HOME DESIGN / MARBELLA). Dark mark on light surfaces; light mark
 * on void / media. Also flips with prefers-color-scheme via Tailwind `dark:`.
 */
export function BrandLogo({
  onDark = false,
  className = "",
  priority = false,
}: BrandLogoProps) {
  const router = useRouter();
  const sizeClass = "h-9 w-auto md:h-10";

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    router.push("/");
  };

  return (
    <Link
      href="/"
      aria-label="Ambience Home Design"
      onClick={onClick}
      className={`inline-flex items-center ${className}`}
    >
      <MediaImage
        src="/brand/ambience-logo-dark.png"
        alt="Ambience Home Design"
        width={650}
        height={153}
        priority={priority}
        className={`${sizeClass} ${onDark ? "hidden" : "dark:hidden"}`}
      />
      <MediaImage
        src="/brand/ambience-logo-light.png"
        alt="Ambience Home Design"
        width={650}
        height={153}
        priority={priority}
        className={`${sizeClass} ${onDark ? "block" : "hidden dark:block"}`}
      />
    </Link>
  );
}
