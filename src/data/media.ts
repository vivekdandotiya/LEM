/**
 * Lead Edge Marketing — Central Media & Asset Catalog (V8)
 *
 * Single source of truth for all image and video asset paths.
 * Components must import from this file and never hard-code strings.
 */

export interface ResponsiveImage {
  src: string;
  avifSrcSet: string;
  webpSrcSet: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: '16:9' | '4:5' | '9:16' | '1:1' | '3:4' | '16:10';
}

export interface VideoAsset {
  mp4: string;
  webm: string;
  mobile: string;
  poster: ResponsiveImage;
  title: string;
  duration?: number;
}

export interface ShowcaseCard {
  id: string;
  type: 'video' | 'photo';
  title: string;
  category: string;
  isConcept: boolean;
  image?: ResponsiveImage;
  video?: VideoAsset;
}

export interface ServiceStepMedia {
  number: string;
  title: string;
  image: ResponsiveImage;
  video?: VideoAsset;
}

// -------------------------------------------------------------
// Helper: Create Responsive Image Object
// -------------------------------------------------------------
function makeResponsiveImage(
  basePath: string,
  alt: string,
  aspectRatio: ResponsiveImage['aspectRatio'],
  isHero = false,
  customWidths?: number[]
): ResponsiveImage {
  const widths = customWidths || (isHero ? [3840, 2560, 1920, 1280, 768, 480] : [2560, 1920, 1280, 768, 480]);
  const avifSrcSet = widths.map((w) => `${basePath}-${w}w.avif ${w}w`).join(', ');
  const webpSrcSet = widths.map((w) => `${basePath}-${w}w.webp ${w}w`).join(', ');

  let width = 1920;
  let height = 1080;
  if (aspectRatio === '4:5') {
    width = 1536;
    height = 1920;
  } else if (aspectRatio === '9:16') {
    width = 1080;
    height = 1920;
  } else if (aspectRatio === '1:1') {
    width = 1600;
    height = 1600;
  } else if (aspectRatio === '3:4') {
    width = 1440;
    height = 1920;
  } else if (aspectRatio === '16:10') {
    width = 1920;
    height = 1200;
  }

  return {
    src: `${basePath}.webp`,
    avifSrcSet,
    webpSrcSet,
    alt,
    width,
    height,
    aspectRatio,
  };
}

// -------------------------------------------------------------
// Helper: Create Video Asset Object
// -------------------------------------------------------------
function makeVideoAsset(
  basePath: string,
  posterPath: string,
  title: string,
  aspectRatio: ResponsiveImage['aspectRatio'] = '16:9',
  duration = 8
): VideoAsset {
  return {
    mp4: `${basePath}.mp4`,
    webm: `${basePath}.webm`,
    mobile: `${basePath}-720p.mp4`,
    poster: makeResponsiveImage(posterPath, `${title} video poster`, aspectRatio, true, [1280, 768]),
    title,
    duration,
  };
}

