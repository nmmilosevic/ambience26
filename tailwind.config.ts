import type { Config } from "tailwindcss";

/** Enables Tailwind /opacity modifiers with CSS custom properties. */
function withAlpha(cssVar: `--${string}`) {
  return `color-mix(in oklch, var(${cssVar}) calc(100% * <alpha-value>), transparent)`;
}

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /*
       * Bare `var(--token)` breaks Tailwind opacity modifiers (text-on-void/70,
       * bg-bg/92, etc.) — those classes never emit CSS, so void-band paragraphs
       * fall back to body ink (dark-on-dark). color-mix + <alpha-value> keeps
       * full oklch tokens in globals.css while enabling /opacity utilities.
       */
      colors: {
        bg: withAlpha("--color-bg"),
        surface: withAlpha("--color-surface"),
        ink: withAlpha("--color-ink"),
        muted: withAlpha("--color-muted"),
        accent: withAlpha("--color-accent"),
        void: withAlpha("--color-void"),
        "on-void": withAlpha("--color-on-void"),
        line: withAlpha("--color-line"),
        veil: withAlpha("--color-veil"),
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        in: "var(--ease-in)",
        inout: "var(--ease-inout)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        mid: "var(--duration-mid)",
        slow: "var(--duration-slow)",
        hero: "var(--duration-hero)",
      },
      maxWidth: {
        content: "var(--content-max)",
        measure: "65ch",
      },
      borderRadius: {
        brand: "var(--radius)",
      },
    },
  },
  plugins: [],
} satisfies Config;
