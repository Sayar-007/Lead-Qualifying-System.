import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-fixed-variant": "#0b513d",
        "status-cold": "#64748B",
        "secondary-container": "#fd8a42",
        "tertiary-fixed-dim": "#b9c7df",
        "on-secondary": "#ffffff",
        "tertiary": "#212f41",
        "tertiary-container": "#374558",
        "surface-container-highest": "#e5e2df",
        "status-warm": "#D97706",
        "tertiary-fixed": "#d5e3fc",
        "surface-card": "#FFFFFF",
        "on-error-container": "#93000a",
        "surface-tint": "#2b6954",
        "on-surface-variant": "#404944",
        "on-primary-fixed": "#002117",
        "surface-container-lowest": "#ffffff",
        "on-primary": "#ffffff",
        "surface-bright": "#fcf9f6",
        "on-error": "#ffffff",
        "surface-container": "#f0edea",
        "on-surface": "#1c1c1a",
        "on-background": "#1c1c1a",
        "inverse-on-surface": "#f3f0ed",
        "on-tertiary": "#ffffff",
        "surface-container-high": "#eae8e5",
        "ink-bold": "#0F172A",
        "on-secondary-fixed": "#331200",
        "on-secondary-fixed-variant": "#763300",
        "on-tertiary-fixed": "#0d1c2e",
        "inverse-surface": "#31302f",
        "on-tertiary-container": "#a4b2c9",
        "background": "#fcf9f6",
        "outline-variant": "#bfc9c3",
        "surface-variant": "#e5e2df",
        "primary": "#003527",
        "primary-container": "#064e3b",
        "error-container": "#ffdad6",
        "error": "#ba1a1a",
        "outline": "#707974",
        "on-tertiary-fixed-variant": "#3a485b",
        "secondary-fixed-dim": "#ffb68e",
        "on-secondary-container": "#682c00",
        "status-hot": "#E11D48",
        "surface-dim": "#dcdad7",
        "primary-fixed": "#b0f0d6",
        "on-primary-container": "#80bea6",
        "inverse-primary": "#95d3ba",
        "secondary-fixed": "#ffdbca",
        "surface": "#fcf9f6",
        "surface-container-low": "#f6f3f0",
        "primary-fixed-dim": "#95d3ba",
        "secondary": "#9b4500"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "gutter": "24px",
        "margin-mobile": "16px",
        "unit": "8px",
        "container-max": "1280px",
        "margin-desktop": "40px"
      },
      fontFamily: {
        "body-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "label-caps": ["IBM Plex Sans", "sans-serif"],
        "display-lg": ["Playfair Display", "serif"],
        "data-mono": ["IBM Plex Sans", "sans-serif"],
        "headline-md": ["Playfair Display", "serif"],
        "display-lg-mobile": ["Playfair Display", "serif"]
      },
      fontSize: {
        "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "label-caps": ["12px", { "lineHeight": "1", "letterSpacing": "0.08em", "fontWeight": "600" }],
        "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "data-mono": ["14px", { "lineHeight": "1.4", "fontWeight": "500" }],
        "headline-md": ["32px", { "lineHeight": "1.3", "fontWeight": "600" }],
        "display-lg-mobile": ["36px", { "lineHeight": "1.2", "fontWeight": "700" }]
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};

export default config;
