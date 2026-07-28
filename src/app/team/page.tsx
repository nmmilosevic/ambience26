import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { teamIntro } from "@/content/pages";

export const metadata: Metadata = {
  title: "Andrea Böck & The Team",
  description: "Meet Andrea Böck and the Ambience Home Design studio team in Marbella.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Andrea Böck & the team"
        description="An international in-house studio of designers, architects and project managers."
      />
      <section className="pb-16">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-3xl tracking-[-0.02em]">
              {teamIntro.andrea.name}
            </h2>
            <p className="mt-2 text-sm text-muted">{teamIntro.andrea.role}</p>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {teamIntro.andrea.text.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-line section-y bg-surface">
        <div className="container-pad">
          <h2 className="font-display text-3xl tracking-[-0.02em]">Meet the studio</h2>
          <p className="mt-4 max-w-prose text-muted">{teamIntro.teamLead}</p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamIntro.members.map((m) => (
              <li key={m.name} className="border-t border-line pt-4">
                <p className="font-display text-xl">{m.name}</p>
                <p className="mt-1 text-sm text-muted">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
