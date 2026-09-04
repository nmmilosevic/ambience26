"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { BrandLogo } from "./BrandLogo";
import { ButtonLink } from "./ButtonLink";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

const primaryNav = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/about" },
  { label: "Andrea Böck & The Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

type SiteHeaderProps = {
  overMedia?: boolean;
};

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export function SiteHeader({ overMedia = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    for (const item of primaryNav) {
      router.prefetch(item.href);
    }
    router.prefetch("/appointment");
  }, [router]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    setOpen(false);
    if (href !== pathname) {
      router.push(href);
    }
  };

  const solid = scrolled || open || !overMedia;
  const onDark = overMedia && !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-mid ease-out ${
        open
          ? "bg-bg/90 backdrop-blur-md"
          : solid
            ? "bg-bg/95 backdrop-blur-sm"
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <BrandLogo onDark={onDark} priority />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item, i) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <motion.div
                key={item.href}
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.12 + i * 0.06,
                  duration: DURATION.mid,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <Link
                  href={item.href}
                  prefetch
                  onClick={go(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link text-sm tracking-wide transition-opacity duration-fast ease-out hover:opacity-70 ${
                    onDark ? "text-on-void" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
          <ButtonLink
            href="/appointment"
            variant={onDark ? "ghost-dark" : "solid"}
          >
            Request a meeting
          </ButtonLink>
        </nav>

        <button
          type="button"
          className={`lg:hidden ${onDark ? "text-on-void" : "text-ink"}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} weight="light" /> : <List size={26} weight="light" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="overflow-hidden px-6 pb-8 pt-2 lg:hidden"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: DURATION.mid, ease: EASE_OUT_EXPO }}
          >
            <nav className="flex flex-col gap-5">
              {primaryNav.map((item, i) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <motion.div
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.07,
                      duration: DURATION.mid,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    <Link
                      href={item.href}
                      prefetch
                      onClick={go(item.href)}
                      aria-current={active ? "page" : undefined}
                      className="font-display text-2xl tracking-tight text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <ButtonLink href="/appointment" className="mt-2 w-full">
                Request a meeting
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
