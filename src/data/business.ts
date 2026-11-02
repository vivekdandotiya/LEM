/**
 * Lead Edge Marketing — Brand & Business Source of Truth
 * Section 1 of V3 Design Overhaul Specification
 */

export interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string;
  slug: string;
  headline: string;
  tagline: string;
  description: string;
  icon: string;
  label: string;
}

export interface ProcessStep {
  step: string;
  name: string;
  desc: string;
}

export interface BusinessData {
  name: string;
  shortName: string;
  type: string;
  tagline: string;
  promise: string;
  supportLine: string;
  services: ServiceItem[];
  audience: string;
  differentiators: string[];
  process: ProcessStep[];
  ctas: {
    primary: string;
    secondary: string;
  };
}

export const business: BusinessData = {
  name: "Lead Edge Marketing",
  shortName: "Lead Edge",
  type: "Digital growth studio",
  tagline: "Creative, ads, search and web under one roof.",
  promise: "We don't just generate leads. We create momentum.",
  supportLine: "Creative, ads, search and web that move ambitious businesses forward.",
  services: [
    {
      id: "seo",
      title: "Search Engine Optimisation",
      shortTitle: "SEO",
      slug: "seo",
      headline: "Be the answer when they search.",
      tagline: "Organic visibility engineered for sustained commercial discovery.",
      description: "Search architecture that turns queries into steady, high-intent customer acquisition.",
      icon: "Search",
      label: "01 / SEO",
    },
    {
      id: "meta-ads",
      title: "Meta Advertising",
      shortTitle: "Meta Ads",
      slug: "meta-ads",
      headline: "Ads people stop scrolling for.",
      tagline: "High-converting ad creative paired with algorithmic audience architecture.",
      description: "Paid social campaigns built to break through fatigue and drive profitable customer volume.",
      icon: "Target",
      label: "02 / ADS",
    },
    {
      id: "social-media",
      title: "Social Media Marketing",
      shortTitle: "Social Media",
      slug: "social-media",
      headline: "Content with a pulse.",
      tagline: "Editorial social presence that turns passive followers into active brand advocates.",
      description: "Social storytelling that builds authentic community trust and compounding brand equity.",
      icon: "Share2",
      label: "03 / SOCIAL",
    },
    {
      id: "web-development",
      title: "Web Development",
      shortTitle: "Web Dev",
      slug: "web-development",
      headline: "Sites built to convert.",
      tagline: "Ultra-fast, editorial web experiences engineered for sub-second speeds and maximum conversion.",
      description: "Bespoke digital architecture that turns incoming traffic into qualified customer inquiries.",
      icon: "Code",
      label: "04 / WEB",
    },
  ],
  audience:
    "Ambitious small and mid-size businesses, D2C and e-commerce brands, local service businesses and startups that want steady, trackable enquiries instead of random posting.",
  differentiators: [
    "Every channel pulls the same way",
    "Creative that is built to perform",
    "Websites built to turn visits into enquiries",
    "Plain-English reporting",
  ],
  process: [
    {
      step: "01",
      name: "Discover",
      desc: "Audit existing assets, analyze audience friction, define commercial growth thesis.",
    },
    {
      step: "02",
      name: "Plan",
      desc: "Design creative architecture, media allocation models, and technical roadmap.",
    },
    {
      step: "03",
      name: "Execute",
      desc: "Deploy high-converting campaigns, conversion-focused web builds, and editorial assets.",
    },
    {
      step: "04",
      name: "Scale",
      desc: "Optimize unit economics, amplify winning creative angles, compound market momentum.",
    },
  ],
  ctas: {
    primary: "Start a project",
    secondary: "See the work",
  },
};
