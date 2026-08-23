import type { Config } from "tailwindcss";

// Design tokens for FinLearn.
// Casual-but-credible "ledger" palette: deep leaf green + marigold accent + denim link color.
// Swap these values later for a more buttoned-up fintech palette without touching component code.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBFAF6",
        ink: "#16221B",
        brand: {
          DEFAULT: "#2F6F4F",
          dark: "#1F4E38",
          light: "#E4EFE8",
        },
        accent: {
          DEFAULT: "#F4B740",
          dark: "#D89A1F",
          light: "#FDF1D6",
        },
        link: {
          DEFAULT: "#3E5C9A",
          light: "#E7ECF7",
        },
        muted: "#8B9A8E",
        line: "#E4E0D6",
        danger: "#C0533E",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 2px 0 0 rgba(22,34,27,0.08), 0 8px 24px -12px rgba(22,34,27,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
