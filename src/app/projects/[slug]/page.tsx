import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.displayTitle,
    description: `${project.displayTitle} — interior design project by Ambience Home Design.`,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative min-h-[70svh] bg-ink text-bg">
        <Image
          src={project.image}
          alt={project.displayTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/20" />
        <div className="relative z-10 container-pad flex min-h-[70svh] flex-col justify-end pb-16 pt-36">
          <p className="text-sm uppercase tracking-[0.2em] text-bg/75">
            {project.category}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.25rem,5vw,4.25rem)] tracking-[-0.02em]">
            {project.displayTitle}
          </h1>
        </div>
      </section>

      <section className="section-y">
        <div className="container-pad grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="max-w-prose text-lg leading-relaxed text-muted">
              A {project.category} project by Ambience Home Design. Explore the atmosphere,
              materials and composition of this space. For room-by-room details or a private
              walkthrough, request an appointment with the studio.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <ButtonLink href="/appointment">Request an appointment</ButtonLink>
            <ButtonLink href={`/projects/${project.category}`} variant="outline">
              More {project.category} projects
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
