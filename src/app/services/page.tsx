import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { MediaImage } from "@/components/MediaImage";
import { ButtonLink } from "@/components/ButtonLink";
import { CapabilitiesExplorer } from "@/components/CapabilitiesExplorer";
import { servicesContent } from "@/content/services";
import {
  categoryHeroImage,
  pageBandImages,
  pageHeroImage,
} from "@/content/atmosphere";
import { STAGGER } from "@/lib/motion";
import { projectsByCategory } from "@/content/projects";

export const metadata: Metadata = { title: "Services" };

function serviceImage(category: "residential" | "commercial" | "refurbishment") {
  return (
    projectsByCategory(category)[0]?.image ||
    categoryHeroImage(category) ||
    pageHeroImage("services")
  );
}

export default function ServicesPage() {
  const heroImage = pageHeroImage("services") || pageBandImages("home", 1)[0];
  // Official WP services crops are chrome-filtered; prefer home band photography.
  const introImage =
    pageBandImages("home", 3).find((src) => src && src !== heroImage) ||
    categoryHeroImage("residential") ||
    heroImage;

  return (
    <PageShell overMedia>
      <PageHero
        title={servicesContent.title}
        lead={servicesContent.intro}
        image={heroImage}
      />

      {/* Sticky narrative intro: photography leads, copy stays composed */}
      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto grid max-w-content gap-12 px-5 md:grid-cols-12 md:gap-10 md:px-8 lg:gap-16">
          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <TextReveal as="h2" className="font-display text-h2 max-w-md">
              From brief to last detail
            </TextReveal>
            <Reveal variant="text" delay={STAGGER.body} className="mt-6">
              <p className="text-lead text-muted">{servicesContent.lead}</p>
            </Reveal>
            <Reveal variant="text" delay={STAGGER.body2} className="mt-6">
              <p className="leading-relaxed text-muted">
                {servicesContent.experience}
              </p>
            </Reveal>
          </div>
          {introImage ? (
            <ImageReveal
              delay={STAGGER.image}
              className="relative aspect-[4/5] md:col-span-7 md:aspect-[5/6]"
            >
              <MediaImage
                src={introImage}
                alt="Interior architecture by Ambience Home Design"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
              />
            </ImageReveal>
          ) : null}
        </div>
      </section>

      {/* Numbered asymmetric service rows */}
      <section className="bg-surface py-20 md:py-28" aria-label="Offerings">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <TextReveal as="h2" className="font-display text-h2 max-w-xl">
            Offerings
          </TextReveal>
          <Reveal variant="text" delay={STAGGER.body} className="mt-5 max-w-measure">
            <p className="text-muted">
              Three paths of work, each led in-house from first sketch through
              installation.
            </p>
          </Reveal>

          <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
            {servicesContent.services.map((service, i) => {
              const image = serviceImage(service.category);
              const reverse = i % 2 === 1;
              const index = String(i + 1).padStart(2, "0");
              const rowDelay = i * STAGGER.item;

              return (
                <article
                  key={service.title}
                  className="grid items-start gap-8 md:grid-cols-12 md:gap-10 lg:gap-14"
                >
                  <div
                    className={`md:col-span-5 ${
                      reverse ? "md:order-2 md:col-start-8" : ""
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <Reveal variant="text" delay={rowDelay}>
                        <span
                          className="font-display text-sm tabular-nums tracking-wide text-accent"
                          aria-hidden
                        >
                          {index}
                        </span>
                      </Reveal>
                      <TextReveal
                        as="h3"
                        delay={rowDelay + 0.04}
                        className="font-display text-h3 tracking-tight md:text-[1.85rem]"
                      >
                        {service.title}
                      </TextReveal>
                    </div>
                    <Reveal
                      variant="text"
                      delay={rowDelay + STAGGER.body}
                      className="mt-5"
                    >
                      <p className="text-lead text-ink/80">{service.subtitle}</p>
                    </Reveal>
                    <Reveal
                      variant="text"
                      delay={rowDelay + STAGGER.body2}
                      className="mt-6"
                    >
                      <p className="leading-relaxed text-muted">
                        {service.description}
                      </p>
                    </Reveal>
                    <Reveal
                      variant="text"
                      delay={rowDelay + STAGGER.body3}
                      className="mt-4"
                    >
                      <p className="leading-relaxed text-muted">
                        {service.details}
                      </p>
                    </Reveal>
                  </div>

                  {image ? (
                    <div
                      className={`md:col-span-7 ${
                        reverse
                          ? "md:order-1 md:col-span-6 md:col-start-1"
                          : "md:col-start-6"
                      }`}
                    >
                      <ImageReveal
                        delay={rowDelay + STAGGER.image}
                        className={
                          reverse
                            ? "relative aspect-[4/3] md:mt-10"
                            : "relative aspect-[5/4] md:-mt-4"
                        }
                      >
                        <MediaImage
                          src={image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 55vw"
                          className="object-cover"
                        />
                      </ImageReveal>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive capabilities: split list + detail */}
      <section className="bg-bg py-20 md:py-28" aria-label="Capabilities">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <TextReveal as="h2" className="font-display text-h2 max-w-xl">
            Capabilities
          </TextReveal>
          <Reveal variant="text" delay={STAGGER.body} className="mt-5 max-w-measure">
            <p className="text-muted">
              Select a capability to see how it supports every commission.
            </p>
          </Reveal>

          <CapabilitiesExplorer items={servicesContent.capabilities} />

          <Reveal delay={STAGGER.cta} className="mt-14 md:mt-16">
            <ButtonLink href="/appointment">Request a meeting</ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28" aria-label="Design awards">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <TextReveal as="h2" className="font-display text-h2 max-w-xl">
            {servicesContent.awards.title}
          </TextReveal>
          <Reveal variant="text" delay={STAGGER.body} className="mt-5 max-w-measure">
            <p className="text-muted">{servicesContent.awards.lead}</p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8 lg:grid-cols-6">
            {servicesContent.awards.items.map((award, i) =>
              award.image ? (
              <li key={award.image}>
                <ImageReveal delay={i * STAGGER.item}>
                  <div className="relative aspect-square overflow-hidden p-4 md:p-5">
                    <MediaImage
                      src={award.image}
                      alt={award.alt}
                      fill
                      sizes="160px"
                      className="object-contain p-2"
                    />
                  </div>
                </ImageReveal>
              </li>
              ) : null,
            )}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
