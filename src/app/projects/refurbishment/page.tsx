import { CategoryListingPage, categoryMetadata } from "@/components/CategoryListingPage";

export const metadata = categoryMetadata("Refurbishment Projects");

export default function RefurbishmentProjectsPage() {
  return (
    <CategoryListingPage
      title="Refurbishment"
      lead="Turnkey renovations managed from concept through installation."
      category="refurbishment"
    />
  );
}