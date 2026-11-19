import { ServiceFAQItem } from './faqs-seo';

export const webDevFAQs: ServiceFAQItem[] = [
  {
    id: 'web-1',
    question: 'What technology stack do you build websites with?',
    answer:
      'We primarily build with Next.js, React, TypeScript, and Tailwind CSS, backed by headless CMS platforms or modern serverless edge architecture.',
  },
  {
    id: 'web-2',
    question: 'Can our internal team easily update text and blog posts after launch?',
    answer:
      'Yes. We configure intuitive content management systems so your team can publish articles, update case studies, and modify copy without writing code.',
  },
  {
    id: 'web-3',
    question: 'How do you ensure the website is fast on mobile devices?',
    answer:
      'We employ modern image formats (AVIF/WebP), responsive image srcsets, code splitting, minimal JavaScript execution, and strict font metrics optimization.',
  },
];
