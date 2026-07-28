import type { Metadata } from "next";
import { CategoryListing } from "@/components/CategoryListing";

export const metadata: Metadata = {
  title: "Residential Projects",
  description: "Luxury residential interior design and villa projects by Ambience Home Design.",
};

export default function ResidentialProjectsPage() {
  return (
    <CategoryListing
      title="Residential"
      description="Villas, apartments and showhomes designed for lasting everyday luxury."
      category="residential"
    />
  );
}