// =============================================================
// Central Media Catalog
// =============================================================
export const media = {
  // Brand Assets
  brand: {
    logo: '/logo/lead-edge-logo.png',
    logoDark: '/logo/lead-edge-logo-dark.png',
    favicon: '/favicon.ico',
  },

  // Home Page
  home: {
    // 8 Showcase cards: 4 Videos + 4 Photos (all labeled Concept)
    showcase: [
      {
        id: 'showcase-01',
        type: 'video',
        title: 'Botanical Organic Ritual',
        category: 'BOTANICAL D2C',
        isConcept: true,
        video: makeVideoAsset(
          '/videos/home/showcase-01-product-ad',
          '/videos/home/showcase-01-product-ad-poster',
          'Botanical Organic Ritual',
          '4:5',
          7
        ),
      },
      {
        id: 'showcase-02',
        type: 'video',
        title: 'Cinema Prime Perspective',
        category: 'CREATIVE PRODUCTION',
        isConcept: true,
        video: makeVideoAsset(
          '/videos/home/showcase-02-social-reel',
          '/videos/home/showcase-02-social-reel-poster',
          'Cinema Prime Perspective',
          '4:5',
          7
        ),
      },
      {
        id: 'showcase-03',
        type: 'video',
        title: 'Modern Architectural Commerce',
        category: 'WEB ARCHITECTURE',
        isConcept: true,
        video: makeVideoAsset(
          '/videos/home/showcase-03-web-scroll',
          '/videos/home/showcase-03-web-scroll-poster',
          'Modern Architectural Commerce',
          '4:5',
          7
        ),
      },
      {
        id: 'showcase-04',
        type: 'video',
        title: 'Studio Lighting Direction',
        category: 'VIDEO & PHOTO',
        isConcept: true,
        video: makeVideoAsset(
          '/videos/home/showcase-04-behind-the-scenes',
          '/videos/home/showcase-04-behind-the-scenes-poster',
          'Studio Lighting Direction',
          '4:5',
          7
        ),
      },
      {
        id: 'showcase-05',
        type: 'photo',
        title: 'Hillcrest Luxury Residences',
        category: 'LUXURY REAL ESTATE',
        isConcept: true,
        image: makeResponsiveImage(
          '/images/home/showcase-05-luxury-residence',
          'Modern monolithic architecture at dusk with warm interior lighting',
          '4:5'
        ),
      },
      {
        id: 'showcase-06',
        type: 'photo',
        title: 'Greenleaf Botanical Skincare',
        category: 'ORGANIC D2C',
        isConcept: true,
        image: makeResponsiveImage(
          '/images/home/showcase-06-botanical-brand',
          'Minimalist organic botanical serum bottle on textured stone in natural light',
          '4:5'
        ),
      },
      {
        id: 'showcase-07',
        type: 'photo',
        title: 'Oak & Thread Editorial',
        category: 'TEXTILE & APPAREL',
        isConcept: true,
        image: makeResponsiveImage(
          '/images/home/showcase-07-apparel-editorial',
          'Tactile wool and linen apparel editorial photograph in warm morning sun',
          '4:5'
        ),
      },
      {
        id: 'showcase-08',
        type: 'photo',
        title: 'Ember Artisanal Roasters',
        category: 'HOSPITALITY',
        isConcept: true,
        image: makeResponsiveImage(
          '/images/home/showcase-08-roaster-coffee',
          'Artisanal single-origin coffee beans and ceramic cup in moody warm light',
          '4:5'
        ),
      },
    ] as ShowcaseCard[],

    // Services teaser: 5 circle photos (1:1)
    servicesTeaser: [
      {
        slug: 'seo',
        title: 'Search Engine Optimization',
        image: makeResponsiveImage('/images/home/service-seo', 'SEO search visibility analytics screen', '1:1'),
      },
      {
        slug: 'ppc',
        title: 'PPC Services',
        image: makeResponsiveImage('/images/home/service-meta', 'Dynamic golden motion ad visual', '1:1'),
      },
      {
        slug: 'social-media',
        title: 'Social Media Services',
        image: makeResponsiveImage('/images/home/service-social', 'Warm editorial social portrait', '1:1'),
      },
      {
        slug: 'web-development',
        title: 'Web Development',
        image: makeResponsiveImage('/images/home/service-web', 'Technology engineering workstation', '1:1'),
      },
      {
        slug: 'video-photo',
        title: 'Video Editing & Photo Creation',
        image: makeResponsiveImage(
          '/images/services/video-photo/video-photo-circle',
          'High-end cinema prime lens with warm gold reflection',
          '1:1'
        ),
      },
    ],
  },

  // About Page
  about: {
    heroVideo: makeVideoAsset(
      '/videos/about/about-hero',
      '/videos/about/about-hero-poster',
      'Lead Edge Agency Studio',
      '16:9',
      10
    ),
    heroStill: makeResponsiveImage(
      '/images/about/about-hero',
      'Bright modern creative agency office with large factory windows',
      '16:9',
      true
    ),
    teamPhotos: [
      makeResponsiveImage(
        '/images/about/about-team-table',
        'Agency strategy workspace table with laptops, notebooks, coffee in daylight',
        '4:5'
      ),
      makeResponsiveImage(
        '/images/about/about-team-whiteboard',
        'Hands sketching architecture flows on glass whiteboard with markers',
        '4:5'
      ),
      makeResponsiveImage(
        '/images/about/about-team-meeting',
        'Minimalist agency boardroom with floor-to-ceiling glass and oak table',
        '4:5'
      ),
      makeResponsiveImage(
        '/images/about/about-team-creative',
        'Creative desk with mirrorless camera, prime lens, linen notebook, espresso cup',
        '4:5'
      ),
    ],
  },

  // Services Overview Page (/services)
  services: {
    // 3D Cylinder gallery: 6 portrait photos (3:4)
    cylinder: [
      makeResponsiveImage('/images/pages/P02-services-seo-audit-4x5', 'SEO technical crawl audit', '3:4', true),
      makeResponsiveImage('/images/pages/P04-services-meta-creative-4x5', 'Meta Ads creative testing matrix', '3:4', true),
      makeResponsiveImage('/images/pages/P06-services-social-calendar-4x5', 'Social media editorial calendar', '3:4', true),
      makeResponsiveImage('/images/pages/P08-services-web-devices-16x9', 'Web development multi-device layout', '3:4', true),
      makeResponsiveImage(
        '/images/services/video-photo/video-photo-cylinder',
        'Cinematic camera rig and prime lens in portrait orientation',
        '3:4',
        true
      ),
      makeResponsiveImage(
        '/images/services/cylinder-strategy-session',
        'Executive digital strategy sprint in warm architectural boardroom',
        '3:4',
        true
      ),
    ],

    // 5 Service Rows (alternating left/right circle photo)
    rows: [
      {
        slug: 'seo',
        title: 'Search Engine Optimization',
        image: makeResponsiveImage('/images/home/service-seo', 'SEO search visibility analysis', '1:1'),
      },
      {
        slug: 'ppc',
        title: 'PPC Services',
        image: makeResponsiveImage('/images/home/service-meta', 'Dynamic ad performance graphic', '1:1'),
      },
      {
        slug: 'social-media',
        title: 'Social Media Services',
        image: makeResponsiveImage('/images/home/service-social', 'Editorial short-form creative', '1:1'),
      },
      {
        slug: 'web-development',
        title: 'Web Development',
        image: makeResponsiveImage('/images/home/service-web', 'Next.js application workspace', '1:1'),
      },
      {
        slug: 'video-photo',
        title: 'Video Editing & Photo Creation',
        image: makeResponsiveImage(
          '/images/services/video-photo/video-photo-circle',
          'Cinema prime lens with gold reflection',
          '1:1'
        ),
      },
    ],
  },

  // Service Detail Pages
  servicePages: {
    seo: {
      heroVideo: makeVideoAsset(
        '/videos/services/seo-phase-0',
        '/videos/services/seo-phase-0-poster',
        'SEO Intelligence Platform',
        '16:9'
      ),
      heroPhoto: makeResponsiveImage(
        '/images/pages/P01-services-seo-hero-16x9',
        'SEO workstation with organic search analytics on laptop',
        '16:9',
        true
      ),
      steps: [
        {
          number: '01',
          title: 'We uncover opportunities others overlook.',
          image: makeResponsiveImage('/images/pages/P02-services-seo-audit-4x5', 'Technical SEO crawl audit', '16:9'),
          video: makeVideoAsset('/videos/services/seo-phase-0', '/videos/services/seo-phase-0-poster', 'Technical Audit'),
        },
        {
          number: '02',
          title: 'We align your content with search intent.',
          image: makeResponsiveImage('/images/services/seo/seo-audit', 'Intent keyword research and clusters', '16:9'),
          video: makeVideoAsset('/videos/services/seo-phase-1', '/videos/services/seo-phase-1-poster', 'Intent Research'),
        },
        {
          number: '03',
          title: 'We build a stronger search foundation.',
          image: makeResponsiveImage('/images/services/seo/seo-authority', 'On-page structure and semantic architecture', '16:9'),
          video: makeVideoAsset('/videos/services/seo-phase-2', '/videos/services/seo-phase-2-poster', 'On-Page Architecture'),
        },
        {
          number: '04',
          title: 'We turn rankings into meaningful results.',
          image: makeResponsiveImage('/images/services/seo/seo-reporting', 'Organic ranking progression and revenue curves', '16:9'),
          video: makeVideoAsset('/videos/services/seo-phase-3', '/videos/services/seo-phase-3-poster', 'Authority & Backlinks'),
        },
        {
          number: '05',
          title: 'Continuous Refinement & Impact',
          image: makeResponsiveImage('/images/services/seo/seo-network', 'Continuous technical crawl refinement', '16:9'),
          video: makeVideoAsset('/videos/services/seo-phase-0', '/videos/services/seo-phase-0-poster', 'Impact Optimization'),
        },
      ] as ServiceStepMedia[],
    },

    ppc: {
      heroVideo: makeVideoAsset(
        '/videos/services/ppc-phase-0',
        '/videos/services/ppc-phase-0-poster',
        'Meta Paid Advertising Suite',
        '16:9'
      ),
      heroPhoto: makeResponsiveImage(
        '/images/pages/P03-services-meta-hero-16x9',
        'Smartphone displaying high-converting paid social ad creative',
        '16:9',
        true
      ),
      steps: [
        {
          number: '01',
          title: '3-Tier Funnel Architecture',
          image: makeResponsiveImage('/images/pages/P04-services-meta-creative-4x5', 'Full-funnel ad structure matrix', '16:9'),
          video: makeVideoAsset('/videos/services/ppc-phase-0', '/videos/services/ppc-phase-0-poster', 'Funnel Architecture'),
        },
        {
          number: '02',
          title: '3x3 Creative Matrix Testing',
          image: makeResponsiveImage('/images/services/meta-ads/meta-creative', 'Creative angles and modular visual hooks', '16:9'),
          video: makeVideoAsset('/videos/services/ppc-phase-1', '/videos/services/ppc-phase-1-poster', 'Creative Matrix'),
        },
        {
          number: '03',
          title: 'Algorithmic Audience Modeling',
          image: makeResponsiveImage('/images/services/meta-ads/meta-capi', 'Conversions API telemetry and predictive lookalikes', '16:9'),
          video: makeVideoAsset('/videos/services/ppc-phase-2', '/videos/services/ppc-phase-2-poster', 'Audience Modeling'),
        },
        {
          number: '04',
          title: 'Dynamic Efficiency Scaling',
          image: makeResponsiveImage('/images/services/meta-ads/meta-scaling', 'Budget allocation curves and CPA threshold monitoring', '16:9'),
          video: makeVideoAsset('/videos/services/ppc-phase-3', '/videos/services/ppc-phase-3-poster', 'Dynamic Scaling'),
        },
        {
          number: '05',
          title: 'Precision That Performs',
          image: makeResponsiveImage('/images/services/meta-ads/meta-testing', 'Creative hook refinement and ad fatigue suppression', '16:9'),
          video: makeVideoAsset('/videos/services/ppc-phase-0', '/videos/services/ppc-phase-0-poster', 'Performance Optimization'),
        },
      ] as ServiceStepMedia[],
    },

    socialMedia: {
      heroVideo: makeVideoAsset(
        '/videos/services/social-media-phase-0',
        '/videos/services/social-media-phase-0-poster',
        'Social Media Content Engine',
        '16:9'
      ),
      heroPhoto: makeResponsiveImage(
        '/images/pages/P05-services-social-hero-16x9',
        'Creator filming vertical content with phone on professional tripod',
        '16:9',
        true
      ),
      steps: [
        {
          number: '01',
          title: 'Brand Voice & Visual Pillar Workshop',
          image: makeResponsiveImage('/images/pages/P06-services-social-calendar-4x5', 'Aesthetic pillars and content tonality guidelines', '16:9'),
          video: makeVideoAsset('/videos/services/social-media-phase-0', '/videos/services/social-media-phase-0-poster', 'Brand Pillars'),
        },
        {
          number: '02',
          title: 'Monthly Content Batching & Pre-Approvals',
          image: makeResponsiveImage('/images/services/social-media/social-calendar', 'Calendar preview board with scheduled creative assets', '16:9'),
          video: makeVideoAsset('/videos/services/social-media-phase-1', '/videos/services/social-media-phase-1-poster', 'Monthly Batching'),
        },
        {
          number: '03',
          title: 'Publishing, Story Management & Community Care',
          image: makeResponsiveImage('/images/services/social-media/social-production', 'Studio shooting setup with lighting and camera rig', '16:9'),
          video: makeVideoAsset('/videos/services/social-media-phase-2', '/videos/services/social-media-phase-2-poster', 'Publishing & Care'),
        },
        {
          number: '04',
          title: 'Analytics Review & Format Refinement',
          image: makeResponsiveImage('/images/services/social-media/social-community', 'Audience engagement analytics and retention rates', '16:9'),
          video: makeVideoAsset('/videos/services/social-media-phase-3', '/videos/services/social-media-phase-3-poster', 'Analytics Review'),
        },
        {
          number: '05',
          title: 'Organic Demand Attribution',
          image: makeResponsiveImage('/images/services/social-media/social-growth', 'Direct follower growth and inbound pipeline tracking', '16:9'),
          video: makeVideoAsset('/videos/services/social-media-phase-0', '/videos/services/social-media-phase-0-poster', 'Demand Attribution'),
        },
      ] as ServiceStepMedia[],
    },

    webDevelopment: {
      heroVideo: makeVideoAsset(
        '/videos/services/web-development-phase-0',
        '/videos/services/web-development-phase-0-poster',
        'Next.js Performance Architecture',
        '16:9'
      ),
      heroPhoto: makeResponsiveImage(
        '/images/pages/P07-services-web-hero-16x9',
        'Design director reviewing responsive web layout on studio display',
        '16:9',
        true
      ),
      steps: [
        {
          number: '01',
          title: 'User Journey & Information Architecture',
          image: makeResponsiveImage('/images/pages/P08-services-web-devices-16x9', 'Multi-device responsive wireframe architecture', '16:9'),
          video: makeVideoAsset('/videos/services/web-development-phase-0', '/videos/services/web-development-phase-0-poster', 'Information Architecture'),
        },
        {
          number: '02',
          title: 'High-Fidelity Editorial UI/UX Design',
          image: makeResponsiveImage('/images/services/web-development/web-design', 'Figma design tokens and typography hierarchy', '16:9'),
          video: makeVideoAsset('/videos/services/web-development-phase-1', '/videos/services/web-development-phase-1-poster', 'Editorial UI/UX'),
        },
        {
          number: '03',
          title: 'Front-End Engineering & Interaction Polish',
          image: makeResponsiveImage('/images/services/web-development/web-responsive', 'Fluid layout geometry across mobile and 4K displays', '16:9'),
          video: makeVideoAsset('/videos/services/web-development-phase-2', '/videos/services/web-development-phase-2-poster', 'Front-End Engineering'),
        },
        {
          number: '04',
          title: 'Rigorous QA, Audit & Launch',
          image: makeResponsiveImage('/images/services/web-development/web-vitals', 'Sub-second Core Web Vitals diagnostic verification', '16:9'),
          video: makeVideoAsset('/videos/services/web-development-phase-3', '/videos/services/web-development-phase-3-poster', 'Audit & QA'),
        },
        {
          number: '05',
          title: 'Edge Deployment & Global CDN',
          image: makeResponsiveImage('/images/services/web-development/web-deployment', 'Serverless edge cache and continuous integration deployment', '16:9'),
          video: makeVideoAsset('/videos/services/web-development-phase-0', '/videos/services/web-development-phase-0-poster', 'Global Edge'),
        },
      ] as ServiceStepMedia[],
    },

    videoPhoto: {
      heroVideo: makeVideoAsset(
        '/videos/services/video-photo-hero',
        '/videos/services/video-photo-hero-poster',
        'Cinematic Production Studio',
        '16:9'
      ),
      heroPhoto: makeResponsiveImage(
        '/images/services/video-photo/video-photo-hero',
        'Cinema camera on dark oak desk beside curved color-grading monitor',
        '16:9',
        true
      ),
      steps: [
        {
          number: '01',
          title: 'Storyboard & Creative Concept',
          image: makeResponsiveImage('/images/services/video-photo/video-photo-concept', 'Storyboard sketches, drafting pencils, warm gold swatch cards', '16:9'),
          video: makeVideoAsset('/videos/services/video-photo-phase-0', '/videos/services/video-photo-phase-0-poster', 'Concept Storyboard'),
        },
        {
          number: '02',
          title: 'On-Location & Studio Shoot',
          image: makeResponsiveImage('/images/services/video-photo/video-photo-shoot', 'Studio video production set with cinema camera, tripod, parabolic lighting', '16:9'),
          video: makeVideoAsset('/videos/services/video-photo-phase-1', '/videos/services/video-photo-phase-1-poster', 'Studio Production'),
        },
        {
          number: '03',
          title: 'Editorial Cut & Narrative Pacing',
          image: makeResponsiveImage('/images/services/video-photo/video-photo-edit', 'Dual display editing suite with timeline waveforms and color console', '16:9'),
          video: makeVideoAsset('/videos/services/video-photo-phase-2', '/videos/services/video-photo-phase-2-poster', 'Editorial Cut'),
        },
        {
          number: '04',
          title: 'Color Grading & Film Finish',
          image: makeResponsiveImage('/images/services/video-photo/video-photo-color', 'Color grading reference suite with cinematic footage stills and backlighting', '16:9'),
          video: makeVideoAsset('/videos/services/video-photo-phase-3', '/videos/services/video-photo-phase-3-poster', 'Color Grading'),
        },
        {
          number: '05',
          title: 'Multi-Platform Master Delivery',
          image: makeResponsiveImage('/images/services/video-photo/video-photo-delivery', 'Linen box presentation prints, laptop client review on honed stone desk', '16:9'),
          video: makeVideoAsset('/videos/services/video-photo-phase-0', '/videos/services/video-photo-phase-0-poster', 'Master Delivery'),
        },
      ] as ServiceStepMedia[],
    },
  },

  // Blog Page
  blog: {
    heroVideo: makeVideoAsset('/videos/blog/blog-hero', '/videos/blog/blog-hero-poster', 'Editorial Insights Suite', '16:9', 8),
    featured: makeResponsiveImage(
      '/images/pages/P12-blog-featured-16x9',
      'The modern digital architecture playbook featured cover',
      '16:9',
      true
    ),
    categories: {
      seo: makeResponsiveImage('/images/blog/cover-seo', 'Search engine optimization insights cover', '16:10'),
      ads: makeResponsiveImage('/images/blog/cover-ads', 'Paid social advertising intelligence cover', '16:10'),
      email: makeResponsiveImage('/images/blog/cover-email', 'Lifecycle email marketing and retention cover', '16:10'),
      social: makeResponsiveImage('/images/blog/cover-social', 'Social media community brand building cover', '16:10'),
      video: makeResponsiveImage('/images/blog/cover-future', 'Cinematic video storytelling insights cover', '16:10'),
      web: makeResponsiveImage('/images/blog/cover-web', 'Modern web performance and design craft cover', '16:10'),
    },
  },

  // Contact Page
  contact: {
    heroPhoto: makeResponsiveImage(
      '/images/contact/contact-hero',
      'Minimalist consultation desk with telephone, notebook and coffee in natural light',
      '3:4',
      true
    ),
  },
};
