import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <PageShell>
      <section className="flex min-h-[70dvh] items-center bg-bg pt-28">
        <div className="mx-auto max-w-content px-5 py-20 md:px-8">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            Page not found
          </h1>
          <p className="mt-5 max-w-measure text-muted">
            The page you are looking for is not available. Return home or browse projects.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/">Home</ButtonLink>
            <ButtonLink href="/projects" variant="outline">
              Projects
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-muted">
            Or <Link href="/contact" className="underline-offset-4 hover:underline">contact the studio</Link>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}