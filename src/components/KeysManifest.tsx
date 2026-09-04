"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { STAGGER } from "@/lib/motion";

export type KeyCommitment = {
  title: string;
  description: string;
};

type KeysManifestProps = {
  title: string;
  lead: string;
  values: readonly KeyCommitment[];
};

const DESKTOP_MQ = "(min-width: 1024px)";
/**
 * Matches SiteHeader clearance used elsewhere (`top-28` / `pt-28`).
 * Header is roughly py-5/py-6 + logo (~72–96px); 7rem keeps content clear.
 */
const HEADER_CLEARANCE_REM = 7;
/** Viewport-heights of scroll runway per card after the first (already settled). */
const SCROLL_PER_CARD = 0.9;
/** Rise distance (px) for each card's entrance. */
const RISE_Y = 64;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** null = not measured yet (SSR / first paint); avoids a static→scroll flash. */
function useIsDesktopScroll() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return enabled;
}

/**
 * Maps global section progress into one card's local 0→1 rise.
 * Card 0 is already settled at progress 0; cards 1…n share the runway
 * (fade + translateY upward into their grid seats).
 */
function useCardMotion(
  progress: MotionValue<number>,
  index: number,
  count: number,
) {
  const local = useTransform(progress, (p) => {
    // First card stays in its final seat for the whole pin.
    if (index === 0 || count <= 1) return 1;

    const slots = count - 1;
    const start = (index - 1) / slots;
    const end = index / slots;
    return clamp01((p - start) / (end - start));
  });

  const opacity = useTransform(local, [0, 1], [0, 1]);
  const y = useTransform(local, [0, 1], [RISE_Y, 0]);

  return { opacity, y };
}

