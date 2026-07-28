import type { Metadata } from "next";
import { CategoryListing } from "@/components/CategoryListing";

export const metadata: Metadata = {
  title: "Commercial Projects",
  description: "Commercial and hospitality interior architecture by Ambience Home Design.",
};

export default function CommercialProjectsPage() {
  return (
    <CategoryListing
      title="Commercial"
      description="Showrooms, offices and hospitality spaces composed for brand clarity."
      category="commercial"
    />
  );
}
