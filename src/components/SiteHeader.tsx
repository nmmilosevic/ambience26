"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out ${
        scrolled || open
          ? "bg-bg/95 text-ink backdrop-blur-md border-b border-line"
          : "bg-transparent text-bg"
      }`}
    >
      <div className="container-pad flex h-20 items-center justify-between gap-6 lg:h-24">
        <Link href="/" className="group focus-ring" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-[0.08em] sm:text-[1.75rem]">
            {site.name.toUpperCase()}
          </span>
          <span
            className={`mt-0.5 block text-[0.65rem] uppercase tracking-[0.28em] ${
              scrolled || open ? "text-muted" : "text-bg/80"
            }`}
          >
            Home Design
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.8rem] tracking-wide transition-opacity hover:opacity-70 focus-ring ${
                scrolled ? "text-ink" : "text-bg"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/appointment"
            className={`ml-2 border px-4 py-2 text-[0.75rem] tracking-wide transition-colors focus-ring ${
              scrolled
                ? "border-ink/20 text-ink hover:bg-ink hover:text-bg"
                : "border-bg/40 text-bg hover:bg-bg hover:text-ink"
            }`}
          >
            Request an appointment
          </Link>
        </nav>

        <button
          type="button"
          className="xl:hidden focus-ring px-2 py-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-6 flex-col gap-1.5">
            <span
              className={`h-px w-full transition-transform duration-300 ${
                scrolled || open ? "bg-ink" : "bg-bg"
              } ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full transition-opacity duration-300 ${
                scrolled || open ? "bg-ink" : "bg-bg"
              } ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-full transition-transform duration-300 ${
                scrolled || open ? "bg-ink" : "bg-bg"
              } ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`xl:hidden overflow-hidden border-t border-line bg-bg text-ink transition-[max-height] duration-500 ease-out ${
          open ? "max-h-[80vh]" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="container-pad flex flex-col gap-1 py-6" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-3 text-lg font-display focus-ring"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/appointment"
            className="mt-4 border border-ink/20 px-4 py-3 text-center text-sm focus-ring"
            onClick={() => setOpen(false)}
          >
            Request an appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
