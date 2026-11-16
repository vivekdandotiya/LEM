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
  eyebrow: "DIGITAL GROWTH STUDIO // SEARCH • MEDIA • WEB",
  headlines: [
    {
      id: "suggestion-a",
      prefix: "WE DON'T JUST RANK WEBSITES. WE SCALE",
      italicWord: "revenue.",
      enabled: true,
      source: "client-doc",
    },
    {
      id: "suggestion-b",
      prefix: "STOP WASTING MONEY ON ADS THAT DON'T",
      italicWord: "convert.",
      enabled: true,
      source: "client-doc",
    },
  ],
  subheadline:
    "Full-funnel digital growth unifying organic search, performance media, and engineered web.",
  primaryCta: {
    label: "Book Strategy Call →",
    href: "/contact",
  },
  secondaryCta: {
    label: "Explore Our Work",
    href: "/#work-showcase",
  },
  intervalMs: 6000,
};
