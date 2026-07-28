import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cookies Policy",
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        title="Cookies policy"
        description="How Ambience Home Design uses cookies on this website."
      />
      <section className="pb-24">
        <div className="container-pad max-w-3xl space-y-5 text-base leading-relaxed text-muted">
          <p>
            We use cookies to provide a reliable browsing experience. Strictly necessary cookies
            keep basic preferences working. Optional analytics cookies (such as Google Analytics)
            help us understand which pages are most useful.
          </p>
          <p>
            You can change cookie preferences in your browser settings at any time. Disabling
            analytics cookies will not affect core site functionality.
          </p>
        </div>
      </section>
    </>
  );
}
