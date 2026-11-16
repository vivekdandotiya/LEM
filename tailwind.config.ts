import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/motion/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // V8 Professional System Tokens
        ivory: {
          DEFAULT: "var(--ivory)",
          2: "var(--ivory-2)",
        },
        ink: {
          DEFAULT: "var(--ink)",
        },
        charcoal: {
          DEFAULT: "var(--charcoal)",
        },
        graphite: {
          DEFAULT: "var(--graphite)",
        },
        stone: {
          DEFAULT: "var(--stone)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          soft: "var(--gold-soft)",
          deep: "var(--gold-deep)",
        },
        line: {
          DEFAULT: "var(--line)",
          dark: "var(--line-dark)",
        },
        // Legacy fallbacks mapped to V8
        paper: {
          DEFAULT: "var(--ivory)",
          2: "var(--ivory-2)",
        },
        lime: {
          DEFAULT: "var(--gold)",
          soft: "var(--gold-soft)",
          ink: "var(--ink)",
        },
        accent: {
          DEFAULT: "var(--gold)",
          tint: "var(--gold-soft)",
          shade: "var(--gold-deep)",
          subtle: "rgba(176, 141, 87, 0.15)",
        },
        surface: {
          base: "var(--ivory)",
          warm: "var(--ivory)",
          muted: "var(--ivory-2)",
          dark: "var(--charcoal)",
          card: "var(--white)",
          glass: "rgba(246, 243, 236, 0.88)",
        },
      },
      fontFamily: {
        display: ["'Bricolage Grotesque Variable'", "'Bricolage Grotesque'", "-apple-system", "sans-serif"],
        sans: ["'Inter Variable'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        mono: ["'JetBrains Mono Variable'", "'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "fs-hero": "clamp(2.6rem, 6vw, 5.75rem)",
        "fs-h2": "clamp(2rem, 4vw, 3.5rem)",
        "fs-h3": "clamp(1.25rem, 2vw, 1.6rem)",
        "fs-body": "1.0625rem",
        "fs-small": "0.75rem",
      },
      borderRadius: {
        'card': '20px',
        'modal': '24px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -1px rgba(15, 16, 17, 0.06)',
        'soft-md': '0 8px 24px -4px rgba(15, 16, 17, 0.08)',
        'soft-lg': '0 16px 36px -6px rgba(15, 16, 17, 0.10)',
        'glass': '0 12px 32px -4px rgba(15, 16, 17, 0.12)',
        'gold-glow': '0 0 35px -5px rgba(176, 141, 87, 0.35)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring': 'cubic-bezier(0.34, 1.9, 0.45, 1)',
      },
      keyframes: {
        'wall-up': {
          'to': { transform: 'translateY(-50%)' }
        },
        'wall-down': {
          'from': { transform: 'translateY(-50%)' },
          'to': { transform: 'translateY(0%)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'spin-slow': 'spin-slow 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
};

export default config;
