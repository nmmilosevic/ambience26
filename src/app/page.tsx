import Link from "next/link";
import { preload } from "react-dom";
import { MorphHero } from "@/components/MorphHero";
import { PageShell } from "@/components/PageShell";
import { ProjectTile } from "@/components/ProjectTile";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { MediaImage } from "@/components/MediaImage";
import { featuredProjects, heroSlides } from "@/content/projects";
import { testimonials } from "@/content/testimonials";
import { servicesContent } from "@/content/services";
import { locations, site } from "@/content/site";
import { STAGGER } from "@/lib/motion";

export default function HomePage() {
  const voice = testimonials[0];
  const showroom = locations[0];
  const lcp = heroSlides[0]?.image;
  if (lcp) {
    preload(lcp, { as: "image", fetchPriority: "high" });
  }
  // Warm the first featured tile so the residences wipe does not open empty
  const featuredLcp = featuredProjects[0]?.image;
  if (featuredLcp) {
    preload(featuredLcp, { as: "image", fetchPriority: "low" });
  }

  return (
    <PageShell overMedia>
      <MorphHero slides={heroSlides} />

      <section className="bg-bg py-24 md:py-32">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <TextReveal as="h2" className="font-display text-h2 max-w-2xl">
            Selected residences and showhomes
          </TextReveal>
          <Reveal variant="text" delay={STAGGER.body} className="mt-5 max-w-measure">
            <p className="text-muted">
              Quiet luxury interiors shaped around place, light, and the way you live.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
            {featuredProjects[0] && (
              <ProjectTile
                className="md:col-span-7"
                href={featuredProjects[0].href}
                title={featuredProjects[0].title}
                subtitle={featuredProjects[0].subtitle}
                image={featuredProjects[0].image}
                aspect="video"
                priority
                delay={0}
              />
            )}
            {featuredProjects[1] && (
              <ProjectTile
                className="md:col-span-5 md:mt-16"
                href={featuredProjects[1].href}
                title={featuredProjects[1].title}
                subtitle={featuredProjects[1].subtitle}
                image={featuredProjects[1].image}
                aspect="portrait"
                delay={0.08}
              />
            )}
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
            {featuredProjects.slice(2, 4).map((project, i) => (
              <ProjectTile
                key={project.slug}
                href={project.href}
                title={project.title}
                subtitle={project.subtitle}
                image={project.image}
                aspect="video"
                delay={0.12 + i * 0.06}
              />
            ))}
          </div>

          <div className="mt-14">
            <ButtonLink href="/projects" variant="outline">
              View all projects
            </ButtonLink>
          </div>
        </div>
      </section>

      {voice && (
        <section className="relative overflow-hidden bg-void py-24 md:py-32">
          {voice.image && (
            <MediaImage
              src={voice.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
          )}
          <div className="relative z-10 mx-auto max-w-content px-5 md:px-8">
            <blockquote className="max-w-3xl">
              <TextReveal
                as="p"
                className="font-display text-2xl leading-snug tracking-tight text-on-void md:text-3xl lg:text-4xl"
              >
                “{voice.pull ?? voice.quote}”
              </TextReveal>
              <Reveal variant="text" delay={STAGGER.body} className="mt-8">
                <footer className="text-sm text-on-void/65">
                  <span className="text-on-void">{voice.name}</span>
                  {voice.place && <span> - {voice.place}</span>}
                </footer>
              </Reveal>
            </blockquote>
            <Reveal delay={STAGGER.body2} className="mt-10">
              <Link
                href="/testimonials"
                className="inline-block text-sm text-on-void/70 underline-offset-4 hover:text-on-void hover:underline"
              >
                Read client voices
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <TextReveal as="h2" className="font-display text-h2 max-w-2xl">
            From first sketch to the last piece of furniture
          </TextReveal>
          <Reveal variant="text" delay={STAGGER.body} className="mt-5 max-w-measure">
            <p className="text-muted">{servicesContent.lead}</p>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {servicesContent.services.map((service, i) => (
              <div key={service.title}>
                <TextReveal
                  as="h3"
                  delay={i * STAGGER.item}
                  className="text-xl tracking-tight"
                >
                  {service.title}
                </TextReveal>
                <Reveal variant="text" delay={i * STAGGER.item + STAGGER.body}>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.subtitle}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <ButtonLink href="/services" variant="outline">
              Explore services
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-bg py-24 md:py-32">
        <div className="mx-auto grid max-w-content gap-12 px-5 md:grid-cols-2 md:items-end md:gap-16 md:px-8">
          <div>
            <TextReveal as="h2" className="font-display text-h2">
              Visit the Golden Mile showroom
            </TextReveal>
            <Reveal variant="text" delay={STAGGER.body}>
              <p className="mt-5 max-w-measure text-muted">
                Meet the team in Marbella, walk the materials, and talk through your next home.
              </p>
            </Reveal>
            {showroom && (
              <Reveal delay={STAGGER.body2}>
                <address className="mt-8 not-italic text-sm leading-relaxed text-muted">
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
            <Reveal delay={STAGGER.cta} className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/appointment">Request a meeting</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Contact
              </ButtonLink>
            </Reveal>
          </div>
          <ImageReveal delay={STAGGER.image} className="relative aspect-[4/5]">
            <MediaImage
              src={heroSlides[0].image}
              alt="Ambience showroom, Golden Mile Marbella"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </ImageReveal>
        </div>
      </section>
    </PageShell>
  );
}