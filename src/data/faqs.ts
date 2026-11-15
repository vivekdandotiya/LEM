export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  source?: 'client-doc' | 'legacy';
}

export const homepageFAQs: FAQItem[] = [
  {
    id: "faq-01",
    question: "1. What digital marketing services does Lead Edge Marketers offer?",
    answer:
      "We provide a full suite of services including SEO, technical SEO, Google and Meta ads management, social media marketing, local SEO, and web development, all customized to match your business goals.",
    source: "client-doc",
  },
  {
    id: "faq-02",
    question: "2. How does Lead Edge Marketers align strategies with my specific business goals?",
    answer:
      "We start by learning about your target audience, industry, and revenue goals, then build a custom digital marketing strategy designed specifically for your brand's growth.",
    source: "client-doc",
  },
  {
    id: "faq-03",
    question: "3. Does Lead Edge Marketers require long-term contracts?",
    answer:
      "No, we believe in earning your partnership every month through real results rather than locking you into rigid, long-term contracts.",
    source: "client-doc",
  },
  {
    id: "faq-04",
    question: "4. How will I receive updates on my campaigns' performance?",
    answer:
      "You will get clear, transparent regular reports and direct updates from our team tracking your traffic growth, rankings, and overall return on investment.",
    source: "client-doc",
  },
  {
    id: "faq-05",
    question: "5. Does Lead Edge Marketers work with businesses of all sizes and industries?",
    answer:
      "Yes, we partner with businesses of all sizes—from local startups to growing e-commerce brands across various industries to scale their online presence.",
    source: "client-doc",
  },
  {
    id: "faq-06",
    question: "6. How quickly can I expect to see results from digital marketing?",
    answer:
      "Paid advertising can drive leads almost immediately, while organic SEO and content strategies typically show noticeable growth and rankings within 3 to 6 months.",
    source: "client-doc",
  },
  {
    id: "faq-07",
    question: "7. What makes Lead Edge Marketers different from other digital marketing agencies?",
    answer:
      "We focus purely on measurable revenue growth and momentum rather than vanity metrics, offering dedicated support, transparent reporting, and proven white-hat strategies.",
    source: "client-doc",
  },
];
