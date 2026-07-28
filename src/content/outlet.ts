export type OutletProduct = {
  name: string;
  brand: string;
  category: "furniture" | "lighting";
  priceBefore: string;
  priceNow: string;
};

export const outletContent = {
  title: "Designer Products For Sale",
  intro:
    "Selected designer furniture and lighting from our showroom and project collections, available at reduced prices while stocks last.",
  categories: [
    {
      name: "Indoor Furniture",
      slug: "furniture" as const,
      products: [
        { name: "Bohemian 72 Lounge Chair & Ottoman", brand: "GUBI", category: "furniture" as const, priceBefore: "4.598,00 €", priceNow: "2.528,89 €" },
        { name: "Bookcase in Dark Wenge Wood", brand: "Bespoke", category: "furniture" as const, priceBefore: "9.486,40 €", priceNow: "5.217,52 €" },
        { name: "Bell Side Table", brand: "CLASSICON", category: "furniture" as const, priceBefore: "2.554,31 €", priceNow: "2.298,88 €" },
        { name: "Kumi Credenza Sideboard", brand: "GALLOTTI & RADICE", category: "furniture" as const, priceBefore: "15.282,30 €", priceNow: "8.405,27 €" },
        { name: "Lilas Armchair", brand: "GALLOTTI & RADICE", category: "furniture" as const, priceBefore: "3.908,30 €", priceNow: "2.722,50 €" },
        { name: "K-Table 3 Boards", brand: "HENGE", category: "furniture" as const, priceBefore: "17.226,77 €", priceNow: "8.954,00 €" },
        { name: "Strip Chair", brand: "HENGE", category: "furniture" as const, priceBefore: "2.891,90 €", priceNow: "1.331,00 €" },
        { name: "Gong Low Table 60", brand: "MERIDIANI", category: "furniture" as const, priceBefore: "3.960,33 €", priceNow: "2.178,18 €" },
        { name: "Belt Sofa", brand: "MOROSO", category: "furniture" as const, priceBefore: "17.133,60 €", priceNow: "9.423,48 €" },
      ],
    },
    {
      name: "Lighting",
      slug: "lighting" as const,
      products: [
        { name: "Bonfire Big Table Lamp", brand: "GALLOTTI & RADICE", category: "lighting" as const, priceBefore: "1.258,40 €", priceNow: "859,10 €" },
        { name: "Bonfire Small Table Lamp", brand: "GALLOTTI & RADICE", category: "lighting" as const, priceBefore: "1.149,50 €", priceNow: "853,05 €" },
        { name: "Tynell Collection 5321 Table Lamp", brand: "GUBI", category: "lighting" as const, priceBefore: "799,00 €", priceNow: "605,00 €" },
        { name: "Tynell Collection 9602 Floor Lamp", brand: "GUBI", category: "lighting" as const, priceBefore: "1.299,00 €", priceNow: "714,45 €" },
        { name: "Chamber Large Pendant Lamp", brand: "LEE BROOM", category: "lighting" as const, priceBefore: "1.709,70 €", priceNow: "940,34 €" },
        { name: "Vintage Tree Floor Lamp", brand: "MAISON JANSEN", category: "lighting" as const, priceBefore: "6.000,00 €", priceNow: "5.100,00 €" },
        { name: "Musa Table Lamp", brand: "VIBIA", category: "lighting" as const, priceBefore: "447,70 €", priceNow: "313,39 €" },
      ],
    },
  ],
};
