import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Client testimonials for Ambience Home Design luxury interior projects.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="Testimonials"
        description="Words from homeowners, developers and partners who trusted Ambience with their spaces."
      />
      <section className="pb-24">
        <div className="container-pad grid gap-10 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name + (t.place || "")} className="border-t border-line pt-6">
              <p className="text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 text-sm text-muted">
                <cite className="not-italic text-ink">{t.name}</cite>
                {t.role ? <span className="block mt-1">{t.role}</span> : null}
                {t.place ? <span className="block mt-1">{t.place}</span> : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
