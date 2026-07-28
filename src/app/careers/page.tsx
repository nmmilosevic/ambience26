import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { careers } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Ambience Home Design team in Marbella.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero title="Join the team" description={careers.intro} />
      <section className="pb-16">
        <div className="container-pad grid gap-6 md:grid-cols-2">
          {careers.roles.map((role) => (
            <article key={role.title} className="border-t border-line pt-5">
              <h2 className="font-display text-2xl tracking-[-0.02em]">{role.title}</h2>
              <p className="mt-3 text-sm text-muted">{role.note}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-line section-y bg-surface">
        <div className="container-pad max-w-3xl">
          <h2 className="font-display text-3xl tracking-[-0.02em]">Company culture</h2>
          <p className="mt-4 text-muted leading-relaxed">{careers.mission}</p>
          <p className="mt-6 text-sm">
            Email{" "}
            <a className="underline focus-ring" href={`mailto:${site.careersEmail}`}>
              {site.careersEmail}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
