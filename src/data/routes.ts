/**
 * Single Source of Truth for all Application Routes and SEO Indexing Rules.
 * V9 F6: Sitemap & Robots Configuration
 */

export interface AppRoute {
  path: string;
  indexable: boolean;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified: string;
  title?: string;
  description?: string;
}

/**
 * Resolve the canonical base URL based on environment configuration.
 * Production domain: https://leadedge.agency (or NEXT_PUBLIC_SITE_URL if configured)
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, '')}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, '')}`;
  }
  return 'https://leadedge.agency';
}

/**
 * Determine if current environment is preview / staging.
 */
export function isPreviewDeployment(): boolean {
  return (
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NEXT_PUBLIC_BLOCK_INDEXING === 'true' ||
    Boolean(process.env.NEXT_PUBLIC_PREVIEW_URL)
  );
}

const LAST_MODIFIED_DATE = '2026-11-19T00:00:00.000Z';

export const APP_ROUTES: AppRoute[] = [
  // Core Top-Level Pages
  {
    path: '/',
    indexable: true,
    priority: 1.0,
    changeFrequency: 'weekly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Lead Edge Marketing — Digital Growth Studio',
  },
  {
    path: '/about',
    indexable: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'About Us — Lead Edge Marketing',
  },
  {
    path: '/services',
    indexable: true,
    priority: 0.9,
    changeFrequency: 'weekly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Services & Growth Disciplines — Lead Edge Marketing',
  },
  {
    path: '/contact',
    indexable: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Contact Our Growth Studio — Lead Edge Marketing',
  },

  // Service Detail Pages
  {
    path: '/services/seo',
    indexable: true,
    priority: 0.85,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Search Engine Optimization (SEO) — Lead Edge Marketing',
  },
  {
    path: '/services/ppc',
    indexable: true,
    priority: 0.85,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'PPC Services & Paid Search — Lead Edge Marketing',
  },
  {
    path: '/services/social-media',
    indexable: true,
    priority: 0.85,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Social Media Marketing — Lead Edge Marketing',
  },
  {
    path: '/services/web-development',
    indexable: true,
    priority: 0.85,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Custom Web Development — Lead Edge Marketing',
  },
  {
    path: '/services/video-photo',
    indexable: true,
    priority: 0.85,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Video & Photography Production — Lead Edge Marketing',
  },

  // Blog Hub & Articles
  {
    path: '/blog',
    indexable: true,
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Perspectives & Industry Insights — Lead Edge Marketing',
  },
  {
    path: '/blog/modern-organic-search-architecture',
    indexable: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Modern Organic Search Architecture — Lead Edge Marketing',
  },
  {
    path: '/blog/meta-creative-diversity-strategy',
    indexable: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Meta Creative Diversity Strategy — Lead Edge Marketing',
  },
  {
    path: '/blog/editorial-social-brand-equity',
    indexable: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Editorial Social & Brand Equity — Lead Edge Marketing',
  },
  {
    path: '/blog/engineering-performance-first-web-experiences',
    indexable: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: LAST_MODIFIED_DATE,
    title: 'Engineering Performance-First Web Experiences — Lead Edge Marketing',
  },

  // Non-Indexable Internal Endpoints
  {
    path: '/api/contact',
    indexable: false,
    priority: 0.0,
    changeFrequency: 'never',
    lastModified: LAST_MODIFIED_DATE,
  },
];

export function getIndexableRoutes(): AppRoute[] {
  return APP_ROUTES.filter((route) => route.indexable);
}
