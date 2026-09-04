"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

/** Soft feather travel: numeric %; two endpoints only (no mid keyframe = no stall) */
const WIPE_FROM_N = -28;
const WIPE_TO_N = 128;

function softWipeMask(forward: boolean): CSSProperties {
  const axis = forward ? "90deg" : "270deg";
  // Soft waterfall: solid → half → clear over a wide feather band
  const gradient = `linear-gradient(${axis}, #000 0%, #000 calc(var(--hero-wipe-n) * 1%), rgba(0,0,0,0.5) calc(var(--hero-wipe-n) * 1% + 16%), transparent calc(var(--hero-wipe-n) * 1% + ${HERO_WIPE_FEATHER}))`;
  return {
    WebkitMaskImage: gradient,
    maskImage: gradient,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };
}

export function MorphHero({ slides }: MorphHeroProps) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const slide = slides[index];
  const under = slides[prevIndex] ?? slide;
  const pauseUntil = useRef(0);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      setDirection(1);
      setIndex((i) => {
        setPrevIndex(i);
        return (i + 1) % slides.length;
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, slides.length]);

  const go = (dir: -1 | 1) => {
    pauseUntil.current = Date.now() + PAUSE_AFTER_INTERACT_MS;
    setDirection(dir);
    setIndex((i) => {
      setPrevIndex(i);
      return (i + dir + slides.length) % slides.length;
    });
  };

  const forward = direction >= 0;
  const bodyExitMs = DURATION.slow * EXIT_RATIO;
  /** Skip underlayer while it would duplicate the LCP slide (same src twice). */
  const showUnder = under.image !== slide.image;

  // Warm the next carousel frame so the wipe does not wait on network
  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const next = slides[(index + 1) % slides.length];
    if (!next?.image) return;
    const img = new window.Image();
    img.decoding = "async";
    img.src = next.image;
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

      <AnimatePresence initial={false}>
        <motion.div
          key={`${slide.slug}-${index}`}
          className="absolute inset-0 z-[1] overflow-hidden"
          style={reduce ? undefined : softWipeMask(forward)}
          initial={
            reduce
              ? { opacity: 0 }
              : {
                  ["--hero-wipe-n" as string]: WIPE_FROM_N,
                  opacity: 0.85,
                }
          }
          animate={
            reduce
              ? { opacity: 1 }
              : {
                  // Mask + opacity only: continuous ease-out, no filter/scale thrash
                  ["--hero-wipe-n" as string]: WIPE_TO_N,
                  opacity: 1,
                }
          }
          exit={reduce ? { opacity: 0 } : { opacity: 1 }}
          transition={
            reduce
              ? { duration: DURATION.fast, ease: EASE_OUT_EXPO }
              : {
                  ["--hero-wipe-n" as string]: {
                    duration: DURATION.hero,
                    ease: EASE_OUT_EXPO,
                  },
                  opacity: {
                    duration: DURATION.hero * 0.72,
                    ease: EASE_OUT_EXPO,
                  },
                }
          }
        >
          {/*
            Ken Burns: transform-only scale on an isolated layer.
            translateZ(0) promotes once; no perpetual will-change.
          */}
          <motion.div
            className="relative h-full w-full"
            initial={reduce ? false : { scale: 1 }}
            animate={
              reduce ? { scale: 1 } : { scale: HERO_KEN_BURNS.scaleTo }
            }
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
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

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
                key={`${slide.slug}-title-${index}`}
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
              key={`${slide.slug}-lead-${index}`}
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
              key={`${slide.slug}-cta-${index}`}
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
