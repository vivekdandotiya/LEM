import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const ffmpeg = ffmpegPath;

const SERVICES_CATALOG = {
  seo: [
    { id: 'video-01', title: 'Keyword Taxonomy & Semantic Clustering', image: 'public/images/services/seo/seo-hero.webp' },
    { id: 'video-02', title: 'Technical Crawl Architecture & Core Vitals', image: 'public/images/services/seo/seo-audit.webp' },
    { id: 'video-03', title: 'Topical Authority Architecture', image: 'public/images/services/seo/seo-authority.webp' },
    { id: 'video-04', title: 'Backlink Equity & Digital PR Network', image: 'public/images/services/seo/seo-network.webp' },
    { id: 'video-05', title: 'Organic Revenue Attribution Engine', image: 'public/images/services/seo/seo-reporting.webp' },
    { id: 'video-06', title: 'Search Engine Indexation Lab', image: 'public/images/services/hub-seo.webp' },
    { id: 'video-07', title: 'Allied Health Local Patient SEO', image: 'public/images/screens/audiology/poster-480.webp' },
    { id: 'video-08', title: 'Trades & Emergency Map Pack Domination', image: 'public/images/screens/plumber/poster-480.webp' },
    { id: 'video-09', title: 'Specialist Clinical Search Capture', image: 'public/images/screens/orthodontist/poster-480.webp' },
    { id: 'video-10', title: 'Commercial Builders Search Intent', image: 'public/images/screens/builder/poster-480.webp' },
    { id: 'video-11', title: 'Professional Services Search Authority', image: 'public/images/screens/conveyancer/poster-480.webp' },
    { id: 'video-12', title: 'E-Commerce Faceted Indexation Engine', image: 'public/images/screens/naturopath/poster-480.webp' },
  ],
  ppc: [
    { id: 'video-01', title: 'Google Ads STAG High-Intent Search', image: 'public/images/services/meta-ads/meta-hero.webp' },
    { id: 'video-02', title: 'Meta High-Converting Paid Social Creative', image: 'public/images/services/meta-ads/meta-creative.webp' },
    { id: 'video-03', title: 'First-Party Conversions API (CAPI) Tracking', image: 'public/images/services/meta-ads/meta-capi.webp' },
    { id: 'video-04', title: 'Performance Max Algorithmic Scaling', image: 'public/images/services/meta-ads/meta-scaling.webp' },
    { id: 'video-05', title: 'Multi-Variant Ad Copy & Split Testing', image: 'public/images/services/meta-ads/meta-testing.webp' },
    { id: 'video-06', title: 'Algorithmic ROAS & Bidding Optimization', image: 'public/images/services/hub-meta.webp' },
    { id: 'video-07', title: 'Active Lifestyle Paid Acquisition', image: 'public/images/hero/hero-04-stridefit-runner-4x5.webp' },
    { id: 'video-08', title: 'DTC Skincare Performance Ad Creative', image: 'public/images/hero/hero-06-dew-skin-tube-4x5.webp' },
    { id: 'video-09', title: 'Dynamic Product Ads (DPA) E-Commerce Scale', image: 'public/images/hero/hero-05-oak-thread-apparel-4x5.webp' },
    { id: 'video-10', title: 'High-Retention Food & Beverage Paid Ads', image: 'public/images/hero/hero-07-ember-roasters-coffee-4x5.webp' },
    { id: 'video-11', title: 'Consumer Tech Waterfall Retargeting', image: 'public/images/hero/hero-18-wavelength-headphones-4x5.webp' },
    { id: 'video-12', title: 'Omnichannel B2B Demand Generation', image: 'public/images/hero/hero-24-frostline-red-puffer-4x5.webp' },
  ],
  'web-development': [
    { id: 'video-01', title: 'Next.js 15 App Router Edge Architecture', image: 'public/images/services/web-development/web-hero.webp' },
    { id: 'video-02', title: 'High-Converting Bespoke Web Interfaces', image: 'public/images/services/web-development/web-design.webp' },
    { id: 'video-03', title: 'Fluid Multi-Device Viewport Responsiveness', image: 'public/images/services/web-development/web-responsive.webp' },
    { id: 'video-04', title: '0.4s Sub-Second Core Web Vitals', image: 'public/images/services/web-development/web-vitals.webp' },
    { id: 'video-05', title: 'Cloudflare Edge CDN Deployment & SSL', image: 'public/images/services/web-development/web-deployment.webp' },
    { id: 'video-06', title: 'Full-Stack Custom Application Engine', image: 'public/images/services/hub-web.webp' },
    { id: 'video-07', title: 'TypeScript & Server Actions Integration', image: 'public/images/hero/hero-13-northpath-laptop-code-9x16.webp' },
    { id: 'video-08', title: 'Mobile-First PWA & Web Application Architecture', image: 'public/images/hero/hero-22-nimbus-app-phone-9x16.webp' },
    { id: 'video-09', title: 'Fast-Loading Trade Storefront Architecture', image: 'public/images/screens/electrician/poster-480.webp' },
    { id: 'video-10', title: 'Architectural Portfolio & Interactive Studio', image: 'public/images/screens/architect/poster-480.webp' },
    { id: 'video-11', title: 'Custom SaaS Portal & Client Dashboard', image: 'public/images/screens/bookkeeper/poster-480.webp' },
    { id: 'video-12', title: 'Secure High-Conversion Intake Funnels', image: 'public/images/screens/wills-estates/poster-480.webp' },
  ],
  'social-media': [
    { id: 'video-01', title: '9:16 Vertical Video Storyboarding & Hooks', image: 'public/images/services/social-media/social-hero.webp' },
    { id: 'video-02', title: 'Editorial Brand Content Calendar & Cadence', image: 'public/images/services/social-media/social-calendar.webp' },
    { id: 'video-03', title: 'Active Community Engagement & Audience Loyalty', image: 'public/images/services/social-media/social-community.webp' },
    { id: 'video-04', title: 'High-Retention Organic Reel Distribution', image: 'public/images/services/social-media/social-growth.webp' },
    { id: 'video-05', title: 'Studio Reel Production & Creator Workflows', image: 'public/images/services/social-media/social-production.webp' },
    { id: 'video-06', title: 'Multi-Channel Brand Gravity Architecture', image: 'public/images/services/hub-social.webp' },
    { id: 'video-07', title: 'Creative Arts & Performance Studio Reels', image: 'public/images/screens/dance-studio/poster-480.webp' },
    { id: 'video-08', title: 'Community & Early Learning Storytelling', image: 'public/images/screens/childcare/poster-480.webp' },
    { id: 'video-09', title: 'Youth Sports High-Energy Video Highlights', image: 'public/images/screens/kids-sports/poster-480.webp' },
    { id: 'video-10', title: 'Action & Lifestyle Brand Social Storytelling', image: 'public/images/hero/hero-16-spoke-cycling-bike-4x5.webp' },
    { id: 'video-11', title: 'Organic Brand Aesthetic & Product Styling', image: 'public/images/hero/hero-21-petal-press-green-juice-4x5.webp' },
    { id: 'video-12', title: 'Vertical Visual Identity & Micro-Content', image: 'public/images/hero/hero-03-greenleaf-botanical-9x16.webp' },
  ],
  'video-photo': [
    { id: 'video-01', title: 'Cinematic 4K Cinema Camera Production', image: 'public/images/services/video-photo/video-photo-hero.webp' },
    { id: 'video-02', title: 'Concept Storyboarding & Frame Planning', image: 'public/images/services/video-photo/video-photo-concept.webp' },
    { id: 'video-03', title: 'Studio Lighting & Softbox Camera Setups', image: 'public/images/services/video-photo/video-photo-shoot.webp' },
    { id: 'video-04', title: 'Dual-Monitor Post-Production & Timeline Edit', image: 'public/images/services/video-photo/video-photo-edit.webp' },
    { id: 'video-05', title: 'DaVinci Resolve Cinema Color Grading & 3D LUTs', image: 'public/images/services/video-photo/video-photo-color.webp' },
    { id: 'video-06', title: 'Multi-Format Master Export & Audio Engineering', image: 'public/images/services/video-photo/video-photo-delivery.webp' },
    { id: 'video-07', title: 'Cinema Prime Lens Dispersion & Macro Optics', image: 'public/images/services/video-photo/video-photo-circle.webp' },
    { id: 'video-08', title: 'Studio Rigging & Cinema Camera Operations', image: 'public/images/services/video-photo/video-photo-cylinder.webp' },
    { id: 'video-09', title: 'Luxury Fine Jewelry Macro Editorial Stills', image: 'public/images/hero/hero-17-lumen-gold-ring-4x5.webp' },
    { id: 'video-10', title: 'Culinary & Hospitality Commercial Imagery', image: 'public/images/hero/hero-19-saffron-salt-plated-dish-4x5.webp' },
    { id: 'video-11', title: 'Interior Architecture & Spatial Cinematography', image: 'public/images/hero/hero-15-form-fern-livingroom-4x5.webp' },
    { id: 'video-12', title: 'Founder Story Documentaries & Studio Interviews', image: 'public/images/about/about-hero.webp' },
  ],
};

