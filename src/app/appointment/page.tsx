import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { locations, site } from "@/content/site";
import { pageHeroImage } from "@/content/atmosphere";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = { title: "Request a Meeting" };

export default function AppointmentPage() {
  const showroom = locations[0];
  const heroImage = pageHeroImage("appointment");

  return (
    <PageShell overMedia={Boolean(heroImage)}>
      <PageHero
        title="Request a meeting"
        lead="Tell us about your project. We will arrange a showroom visit or a conversation with the team."
        image={heroImage || undefined}
      />

      <section className="bg-bg pb-24 md:pb-32">
        <div className="mx-auto grid max-w-content gap-14 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="md:col-span-7">
            <AppointmentForm />
          </Reveal>
          <div className="md:col-span-5">
            <div className="bg-surface px-6 py-8 md:px-8">
              <TextReveal as="h2" delay={STAGGER.body} className="text-lg tracking-tight">
                Showroom
              </TextReveal>
              {showroom && (
                <Reveal variant="text" delay={STAGGER.body2} className="mt-4">
                  <address className="not-italic text-sm leading-relaxed text-muted">
                    <span className="block text-ink">{showroom.name}</span>
                    <span className="mt-2 block">{showroom.address}</span>
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="mt-3 block text-ink hover:opacity-70"
                    >
                      {site.phone}
                    </a>
                  </address>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}