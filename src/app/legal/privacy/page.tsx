import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("Privacy Policy");

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary="How Ambience Home Design handles personal data shared through enquiries."
      sections={[
        {
          heading: "Data we collect",
          body: "When you request a meeting or contact the studio, we may receive your name, email, phone number, and project details that you choose to share.",
        },
        {
          heading: "How we use it",
          body: "We use this information to respond to your enquiry, arrange appointments, and deliver the services you request. We do not sell personal data.",
        },
        {
          heading: "Your rights",
          body: "You may ask to access, correct, or delete personal data held about you by contacting info@ambiencehomedesign.com.",
        },
      ]}
    />
  );
}