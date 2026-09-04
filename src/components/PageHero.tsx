import { ButtonLink } from "./ButtonLink";
import { TextReveal } from "./TextReveal";
import { Reveal } from "./Reveal";
import { MediaImage } from "./MediaImage";
import { ImageReveal } from "./ImageReveal";
import { HeroVeil } from "./HeroVeil";
import { STAGGER } from "@/lib/motion";

type PageHeroProps = {
  title: string;
  lead?: string;
  image?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function PageHero({
  title,
  lead,
  image,
  ctaHref = "/appointment",
  ctaLabel = "Request a meeting",
}: PageHeroProps) {
  if (image?.trim()) {
    return (
      <section className="relative min-h-[70dvh] overflow-hidden bg-void">
        <ImageReveal className="absolute inset-0">
          <MediaImage
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>
        <HeroVeil className="z-[1]" />
        <div className="relative z-10 mx-auto flex min-h-[70dvh] max-w-content flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <TextReveal as="h1" className="font-display text-display text-on-void">
            {title}
          </TextReveal>
          {lead && (
            <Reveal variant="text" delay={STAGGER.body} className="mt-5 max-w-xl">
              <p className="text-lead text-on-void/90">{lead}</p>
            </Reveal>
          )}
          <Reveal delay={STAGGER.cta} className="mt-8">
            <ButtonLink href={ctaHref} variant="ghost-dark">
              {ctaLabel}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg pt-28 md:pt-32">
      <div className="mx-auto max-w-content px-5 pb-12 md:px-8 md:pb-16">
        <TextReveal as="h1" className="font-display text-display max-w-3xl">
          {title}
        </TextReveal>
        {lead && (
          <Reveal variant="text" delay={STAGGER.body} className="mt-6 max-w-measure">
            <p className="text-lead text-muted">{lead}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
