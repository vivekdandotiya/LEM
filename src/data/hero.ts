export interface HeroHeadline {
  id: string;
  prefix: string;
  italicWord: string;
  enabled: boolean;
  source: 'client-doc' | 'legacy';
}

export interface HeroData {
  eyebrow: string;
  headlines: HeroHeadline[];
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  intervalMs: number;
}

export const HERO_DATA: HeroData = {
  eyebrow: "DIGITAL GROWTH STUDIO // CREATIVE • ADS • SEARCH • WEB",
  headlines: [
    {
      id: "suggestion-a",
      prefix: "WE DON'T JUST RANK WEBSITES. WE SCALE",
      italicWord: "revenue",
      enabled: true,
      source: "client-doc",
    },
    {
      id: "suggestion-b",
      prefix: "WE DON'T JUST DRIVE TRAFFIC. WE BUILD",
      italicWord: "authority.",
      enabled: true,
      source: "client-doc",
    },
    {
      id: "legacy",
      prefix: "WE DON'T JUST GENERATE LEADS. WE CREATE",
      italicWord: "momentum.",
      enabled: false,
      source: "legacy",
    },
  ],
  subheadline:
    "We don't just generate leads. We create momentum. Creative, ads, search, and bespoke web engineering under one roof.",
  primaryCta: {
    label: "Start a project →",
    href: "/contact",
  },
  secondaryCta: {
    label: "See the work",
    href: "/#concept-work",
  },
  intervalMs: 6000,
};
