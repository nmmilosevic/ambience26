import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { locations, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Visit Ambience Home Design showrooms on the Golden Mile, Marbella.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        description="Visit the Ambience Home Design showroom in Marbella, on the Golden Mile."
      />
      <section className="pb-24">
        <div className="container-pad grid gap-10 lg:grid-cols-3">
          {locations.map((loc) => (
            <article key={loc.name} className="border-t border-line pt-6">
              <h2 className="font-display text-2xl tracking-[-0.02em]">{loc.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{loc.address}</p>
              <p className="mt-4 text-sm">
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="focus-ring hover:opacity-70">
                  {loc.phone}
                </a>
              </p>
              {"note" in loc && loc.note ? (
                <p className="mt-2 text-sm text-muted">{loc.note}</p>
              ) : null}
            </article>
          ))}
        </div>
        <div className="container-pad mt-14">
          <ButtonLink href="/appointment">Request an appointment</ButtonLink>
        </div>
      </section>
    </>
  );
}
