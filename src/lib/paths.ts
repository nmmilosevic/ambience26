const SLUG_OVERRIDES: Record<string, string> = {
  "/?post_type=project&p=61017": "villa-in-sotogrande-2024",
};

export function slugFromHref(href: string): string {
  if (SLUG_OVERRIDES[href]) {
    return SLUG_OVERRIDES[href];
  }

  const projectMatch = href.match(/\/project\/([^/?#]+)/);
  if (projectMatch) {
    return projectMatch[1].replace(/\/$/, "");
  }

  const projectsMatch = href.match(/\/projects\/([^/?#]+)/);
  if (projectsMatch) {
    return projectsMatch[1].replace(/\/$/, "");
  }

  return href.replace(/^\/+|\/+$/g, "");
}

export function projectPath(slug: string): string {
  return `/projects/${slug}`;
}
