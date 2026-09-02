import { CategoryListingPage, categoryMetadata } from "@/components/CategoryListingPage";

export const metadata = categoryMetadata("Residential Projects");

export default function ResidentialProjectsPage() {
  return (
    <CategoryListingPage
      title="Residential"
      lead="Villas, penthouses, and private homes designed as lasting places to live."
      category="residential"
    />
  );
}