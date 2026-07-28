import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & conditions"
        description="General terms for using the Ambience Home Design website."
      />
      <section className="pb-24">
        <div className="container-pad max-w-3xl space-y-5 text-base leading-relaxed text-muted">
          <p>
            By using this website you agree to browse project information, showroom details and
            product listings for informational purposes. Project availability, product pricing and
            stock may change without notice.
          </p>
          <p>
            Design services are subject to separate client agreements. Nothing on this website
            constitutes a binding offer until confirmed in writing by Ambience Home Design.
          </p>
        </div>
      </section>
    </>
  );
}
