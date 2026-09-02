"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

type Variant = "solid" | "outline" | "ghost" | "ghost-dark";

const variants: Record<Variant, string> = {
  solid:
    "bg-void text-on-void hover:bg-accent",
  outline:
    "border border-ink text-ink hover:bg-void hover:text-on-void",
  ghost: "text-ink hover:opacity-70",
  "ghost-dark":
    "border border-on-void/70 text-on-void hover:bg-on-void hover:text-void",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: ButtonLinkProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex"
    >
      <Link
        href={href}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-brand px-5 py-2.5 text-sm tracking-wide transition-colors duration-mid ease-out ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
