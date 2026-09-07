"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BrandLogo } from "./BrandLogo";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import {
  LOADER_STORAGE_KEY,
  signalLoaderDone,
} from "./MotionReady";

const MIN_HOLD_MS = 1200;

function shouldSkipLoader(reduce: boolean | null) {
  if (reduce) return true;
  try {
    return Boolean(sessionStorage.getItem(LOADER_STORAGE_KEY));
  } catch {
    return true;
  }
}

/**
 * Overlay is in the SSR HTML so a first-session visit is covered on first
 * paint — not after hydration. Returning visitors / reduced-motion skip via a
 * blocking inline script + CSS (html[data-loader="done"]), then this component
 * unmounts in useLayoutEffect before the browser paints.
 */
export function SiteLoader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useLayoutEffect(() => {
    if (shouldSkipLoader(reduce)) {
      signalLoaderDone();
      setPhase("done");
      return;
    }

    document.documentElement.setAttribute("data-loader", "pending");
    const minHold = window.setTimeout(() => setPhase("exit"), MIN_HOLD_MS);
    return () => window.clearTimeout(minHold);
  }, [reduce]);

  useEffect(() => {
    if (phase !== "exit") return;
    const id = window.setTimeout(() => {
      signalLoaderDone();
      setPhase("done");
    }, DURATION.loader * 1000);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <motion.div
      data-site-loader=""
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: DURATION.loader, ease: EASE_OUT_EXPO }}
      aria-hidden={phase === "exit"}
    >
      <BrandLogo priority />
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
