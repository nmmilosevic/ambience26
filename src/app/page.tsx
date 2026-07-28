import { ButtonLink } from "@/components/ButtonLink";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProjectTile } from "@/components/ProjectTile";
import { featuredProjects } from "@/content/projects";
import { homeTestimonials } from "@/content/testimonials";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section className="section-y">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="font-display text-3xl tracking-[-0.02em] sm:text-4xl md:text-5xl">
              Homes shaped with material calm
            </h2>
          </div>
          <div>
            <p className="max-w-prose text-base leading-relaxed text-muted sm:text-lg">
              Ambience Home Design creates bespoke interior architecture and turnkey
              refurbishments for luxury residences. From Marbella&apos;s Golden Mile to
              international projects, every space is composed with craft, quiet confidence,
              and lasting comfort.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">View projects</ButtonLink>
              <ButtonLink href="/appointment" variant="outline">
                Request an appointment
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line section-y bg-surface">
        <div className="container-pad">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl tracking-[-0.02em] sm:text-4xl">
              Selected projects
            </h2>
            <ButtonLink href="/projects" variant="outline">
              Browse the portfolio
            </ButtonLink>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <ProjectTile
                key={project.slug}
                href={project.href}
                image={project.image}
                title={project.title}
                subtitle={project.subtitle}
                aspect={i % 2 === 0 ? "landscape" : "portrait"}
                priority={i < 2}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-pad">
          <h2 className="font-display text-3xl tracking-[-0.02em] sm:text-4xl">
            Client voices
          </h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {homeTestimonials.map((t) => (
              <blockquote key={t.name} className="border-t border-line pt-6">
                <p className="text-base leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 text-sm text-muted">
                  <cite className="not-italic text-ink">{t.name}</cite>
                  {t.place ? <span className="block mt-1">{t.place}</span> : null}
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/testimonials" variant="outline">
              Read more testimonials
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-ink text-bg section-y">
        <div className="container-pad flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl tracking-[-0.02em] sm:text-4xl md:text-5xl">
              Visit the Golden Mile showroom
            </h2>
            <p className="mt-4 text-bg/75 max-w-prose">
              Meet the team in Marbella, explore materials and finished rooms, and begin a
              project conversation in person.
            </p>
          </div>
          <ButtonLink href="/contact" variant="light">
            Find our showrooms
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
