"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { ButtonLink } from "./ButtonLink";
import { MediaImage } from "./MediaImage";
import { HeroVeil } from "./HeroVeil";
import {
  DURATION,
  EASE_OUT_EXPO,
  EXIT_RATIO,
  HERO_KEN_BURNS,
  HERO_TITLE_HANDOFF,
  HERO_WIPE_FEATHER,
  heroTitleReveal,
} from "@/lib/motion";

type Slide = {
  title: string;
  slug: string;
  image: string;
  href: string;
};

type MorphHeroProps = {
  slides: Slide[];
};

const AUTOPLAY_MS = 4500;
const PAUSE_AFTER_INTERACT_MS = 6000;

/** Prevent HMR / StrictMode from stacking autoplay timers. */
let heroAutoplayTimer = 0;

function softWipeMask(forward: boolean): CSSProperties {
  const axis = forward ? "90deg" : "270deg";
  // Soft waterfall: solid → half → clear over a wide feather band
  const gradient = `linear-gradient(${axis}, #000 0%, #000 calc(var(--hero-wipe-n) * 1%), rgba(0,0,0,0.5) calc(var(--hero-wipe-n) * 1% + 16%), transparent calc(var(--hero-wipe-n) * 1% + ${HERO_WIPE_FEATHER}))`;
  return {
    WebkitMaskImage: gradient,
    maskImage: gradient,
  };
}

function warmupSrc(src: string) {
  if (!src || typeof window === "undefined") return;
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}

