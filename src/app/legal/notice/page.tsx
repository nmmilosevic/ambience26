import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

type LegalProps = {
  title: string;
  description: string;
  body: string[];
};

function LegalPage({ title, description, body }: LegalProps) {
  return (
    <>
      <PageHero title={title} description={description} />
      <section className="pb-24">
        <div className="container-pad max-w-3xl space-y-5 text-base leading-relaxed text-muted">
          {body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "Legal Notice",
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Legal notice"
      description="Company information for Ambience Home Design."
      body={[
        "This website is operated by Ambience Home Design, based in Marbella, Spain.",
        "For formal legal notices and company registration details, contact the studio at the Golden Mile showroom addresses listed on the Contact page, or email info@ambiencehomedesign.com.",
        "Content, photography and project materials on this site are protected. Reproduction without permission is not allowed.",
      ]}
    />
  );
}
