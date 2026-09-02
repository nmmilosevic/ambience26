import Link from "next/link";
import { ImageReveal } from "./ImageReveal";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";
import { MediaImage } from "./MediaImage";
import { STAGGER } from "@/lib/motion";

type ProjectTileProps = {
  href: string;
  title: string;
  subtitle?: string;
  image: string;
  priority?: boolean;
  aspect?: "video" | "square" | "portrait" | "wide";
  className?: string;
  delay?: number;
};

const aspects = {
  video: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[21/9]",
};

export function ProjectTile({
  href,
  title,
  subtitle,
  image,
  priority = false,
  aspect = "video",
  className = "",
  delay = 0,
}: ProjectTileProps) {
  const hasImage = Boolean(image?.trim());

  return (
    <div className={className}>
      <Link href={href} className="group block">
        {hasImage ? (
          <ImageReveal
            delay={delay}
            className={`relative overflow-hidden ${aspects[aspect]}`}
          >
            <MediaImage
              src={image}
              alt={title}
              fill
              priority={priority}
              // Eager: ImageReveal wipe needs pixels; lazy + clip races empty tiles
              loading={priority ? undefined : "eager"}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-slow ease-out group-hover:scale-[1.03]"
            />
          </ImageReveal>
        ) : null}
        <TextReveal
          as="h3"
          delay={delay + STAGGER.body}
          className="mt-5 font-display text-h3 tracking-tight"
        >
          {title}
        </TextReveal>
        {subtitle && (
          <Reveal variant="text" delay={delay + STAGGER.body2}>
            <p className="mt-1 text-sm text-muted md:text-base">{subtitle}</p>
          </Reveal>
        )}
      </Link>
    </div>
  );
}
