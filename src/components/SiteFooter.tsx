import Link from "next/link";
import { locations, nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-bg">
      <div className="container-pad section-y grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl tracking-[0.08em]">
            {site.name.toUpperCase()}
          </p>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.28em] text-bg/70">
            Home Design
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-bg/75">
            {site.description}
          </p>
          <p className="mt-6 text-sm">
            <a className="hover:opacity-80 focus-ring" href={`tel:${site.phone.replace(/\s/g, "")}`}>
              {site.phone}
            </a>
          </p>
        </div>

        <div>
          <p className="text-sm text-bg/60">Explore</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm hover:opacity-80 focus-ring">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/appointment" className="text-sm hover:opacity-80 focus-ring">
                Request an appointment
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm text-bg/60">Showrooms</p>
          <ul className="mt-4 space-y-5">
            {locations.slice(0, 2).map((loc) => (
              <li key={loc.name} className="text-sm leading-relaxed text-bg/80">
                <span className="block text-bg">{loc.name}</span>
                {loc.address}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-5 text-sm">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 focus-ring"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 focus-ring"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-bg/15">
        <div className="container-pad flex flex-col gap-3 py-6 text-xs text-bg/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.fullName}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/notice" className="hover:text-bg focus-ring">
              Legal notice
            </Link>
            <Link href="/legal/cookies" className="hover:text-bg focus-ring">
              Cookies
            </Link>
            <Link href="/legal/privacy" className="hover:text-bg focus-ring">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-bg focus-ring">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
