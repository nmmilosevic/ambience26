import { CategoryListingPage, categoryMetadata } from "@/components/CategoryListingPage";

export const metadata = categoryMetadata("Commercial Projects");

export default function CommercialProjectsPage() {
  return (
    <CategoryListingPage
      title="Commercial"
      lead="Spaces for hospitality and retail where brand and atmosphere meet."
      category="commercial"
    />
  );
}