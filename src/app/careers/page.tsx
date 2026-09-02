import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { careersContent } from "@/content/careers";
import { pageHeroImage } from "@/content/atmosphere";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  const heroImage = pageHeroImage("careers");

  return (
    <PageShell overMedia={Boolean(heroImage)}>
      <PageHero
        title={careersContent.title}
        lead={careersContent.intro}
        image={heroImage || undefined}
      />

      <section className="bg-bg pb-24 md:pb-32">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal variant="text">
            <p className="max-w-measure leading-relaxed text-muted">
              {careersContent.about}
            </p>
          </Reveal>
          <Reveal variant="text" delay={STAGGER.body} className="mt-5">
            <p className="max-w-measure leading-relaxed text-muted">
              {careersContent.mission}
            </p>
          </Reveal>
          <Reveal variant="text" delay={STAGGER.body2} className="mt-5">
            <p className="max-w-measure leading-relaxed text-muted">
              {careersContent.culture}
            </p>
          </Reveal>

          <div className="mt-16">
            <TextReveal as="h2" className="font-display text-2xl tracking-tight md:text-3xl">
              Open roles
            </TextReveal>
            <ul className="mt-8 divide-y divide-line">
              {careersContent.openings.map((job) => (
                <li
                  key={job.title}
                  className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <Reveal variant="text">
                      <p className="text-lg tracking-tight">{job.title}</p>
                    </Reveal>
                    {job.requiresPortfolio && (
                      <Reveal variant="text" delay={STAGGER.body}>
                        <p className="mt-1 text-sm text-muted">Portfolio required</p>
                      </Reveal>
                    )}
                  </div>
                  <a
                    href={`mailto:${job.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                    className="text-sm tracking-wide underline-offset-4 hover:underline"
                  >
                    Apply by email
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}