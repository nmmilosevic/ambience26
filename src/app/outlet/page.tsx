import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { ImageReveal } from "@/components/ImageReveal";
import { MediaImage } from "@/components/MediaImage";
import { ButtonLink } from "@/components/ButtonLink";
import { outletContent } from "@/content/outlet";
import { site } from "@/content/site";
import { pageHeroImage } from "@/content/atmosphere";
import { STAGGER } from "@/lib/motion";

export const metadata: Metadata = { title: "Outlet" };

export default function OutletPage() {
  const heroImage = pageHeroImage("outlet");

  return (
    <PageShell overMedia={Boolean(heroImage)}>
      <PageHero
        title={outletContent.title}
        lead={outletContent.intro}
        image={heroImage || undefined}
      />

      <section className="bg-bg pb-24 md:pb-32">
        <div className="mx-auto max-w-content space-y-20 px-5 md:px-8">
          {outletContent.categories.map((category) => (
            <div key={category.slug}>
              <TextReveal as="h2" className="font-display text-2xl tracking-tight md:text-3xl">
                {category.name}
              </TextReveal>
              <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.products.map((product, i) => (
                  <li key={product.name}>
                    {product.image ? (
                      <ImageReveal
                        delay={i * STAGGER.item}
                        className="relative aspect-square overflow-hidden"
                      >
                        <MediaImage
                          src={product.image}
                          alt={product.name}
                          fill
                          loading="eager"
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </ImageReveal>
                    ) : null}
                    <div className="mt-4">
                      <p className="text-sm text-muted">{product.brand}</p>
                      <h3 className="mt-2 text-lg tracking-tight">{product.name}</h3>
                      <p className="mt-3 text-sm">
                        <span className="text-muted line-through">{product.priceBefore}</span>
                        <span className="ml-3 text-ink">{product.priceNow}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Reveal variant="text">
            <p className="text-muted">
              Enquire about availability at{" "}
              <a href={`mailto:${site.email}`} className="text-ink underline-offset-4 hover:underline">
                {site.email}
              </a>{" "}
              or visit the showroom.
            </p>
          </Reveal>
          <Reveal delay={STAGGER.cta} className="mt-8">
            <ButtonLink href="/contact" variant="outline">
              Contact
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
