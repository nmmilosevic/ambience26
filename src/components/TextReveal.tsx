"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  DURATION,
  EASE_OUT_EXPO,
  VIEWPORT,
  bodyReveal,
  textReveal,
} from "@/lib/motion";

type TextRevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  /** title = stronger blur travel; body = softer */
  tone?: "title" | "body";
};

/**
 * Blur is scoped to text wrappers only. After settle, filter is cleared so
 * we do not leave an active compositing filter on idle copy.
 */
export function TextReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  tone = "title",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const preset = tone === "body" ? bodyReveal : textReveal;
  const [settled, setSettled] = useState(false);

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      initial={preset.initial}
      whileInView={preset.animate}
      viewport={VIEWPORT}
      transition={{
        ...preset.transition,
        delay,
        duration: tone === "body" ? DURATION.slow : DURATION.reveal,
        ease: EASE_OUT_EXPO,
      }}
      onAnimationComplete={() => setSettled(true)}
      style={
        settled
          ? { filter: "none" }
          : { willChange: "transform, opacity, filter" }
      }
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}
