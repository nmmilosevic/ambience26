"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { DURATION } from "@/lib/motion";

type PageTransitionProps = {
  children: React.ReactNode;
};

type VeilPhase = "idle" | "in" | "hold" | "out";

const HOLD_FAILSAFE_MS = 2500;

/**
 * Linen route veil — transform only (compositor-friendly).
 *
 * Cover starts on internal link click so the sweep masks navigation wait
 * instead of stacking after the route lands. Hold until pathname changes,
 * then ease out. No clip-path / filter on the full viewport.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<VeilPhase>("idle");
  const prevPath = useRef(pathname);
  const pendingNav = useRef(false);
  const phaseRef = useRef<VeilPhase>("idle");

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Start cover on same-origin internal navigations (capture, before paint work).
  useEffect(() => {
    if (reduce) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      pendingNav.current = true;
      if (phaseRef.current === "idle" || phaseRef.current === "out") {
        setPhase("in");
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce]);

  // Route landed: exit if covering; short in→out for back/forward / programmatic.
  useEffect(() => {
    if (reduce) return;
    if (prevPath.current === pathname) return;

    prevPath.current = pathname;

    if (pendingNav.current || phaseRef.current === "in" || phaseRef.current === "hold") {
      pendingNav.current = false;
      setPhase("out");
      return;
    }

    pendingNav.current = false;
    setPhase("in");
  }, [pathname, reduce]);

  // Phase timers (more reliable than animationend across class swaps).
  useEffect(() => {
    if (phase !== "in") return;
    const id = window.setTimeout(() => {
      setPhase(pendingNav.current ? "hold" : "out");
    }, DURATION.pageIn * 1000);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "hold") return;
    const id = window.setTimeout(() => {
      pendingNav.current = false;
      setPhase("out");
    }, HOLD_FAILSAFE_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "out") return;
    const id = window.setTimeout(() => setPhase("idle"), DURATION.pageOut * 1000);
    return () => window.clearTimeout(id);
  }, [phase]);

  return (
    <>
      {phase !== "idle" && !reduce && (
        <div
          aria-hidden
          className={`page-veil page-veil--${phase === "hold" ? "hold" : phase}`}
        />
      )}
      {children}
    </>
  );
}
