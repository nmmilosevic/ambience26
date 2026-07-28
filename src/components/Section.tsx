import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  surface?: boolean;
  narrow?: boolean;
  id?: string;
};

export function Section({
  children,
  className = "",
  surface = false,
  narrow = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        "section",
        surface ? "section--surface" : "",
        narrow ? "section--narrow" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section__inner">{children}</div>
    </section>
  );
}

type PageHeroProps = {
  title: string;
  description?: string;
  image?: string;
  compact?: boolean;
};

export function PageHero({ title, description, image, compact = false }: PageHeroProps) {
  if (image) {
    return (
      <div
        className={compact ? "page-hero page-hero--compact" : "page-hero"}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="page-hero__overlay">
          <div className="page-hero__content">
            <h1 className="page-hero__title">{title}</h1>
            {description ? <p className="page-hero__desc">{description}</p> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "page-hero page-hero--text page-hero--compact" : "page-hero page-hero--text"}>
      <div className="page-hero__content">
        <h1 className="page-hero__title">{title}</h1>
        {description ? <p className="page-hero__desc">{description}</p> : null}
      </div>
    </div>
  );
}
