/**
 * Lead Edge Marketing — Brand & Business Source of Truth
 * Updated to Client Source of Truth (Google Doc V5)
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
      title: "Search Engine Optimization",
      shortTitle: "SEO",
      slug: "seo",
      headline: "Be the answer when buyers search",
      tagline: "Dominate search engine rankings and capture high-intent organic traffic.",
      description: "Search architecture that turns queries into steady, high-intent customer acquisition.",
      icon: "Search",
      label: "01 / SEO",
    },
    {
      id: "ppc",
      title: "PPC Services",
      shortTitle: "PPC Services",
      slug: "ppc",
      headline: "Targeted Facebook & Instagram ads engineered to drive instant leads and max ROAS.",
      tagline: "Targeted Facebook & Instagram ads engineered to drive instant leads and max ROAS.",
      description: "Targeted Facebook & Instagram ads engineered to drive instant leads and max ROAS.",
      icon: "Target",
      label: "02 / PPC",
    },
    {
      id: "social-media",
      title: "Social Media Services",
      shortTitle: "Social Media",
      slug: "social-media",
      headline: "Content built to build loyal brand communities.",
      tagline: "Scale your brand reach with Lead Edge Marketers.",
      description: "We craft targeted social media marketing campaigns that drive engagement, build authority, and generate high-converting leads across all platforms.",
      icon: "Share2",
      label: "03 / SOCIAL",
    },
    {
      id: "web-development",
      title: "Web Development",
      shortTitle: "Web Dev",
      slug: "web-development",
      headline: "High-speed sites engineered to turn clicks into clients.",
      tagline: "Build high-converting, lightning-fast websites with Lead Edge Marketers.",
      description: "Our SEO-first web development creates sub-second speed sites engineered to capture search traffic and scale revenue.",
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
