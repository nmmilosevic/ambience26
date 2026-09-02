/** Shared motion tokens. Exponential ease-out curves only. Showroom pace. */

export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  /** UI feedback (hover, press) */
  fast: 0.22,
  /** Menus, mid-weight UI */
  mid: 0.55,
  /** Image wipe, body copy reveal */
  slow: 1.25,
  /** Hero carousel soft waterfall wipe (showroom pace) */
  hero: 1.7,
  /** Route linen veil — cover-in (click) */
  pageIn: 0.34,
  /** Route linen veil — reveal-out (after route ready) */
  pageOut: 0.48,
  /** Legacy full-cycle alias (in + out); prefer pageIn / pageOut */
  page: 0.82,
  /** Loader exit fade */
  loader: 1.55,
  /** Title blur → sharp LTR */
  reveal: 1.2,
} as const;

/** Exit ≈ 72% of enter so departures clear before the next entrance settles */
export const EXIT_RATIO = 0.72 as const;

export const VIEWPORT = { once: true, amount: 0.05, margin: "10% 0px 10% 0px" } as const;

/**
 * Child delays when title, copy, and image share a fold.
 * Never parent-translate mixed groups: each element owns its own reveal.
 */
export const STAGGER = {
  title: 0,
  /** First body line after a title */
  body: 0.08,
  /** Second body / supporting copy */
  body2: 0.14,
  /** Third body */
  body3: 0.2,
  /** Photography starts with the first body so rooms lead */
  image: 0.1,
  cta: 0.18,
  /** Between sibling items in a list */
  item: 0.06,
} as const;

/** Layout-only stagger parent: no x/opacity on the wrapper, children enter themselves. */
export const staggerContainer = {
  initial: {},
  enter: {
    transition: { staggerChildren: STAGGER.body },
  },
  exit: {
    transition: {
      staggerChildren: STAGGER.body * EXIT_RATIO,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
} as const;

/** Left-to-right blur-to-sharp text / block entrance (text only; never huge surfaces) */
export const textReveal = {
  initial: {
    opacity: 0,
    x: -24,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    x: 14,
    filter: "blur(5px)",
  },
  transition: {
    duration: DURATION.reveal,
    ease: EASE_OUT_EXPO,
  },
} as const;

/** Softer body variant of the same language */
export const bodyReveal = {
  initial: {
    opacity: 0,
    x: -16,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
  },
  transition: {
    duration: DURATION.slow,
    ease: EASE_OUT_EXPO,
  },
} as const;

/** Block / section entrance: transform + opacity only (no filter on large paint areas) */
export const blockReveal = {
  initial: {
    opacity: 0,
    x: -18,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: DURATION.reveal,
    ease: EASE_OUT_EXPO,
  },
} as const;

/**
 * Soft feathered mask wipe driven by --hero-wipe (percentage along the axis).
 * Wide transparent band after the wipe head = soft waterfall leading edge.
 * Direction is set in MorphHero via 90deg (LTR) or 270deg (RTL).
 */
export const HERO_WIPE_FEATHER = "36%" as const;

/**
 * Do not apply filter blur on the full-bleed hero plane — mask + opacity
 * carry the soft wipe; blur on ~100vw imagery tanks compositor fps.
 * Kept as a named zero so call sites stay explicit.
 */
export const HERO_WIPE_BLUR = "0px" as const;

/** Gentle Ken Burns: small scale range, transform-only, spans slide dwell */
export const HERO_KEN_BURNS = {
  /** End scale; keep ≤1.025 so continuous zoom stays on the compositor */
  scaleTo: 1.022,
  /** Match autoplay dwell so zoom never restarts mid-slide */
  duration: 4.5,
} as const;

/**
 * Hero title tracks the wipe: transform/opacity only (no filter) so text and
 * image read as one gesture. Handoff uses a fast opacity exit + delayed enter
 * so outgoing/incoming titles are never both readable at once.
 */
export const HERO_TITLE_HANDOFF = {
  /** Opacity clears first so the next title can arrive without stacking type */
  exitOpacity: DURATION.hero * 0.32,
  /** Soft x drift can finish slightly after opacity is gone */
  exitMove: DURATION.hero * 0.42,
  /** Enter starts once exit opacity is near floor (ease-out front-loads the fade) */
  enterDelay: DURATION.hero * 0.28,
  /** Settle near the end of the image wipe, not after a long dead pause */
  enterDuration: DURATION.hero * 0.88,
} as const;

export const heroTitleReveal = {
  initial: { opacity: 0, x: -28 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 18 },
  transition: {
    duration: HERO_TITLE_HANDOFF.enterDuration,
    ease: EASE_OUT_EXPO,
  },
} as const;

/** Hero slide soft waterfall wipe tokens */
export const heroWipe = {
  feather: HERO_WIPE_FEATHER,
  blur: HERO_WIPE_BLUR,
  transition: {
    duration: DURATION.hero,
    ease: EASE_OUT_EXPO,
  },
} as const;
