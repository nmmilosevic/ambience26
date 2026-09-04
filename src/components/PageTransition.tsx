"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { DURATION } from "@/lib/motion";

type PageTransitionProps = {
  children: React.ReactNode;
};

type VeilPhase = "idle" | "in" | "out";

/**
 * Route veil driven only by App Router pathname changes.
 * No document click listeners — those were blocking / delaying <Link> URL updates.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<VeilPhase>("idle");
  const prevPath = useRef(pathname);
  const skipFirst = useRef(true);

  useEffect(() => {
    if (reduce) return;
    if (skipFirst.current) {
      skipFirst.current = false;
      prevPath.current = pathname;
      return;
    }
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setPhase("in");
  }, [pathname, reduce]);

  useEffect(() => {
    if (phase !== "in") return;
    const id = window.setTimeout(() => setPhase("out"), DURATION.pageIn * 1000);
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
        <div aria-hidden className={`page-veil page-veil--${phase}`} />
      )}
      {children}
    </>
  );
}