function KeyCard({
  value,
  index,
  count,
  progress,
}: {
  value: KeyCommitment;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const label = String(index + 1).padStart(2, "0");
  const staggerDown = index % 2 === 1;
  const { opacity, y } = useCardMotion(progress, index, count);

  return (
    <motion.li
      className={`relative flex gap-5 md:gap-6 will-change-transform ${
        staggerDown ? "lg:mt-12 xl:mt-16" : ""
      }`}
      style={{ opacity, y }}
    >
      <span
        aria-hidden
        className="shrink-0 font-display text-2xl tabular-nums tracking-tight text-accent/70 md:text-3xl"
      >
        {label}
      </span>
      <div className="min-w-0 pt-0.5">
        <h3 className="font-display text-h3 tracking-tight md:text-[1.85rem]">
          {value.title}
        </h3>
        <p className="mt-4 max-w-measure text-sm leading-relaxed text-muted md:text-base">
          {value.description}
        </p>
      </div>
    </motion.li>
  );
}

function StaticKeys({ title, lead, values }: KeysManifestProps) {
  return (
    <section className="bg-surface py-20 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-content gap-14 px-5 md:grid-cols-12 md:gap-10 md:px-8 lg:gap-16">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <TextReveal as="h2" className="font-display text-h2">
              {title}
            </TextReveal>
            <Reveal variant="text" delay={STAGGER.body} className="mt-5">
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                {lead}
              </p>
            </Reveal>
            <Reveal variant="text" delay={STAGGER.body2} className="mt-10">
              <p
                className="font-display text-sm tabular-nums tracking-wide text-accent/70"
                aria-hidden
              >
                01–{String(values.length).padStart(2, "0")}
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="grid gap-12 md:col-span-8 md:gap-14 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16 lg:pb-24">
          {values.map((value, i) => {
            const index = String(i + 1).padStart(2, "0");
            const delay = i * STAGGER.item;
            const staggerDown = i % 2 === 1;

            return (
              <li
                key={value.title}
                className={`flex gap-5 md:gap-6 ${
                  staggerDown ? "lg:mt-16 xl:mt-20" : ""
                }`}
              >
                <Reveal variant="text" delay={delay}>
                  <span
                    aria-hidden
                    className="shrink-0 font-display text-2xl tabular-nums tracking-tight text-accent/70 md:text-3xl"
                  >
                    {index}
                  </span>
                </Reveal>
                <div className="min-w-0 pt-0.5">
                  <TextReveal
                    as="h3"
                    delay={delay + 0.04}
                    className="font-display text-h3 tracking-tight md:text-[1.85rem]"
                  >
                    {value.title}
                  </TextReveal>
                  <Reveal
                    variant="text"
                    delay={delay + STAGGER.body}
                    className="mt-4"
                  >
                    <p className="max-w-measure text-sm leading-relaxed text-muted md:text-base">
                      {value.description}
                    </p>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/**
 * Scroll-pinned desktop layout. Mounted only when the track element exists,
 * so useScroll's `target` ref is always hydrated (Motion throws otherwise).
 */
function ScrollKeys({ title, lead, values }: KeysManifestProps) {
  const count = values.length;
  const trackRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // Pin sequence runs while the track fills the viewport.
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      if (count <= 1) {
        setActiveIndex(0);
        return;
      }
      // Card 0 is intro; progress drives cards 1…n-1.
      if (p <= 0) {
        setActiveIndex(0);
        return;
      }
      const slots = count - 1;
      const idx = Math.min(
        count - 1,
        1 + Math.min(slots - 1, Math.floor(clamp01(p) * slots)),
      );
      setActiveIndex(idx);
    });
  }, [scrollYProgress, count]);

  // First card is free; runway is for the remaining keys only.
  const animatedCount = Math.max(0, count - 1);
  const trackHeightVh = 100 + animatedCount * SCROLL_PER_CARD * 100;
  const activeLabel = String(activeIndex + 1).padStart(2, "0");
  const totalLabel = String(count).padStart(2, "0");

  return (
    <section
      ref={trackRef}
      className="relative bg-surface"
      style={{ height: `${trackHeightVh}vh` }}
      aria-label={title}
    >
      {/*
        Pin when the section top hits the viewport (top-0). Padding-top clears
        the fixed SiteHeader so title + cards never sit underneath it.
      */}
      <div
        className="sticky top-0 box-border flex h-screen items-start overflow-hidden"
        style={{ paddingTop: `${HEADER_CLEARANCE_REM}rem` }}
      >
        <div className="mx-auto grid w-full max-w-content gap-10 self-start px-5 pb-8 md:grid-cols-12 md:gap-10 md:px-8 lg:gap-16 lg:pb-10">
          <div className="md:col-span-4">
            <h2 className="font-display text-h2">{title}</h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {lead}
            </p>
            <p
              className="mt-10 font-display text-sm tabular-nums tracking-wide text-accent/70"
              aria-live="polite"
            >
              <span className="text-accent">{activeLabel}</span>–{totalLabel}
            </p>
          </div>

          <ol className="relative isolate grid gap-10 md:col-span-8 md:gap-12 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
            {values.map((value, i) => (
              <KeyCard
                key={value.title}
                value={value}
                index={i}
                count={count}
                progress={scrollYProgress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Studio commitments as a pinned scroll manifesto.
 * Desktop: card 01 starts settled; later keys rise from below into their
 * staggered grid seats, scrubbed by scroll. Pin sits below the site header.
 * Mobile / reduced-motion: calm static layout with entrance reveals.
 */
export function KeysManifest({ title, lead, values }: KeysManifestProps) {
  const reduce = useReducedMotion();
  const desktop = useIsDesktopScroll();

  // Wait for the media query so desktop users never flash the static list.
  if (desktop === null) {
    return (
      <section
        className="bg-surface"
        style={{ minHeight: "100vh" }}
        aria-label={title}
        aria-hidden
      />
    );
  }

  if (reduce || !desktop) {
    return <StaticKeys title={title} lead={lead} values={values} />;
  }

  return <ScrollKeys title={title} lead={lead} values={values} />;
}
