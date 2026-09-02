import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        void: "var(--color-void)",
        "on-void": "var(--color-on-void)",
        line: "var(--color-line)",
        veil: "var(--color-veil)",
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
