"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

type ImageRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * Intersection ratio (0–1) before the wipe starts.
   * Default (~0) + expanded margin = early trigger for home/projects.
   * Pass 0.6 on team portraits so the wipe waits until most of the tile is in view.
   */
  amount?: number;
};

/** Visible height ratio of `el` inside the viewport (0–1). */
function visibleRatio(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if (rect.height <= 0 || rect.width <= 0) return 0;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  return Math.max(0, Math.min(1, visible / rect.height));
}

/**
 * Clip-path wipe + scale settle. Transform / clip only — no blur on imagery.
 *
 * Important: the outer wrapper is NOT clipped for IntersectionObserver.
 * Observing a clipped node with amount > 0 never fires (ratio stays 0),
 * which left photography permanently hidden.
 *
 * Also: do not wipe until nested images have pixels. Lazy + clip-path races
 * open the wipe on an empty frame; waiting for media avoids a blank stamp
 * before photography arrives.
 *
 * Failsafe: if IntersectionObserver never reports (headless, odd overflow,
 * loader timing), force the wipe open so photography cannot stay blank forever.
 * Near-viewport failsafes stay conservative so off-screen roster tiles wait
 * for scroll instead of wiping early.
 */
export function ImageReveal({
  children,
  className = "",
  delay = 0,
  amount = 0.01,
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [mediaReady, setMediaReady] = useState(false);
  const [forced, setForced] = useState(false);
  // Strict amounts need the real viewport — expanded margin would undercut 60%.
  // Early default keeps a soft root margin so home/projects start a beat early.
  const inView = useInView(ref, {
    once: true,
    amount,
    margin: amount >= 0.5 ? "0px" : "25% 0px 25% 0px",
  });

  // Above-the-fold tiles: do not wait on IO if already past the amount threshold
  // (strict) or loosely near the fold (early default).
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const markIfVisible = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.height <= 0 || rect.width <= 0) return;
      if (amount >= 0.5) {
        if (visibleRatio(el) >= amount) setForced(true);
        return;
      }
      if (rect.top < vh * 1.25 && rect.bottom > -vh * 0.25) {
        setForced(true);
      }
    };

    markIfVisible();
    // After fonts / SiteLoader layout shifts
    const t1 = window.setTimeout(markIfVisible, 200);
    const t2 = window.setTimeout(markIfVisible, 800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [amount]);

  // Near-viewport failsafe — open stuck above-fold tiles without wiping
  // off-screen cards early (team roster should wait for scroll).
  useEffect(() => {
    const id = window.setTimeout(() => {
      const el = ref.current;
      if (!el) {
        setForced(true);
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.height <= 0 || rect.width <= 0) return;
      if (amount >= 0.5) {
        // Only force when already meeting the scroll threshold — never early-open
        // roster tiles that are still mostly below the fold.
        if (visibleRatio(el) >= amount) setForced(true);
        return;
      }
      if (rect.top < vh * 1.35 && rect.bottom > -vh * 0.35) {
        setForced(true);
      }
    }, 1600);
    return () => window.clearTimeout(id);
  }, [amount]);

  // Ultimate failsafe if IntersectionObserver never reports
  useEffect(() => {
    const id = window.setTimeout(() => setForced(true), 12000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let pending = 0;
    let settled = false;
    const done = new WeakSet<HTMLImageElement>();
    const attached = new WeakSet<HTMLImageElement>();

    const finishOne = (img: HTMLImageElement) => {
      if (done.has(img)) return;
      done.add(img);
      pending = Math.max(0, pending - 1);
      if (pending <= 0 && !settled) {
        settled = true;
        setMediaReady(true);
      }
    };

    const watch = (img: HTMLImageElement) => {
      if (attached.has(img)) return;
      attached.add(img);
      pending += 1;
      if (img.complete && img.naturalWidth > 0) {
        finishOne(img);
        return;
      }
      img.addEventListener("load", () => finishOne(img));
      img.addEventListener("error", () => finishOne(img));
    };

    const scan = () => {
      const imgs = Array.from(root.querySelectorAll("img"));
      if (imgs.length === 0) return false;
      imgs.forEach(watch);
      return true;
    };

    // Next/Image may commit the <img> after this effect runs
    if (!scan()) {
      const raf = requestAnimationFrame(() => {
        if (!scan()) {
          // No img yet (or text-only slot) — do not block the wipe forever
          setMediaReady(true);
        }
      });
      const late = window.setTimeout(() => {
        if (!settled) {
          scan();
          if (!settled) setMediaReady(true);
        }
      }, 400);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(late);
      };
    }

    const timeout = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        setMediaReady(true);
      }
    }, 4000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  const show = Boolean(reduce || forced || (inView && mediaReady));

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // Outer wrapper stays unclipped so IntersectionObserver can measure layout.
  // Clip lives on the inner node only.
  return (
    <div ref={ref} className={className}>
      <div className="h-full w-full overflow-hidden">
        <motion.div
          className="h-full w-full"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={
            show
              ? { clipPath: "inset(0 0% 0 0)" }
              : { clipPath: "inset(0 100% 0 0)" }
          }
          transition={{
            duration: DURATION.slow,
            delay,
            ease: EASE_OUT_EXPO,
          }}
          style={{ willChange: "clip-path" }}
        >
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 1.035, x: -10 }}
            animate={show ? { scale: 1, x: 0 } : { scale: 1.035, x: -10 }}
            transition={{
              duration: DURATION.slow,
              delay: delay + 0.1,
              ease: EASE_OUT_EXPO,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
