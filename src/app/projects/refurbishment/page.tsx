import type { Metadata } from "next";
import { CategoryListing } from "@/components/CategoryListing";

export const metadata: Metadata = {
  title: "Refurbishment Projects",
  description: "Kitchen, bathroom and architectural refurbishment projects by Ambience.",
};

export default function RefurbishmentProjectsPage() {
  return (
    <CategoryListing
      title="Refurbishment"
      description="Detailed renovations from kitchens and bathrooms to bespoke joinery."
      category="refurbishment"
    />
  );
}