function HeroWipeSlide({
  slide,
  forward,
  instant,
  reduce,
  priority,
}: {
  slide: Slide;
  forward: boolean;
  instant: boolean;
  reduce: boolean;
  priority?: boolean;
}) {
  const [revealed, setRevealed] = useState(instant || reduce);

  // Paint the masked start frame, then add .is-revealed so CSS interpolates
  // --hero-wipe-n. Motion's initial/animate path snaps CSS variables on click.
  useEffect(() => {
    if (instant || reduce) {
      setRevealed(true);
      return;
    }

    const id = window.setTimeout(() => setRevealed(true), 32);
    return () => window.clearTimeout(id);
  }, [instant, reduce]);

  const shown = instant || reduce || revealed;

  return (
    <div
      className={`hero-wipe-layer absolute inset-0 z-[1] overflow-hidden${shown ? " is-revealed" : ""}`}
      data-instant={instant ? "true" : "false"}
      data-reduce={reduce ? "true" : "false"}
      style={softWipeMask(forward)}
    >
      {/*
        Ken Burns: transform-only scale on an isolated layer.
        translateZ(0) promotes once; no perpetual will-change.
      */}
      <motion.div
        className="relative h-full w-full"
        style={{ transform: "translateZ(0)" }}
        initial={reduce || instant ? false : { scale: 1 }}
        animate={reduce ? { scale: 1 } : { scale: HERO_KEN_BURNS.scaleTo }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration: HERO_KEN_BURNS.duration,
                ease: "linear",
              }
        }
      >
        <MediaImage
          src={slide.image}
          alt={slide.title}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

export function MorphHero({ slides }: MorphHeroProps) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hasNavigated, setHasNavigated] = useState(false);
  const reduce = useReducedMotion();
  const slide = slides[index];
  const under = slides[prevIndex] ?? slide;
  const pauseUntil = useRef(0);
  const wipeUntil = useRef(0);
  const indexRef = useRef(0);
  indexRef.current = index;

  const advance = (dir: -1 | 1, fromUser = false) => {
    if (slides.length < 2) return;
    if (!fromUser && Date.now() < wipeUntil.current) return;
    const i = indexRef.current;
    const next = (i + dir + slides.length) % slides.length;
    if (next === i) return;
    wipeUntil.current = Date.now() + DURATION.hero * 1000;
    setHasNavigated(true);
    setDirection(dir);
    setPrevIndex(i);
    setIndex(next);
  };

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    window.clearInterval(heroAutoplayTimer);
    heroAutoplayTimer = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      advance(1, false);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(heroAutoplayTimer);
  }, [reduce, slides.length]);

  const go = (dir: -1 | 1) => {
    pauseUntil.current = Date.now() + PAUSE_AFTER_INTERACT_MS;
    advance(dir, true);
  };

  const forward = direction >= 0;
  const bodyExitMs = DURATION.slow * EXIT_RATIO;
  const instantEnter = !hasNavigated;
  /** Skip underlayer while it would duplicate the LCP slide (same src twice). */
  const showUnder = !instantEnter && under.image !== slide.image;

  // Warm both neighbors so arrow clicks do not wait on network
  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const next = slides[(index + 1) % slides.length];
    const prev = slides[(index - 1 + slides.length) % slides.length];
    if (next?.image) warmupSrc(next.image);
    if (prev?.image) warmupSrc(prev.image);
  }, [index, reduce, slides]);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-void">
      {/* Stable underlayer: previous slide, avoids void flash during wipe */}
      {showUnder ? (
        <div className="absolute inset-0 z-0">
          <MediaImage
            src={under.image}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="low"
            className="object-cover"
            aria-hidden
          />
        </div>
      ) : null}

      <HeroWipeSlide
        key={`hero-slide-${index}`}
        slide={slide}
        forward={forward}
        instant={Boolean(reduce) || instantEnter}
        reduce={Boolean(reduce)}
        priority={index === 0}
      />

      <HeroVeil className="z-[2]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-content flex-col justify-end px-5 pb-16 pt-24 md:px-8 md:pb-20">
        <div className="max-w-3xl">
          {/*
            Sync handoff (no mode="wait"): fast opacity exit, then delayed
            enter so titles never stack readable — still rides the wipe, not
            a dead pause. Absolute layers share one reserved box (no CLS).
            overflow visible: x handoff must not hard-clip the display type.
          */}
          <div className="relative min-h-[1.15em] overflow-visible">
            {/* Invisible sizer keeps layout height = current title */}
            <h1
              className="invisible font-display text-display"
              aria-hidden
            >
              {slide.title}
            </h1>
            <AnimatePresence initial={false}>
              <motion.div
                key={`hero-title-${index}`}
                className="absolute left-0 top-0 w-full"
                initial={
                  reduce
                    ? false
                    : {
                        ...heroTitleReveal.initial,
                        x: forward ? -28 : 28,
                      }
                }
                animate={heroTitleReveal.animate}
                exit={
                  reduce
                    ? undefined
                    : {
                        ...heroTitleReveal.exit,
                        x: forward ? 18 : -18,
                        transition: {
                          opacity: {
                            duration: HERO_TITLE_HANDOFF.exitOpacity,
                            ease: EASE_OUT_EXPO,
                          },
                          x: {
                            duration: HERO_TITLE_HANDOFF.exitMove,
                            ease: EASE_OUT_EXPO,
                          },
                        },
                      }
                }
                transition={{
                  duration: HERO_TITLE_HANDOFF.enterDuration,
                  delay: reduce ? 0 : HERO_TITLE_HANDOFF.enterDelay,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <h1 className="font-display text-display text-on-void">
                  <Link href={slide.href} className="hover:opacity-90">
                    {slide.title}
                  </Link>
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={`hero-lead-${index}`}
              className="mt-5 max-w-xl text-lead text-on-void/90"
              initial={
                reduce
                  ? false
                  : { opacity: 0, x: forward ? -16 : 16 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduce
                  ? undefined
                  : {
                      opacity: 0,
                      x: forward ? 10 : -10,
                      transition: {
                        duration: bodyExitMs,
                        ease: EASE_OUT_EXPO,
                      },
                    }
              }
              transition={{
                duration: DURATION.hero * 0.85,
                delay: reduce ? 0 : 0.08,
                ease: EASE_OUT_EXPO,
              }}
            >
              Bespoke interior architecture and turnkey homes by Andrea Böck.
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-cta-${index}`}
              className="mt-8 flex flex-wrap gap-3"
              initial={
                reduce
                  ? false
                  : { opacity: 0, x: forward ? -16 : 16 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduce
                  ? undefined
                  : {
                      opacity: 0,
                      x: forward ? 10 : -10,
                      transition: {
                        duration: bodyExitMs,
                        ease: EASE_OUT_EXPO,
                      },
                    }
              }
              transition={{
                duration: DURATION.hero * 0.85,
                delay: reduce ? 0 : 0.16,
                ease: EASE_OUT_EXPO,
              }}
            >
              <ButtonLink href={slide.href} variant="ghost-dark">
                View project
              </ButtonLink>
            </motion.div>
          </AnimatePresence>
        </div>

        {slides.length > 1 && (
          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => go(-1)}
              className="text-on-void/80 transition hover:text-on-void"
            >
              <CaretLeft size={26} weight="light" />
            </button>
            <p className="text-sm tabular-nums text-on-void/55">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => go(1)}
              className="text-on-void/80 transition hover:text-on-void"
            >
              <CaretRight size={26} weight="light" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