async function generateAllVideos() {
  console.log('================================================================');
  console.log('GENERATING 60 BESPOKE 1080P VIDEOS ACROSS ALL 5 CORE SERVICES');
  console.log('================================================================');

  let totalDone = 0;

  for (const [serviceSlug, videos] of Object.entries(SERVICES_CATALOG)) {
    const serviceDir = path.join('public/videos/catalog', serviceSlug);
    fs.mkdirSync(serviceDir, { recursive: true });

    console.log(`\nProcessing service: ${serviceSlug.toUpperCase()} (12 videos)...`);

    for (const v of videos) {
      const mp4Path = path.join(serviceDir, `${v.id}.mp4`);
      const posterPath = path.join(serviceDir, `${v.id}-poster.webp`);

      // 1. Generate crisp WebP poster (1280x960)
      if (!fs.existsSync(posterPath)) {
        await sharp(v.image)
          .resize(1280, 960, { fit: 'cover' })
          .webp({ quality: 90 })
          .toFile(posterPath);
      }

      // 2. Generate 4-second subtle cinematic pan/zoom MP4 video
      if (!fs.existsSync(mp4Path)) {
        const vfScale = "scale=1600:-1,zoompan=z='min(zoom+0.0006,1.12)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x960:fps=30";
        const cmd = `"${ffmpeg}" -y -loop 1 -i "${v.image}" -t 4 -vf "${vfScale}" -c:v libx264 -crf 26 -preset ultrafast -pix_fmt yuv420p -movflags +faststart -an "${mp4Path}"`;
        execSync(cmd, { stdio: 'ignore' });
      }

      const sizeKB = Math.round(fs.statSync(mp4Path).size / 1024);
      console.log(`  ✓ [${serviceSlug}] ${v.id}: ${v.title} (${sizeKB} KB)`);
      totalDone++;
    }
  }

  console.log(`\n================================================================`);
  console.log(`SUCCESSFULLY CREATED ALL ${totalDone} VIDEOS AND POSTERS!`);
  console.log(`================================================================`);
}

generateAllVideos().catch(console.error);
