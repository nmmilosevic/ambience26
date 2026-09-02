import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("Terms & Conditions");

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      summary="General terms for use of the Ambience Home Design website."
      sections={[
        {
          heading: "Use of the site",
          body: "This website is provided for information about Ambience Home Design and to facilitate contact. You agree not to misuse the site or attempt to disrupt its operation.",
        },
        {
          heading: "Intellectual property",
          body: "All branding, photography, and written content remain the property of Ambience Home Design. Reproduction without permission is not allowed.",
        },
        {
          heading: "Liability",
          body: "While we aim for accuracy, project details and availability may change. Formal design engagements are governed by separate agreements.",
        },
      ]}
    />
  );
}