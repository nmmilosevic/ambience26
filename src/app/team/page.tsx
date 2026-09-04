import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { MediaImage } from "@/components/MediaImage";
import { ButtonLink } from "@/components/ButtonLink";
import { teamContent } from "@/content/team";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  // Group / staff photo as hero (was the 3rd image on the page)
  const heroImage = teamContent.groupPhoto || teamContent.founder.image;

  return (
    <PageShell overMedia={Boolean(heroImage)}>
      <PageHero
        title={teamContent.title}
        lead={teamContent.founder.intro}
        image={heroImage || undefined}
      />

      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <ImageReveal
                amount={0.6}
                delay={STAGGER.image}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <MediaImage
                  src={teamContent.founder.image}
                  alt={teamContent.founder.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </ImageReveal>
            </div>
            <div className="md:col-span-7">
              <TextReveal
                as="h2"
                delay={STAGGER.title}
                className="font-display text-3xl tracking-tight md:text-4xl"
              >
                {teamContent.founder.name}
              </TextReveal>
              {teamContent.founder.bio.map((para, i) => (
                <Reveal
                  key={para.slice(0, 32)}
                  variant="text"
                  delay={STAGGER.body + i * STAGGER.item}
                >
                  <p className="mt-5 max-w-measure leading-relaxed text-muted">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="text" delay={STAGGER.body2} className="mt-16 md:mt-20">
            <p className="max-w-measure text-lg leading-relaxed text-muted">
              {teamContent.teamIntro}
            </p>
          </Reveal>

          <div className="mt-20 space-y-16">
            {teamContent.groups.map((group) => (
              <div key={group.title}>
                <TextReveal as="h3" className="font-display text-2xl tracking-tight">
                  {group.title}
                </TextReveal>
                <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {group.members.map((member, i) => {
                    // Stagger within the row (3-col), not the whole roster
                    const delay = (i % 3) * STAGGER.item;
                    return (
                      <li key={`${member.name}-${member.role}`}>
                        {member.image ? (
                          <ImageReveal
                            amount={0.6}
                            delay={delay}
                            className="relative mb-4 aspect-[4/5] overflow-hidden"
                          >
                            <MediaImage
                              src={member.image}
                              alt={member.name}
                              fill
                              // Eager: ImageReveal wipe needs pixels; lazy + clip races empty tiles
                              loading="eager"
                              sizes="(max-width: 640px) 50vw, 25vw"
                              className="object-cover object-top"
                            />
                          </ImageReveal>
                        ) : null}
                        {/* Each child owns its reveal — no parent translate on image+text */}
                        <TextReveal
                          as="p"
                          tone="body"
                          delay={delay + STAGGER.body}
                          className="text-lg tracking-tight text-ink"
                        >
                          {member.name}
                        </TextReveal>
                        <Reveal variant="text" delay={delay + STAGGER.body2}>
                          <p className="mt-1 text-sm text-muted">{member.role}</p>
                        </Reveal>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <Reveal delay={STAGGER.cta} className="mt-16">
            <ButtonLink href="/appointment">Request a meeting</ButtonLink>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
