export interface ClientConfig {
  showPlaceholders: boolean;
  experienceClaimApproved: boolean;
  statsVerified: boolean;
  enableExtraServices: boolean;
  enableMarquee: boolean;
}

export const clientConfig: ClientConfig = {
  showPlaceholders: true, // Shows non-intrusive "PLACEHOLDER - REPLACE" indicators in dev
  experienceClaimApproved: false, // Pending client confirmation (CIR-02)
  statsVerified: false, // Pending client audited numbers (CIR-03)
  enableExtraServices: false, // Default 4 services; client may approve 6 (CIR-10)
  enableMarquee: false, // Marquee disabled until client provides approved logo assets
};

export const siteConfig = {
  name: "Lead Edge Marketing",
  shortName: "Lead Edge",
  tagline: "We Don't Just Generate Leads. We Create Momentum.",
  description:
    "Lead Edge Marketing is a premium digital marketing agency delivering strategic SEO, Meta Ads, social media creative, and high-performance web development.",
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
