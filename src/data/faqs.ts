export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const homepageFAQs: FAQItem[] = [
  {
    id: "faq-01",
    question: "What makes Lead Edge Marketing different from conventional marketing agencies?",
    answer:
      "We pair minimalist, editorial brand craft with rigorous technical engineering. Rather than relying on generic templates or vanity metrics, we focus exclusively on commercial outcomes: compounding organic search authority, unit-profitable paid acquisition, and custom web experiences engineered for high conversion.",
  },
  {
    id: "faq-02",
    question: "How do you structure project timelines and onboarding?",
    answer:
      "Every engagement begins with our Discover phase—a thorough 2-week technical and brand audit where we diagnose bottlenecks, verify tracking infrastructure, and map 90-day growth milestones. Campaign execution or development sprints begin immediately following discovery approval.",
  },
  {
    id: "faq-03",
    question: "What is your pricing approach?",
    answer:
      "Our pricing is tied strictly to the scope of work and technical depth required. Web development and digital design are typically structured as fixed-scope project milestones. Ongoing SEO, Meta Ads, and social media creative are delivered under transparent monthly retainers with clear deliverables and no hidden fees.",
  },
  {
    id: "faq-04",
    question: "Do you require long-term lock-in contracts?",
    answer:
      "We believe retention should be earned through consistent performance. For retainer services, we operate with an initial 90-day momentum commitment (to allow search algorithms and ad learning phases to mature), transitioning to flexible 30-day rolling terms thereafter.",
  },
  {
    id: "faq-05",
    question: "Who will actually work on our account?",
    answer:
      "You work directly with senior practitioners—strategists, senior designers, and technical developers—not junior account coordinators. Communication is direct, transparent, and structured around regular sprint updates.",
  },
  {
    id: "faq-06",
    question: "How do you handle reporting and communication?",
    answer:
      "Clients have 24/7 access to live, custom dashboards aggregating Google Search Console, Meta Ads Manager, and web analytics. In addition, we deliver bi-weekly executive summaries and monthly strategic review calls.",
  },
  {
    id: "faq-07",
    question: "How do we get started?",
    answer:
      "Submit an inquiry through our contact form with brief details regarding your business and objectives. We review submissions within 24 business hours and schedule an introductory discovery conversation to evaluate mutual fit.",
  },
];
