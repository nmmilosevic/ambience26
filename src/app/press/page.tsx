import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { pressItems } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Press",
  description: "Editorials and press coverage for Ambience Home Design.",
};

export default function PressPage() {
  return (
    <>
      <PageHero
        title="In the news"
        description="Editorials, magazines and studio moments from Ambience Home Design."
      />
      <section className="pb-20">
        <div className="container-pad space-y-10">
          {pressItems.map((item) => (
            <article key={item.source + item.date} className="border-t border-line pt-6 max-w-3xl">
              <p className="text-lg leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-4 text-sm text-muted">
                {item.source} · {item.date}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-line section-y bg-surface">
        <div className="container-pad max-w-3xl">
          <h2 className="font-display text-3xl tracking-[-0.02em]">Social & video</h2>
          <p className="mt-4 text-muted">
            Follow project stages and finished homes on Instagram, and explore studio interviews
            including Bloomberg Television coverage of Ambience.
          </p>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block text-sm underline underline-offset-4 focus-ring"
          >
            @ambience_home_design
          </a>
        </div>
      </section>
    </>
  );
}
