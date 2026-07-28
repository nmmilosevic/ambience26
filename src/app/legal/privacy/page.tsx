import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy policy"
        description="How Ambience Home Design handles personal data."
      />
      <section className="pb-24">
        <div className="container-pad max-w-3xl space-y-5 text-base leading-relaxed text-muted">
          <p>
            When you request an appointment or contact the studio, we collect the information you
            submit (such as name, email, phone and message) to respond to your inquiry.
          </p>
          <p>
            We do not sell personal data. Data is retained only as long as needed for the
            conversation and legitimate business records. For access, correction or deletion
            requests, email info@ambiencehomedesign.com.
          </p>
        </div>
      </section>
    </>
  );
}
