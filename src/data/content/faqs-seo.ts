export interface ServiceFAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const seoFAQs: ServiceFAQItem[] = [
  {
    id: 'seo-1',
    question: '1. What do SEO services include?',
    answer:
      'Lead Edge Marketers provides technical SEO audits, keyword research, on-page optimization, backlink building, and local SEO services. We structure your site to earn high search rankings and drive consistent organic traffic.',
  },
  {
    id: 'seo-2',
    question: '2. How long does SEO take to work?',
    answer:
      'Professional SEO is a long-term campaign that typically delivers noticeable keyword ranking gains and traffic growth within 3 to 6 months. Initial technical site fixes provide early traction, but lasting search engine authority builds over time.',
  },
  {
    id: 'seo-3',
    question: '3. Which SEO metrics do you report on?',
    answer:
      'We track transparent, revenue-driving KPIs including organic keyword rankings, monthly organic traffic growth, domain authority, click-through rates (CTR), conversion rates, and total leads generated. You receive detailed monthly reports demonstrating clear campaign ROI.',
  },
  {
    id: 'seo-4',
    question: '4. What is the difference between an SEO agency and an SEO consultant?',
    answer:
      'An SEO consultant primarily provides strategic advice, site audits, and recommendations for your internal team to execute. Lead Edge Marketers operates as a full-service SEO agency, handling strategy, technical fixes, content creation, and ongoing optimization from start to finish.',
  },
];
