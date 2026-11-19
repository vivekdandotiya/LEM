/**
 * SOCIAL MEDIA SERVICES CONTENT MODULE
 * 
 * STATUS: AWAITING REVISED CONTENT FROM CLIENT (CIR-16 / Feedback Instruction 3)
 * 
 * HOW TO UPDATE WHEN CLIENT SENDS CONTENT:
 * 1. Open this file (src/data/content/social-media.ts).
 * 2. Paste the revised headlines, descriptions, deliverables, features, and process steps into their respective fields.
 * 3. Set `status.awaitingClientContent = false`.
 * 4. Run `npm run check` and `npm run build` to verify formatting.
 * 5. See `docs/HOW-TO-UPDATE-SOCIAL-MEDIA.md` for a complete step-by-step walkthrough.
 */

export interface SocialMediaContent {
  status: {
    awaitingClientContent: boolean;
    sourceDocument: string;
    note: string;
    lastUpdated: string;
  };
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    headline: string;
    tagline: string;
    shortDescription: string;
    fullDescription: string;
  };
  deliverables: string[];
  features: Array<{
    title: string;
    description: string;
  }>;
  processSteps: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export const socialMediaContent: SocialMediaContent = {
  status: {
    awaitingClientContent: true,
    sourceDocument: 'Waiting for revised document from client as noted in Website Suggestions | Lead Edge Marketing (Item 3)',
    note: 'The current content serves as an active placeholder until the client provides the revised copy.',
    lastUpdated: '2026-11-19',
  },

  meta: {
    title: 'Social Media Marketing — Lead Edge Marketing',
    description:
      'We craft targeted social media marketing campaigns that drive engagement, build authority, and generate high-converting leads across all platforms.',
  },

  hero: {
    badge: '03 // SOCIAL MEDIA SERVICES',
    headline: 'CULTIVATE AN ENGAGED AUDIENCE THAT ADVOCATES FOR YOUR BRAND.',
    tagline: 'Content built to build loyal brand communities.',
    shortDescription:
      'Scale your brand reach with Lead Edge Marketers. We craft targeted social media marketing campaigns that drive engagement, build authority, and generate high-converting leads across all platforms.',
    fullDescription:
      'Scale your brand reach with Lead Edge Marketers. We craft targeted social media marketing campaigns that drive engagement, build authority, and generate high-converting leads across all platforms.',
  },

  deliverables: [
    'Editorial Content Calendars',
    'High-Retention Vertical Video',
    'Distinct Brand Voice',
    'Proactive Community Care',
    'Organic Demand Attribution',
  ],

  features: [
    {
      title: 'Editorial Brand Aesthetic',
      description:
        'Curating an elevated, cohesive visual feed that commands respect, reinforces credibility, and aligns with your luxury or corporate identity.',
    },
    {
      title: 'Short-Form Video Mastery',
      description:
        'Producing trend-aware, high-retention vertical reels designed to capture organic algorithmic distribution across modern social feeds.',
    },
    {
      title: 'Authentic Community Engagement',
      description:
        'Active community stewardship, initiating thoughtful discussions with industry peers and responding to prospect inquiries promptly.',
    },
    {
      title: 'Influence & Partnership Mapping',
      description:
        'Identifying aligned industry creators and collaborators to organically amplify brand reach without compromising brand tone.',
    },
  ],

  processSteps: [
    {
      number: '01',
      title: 'Brand Voice & Visual Pillar Workshop',
      description:
        'We define your social aesthetic pillars, core messaging themes, audience personas, and content tonality.',
    },
    {
      number: '02',
      title: 'Monthly Content Batching & Pre-Approvals',
      description:
        'We produce copy, carousels, and video concepts one month in advance via a frictionless client preview portal.',
    },
    {
      number: '03',
      title: 'Publishing, Story Management & Community Care',
      description:
        'We handle timed publishing across peak engagement windows, real-time comment moderation, and story interaction.',
    },
    {
      number: '04',
      title: 'Analytics Review & Format Refinement',
      description:
        'We analyze saves, shares, and watch time to double down on formats generating the highest organic traction.',
    },
  ],
};
