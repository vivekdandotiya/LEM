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
        lime: {
          DEFAULT: "var(--lime)",
          soft: "var(--lime-soft)",
          ink: "var(--lime-ink)",
        },
        paper: {
          DEFAULT: "var(--paper)",
          2: "var(--paper-2)",
        },
        ink: {
          DEFAULT: "var(--ink)",
        },
        charcoal: {
          DEFAULT: "var(--charcoal)",
          950: "#080A0B",
          900: "#101214",
          850: "#17191B",
          800: "#222528",
          700: "#363A3E",
          600: "#505459",
          500: "#6E6B63",
        },
        grey: {
          1: "var(--grey-1)",
          2: "var(--grey-2)",
          3: "var(--grey-3)",
        },
        bronze: {
          DEFAULT: "var(--bronze)",
        },
        accent: {
          DEFAULT: "var(--lime)",
          tint: "var(--lime-soft)",
          shade: "var(--lime-ink)",
          subtle: "rgba(201, 245, 61, 0.15)",
        },
        surface: {
          base: "var(--paper)",
          warm: "var(--paper)",
          muted: "var(--paper-2)",
          dark: "var(--ink)",
          card: "var(--paper-2)",
          glass: "rgba(238, 235, 227, 0.85)",
        },
        warmgray: {
          50: "#FAF8F5",
          100: "#F6F4EE",
          200: "#EEEBE3",
          300: "#D9D5CB",
          400: "#A8A499",
          500: "#6E6B63",
          600: "#4A4740",
          700: "#24221D",
        },
      },
      fontFamily: {
        display: ["'Bricolage Grotesque Variable'", "'Bricolage Grotesque'", "-apple-system", "sans-serif"],
        sans: ["'Inter Variable'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        mono: ["'JetBrains Mono Variable'", "'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "fs-mega": "clamp(3.4rem, 11.5vw, 13rem)",
        "fs-xl": "clamp(2.6rem, 7vw, 7rem)",
        "fs-lg": "clamp(2rem, 4.6vw, 4.5rem)",
        "fs-md": "clamp(1.35rem, 2.2vw, 2rem)",
        "fs-body": "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
        "fs-label": "0.75rem",
        "display-hero": "clamp(3.4rem, 11.5vw, 13rem)",
        "display-1": "clamp(2.6rem, 7vw, 7rem)",
        "display-2": "clamp(2rem, 4.6vw, 4.5rem)",
        "display-3": "clamp(1.35rem, 2.2vw, 2rem)",
      },
      borderRadius: {
        'card': '24px',
        'modal': '28px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft-sm': '0 4px 16px -2px rgba(8, 10, 11, 0.10), 0 1px 3px -1px rgba(8, 10, 11, 0.06)',
        'soft-md': '0 12px 32px -4px rgba(8, 10, 11, 0.15), 0 4px 10px -2px rgba(8, 10, 11, 0.08)',
        'soft-lg': '0 24px 50px -8px rgba(8, 10, 11, 0.22), 0 8px 18px -4px rgba(8, 10, 11, 0.12)',
        'glass': '0 16px 40px -8px rgba(8, 10, 11, 0.24)',
        'lime-glow': '0 0 35px -5px rgba(201, 245, 61, 0.4)',
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
