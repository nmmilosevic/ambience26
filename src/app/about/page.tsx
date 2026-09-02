import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { MediaImage } from "@/components/MediaImage";
import { KeysManifest } from "@/components/KeysManifest";
import { SupplierExplorer } from "@/components/SupplierExplorer";
import { aboutContent } from "@/content/about";
import { partnersGrouped } from "@/content/partners";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const supplierGroups = partnersGrouped();

  return (
    <PageShell overMedia>
      <PageHero
        title={aboutContent.title}
        lead={aboutContent.lead}
        image={aboutContent.images.hero}
      />

      <section className="bg-bg py-20 md:py-28 lg:py-36">
        <div className="mx-auto grid max-w-content gap-12 px-5 md:grid-cols-12 md:gap-10 md:px-8 lg:gap-16">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <TextReveal as="h2" className="font-display text-h2">
                A Marbella studio for lasting homes
              </TextReveal>
              <Reveal variant="text" delay={STAGGER.body} className="mt-5">
                <p className="text-sm leading-relaxed text-muted">
                  Quiet luxury interior architecture, shaped around place, light,
                  and how you live.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            <Reveal variant="text">
              <p className="text-lead text-ink">{aboutContent.intro}</p>
            </Reveal>
            {aboutContent.body.map((para, i) => (
              <Reveal
                key={para.slice(0, 28)}
                variant="text"
                delay={0.06 + i * 0.06}
                className="mt-8"
              >
                <p className="max-w-measure leading-relaxed text-muted">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {aboutContent.images.atelier ? (
        <section className="bg-bg pb-6 md:pb-10">
          <div className="mx-auto max-w-content px-5 md:px-8">
            <ImageReveal className="relative aspect-[16/10] md:aspect-[21/9]">
              <MediaImage
                src={aboutContent.images.atelier}
                alt="Ambience showroom interior, Golden Mile Marbella"
                fill
                sizes="(max-width: 768px) 100vw, 76rem"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </section>
      ) : null}

      <KeysManifest
        title={aboutContent.philosophyTitle}
        lead={aboutContent.philosophyLead}
        values={aboutContent.values}
      />

      <section className="bg-void py-20 md:py-28 lg:py-36" aria-label="Suppliers">
        <div className="mx-auto max-w-content px-5 md:px-8">
          {/* Title carries the section; lead supports it — one purpose, asymmetric. */}
          <div className="max-w-3xl">
            <TextReveal as="h2" className="font-display text-h2 text-on-void">
              {aboutContent.suppliers.title}
            </TextReveal>
            <Reveal variant="text" delay={STAGGER.body} className="mt-5 md:mt-6">
              <p className="max-w-measure text-base leading-relaxed text-on-void/55 md:text-[1.05rem]">
                {aboutContent.suppliers.lead}
              </p>
            </Reveal>
          </div>
          <SupplierExplorer groups={supplierGroups} />
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto flex max-w-content flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-8">
          <div className="max-w-xl">
            <TextReveal as="h2" className="font-display text-h2">
              Ready to begin a conversation
            </TextReveal>
            <Reveal variant="text" delay={STAGGER.body} className="mt-5">
              <p className="text-muted">
                Visit the Golden Mile showroom, or request a meeting to talk
                through your next home.
              </p>
            </Reveal>
          </div>
          <Reveal delay={STAGGER.cta}>
            <ButtonLink href="/appointment">Request a meeting</ButtonLink>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
