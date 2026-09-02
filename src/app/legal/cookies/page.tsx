import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("Cookies Policy");

export default function CookiesPolicyPage() {
  return (
    <LegalPage
      title="Cookies Policy"
      summary="How this website may use cookies to improve experience and measure visits."
      sections={[
        {
          heading: "What cookies are",
          body: "Cookies are small text files stored on your device. They help the site remember preferences and understand how pages are used.",
        },
        {
          heading: "Strictly necessary",
          body: "Essential cookies may be required for basic site functions such as saving cookie preferences.",
        },
        {
          heading: "Analytics",
          body: "Optional analytics cookies (for example Google Analytics) collect anonymous information such as visitor counts and popular pages. You can disable these in your browser settings.",
        },
      ]}
    />
  );
}