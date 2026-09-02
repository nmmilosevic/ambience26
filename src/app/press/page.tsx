import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { MediaImage } from "@/components/MediaImage";
import { pressContent } from "@/content/press";
import { pageHeroImage } from "@/content/atmosphere";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = { title: "Press" };

export default function PressPage() {
  const heroImage = pageHeroImage("press");

  return (
    <PageShell overMedia={Boolean(heroImage)}>
      <PageHero
        title={pressContent.title}
        lead={pressContent.intro}
        image={heroImage || undefined}
      />

      <section className="bg-bg pb-24 md:pb-32">
        <div className="mx-auto max-w-content space-y-12 px-5 md:px-8">
          {pressContent.editorials.map((item) => (
            <article
              key={`${item.publication}-${item.date}`}
              className="border-b border-line pb-12"
            >
              <Reveal variant="text">
                <p className="text-sm text-muted">
                  {item.publication}
                  {item.date ? ` - ${item.date}` : ""}
                </p>
              </Reveal>
              <TextReveal
                as="p"
                delay={STAGGER.body}
                className="mt-4 max-w-measure text-xl leading-snug tracking-tight md:text-2xl"
              >
                “{item.quote}”
              </TextReveal>
            </article>
          ))}

          <div>
            <TextReveal as="h2" className="font-display text-2xl tracking-tight">
              {pressContent.video.title}
            </TextReveal>
            <Reveal variant="text" delay={STAGGER.body} className="mt-3">
              <p className="text-muted">{pressContent.video.description}</p>
            </Reveal>
            <div className="mt-8 overflow-hidden">
              <div className="relative aspect-video">
                <iframe
                  title={pressContent.video.title}
                  src={`https://player.vimeo.com/video/${pressContent.video.vimeoId}?title=0&byline=0&portrait=0`}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div>
            <TextReveal as="h2" className="font-display text-2xl tracking-tight">
              {pressContent.showroom.title}
            </TextReveal>
            <Reveal variant="text" delay={STAGGER.body} className="mt-3">
              <p className="text-muted">{pressContent.showroom.description}</p>
            </Reveal>
            <Link href={pressContent.showroom.href} className="group mt-8 block">
              <ImageReveal delay={STAGGER.image}>
                <div className="relative aspect-[21/9] overflow-hidden">
                  <MediaImage
                    src={pressContent.showroom.poster}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover transition duration-slow group-hover:scale-[1.02]"
                  />
                </div>
              </ImageReveal>
              <Reveal variant="text" delay={STAGGER.body2} className="mt-4">
                <p className="text-sm text-muted underline-offset-4 group-hover:underline">
                  View the Golden Mile showroom project
                </p>
              </Reveal>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
