import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  priority?: boolean;
  aspect?: "portrait" | "landscape" | "wide";
};

const aspects = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[5/4]",
  wide: "aspect-[16/10]",
};

export function ProjectTile({
  href,
  image,
  title,
  subtitle,
  priority,
  aspect = "portrait",
}: Props) {
  return (
    <Link href={href} className="group block focus-ring">
      <div className={`relative overflow-hidden bg-surface ${aspects[aspect]}`}>
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-display text-xl tracking-[-0.02em] transition-opacity group-hover:opacity-70 sm:text-2xl">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        ) : null}
      </div>
    </Link>
  );
}
