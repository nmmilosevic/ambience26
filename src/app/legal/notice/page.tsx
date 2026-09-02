import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("Legal Notice");

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Legal Notice"
      summary="Information about the owner and operator of this website."
      sections={[
        {
          heading: "Owner",
          body: "Ambience Home Design operates this website to present the studio's interior architecture work and to receive appointment and contact enquiries.",
        },
        {
          heading: "Contact",
          body: "You can reach the studio by phone at +34 952 858 699 or by email at info@ambiencehomedesign.com.",
        },
        {
          heading: "Content",
          body: "Project photography and copy on this site describe real commissions. Images and text remain the property of Ambience Home Design unless otherwise noted.",
        },
      ]}
    />
  );
}