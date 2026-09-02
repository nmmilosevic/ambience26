import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { STAGGER } from "@/lib/motion";

export type KeyCommitment = {
  title: string;
  description: string;
};

type KeysManifestProps = {
  title: string;
  lead: string;
  values: readonly KeyCommitment[];
};

/**
 * Studio commitments as an editorial manifesto: numbered display titles,
 * staggered two-column rhythm on large screens. Not a card grid.
 */
export function KeysManifest({ title, lead, values }: KeysManifestProps) {
  return (
    <section className="bg-surface py-20 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-content gap-14 px-5 md:grid-cols-12 md:gap-10 md:px-8 lg:gap-16">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <TextReveal as="h2" className="font-display text-h2">
              {title}
            </TextReveal>
            <Reveal variant="text" delay={STAGGER.body} className="mt-5">
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                {lead}
              </p>
            </Reveal>
            <Reveal variant="text" delay={STAGGER.body2} className="mt-10">
              <p
                className="font-display text-sm tabular-nums tracking-wide text-accent/70"
                aria-hidden
              >
                01–{String(values.length).padStart(2, "0")}
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="grid gap-12 md:col-span-8 md:gap-14 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16 lg:pb-24">
          {values.map((value, i) => {
            const index = String(i + 1).padStart(2, "0");
            const delay = i * STAGGER.item;
            const staggerDown = i % 2 === 1;

            return (
              <li
                key={value.title}
                className={`flex gap-5 md:gap-6 ${
                  staggerDown ? "lg:translate-y-16 xl:translate-y-20" : ""
                }`}
              >
                <Reveal variant="text" delay={delay}>
                  <span
                    aria-hidden
                    className="shrink-0 font-display text-2xl tabular-nums tracking-tight text-accent/70 md:text-3xl"
                  >
                    {index}
                  </span>
                </Reveal>
                <div className="min-w-0 pt-0.5">
                  <TextReveal
                    as="h3"
                    delay={delay + 0.04}
                    className="font-display text-h3 tracking-tight md:text-[1.85rem]"
                  >
                    {value.title}
                  </TextReveal>
                  <Reveal
                    variant="text"
                    delay={delay + STAGGER.body}
                    className="mt-4"
                  >
                    <p className="max-w-measure text-sm leading-relaxed text-muted md:text-base">
                      {value.description}
                    </p>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
