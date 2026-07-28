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
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        line: "var(--color-line)",
      },
      fontFamily: {
        display: ["var(--font-marcellus)", "Georgia", "serif"],
        body: ["var(--font-epilogue)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
