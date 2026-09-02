"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  DURATION,
  EASE_OUT_EXPO,
  VIEWPORT,
  blockReveal,
  bodyReveal,
} from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** text uses LTR blur; block uses opacity + x only (no filter on large surfaces) */
  variant?: "block" | "text";
};

/**
 * Animate one visual element. Do not wrap a title + paragraph + image:
 * the parent translate would move them as a slab. Give each child its own
 * TextReveal / Reveal / ImageReveal with STAGGER delays instead.
 */

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "block",
}: RevealProps) {
  const reduce = useReducedMotion();
  const [settled, setSettled] = useState(false);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  if (variant === "text") {
    return (
      <motion.div
        className={className}
        initial={bodyReveal.initial}
        whileInView={bodyReveal.animate}
        viewport={VIEWPORT}
        transition={{
          duration: DURATION.slow,
          delay,
          ease: EASE_OUT_EXPO,
        }}
        onAnimationComplete={() => setSettled(true)}
        style={
          settled
            ? { filter: "none" }
            : { willChange: "transform, opacity, filter" }
        }
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={blockReveal.initial}
      whileInView={blockReveal.animate}
      viewport={VIEWPORT}
      transition={{
        duration: DURATION.reveal,
        delay,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </motion.div>
  );
}
