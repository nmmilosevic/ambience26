export type OutletProduct = {
  name: string;
  brand: string;
  category: "furniture" | "lighting";
  priceBefore: string;
  priceNow: string;
  image?: string;
  href?: string;
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
        { name: "Bohemian 72 Lounge Chair & Ottoman", brand: "GUBI", category: "furniture" as const, priceBefore: "4.598,00 €", priceNow: "2.528,89 €", image: "/media/07o-gubi-2-bc9f2dd0.jpg", href: "https://ambiencehomedesign.com/bohemian-72-lounge-chairottoman/" },
        { name: "Bookcase in Dark Wenge Wood", brand: "Bespoke", category: "furniture" as const, priceBefore: "9.486,40 €", priceNow: "5.217,52 €", image: "/media/02o-bookcase-912b654f.jpg", href: "https://ambiencehomedesign.com/bookcase-in-dark-wenge-wood-bespoke/" },
        { name: "Bell Side Table", brand: "CLASSICON", category: "furniture" as const, priceBefore: "2.554,31 €", priceNow: "2.298,88 €", image: "/media/03o-classicon-53777407.jpg", href: "https://ambiencehomedesign.com/bell-side-table-classicon/" },
        { name: "Kumi Credenza Sideboard", brand: "GALLOTTI & RADICE", category: "furniture" as const, priceBefore: "15.282,30 €", priceNow: "8.405,27 €", image: "/media/05o-galloti-radicer-47812fe3.jpg", href: "https://ambiencehomedesign.com/kumi-credenza-sideboard-gallotti-radice/" },
        { name: "Lilas Armchair", brand: "GALLOTTI & RADICE", category: "furniture" as const, priceBefore: "3.908,30 €", priceNow: "2.722,50 €", image: "/media/06o-galloti-radicer-291ed22b.jpg", href: "https://ambiencehomedesign.com/lilas-armchair-gallotti-radice/" },
        { name: "K-Table 3 Boards", brand: "HENGE", category: "furniture" as const, priceBefore: "17.226,77 €", priceNow: "8.954,00 €", image: "/media/010o-henge-table-1-25c9fe3e.jpg", href: "https://ambiencehomedesign.com/k-table-3-boards-henge/" },
        { name: "Strip Chair", brand: "HENGE", category: "furniture" as const, priceBefore: "2.891,90 €", priceNow: "1.331,00 €", image: "/media/011o-henge-chair-1-57d90ebb.jpg", href: "https://ambiencehomedesign.com/strip-chair-henge/" },
        { name: "Gong Low Table 60", brand: "MERIDIANI", category: "furniture" as const, priceBefore: "3.960,33 €", priceNow: "2.178,18 €", image: "/media/014o-meridiani-gong-2-a44f4ad8.jpg", href: "https://ambiencehomedesign.com/gong-low-table-60-meridiani/" },
        { name: "Belt Sofa", brand: "MOROSO", category: "furniture" as const, priceBefore: "17.133,60 €", priceNow: "9.423,48 €", image: "/media/019o-moroso-belt-sofa-2-97ed5997.jpg", href: "https://ambiencehomedesign.com/belt-sofa-moroso/" },
      ],
    },
    {
      name: "Lighting",
      slug: "lighting" as const,
      products: [
        { name: "Bonfire Big Table Lamp", brand: "GALLOTTI & RADICE", category: "lighting" as const, priceBefore: "1.258,40 €", priceNow: "859,10 €", image: "/media/05o-galloti-radice-table-lamp-1-70b01557.jpg", href: "https://ambiencehomedesign.com/bonfire-big-table-lamp-gallotti-radice/" },
        { name: "Bonfire Small Table Lamp", brand: "GALLOTTI & RADICE", category: "lighting" as const, priceBefore: "1.149,50 €", priceNow: "853,05 €", image: "/media/06o-galloti-radice-table-small-lamp-1-5c9da23b.jpg", href: "https://ambiencehomedesign.com/bonfire-small-table-lamp-gallotti-radice/" },
        { name: "Tynell Collection 5321 Table Lamp", brand: "GUBI", category: "lighting" as const, priceBefore: "799,00 €", priceNow: "605,00 €", image: "/media/07o-gubi-tynell-table-lamp-9003a847.jpg", href: "https://ambiencehomedesign.com/tynell-collection-5321-table-lamp-gubi/" },
        { name: "Tynell Collection 9602 Floor Lamp", brand: "GUBI", category: "lighting" as const, priceBefore: "1.299,00 €", priceNow: "714,45 €", image: "/media/08o-gubi-tynell-floor-lamp-1-00921d3a.jpg", href: "https://ambiencehomedesign.com/tynell-collection-9602-floor-lamp-gubi/" },
        { name: "Chamber Large Pendant Lamp", brand: "LEE BROOM", category: "lighting" as const, priceBefore: "1.709,70 €", priceNow: "940,34 €", image: "/media/11o-lee-broom-large-lamp-1-0557ec62.jpg", href: "https://ambiencehomedesign.com/chamber-large-pendant-lamp-lee-broom/" },
        { name: "Vintage Tree Floor Lamp", brand: "MAISON JANSEN", category: "lighting" as const, priceBefore: "6.000,00 €", priceNow: "5.100,00 €", image: "/media/13o-jansen-tree-lamp-1-5b178580.jpg", href: "https://ambiencehomedesign.com/vintage-tree-floor-lamp-maison-jansen/" },
        { name: "Musa Table Lamp", brand: "VIBIA", category: "lighting" as const, priceBefore: "447,70 €", priceNow: "313,39 €", image: "/media/14o-vibia-musa-lamp-1-b9da4c61.jpg", href: "https://ambiencehomedesign.com/muusa-table-lamp-maison-jansen/" },
      ],
    },
  ],
};
