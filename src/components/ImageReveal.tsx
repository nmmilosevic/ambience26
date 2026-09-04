"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { useMotionReady } from "./MotionReady";

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

function routeVeilActive() {
  return Boolean(document.querySelector(".page-veil:not([hidden])"));
}

/**
 * Clip-path wipe + scale settle. Transform / clip only — no blur on imagery.
 *
 * Waits for the session loader (and any route veil) so the wipe plays on
 * screen — not under an overlay, which made first paint look like a pop.
 *
 * The outer wrapper is NOT clipped for IntersectionObserver.
 * Observing a clipped node with amount > 0 never fires (ratio stays 0).
 *
 * Do not wipe until nested images have pixels (lazy + clip races).
 * Visibility (`forced` / inView) never bypasses that media gate.
 */
export function ImageReveal({
  children,
  className = "",
  delay = 0,
  amount = 0.01,
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const appReady = useMotionReady();
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [forced, setForced] = useState(false);

  const inView = useInView(ref, {
    once: true,
    amount,
    margin: amount >= 0.5 ? "0px" : "25% 0px 25% 0px",
  });

  // Arm only after loader + first paint of the clipped state.
  // If a route veil is covering, wait until it has mostly cleared.
  useEffect(() => {
    if (reduce) {
      setArmed(true);
      return;
    }
    if (!appReady) {
      setArmed(false);
      return;
    }

    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;
    let timer = 0;

    const arm = () => {
      if (!cancelled) setArmed(true);
    };

    const afterPaint = () => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(arm);
      });
    };

    if (routeVeilActive()) {
      // pageIn cover + a beat of pageOut so the wipe starts as the linen lifts
      const waitMs = (DURATION.pageIn + DURATION.pageOut * 0.45) * 1000;
      timer = window.setTimeout(afterPaint, waitMs);
    } else {
      afterPaint();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (timer) window.clearTimeout(timer);
    };
  }, [appReady, reduce]);

  // Above-the-fold visibility — only meaningful after we are armed to reveal.
  useEffect(() => {
    if (!armed) return;
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
    const t1 = window.setTimeout(markIfVisible, 120);
    const t2 = window.setTimeout(markIfVisible, 480);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [amount, armed]);

  useEffect(() => {
    if (!armed) return;
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
        if (visibleRatio(el) >= amount) setForced(true);
        return;
      }
      if (rect.top < vh * 1.35 && rect.bottom > -vh * 0.35) {
        setForced(true);
      }
    }, 1600);
    return () => window.clearTimeout(id);
  }, [amount, armed]);

  useEffect(() => {
    const id = window.setTimeout(() => setForced(true), 12000);
    return () => window.clearTimeout(id);
  }, []);

  // Track nested <img> decode so the wipe never opens on empty paint.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let pending = 0;
    let settled = false;
    const done = new WeakSet<HTMLImageElement>();
    const attached = new WeakSet<HTMLImageElement>();

    const markReady = () => {
      if (settled) return;
      settled = true;
      setMediaReady(true);
    };

    const finishOne = (img: HTMLImageElement) => {
      if (done.has(img)) return;
      done.add(img);
      pending = Math.max(0, pending - 1);
      if (pending <= 0) markReady();
    };

    const afterPixels = (img: HTMLImageElement) => {
      if (typeof img.decode === "function") {
        img
          .decode()
          .catch(() => undefined)
          .finally(() => finishOne(img));
        return;
      }
      finishOne(img);
    };

    const watch = (img: HTMLImageElement) => {
      if (attached.has(img)) return;
      attached.add(img);
      // Img arrived after an empty-tree settle — re-gate until pixels exist.
      if (settled) {
        settled = false;
        setMediaReady(false);
      }
      pending += 1;
      if (img.complete && img.naturalWidth > 0) {
        afterPixels(img);
        return;
      }
      const onLoad = () => afterPixels(img);
      const onError = () => finishOne(img);
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);
    };

    const scan = () => {
      const imgs = Array.from(root.querySelectorAll("img"));
      if (imgs.length === 0) return false;
      imgs.forEach(watch);
      return true;
    };

    scan();
    const mo = new MutationObserver(() => {
      scan();
    });
    mo.observe(root, { childList: true, subtree: true });

    // Next/Image may mount <img> a frame late — wait briefly before treating
    // an empty tree as "ready", so we do not arm the wipe then lose the gate.
    const late = window.setTimeout(() => {
      if (!scan() && pending <= 0) markReady();
    }, 400);
    const timeout = window.setTimeout(() => {
      markReady();
    }, 4000);

    return () => {
      mo.disconnect();
      window.clearTimeout(late);
      window.clearTimeout(timeout);
    };
  }, []);

  // Pixels first, then visibility — never wipe an empty frame because
  // above-the-fold `forced` raced ahead of the network.
  const show = Boolean(
    reduce || (armed && mediaReady && (forced || inView)),
  );

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const fillParent = /\babsolute\b/.test(className);

  return (
    <div ref={ref} className={className}>
      <div
        className={
          fillParent
            ? "absolute inset-0 overflow-hidden"
            : "h-full w-full overflow-hidden"
        }
      >
        <motion.div
          className={fillParent ? "absolute inset-0" : "h-full w-full"}
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
            className={
              fillParent ? "absolute inset-0" : "relative h-full w-full"
            }
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
