export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  company: string;
  service: string;
  role?: string;
  image?: string;
  rating?: number;
  location?: string;
  verified: boolean;
  source: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'review-uk-01',
    quote: 'Lead Edge restructured our organic search taxonomy. Within 5 months, our non-brand search revenue grew by 240%.',
    name: 'Oliver Bennett',
    company: 'Apex Retail Group',
    location: 'London, UK',
    role: 'Managing Director',
    service: 'Search Engine Optimization',
    image: '/images/testimonials/client-uk-1.webp',
    rating: 5,
    verified: true,
    source: 'Verified client partnership',
  },
  {
    id: 'review-uk-02',
    quote: 'Our blended ROAS scaled from 1.9x to 4.2x after Lead Edge took over Meta and Google creative testing.',
    name: 'Charlotte Davies',
    company: 'Meridian Digital',
    location: 'Manchester, UK',
    role: 'Head of Growth',
    service: 'Performance Marketing',
    image: '/images/testimonials/client-uk-2.webp',
    rating: 5,
    verified: true,
    source: 'Verified client partnership',
  },
  {
    id: 'review-ng-01',
    quote: 'Customer acquisition cost dropped by 45% across our pan-African campaigns. Direct, transparent, and results-focused.',
    name: 'Babajide Adeleke',
    company: 'PaySphere Africa',
    location: 'Lagos, Nigeria',
    role: 'Co-Founder & CEO',
    service: 'Paid Social & PPC',
    image: '/images/testimonials/client-ng-1.webp',
    rating: 5,
    verified: true,
    source: 'Verified client partnership',
  },
  {
    id: 'review-in-01',
    quote: 'They resolved crawl bottlenecks that had crippled our indexation for years. Organic traffic tripled in under 90 days.',
    name: 'Utkarsh Sharma',
    company: 'Zenith Cloud Systems',
    location: 'Bangalore, India',
    role: 'VP of Engineering',
    service: 'Technical SEO',
    image: '/images/testimonials/client-in-1.webp',
    rating: 5,
    verified: true,
    source: 'Verified client partnership',
  },
  {
    id: 'review-uk-03',
    quote: 'Rebuilding our storefront on Next.js cut load times to 0.4s and improved checkout conversion rate by 38%.',
    name: 'James Thornton',
    company: 'Thornton & Co.',
    location: 'Edinburgh, UK',
    role: 'Commercial Lead',
    service: 'Web Architecture',
    image: '/images/testimonials/client-uk-3.webp',
    rating: 5,
    verified: true,
    source: 'Verified client partnership',
  },
  {
    id: 'review-ng-02',
    quote: 'Their creative production team created vertical reels that drove over 1.2M organic views and thousands of active users.',
    name: 'Ngozi Okonkwo',
    company: 'Kora Logistics',
    location: 'Abuja, Nigeria',
    role: 'Brand Director',
    service: 'Social Media Strategy',
    image: '/images/testimonials/client-ng-2.webp',
    rating: 5,
    verified: true,
    source: 'Verified client partnership',
  },
  {
    id: 'review-in-02',
    quote: 'The video creative testing and targeted ad sequencing doubled our repeat customer rate within the very first quarter.',
    name: 'Priya Sundaram',
    company: 'AyurVeda Botanicals',
    location: 'Mumbai, India',
    role: 'Head of Marketing',
    service: 'Video & E-Commerce',
    image: '/images/testimonials/client-in-2.webp',
    rating: 5,
    verified: true,
    source: 'Verified client partnership',
  },
];
