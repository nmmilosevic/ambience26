import Link from "next/link";
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
  const sizeClass = "h-9 w-auto md:h-10";

  return (
    <Link
      href="/"
      aria-label="Ambience Home Design"
      className={`inline-flex items-center ${className}`}
    >
      {/* Black mark — light surfaces (hidden when onDark or OS dark) */}
      <MediaImage
        src="/brand/ambience-logo-dark.png"
        alt="Ambience Home Design"
        width={650}
        height={153}
        priority={priority}
        className={`${sizeClass} ${onDark ? "hidden" : "dark:hidden"}`}
      />
      {/* White mark — void / over media / OS dark */}
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
