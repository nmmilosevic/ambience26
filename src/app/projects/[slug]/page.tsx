import type { Metadata } from "next";
import { preload } from "react-dom";
import { MediaImage } from "@/components/MediaImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ImageReveal } from "@/components/ImageReveal";
import { TextReveal } from "@/components/TextReveal";
import { Reveal } from "@/components/Reveal";
import { HeroVeil } from "@/components/HeroVeil";
import { ButtonLink } from "@/components/ButtonLink";
import { getProject, projects } from "@/content/projects";
import { getProjectStory } from "@/content/project-stories";
import { getProjectGallery } from "@/lib/galleries";
import { STAGGER } from "@/lib/motion";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.displayTitle };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const gallery = getProjectGallery(slug);
  const images = (gallery.length > 0 ? gallery : [project.image]).filter(
    (src) => Boolean(src?.trim()),
  );
  const story = getProjectStory(slug);
  // Hero owns LCP / high fetch. Warm the first unique gallery plate at low
  // priority so the wipe is not cold when the story ends — without fighting
  // the hero for bandwidth (Next `priority` would inject another high preload).
  const leadGallery = images[0];
  const warmGallery =
    leadGallery && leadGallery !== project.image ? leadGallery : images[1];
  if (project.image?.trim()) {
    preload(project.image, { as: "image", fetchPriority: "high" });
  }
  if (warmGallery?.trim()) {
    preload(warmGallery, { as: "image", fetchPriority: "low" });
  }
  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <PageShell overMedia>
      <section className="relative min-h-[75dvh] overflow-hidden bg-void">
        <ImageReveal className="absolute inset-0">
          <MediaImage
            src={project.image}
            alt={project.displayTitle}
            fill
            priority
            decoding="sync"
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>
        <HeroVeil className="z-[1]" />
        <div className="relative z-10 mx-auto flex min-h-[75dvh] max-w-content flex-col justify-end px-5 pb-16 pt-28 md:px-8">
          <Reveal variant="text">
            <p className="mb-3 text-sm capitalize text-on-void/80">
              {story?.location ? `${project.category} · ${story.location}` : project.category}
            </p>
          </Reveal>
          <TextReveal as="h1" delay={STAGGER.body} className="max-w-4xl font-display text-display text-on-void">
            {project.displayTitle}
          </TextReveal>
        </div>
      </section>

      {story && story.body.length > 0 ? (
        <section className="bg-bg pt-16 md:pt-24">
          <div className="mx-auto max-w-content px-5 md:px-8">
            <div className="max-w-measure space-y-5">
              {story.body.map((para, i) => (
                <Reveal
                  key={para.slice(0, 48)}
                  variant="text"
                  delay={STAGGER.body + i * 0.06}
                >
                  <p className="leading-relaxed text-muted">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={`bg-bg ${story && story.body.length > 0 ? "py-16 md:py-24" : "py-16 md:py-24"}`}>
        <div className="mx-auto max-w-content px-5 md:px-8">
          {/*
            True 2-column photography grid (not a wrapping flex).
            Tailwind grid-cols-2 = repeat(2, minmax(0, 1fr)) so tracks stay
            equal and never overflow. Shared 16/10 crop keeps every row one
            height. A leftover odd plate spans both columns as a wide closer.
          */}
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-8">
            {images.map((src, i) => {
              // First row (2) eager so wipe has pixels; rest lazy. No Next
              // `priority` here — that fights the hero LCP preload.
              const isWarm = i < 2;
              const isLastOdd =
                images.length % 2 === 1 && i === images.length - 1;
              const sameAsHero = src === project.image;

              return (
                <ImageReveal
                  key={src + i}
                  delay={Math.min(i * 0.04, 0.2)}
                  className={
                    isLastOdd
                      ? "relative min-w-0 overflow-hidden aspect-[16/10] md:col-span-2 md:aspect-[21/9]"
                      : "relative min-w-0 overflow-hidden aspect-[16/10]"
                  }
                >
                  <MediaImage
                    src={src}
                    alt={`${project.displayTitle} - view ${i + 1}`}
                    fill
                    loading={isWarm || sameAsHero ? "eager" : "lazy"}
                    fetchPriority="auto"
                    decoding="async"
                    sizes={
                      isLastOdd
                        ? "(max-width: 768px) 100vw, min(100vw, 76rem)"
                        : "(max-width: 768px) 100vw, min(50vw, 38rem)"
                    }
                    className="object-cover"
                  />
                </ImageReveal>
              );
            })}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-5 md:px-8">
            <TextReveal as="h2" className="font-display text-2xl tracking-tight md:text-3xl">
              More in {project.category}
            </TextReveal>
            <ul className="mt-10 grid gap-8 sm:grid-cols-3">
              {related.map((item, i) => (
                <li key={item.slug}>
                  <Link href={item.href} className="group block">
                    <ImageReveal
                      delay={i * STAGGER.item}
                      className="relative aspect-[16/10] overflow-hidden"
                    >
                      <MediaImage
                        src={item.image}
                        alt={item.displayTitle}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition duration-slow group-hover:scale-[1.03]"
                      />
                    </ImageReveal>
                    <TextReveal
                      as="p"
                      delay={i * STAGGER.item + STAGGER.body}
                      className="mt-4 text-lg tracking-tight"
                    >
                      {item.displayTitle}
                    </TextReveal>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <ButtonLink href="/appointment">Request a meeting</ButtonLink>
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
