import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ProjectTile } from "@/components/ProjectTile";
import { projectsByCategory } from "@/content/projects";
import { categoryHeroImage } from "@/content/atmosphere";
import type { ProjectCategory } from "@/content/site";

type Props = {
  title: string;
  lead: string;
  category: ProjectCategory;
};

export function CategoryListingPage({ title, lead, category }: Props) {
  const items = projectsByCategory(category);
  const heroImage = categoryHeroImage(category) || items[0]?.image || "";

  return (
    <PageShell overMedia={Boolean(heroImage)}>
      <PageHero title={title} lead={lead} image={heroImage || undefined} />
      <section className="bg-bg pb-24 md:pb-32">
        <div className="mx-auto grid max-w-content gap-10 px-5 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
          {items.map((project, i) => (
            <ProjectTile
              key={project.slug}
              href={project.href}
              title={project.displayTitle}
              image={project.image}
              aspect={i % 5 === 0 ? "portrait" : "video"}
              priority={i === 0}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export function categoryMetadata(title: string): Metadata {
  return { title };
}