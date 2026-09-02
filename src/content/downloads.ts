export type DownloadCard = {
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
};

export const downloadsContent = {
  title: "Client downloads",
  intro:
    "Style guides, questionnaires, and project references for clients and agents. Public teasers below; full folders are shared after you are on a live brief.",
  cards: [
    {
      title: "Before & after",
      description:
        "Selected transformations that show how layout, material, and light change a home.",
      image: "/media/banner-before-after-1-029389c2.jpg",
      href: "/contact",
      cta: "Request access",
    },
    {
      title: "Finished projects",
      description:
        "Reference sets from completed commissions for clients reviewing scope and finish.",
      image: "/media/banner-finished-projects-1-0f5c2508.jpg",
      href: "/contact",
      cta: "Request access",
    },
    {
      title: "Style guide & questionnaire",
      description:
        "Our client questionnaire and style references, used at the start of every brief.",
      image: "/media/boho-ambience-home-design-marbella-3baaa3b6.jpg",
      href: "/appointment",
      cta: "Start a brief",
    },
  ] satisfies DownloadCard[],
  publicFiles: [
    {
      label: "Studio brochure (PDF)",
      href: "/media/new-brochure-ambience-home-design-marbella-99aacf8a.pdf",
    },
    {
      label: "Modern & contemporary style guide (PDF)",
      href: "/media/MODERN-AND-CONTEMPORARY-STYLE-GUIDE-f9764e2e.pdf",
    },
    {
      label: "Nordic / Scandinavian style guide (PDF)",
      href: "/media/NORDIC-SCANDINAVIAN-STYLE-GUIDE-f4d7d703.pdf",
    },
    {
      label: "Modern classic style guide (PDF)",
      href: "/media/MODERN-CLASSIC-STYLE-GUIDE-28268690.pdf",
    },
    {
      label: "Boho chic style guide (PDF)",
      href: "/media/BOHO-CHIC-Style-Guide-H-f026ff5f.pdf",
    },
  ],
};
