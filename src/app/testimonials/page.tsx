import type { Metadata } from "next";
import { MediaImage } from "@/components/MediaImage";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { testimonials } from "@/content/testimonials";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <PageShell>
      <PageHero
        title="Client voices"
        lead="What homeowners and partners say about working with Ambience."
      />

      <section className="bg-bg pb-24 md:pb-32">
        <div className="mx-auto max-w-content space-y-16 px-5 md:px-8">
          {testimonials.map((item, i) => (
            <article
              key={`${item.name}-${i}`}
              className="grid gap-8 border-b border-line pb-16 last:border-0 md:grid-cols-12"
            >
              {item.image && (
                <Link
                  href={item.href ?? "#"}
                  className="md:col-span-4"
                >
                  <ImageReveal className="relative aspect-[4/5] overflow-hidden">
                    <MediaImage
                      src={item.image}
                      alt=""
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </ImageReveal>
                </Link>
              )}
              <blockquote
                className={item.image ? "md:col-span-8" : "md:col-span-10"}
              >
                <TextReveal
                  as="p"
                  className="text-xl leading-snug tracking-tight md:text-2xl"
                >
                  “{item.quote}”
                </TextReveal>
                <Reveal variant="text" delay={STAGGER.body} className="mt-6">
                  <footer className="text-sm text-muted">
                    <span className="text-ink">{item.name}</span>
                    {item.role && <span> - {item.role}</span>}
                    {item.place && <span> - {item.place}</span>}
                  </footer>
                </Reveal>
              </blockquote>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}