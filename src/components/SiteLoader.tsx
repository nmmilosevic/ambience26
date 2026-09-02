"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BrandLogo } from "./BrandLogo";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

const STORAGE_KEY = "ambience-session-loaded";
const MIN_HOLD_MS = 1200;

/**
 * Mount-gated so SSR HTML never includes the overlay (avoids blank-screen
 * flashes and hydration mismatches with sessionStorage).
 */
export function SiteLoader() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"idle" | "loading" | "exit" | "done">("idle");

  useEffect(() => {
    setMounted(true);

    if (reduce) {
      setPhase("done");
      return;
    }

    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setPhase("done");
        return;
      }
    } catch {
      setPhase("done");
      return;
    }

    setPhase("loading");
    const minHold = window.setTimeout(() => setPhase("exit"), MIN_HOLD_MS);
    return () => window.clearTimeout(minHold);
  }, [reduce]);

  useEffect(() => {
    if (phase !== "exit") return;
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhase("done");
    }, DURATION.loader * 1000);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (!mounted || phase === "idle" || phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: DURATION.loader, ease: EASE_OUT_EXPO }}
      aria-hidden={phase === "exit"}
    >
      <BrandLogo />
      <motion.div
        className="mt-10 h-px w-24 origin-left bg-accent/40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: DURATION.slow,
          ease: EASE_OUT_EXPO,
          delay: 0.14,
        }}
      />
    </motion.div>
  );
}
