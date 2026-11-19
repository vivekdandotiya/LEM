export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  company: string;
  service: string;
  role?: string;
  verified: boolean;
  source: string;
}

/**
 * Client Testimonials Data Store
 * In accordance with Lead Edge Marketing non-negotiable guidelines:
 * - Only verified reviews provided directly by the client in docs/CLIENT-CONTENT.md have verified: true.
 * - All other items are explicit, unverified placeholders with verified: false.
 * - When NEXT_PUBLIC_SHOW_SAMPLES is set to false, unverified items are automatically filtered out.
 */
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'sample-01',
    quote: 'Client feedback goes here. Replace with an approved quote.',
    name: 'Client Name',
    company: 'Company',
    service: 'Search Engine Optimization',
    role: 'Managing Director',
    verified: false,
    source: 'Sample feedback draft',
  },
  {
    id: 'sample-02',
    quote: 'Client feedback goes here. Replace with an approved quote.',
    name: 'Client Name',
    company: 'Company',
    service: 'Performance Marketing',
    role: 'Head of Growth',
    verified: false,
    source: 'Sample feedback draft',
  },
  {
    id: 'sample-03',
    quote: 'Client feedback goes here. Replace with an approved quote.',
    name: 'Client Name',
    company: 'Company',
    service: 'Social Media Strategy',
    role: 'Brand Lead',
    verified: false,
    source: 'Sample feedback draft',
  },
  {
    id: 'sample-04',
    quote: 'Client feedback goes here. Replace with an approved quote.',
    name: 'Client Name',
    company: 'Company',
    service: 'Web Development',
    role: 'Commercial Lead',
    verified: false,
    source: 'Sample feedback draft',
  },
];
