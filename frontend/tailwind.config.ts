import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#04060c",
        panel: "#080c16",
        line: "rgba(120,170,255,0.14)",
        "line-strong": "rgba(120,170,255,0.3)",
        cyan: "#3fe4ff",
        blue: "#4a7dff",
        violet: "#9d6bff",
        mint: "#5be8a8",
        dim: "#7d8aa8",
        faint: "#4b5570",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
