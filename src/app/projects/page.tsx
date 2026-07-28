import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProjectTile } from "@/components/ProjectTile";
import { projectsByCategory } from "@/content/projects";
import type { ProjectCategory } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Residential, commercial and refurbishment interior architecture projects by Ambience Home Design.",
};

const categories: { key: ProjectCategory; label: string; href: string; text: string }[] = [
  {
    key: "residential",
    label: "Residential",
    href: "/projects/residential",
    text: "Villas, apartments and showhomes across Marbella and abroad.",
  },
  {
    key: "commercial",
    label: "Commercial",
    href: "/projects/commercial",
    text: "Showrooms, offices, hospitality and brand environments.",
  },
  {
    key: "refurbishment",
    label: "Refurbishment",
    href: "/projects/refurbishment",
    text: "Kitchens, bathrooms, wardrobes and architectural detailing.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projects"
        description="A portfolio of luxury interiors where photography leads and every title stays linked to its space."
      />
      <section className="pb-20">
        <div className="container-pad grid gap-8 md:grid-cols-3">
          {categories.map((cat) => {
            const sample = projectsByCategory(cat.key)[0];
            return (
              <Link key={cat.key} href={cat.href} className="group block focus-ring">
                {sample ? (
                  <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sample.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <h2 className="font-display text-2xl tracking-[-0.02em]">{cat.label}</h2>
                <p className="mt-2 text-sm text-muted">{cat.text}</p>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="border-t border-line section-y bg-surface">
        <div className="container-pad">
          <h2 className="font-display text-3xl tracking-[-0.02em]">Recent residential</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projectsByCategory("residential").slice(0, 6).map((p) => (
              <ProjectTile
                key={p.slug}
                href={p.href}
                image={p.image}
                title={p.displayTitle}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
