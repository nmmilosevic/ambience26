import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { about } from "@/content/pages";

export const metadata: Metadata = {
  title: "About Us",
  description: "Why choose Ambience Home Design for luxury interior architecture in Marbella.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About us" description={about.title} />
      <section className="pb-20">
        <div className="container-pad max-w-3xl space-y-6 text-base leading-relaxed text-muted sm:text-lg">
          <p className="text-ink">{about.lead}</p>
          {about.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>
      <section className="border-t border-line section-y bg-surface">
        <div className="container-pad">
          <h2 className="font-display text-3xl tracking-[-0.02em] sm:text-4xl">
            {about.philosophyTitle}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {about.keys.map((key) => (
              <div key={key.title} className="border-t border-line pt-5">
                <h3 className="font-display text-xl tracking-[-0.02em]">{key.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{key.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
