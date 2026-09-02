"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MediaImage } from "@/components/MediaImage";
import {
  DURATION,
  EASE_OUT_EXPO,
  EXIT_RATIO,
  bodyReveal,
  staggerContainer,
  textReveal,
} from "@/lib/motion";
import type { ServiceCapability } from "@/content/services";

type CapabilitiesExplorerProps = {
  items: ServiceCapability[];
};

export function CapabilitiesExplorer({ items }: CapabilitiesExplorerProps) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  if (!current) return null;

  const panelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;

  const activate = (index: number) => {
    setActive(index);
    document.getElementById(tabId(index))?.focus();
  };

  return (
    <div className="mt-12 md:mt-16">
      {items.map((item) =>
        item.image === current.image ? null : (
          <link key={item.image} rel="preload" as="image" href={item.image} />
        ),
      )}

      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div
          role="tablist"
          aria-label="Capabilities"
          aria-orientation="vertical"
          className="flex flex-col md:col-span-4 md:pt-1"
        >
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                id={tabId(index)}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                    event.preventDefault();
                    activate((index + 1) % items.length);
                  }
                  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    activate((index - 1 + items.length) % items.length);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    activate(0);
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    activate(items.length - 1);
                  }
                }}
                className={`flex w-full items-baseline gap-4 py-3.5 text-left transition-colors duration-mid ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:py-4 ${
                  selected ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`font-display text-sm tabular-nums tracking-wide transition-opacity duration-mid ease-out ${
                    selected ? "text-accent opacity-100" : "opacity-40"
                  }`}
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 text-lg tracking-tight md:text-xl ${
                    selected ? "font-display" : ""
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(active)}
          className="md:col-span-8 md:sticky md:top-28 md:self-start"
        >
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] md:aspect-[4/3]">
            {reduce ? (
              <MediaImage
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            ) : (
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.image}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.mid, ease: EASE_OUT_EXPO }}
                >
                  <MediaImage
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {reduce ? (
            <div key={current.title} className="mt-6 md:mt-8">
              <h3 className="font-display text-h3 tracking-tight">{current.title}</h3>
              <p className="mt-4 max-w-measure leading-relaxed text-muted">
                {current.description}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.title}
                className="mt-6 md:mt-8"
                initial="initial"
                animate="enter"
                exit="exit"
                variants={staggerContainer}
              >
                <motion.h3
                  className="font-display text-h3 tracking-tight"
                  variants={{
                    initial: textReveal.initial,
                    enter: {
                      ...textReveal.animate,
                      transition: {
                        duration: DURATION.mid,
                        ease: EASE_OUT_EXPO,
                      },
                    },
                    exit: {
                      ...textReveal.exit,
                      transition: {
                        duration: DURATION.mid * EXIT_RATIO,
                        ease: EASE_OUT_EXPO,
                      },
                    },
                  }}
                >
                  {current.title}
                </motion.h3>
                <motion.p
                  className="mt-4 max-w-measure leading-relaxed text-muted"
                  variants={{
                    initial: bodyReveal.initial,
                    enter: {
                      ...bodyReveal.animate,
                      transition: {
                        duration: DURATION.mid,
                        ease: EASE_OUT_EXPO,
                      },
                    },
                    exit: {
                      ...bodyReveal.exit,
                      transition: {
                        duration: DURATION.mid * EXIT_RATIO,
                        ease: EASE_OUT_EXPO,
                      },
                    },
                  }}
                >
                  {current.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
