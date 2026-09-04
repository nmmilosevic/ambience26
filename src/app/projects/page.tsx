import type { Metadata } from "next";
import { MediaImage } from "@/components/MediaImage";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { projectsByCategory } from "@/content/projects";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Projects",
};

const categories = [
  {
    id: "residential" as const,
    title: "Residential",
    lead: "Villas, apartments, and showhomes across Marbella and beyond.",
    href: "/projects/residential",
  },
  {
    id: "commercial" as const,
    title: "Commercial",
    lead: "Hospitality and retail spaces shaped around brand and experience.",
    href: "/projects/commercial",
  },
  {
    id: "refurbishment" as const,
    title: "Refurbishment",
    lead: "Full renovations and turnkey transformations.",
    href: "/projects/refurbishment",
  },
];

export default function ProjectsPage() {
  return (
    <PageShell>
      <section className="bg-bg pt-28 md:pt-32">
        <div className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-20">
          <TextReveal as="h1" className="font-display text-display max-w-3xl">
            Projects
          </TextReveal>
          <Reveal variant="text" delay={STAGGER.body} className="mt-6 max-w-measure">
            <p className="text-lead text-muted">
              A selection of interior architecture commissions, from Costa del Sol villas to
              international residences.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg pb-24 md:pb-32">
        <div className="mx-auto grid max-w-content gap-10 px-5 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 md:px-8">
          {categories.map((cat, i) => {
            const sample = projectsByCategory(cat.id)[0];
            return (
              <Link key={cat.id} href={cat.href} className="group block">
                <ImageReveal
                  delay={i * STAGGER.item}
                  className="relative aspect-[4/5] overflow-hidden"
                >
                  {sample?.image ? (
                    <MediaImage
                      src={sample.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-slow ease-out group-hover:scale-[1.03]"
                    />
                  ) : null}
                </ImageReveal>
                <TextReveal
                  as="h2"
                  delay={i * STAGGER.item + STAGGER.body}
                  className="mt-5 font-display text-h3 tracking-tight"
                >
                  {cat.title}
                </TextReveal>
                <Reveal
                  variant="text"
                  delay={i * STAGGER.item + STAGGER.body2}
                  className="mt-2"
                >
                  <p className="text-sm text-muted md:text-base">{cat.lead}</p>
                </Reveal>
                <Reveal
                  variant="text"
                  delay={i * STAGGER.item + STAGGER.body3}
                  className="mt-4"
                >
                  <span className="text-sm tracking-wide group-hover:opacity-70">
                    Browse {cat.title.toLowerCase()}
                  </span>
                </Reveal>
              </Link>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}