import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function displayTitle(raw) {
  const cleaned = raw
    .replace(/COMING SOON/gi, " · Coming soon")
    .replace(/SHOWAPARTMENT/gi, " Show Apartment")
    .replace(/SHOWHOME/gi, " Showhome")
    .replace(/GOLDEN MILE MARBELLA/gi, " Golden Mile Marbella")
    .replace(/AWARD WINNER FOR BEST OFFICE EUROPE/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned
    .toLowerCase()
    .split(" ")
    .map((w) => {
      if (["uk", "usa", "tv"].includes(w)) return w.toUpperCase();
      if (["de", "di", "la", "el", "in", "and", "&"].includes(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

const raw = JSON.parse(
  fs.readFileSync(path.join(root, "content-extract/projects-all.json"), "utf8")
);
const siteMap = JSON.parse(
  fs.readFileSync(path.join(root, "content-extract/site-map.json"), "utf8")
);

const fix = {
  "new-villa-in-benahavis":
    "https://ambiencehomedesign.com/wp-content/uploads/2023/03/home-slider-2.jpg",
  "new-showroom-golden-mile-marbella":
    "https://ambiencehomedesign.com/wp-content/uploads/2024/05/Ambience-New-Showroom-Night-HD-9-1.jpg",
};

const projects = raw.map((p) => ({
  ...p,
  displayTitle: displayTitle(p.title),
  href: `/projects/${p.slug}`,
  image: fix[p.slug] || p.image,
}));

const heroSlides = siteMap.homepageHeroCarousel.map((s) => {
  const m = s.href.match(/project\/([^/]+)/);
  const slug = m ? m[1] : "";
  return {
    title: displayTitle(s.title),
    slug,
    image: s.image,
    href: slug ? `/projects/${slug}` : s.href,
  };
});

const featuredProjects = siteMap.homepageFeaturedProjects.map((f) => {
  const m = f.href.match(/project\/([^/]+)/);
  const slug = m ? m[1] : "";
  return {
    title: displayTitle(f.title),
    subtitle: f.subtitle,
    slug,
    image: f.image,
    href: `/projects/${slug}`,
  };
});

const out = `import type { Project } from "./site";

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

export const heroSlides = ${JSON.stringify(heroSlides, null, 2)};

export const featuredProjects = ${JSON.stringify(featuredProjects, null, 2)};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsByCategory(category: Project["category"]) {
  return projects.filter((p) => p.category === category);
}
`;

fs.mkdirSync(path.join(root, "src/content"), { recursive: true });
fs.writeFileSync(path.join(root, "src/content/projects.ts"), out);
console.log("wrote projects", projects.length, "hero", heroSlides.length);
