import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { MediaImage } from "@/components/MediaImage";
import { ButtonLink } from "@/components/ButtonLink";
import { downloadsContent } from "@/content/downloads";
import { pageHeroImage } from "@/content/atmosphere";
import { resolveMediaSrc } from "@/lib/media";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  const heroImage =
    pageHeroImage("downloads") || downloadsContent.cards[0]?.image;

  return (
    <PageShell overMedia={Boolean(heroImage)}>
      <PageHero
        title={downloadsContent.title}
        lead={downloadsContent.intro}
        image={heroImage || undefined}
      />

      <section className="bg-bg pb-20 md:pb-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
            {downloadsContent.cards.map((card, i) => (
              <li key={card.title}>
                {card.image ? (
                  <ImageReveal
                    delay={i * STAGGER.item}
                    className="relative aspect-[4/3] overflow-hidden"
                  >
                    <MediaImage
                      src={card.image}
                      alt=""
                      fill
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </ImageReveal>
                ) : null}
                <TextReveal
                  as="h2"
                  delay={i * STAGGER.item + STAGGER.body}
                  className="mt-6 font-display text-2xl tracking-tight"
                >
                  {card.title}
                </TextReveal>
                <Reveal
                  variant="text"
                  delay={i * STAGGER.item + STAGGER.body2}
                  className="mt-3"
                >
                  <p className="text-muted leading-relaxed">{card.description}</p>
                </Reveal>
                <Reveal delay={i * STAGGER.item + STAGGER.cta} className="mt-6">
                  <ButtonLink href={card.href} variant="outline">
                    {card.cta}
                  </ButtonLink>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-20 md:mt-28">
            <TextReveal as="h2" className="font-display text-2xl tracking-tight md:text-3xl">
              Public references
            </TextReveal>
            <Reveal variant="text" delay={STAGGER.body} className="mt-4 max-w-measure">
              <p className="text-muted">
                Open studio PDFs. Client-only folders remain behind a live brief.
              </p>
            </Reveal>
            <ul className="mt-10 space-y-4">
              {downloadsContent.publicFiles.map((file, i) => {
                const href = resolveMediaSrc(file.href) || file.href;
                return (
                <li key={file.href}>
                  <Reveal variant="text" delay={i * STAGGER.item}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg tracking-tight underline-offset-4 hover:underline"
                    >
                      {file.label}
                    </a>
                  </Reveal>
                </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
