import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ButtonLink } from "./ButtonLink";
import { legalLinks, locations, site, socialLinks } from "@/content/site";

const studioLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

const moreLinks = [
  { label: "Testimonials", href: "/testimonials" },
  { label: "Outlet", href: "/outlet" },
  { label: "Downloads", href: "/downloads" },
  { label: "Press", href: "/press" },
  { label: "Careers", href: "/careers" },
];

export function SiteFooter() {
  const showroom = locations[0];

  return (
    <footer className="bg-void text-on-void">
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <BrandLogo onDark />
            <p className="mt-8 max-w-md text-base leading-relaxed text-on-void/70">
              Interior architecture and turnkey homes from Marbella to international
              commissions.
            </p>
            <div className="mt-10">
              <ButtonLink href="/appointment" variant="ghost-dark">
                Request a meeting
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="mb-4 text-sm text-on-void/50">Studio</p>
              <ul className="space-y-3">
                {studioLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:opacity-70">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-sm text-on-void/50">More</p>
              <ul className="space-y-3">
                {moreLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:opacity-70">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-4 text-sm text-on-void/50">Visit</p>
              {showroom && (
                <address className="not-italic text-sm leading-relaxed text-on-void/80">
                  <span className="block text-on-void">{showroom.name}</span>
                  <span className="mt-2 block">{showroom.address}</span>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="mt-3 block hover:opacity-70"
                  >
                    {site.phone}
                  </a>
                </address>
              )}
              <div className="mt-6 flex gap-5">
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm hover:opacity-70"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 text-sm text-on-void/45 md:mt-24 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.fullName}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-on-void">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}