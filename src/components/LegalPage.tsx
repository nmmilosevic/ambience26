import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { STAGGER } from "@/lib/motion";

type LegalPageProps = {
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

export function LegalPage({ title, summary, sections }: LegalPageProps) {
  return (
    <PageShell>
      <PageHero title={title} lead={summary} />
      <section className="bg-bg pb-24 md:pb-32">
        <div className="mx-auto max-w-content space-y-10 px-5 md:px-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <TextReveal as="h2" className="text-xl tracking-tight">
                {section.heading}
              </TextReveal>
              <Reveal variant="text" delay={STAGGER.body} className="mt-3">
                <p className="max-w-measure leading-relaxed text-muted">
                  {section.body}
                </p>
              </Reveal>
            </div>
          ))}
          <p className="text-sm text-muted">
            For the complete legal text as published by Ambience Home Design, refer to the
            corresponding policy on ambiencehomedesign.com or contact the studio.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

export function legalMetadata(title: string): Metadata {
  return { title };
}