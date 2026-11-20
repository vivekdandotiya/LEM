export interface ClientConfig {
  showPlaceholders: boolean;
  experienceClaimApproved: boolean;
  statsVerified: boolean;
  enableExtraServices: boolean;
  enableMarquee: boolean;
}

export const BRAND_NAME = "Lead Edge Marketers";
export const BRAND_NAME_DOC = "Lead Edge Marketers";

export const clientConfig: ClientConfig = {
  showPlaceholders: true, // Shows non-intrusive "PLACEHOLDER - REPLACE" indicators in dev
  experienceClaimApproved: false, // Pending client confirmation (CIR-02)
  statsVerified: false, // Pending client audited numbers (CIR-03)
  enableExtraServices: false, // Confirmed 4 core services in Google Doc (CIR-10)
  enableMarquee: false, // Marquee disabled until client provides approved logo assets
};

export const siteConfig = {
  name: BRAND_NAME,
  shortName: "Lead Edge",
  tagline: "We Don't Just Rank Websites. We Scale Revenue.",
  description:
    "Lead Edge Marketers is a premier digital growth studio delivering strategic SEO, PPC Services, social media marketing, and high-speed web development.",
  url: "https://leadedge.agency",
  ogImage: "/logo/lead-edge-logo.png",
  contact: {
    email: "hello@leadedge.agency",
    phone: "+44 (0) 20 7946 0921",
    address: "100 Bishopsgate, London EC2N 4AG",
    hours: "Monday – Friday: 09:00 – 18:00 GMT",
  },
  socials: [
    { name: "LinkedIn", href: "https://linkedin.com/company/lead-edge-marketing", label: "Connect on LinkedIn" },
    { name: "X (Twitter)", href: "https://x.com/leadedgeagency", label: "Follow on X" },
    { name: "Instagram", href: "https://instagram.com/leadedgeagency", label: "View on Instagram" },
  ],
};
