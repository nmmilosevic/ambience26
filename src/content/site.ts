import siteMap from "../../content-extract/site-map.json";
import { formatDisplayTitle } from "@/lib/format-title";
import { projectPath, slugFromHref } from "@/lib/paths";

export type ProjectCategory = "residential" | "commercial" | "refurbishment";

export type Project = {
  title: string;
  slug: string;
  href: string;
  image: string;
  category: ProjectCategory;
  displayTitle: string;
  subtitle?: string;
};

export type HeroSlide = {
  title: string;
  displayTitle: string;
  cta: string;
  href: string;
  slug: string;
  image: string;
};

export type FeaturedProject = {
  title: string;
  displayTitle: string;
  subtitle: string;
  href: string;
  slug: string;
  image: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Location = {
  name: string;
  address: string;
  phone?: string;
  note?: string;
};

export function displayTitle(raw: string): string {
  return formatDisplayTitle(raw);
}

export const siteMeta = siteMap.meta;

export const site = {
  name: "Ambience",
  fullName: "Ambience Home Design",
  tagline: "Bespoke interior architecture and turnkey homes",
  description: siteMap.meta.description,
  phone: siteMap.contact.phone,
  email: "info@ambiencehomedesign.com",
  careersEmail: "hr@ambiencehomedesign.com",
  social: {
    facebook:
      siteMap.social.find((item) => item.label === "Facebook")?.href ?? "",
    instagram:
      siteMap.social.find((item) => item.label === "Instagram")?.href ?? "",
  },
  logoLight:
    "https://ambiencehomedesign.com/wp-content/uploads/2023/11/logo-ambience-650.png",
  logoDark:
    "https://ambiencehomedesign.com/wp-content/uploads/2023/11/logo-ambience-650bl.png",
};

export const nav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Outlet", href: "/outlet" },
  { label: "Press", href: "/press" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const navigation = nav;

export const locations: Location[] = [
  ...siteMap.contact.showrooms.map((showroom) => ({
    name: showroom.name,
    address: showroom.address,
    phone: `${siteMap.contact.phone} Ext. ${showroom.ext}`,
  })),
  {
    name: siteMap.contact.warehouse.name,
    address: siteMap.contact.warehouse.address,
    phone: `${siteMap.contact.phone} Ext. ${siteMap.contact.warehouse.ext}`,
    note: siteMap.contact.warehouse.hours,
  },
];

export const heroCarousel: HeroSlide[] = siteMap.homepageHeroCarousel.map(
  (slide) => {
    const slug = slugFromHref(slide.href);
    return {
      ...slide,
      displayTitle: formatDisplayTitle(slide.title),
      slug,
      href: projectPath(slug),
    };
  }
);

export const featuredProjectsFromSite: FeaturedProject[] =
  siteMap.homepageFeaturedProjects.map((project) => {
    const slug = slugFromHref(project.href);
    return {
      ...project,
      displayTitle: formatDisplayTitle(project.title),
      slug,
      href: projectPath(slug),
    };
  });

export const socialLinks = siteMap.social;

export const legalLinks = [
  { label: "Legal Notice", href: "/legal/notice" },
  { label: "Cookies Policy", href: "/legal/cookies" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
];

export const contact = siteMap.contact;

export const logos = siteMap.logos;
