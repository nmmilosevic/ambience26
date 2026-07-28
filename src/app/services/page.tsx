import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { services } from "@/content/pages";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Turnkey refurbishments, residential interior design and commercial spaces by Ambience.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our services"
        description="Understanding the client's ideas and needs from the start is the key to every successful project."
      />
      <section className="pb-16">
        <div className="container-pad max-w-3xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p className="text-ink">{services.intro}</p>
          <p>{services.collective}</p>
        </div>
      </section>
      <section className="border-t border-line section-y bg-surface">
        <div className="container-pad space-y-14">
          {services.items.map((item) => (
            <article key={item.title} className="grid gap-4 border-t border-line pt-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="font-display text-2xl tracking-[-0.02em] sm:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{item.lead}</p>
              </div>
              <p className="text-base leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-y">
        <div className="container-pad flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-3xl tracking-[-0.02em]">Capabilities</h2>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {services.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <ButtonLink href="/appointment">Request an appointment</ButtonLink>
        </div>
      </section>
    </>
  );
}
