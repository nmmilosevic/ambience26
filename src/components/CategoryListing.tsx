import { PageHero } from "@/components/PageHero";
import { ProjectTile } from "@/components/ProjectTile";
import { projectsByCategory } from "@/content/projects";
import type { ProjectCategory } from "@/content/site";

type Props = {
  title: string;
  description: string;
  category: ProjectCategory;
};

export function CategoryListing({ title, description, category }: Props) {
  const items = projectsByCategory(category);
  return (
    <>
      <PageHero title={title} description={description} />
      <section className="pb-24">
        <div className="container-pad grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProjectTile
              key={p.slug}
              href={p.href}
              image={p.image}
              title={p.displayTitle}
              priority={i < 3}
            />
          ))}
        </div>
      </section>
    </>
  );
}
