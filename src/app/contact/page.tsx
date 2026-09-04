import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { MediaImage } from "@/components/MediaImage";
import { locations, site, socialLinks } from "@/content/site";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = { title: "Contact" };

// contact-d20b8e95.jpg is the Contact page HTML saved as .jpg — not a photo.
const CONTACT_IMAGE = "/media/Ambience-New-Showroom-main-961bd67c.jpg";
const SHOWROOM_IMAGE = "/media/Ambience-New-Showroom-Night-HD-9-1-774b5879.jpg";

export default function ContactPage() {
  const showrooms = locations.filter((loc) => !loc.note);
  const warehouse = locations.find((loc) => Boolean(loc.note));
  const primary = showrooms[0];
  const secondary = showrooms.slice(1);

  return (
    <PageShell>
      {/* Typographic open: different family from About’s photography hero */}
      <section className="bg-bg pt-28 md:pt-32">
        <div className="mx-auto max-w-content px-5 pb-14 md:px-8 md:pb-20">
          <TextReveal as="h1" className="font-display text-display max-w-3xl">
            Contact
          </TextReveal>
          <Reveal variant="text" delay={STAGGER.body} className="mt-6 max-w-measure">
            <p className="text-lead text-muted">
              Reach the studio, visit a showroom on the Golden Mile, or request a
              meeting for your next project.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Composed visit: primary showroom as one visual destination */}
      <section className="bg-bg pb-20 md:pb-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
            <ImageReveal className="relative aspect-[4/5] sm:aspect-[16/11] lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]">
              <MediaImage
                src={SHOWROOM_IMAGE}
                alt="Ambience new showroom, Golden Mile Marbella at night"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority
              />
            </ImageReveal>

            <div className="flex flex-col justify-end lg:col-span-5 lg:pl-4 xl:pl-8">
              {primary && (
                <address className="not-italic">
                  <TextReveal
                    as="h2"
                    className="font-display text-h2 tracking-tight"
                  >
                    {primary.name}
                  </TextReveal>
                  <Reveal variant="text" delay={STAGGER.body} className="mt-5">
                    <p className="max-w-sm leading-relaxed text-muted">
                      {primary.address}
                    </p>
                  </Reveal>
                  {primary.phone && (
                    <Reveal variant="text" delay={STAGGER.body2} className="mt-5">
                      <a
                        href={`tel:${site.phone.replace(/\s/g, "")}`}
                        className="inline-block text-ink underline-offset-4 transition-opacity duration-mid ease-out hover:opacity-70 focus-visible:underline"
                      >
                        {primary.phone}
                      </a>
                    </Reveal>
                  )}
                </address>
              )}
              <Reveal delay={STAGGER.cta} className="mt-10">
                <ButtonLink href="/appointment">Request a meeting</ButtonLink>
              </Reveal>
            </div>
          </div>

          {/* Secondary destinations: sparse stacked rows */}
          <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
            {secondary.map((loc, i) => (
              <div key={loc.name}>
                <TextReveal
                  as="h3"
                  delay={i * STAGGER.item}
                  className="text-xl tracking-tight"
                >
                  {loc.name}
                </TextReveal>
                <Reveal
                  variant="text"
                  delay={i * STAGGER.item + STAGGER.body}
                  className="mt-4"
                >
                  <address className="not-italic text-sm leading-relaxed text-muted">
                    <p>{loc.address}</p>
                    {loc.phone && (
                      <a
                        href={`tel:${site.phone.replace(/\s/g, "")}`}
                        className="mt-3 inline-block text-ink underline-offset-4 transition-opacity duration-mid ease-out hover:opacity-70 focus-visible:underline"
                      >
                        {loc.phone}
                      </a>
                    )}
                  </address>
                </Reveal>
              </div>
            ))}

            {warehouse && (
              <div className={secondary.length === 1 ? "" : "md:col-span-2 md:max-w-xl"}>
                <TextReveal as="h3" delay={STAGGER.body} className="text-xl tracking-tight">
                  {warehouse.name}
                </TextReveal>
                <Reveal variant="text" delay={STAGGER.body2} className="mt-4">
                  <address className="not-italic text-sm leading-relaxed text-muted">
                    <p>{warehouse.address}</p>
                    {warehouse.phone && (
                      <a
                        href={`tel:${site.phone.replace(/\s/g, "")}`}
                        className="mt-3 inline-block text-ink underline-offset-4 transition-opacity duration-mid ease-out hover:opacity-70 focus-visible:underline"
                      >
                        {warehouse.phone}
                      </a>
                    )}
                    {warehouse.note && (
                      <p className="mt-3 text-muted">{warehouse.note}</p>
                    )}
                  </address>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact paths: phone, email, social as one composed band */}
      <section className="relative overflow-hidden bg-void py-20 md:py-28">
        <ImageReveal className="pointer-events-none absolute inset-0 opacity-25">
          <MediaImage
            src={CONTACT_IMAGE}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>
        <div className="relative z-10 mx-auto max-w-content px-5 md:px-8">
          <TextReveal as="h2" className="font-display text-h2 text-on-void">
            Reach the studio
          </TextReveal>
          <Reveal variant="text" delay={STAGGER.body} className="mt-4 max-w-md">
            <p className="text-sm leading-relaxed text-on-void/70">
              Call, write, or follow the work. Appointments are arranged through
              a short meeting request.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            <div>
              <Reveal variant="text" delay={STAGGER.title}>
                <p className="text-sm text-on-void/55">Phone</p>
              </Reveal>
              <Reveal variant="text" delay={STAGGER.body}>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="mt-3 block font-display text-2xl tracking-tight text-on-void transition-opacity duration-mid ease-out hover:opacity-75 md:text-3xl"
                >
                  {site.phone}
                </a>
              </Reveal>
            </div>

            <div>
              <Reveal variant="text" delay={STAGGER.item}>
                <p className="text-sm text-on-void/55">Email</p>
              </Reveal>
              <Reveal variant="text" delay={STAGGER.item + STAGGER.body}>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block break-all text-lg tracking-tight text-on-void transition-opacity duration-mid ease-out hover:opacity-75 md:text-xl"
                >
                  {site.email}
                </a>
              </Reveal>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <Reveal variant="text" delay={STAGGER.body2}>
                <p className="text-sm text-on-void/55">Social</p>
              </Reveal>
              <Reveal variant="text" delay={STAGGER.body2 + STAGGER.body}>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                  {socialLinks.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg tracking-tight text-on-void transition-opacity duration-mid ease-out hover:opacity-75"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <Reveal delay={STAGGER.cta} className="mt-14">
            <ButtonLink href="/appointment" variant="ghost-dark">
              Request a meeting
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
