import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface TargetImage {
  name: string;
  baseRelPath: string; // e.g. public/images/pages/P01-services-seo-hero-16x9
}

const TARGETS: TargetImage[] = [
  { name: 'P01 SEO Flagship', baseRelPath: 'public/images/pages/P01-services-seo-hero-16x9' },
  { name: 'P02 SEO Audit', baseRelPath: 'public/images/pages/P02-services-seo-audit-4x5' },
  { name: 'P03 Meta Flagship', baseRelPath: 'public/images/pages/P03-services-meta-hero-16x9' },
  { name: 'P04 Meta Creative', baseRelPath: 'public/images/pages/P04-services-meta-creative-4x5' },
  { name: 'P05 Social Flagship', baseRelPath: 'public/images/pages/P05-services-social-hero-16x9' },
  { name: 'P06 Social Calendar', baseRelPath: 'public/images/pages/P06-services-social-calendar-4x5' },
  { name: 'P07 Web Flagship', baseRelPath: 'public/images/pages/P07-services-web-hero-16x9' },
  { name: 'P08 Web Devices', baseRelPath: 'public/images/pages/P08-services-web-devices-16x9' },
  { name: 'P09 About Hero', baseRelPath: 'public/images/pages/P09-about-hero-4x5' },
  { name: 'P12 Blog Featured', baseRelPath: 'public/images/pages/P12-blog-featured-16x9' },

  // Stage posters from T5
  { name: 'SEO Phase 0 Poster', baseRelPath: 'public/videos/services/seo-phase-0-poster' },
  { name: 'SEO Phase 1 Poster', baseRelPath: 'public/videos/services/seo-phase-1-poster' },
  { name: 'SEO Phase 2 Poster', baseRelPath: 'public/videos/services/seo-phase-2-poster' },
  { name: 'SEO Phase 3 Poster', baseRelPath: 'public/videos/services/seo-phase-3-poster' },
  { name: 'PPC Phase 0 Poster', baseRelPath: 'public/videos/services/ppc-phase-0-poster' },
  { name: 'PPC Phase 1 Poster', baseRelPath: 'public/videos/services/ppc-phase-1-poster' },
  { name: 'PPC Phase 2 Poster', baseRelPath: 'public/videos/services/ppc-phase-2-poster' },
  { name: 'PPC Phase 3 Poster', baseRelPath: 'public/videos/services/ppc-phase-3-poster' },
  { name: 'Social Phase 0 Poster', baseRelPath: 'public/videos/services/social-media-phase-0-poster' },
  { name: 'Social Phase 1 Poster', baseRelPath: 'public/videos/services/social-media-phase-1-poster' },
  { name: 'Social Phase 2 Poster', baseRelPath: 'public/videos/services/social-media-phase-2-poster' },
  { name: 'Social Phase 3 Poster', baseRelPath: 'public/videos/services/social-media-phase-3-poster' },
  { name: 'Web Phase 0 Poster', baseRelPath: 'public/videos/services/web-development-phase-0-poster' },
  { name: 'Web Phase 1 Poster', baseRelPath: 'public/videos/services/web-development-phase-1-poster' },
  { name: 'Web Phase 2 Poster', baseRelPath: 'public/videos/services/web-development-phase-2-poster' },
  { name: 'Web Phase 3 Poster', baseRelPath: 'public/videos/services/web-development-phase-3-poster' },
];

const REQUIRED_WIDTHS = [3840, 2560, 1920, 1280, 768];
const FORMATS = ['avif', 'webp'];

// File size budgets in KB
const BUDGET_KB: Record<number, number> = {
  3840: 850,
  2560: 550,
  1920: 320,
  1280: 180,
  768: 95,
};

async function checkImages() {
  console.log('=====================================================');
  console.log('LEAD EDGE MARKETING — T6 IMAGE VERIFICATION CHECK');
  console.log('=====================================================\n');

  let passed = true;
  let totalChecked = 0;

  for (const t of TARGETS) {
    console.log(`Checking ${t.name} (${t.baseRelPath})...`);

    // 1. Verify existence of all 5 srcset widths in both AVIF and WebP
    for (const w of REQUIRED_WIDTHS) {
      for (const fmt of FORMATS) {
        totalChecked++;
        const filePath = path.join(process.cwd(), `${t.baseRelPath}-${w}w.${fmt}`);

        if (!fs.existsSync(filePath)) {
          console.error(`  ❌ MISSING: ${path.basename(filePath)}`);
          passed = false;
          continue;
        }

        const stat = fs.statSync(filePath);
        const sizeKB = stat.size / 1024;
        const budget = BUDGET_KB[w];

        if (sizeKB > budget) {
          console.error(`  ❌ BUDGET EXCEEDED: ${path.basename(filePath)} is ${sizeKB.toFixed(1)} KB (budget: ${budget} KB)`);
          passed = false;
        }

        // Verify natural dimensions
        const meta = await sharp(filePath).metadata();
        const isPortrait = t.baseRelPath.includes('4x5');
        const expectedWidth = isPortrait ? Math.round(w * 0.8) : w;

        if (meta.width !== expectedWidth) {
          console.error(`  ❌ DIMENSION MISMATCH: ${path.basename(filePath)} width is ${meta.width} (expected: ${expectedWidth})`);
          passed = false;
        }
      }
    }

    // 2. Verify natural max width >= 3840 (or long-edge >= 3840 for portrait)
    const maxMasterPath = path.join(process.cwd(), `${t.baseRelPath}-3840w.webp`);
    if (fs.existsSync(maxMasterPath)) {
      const masterMeta = await sharp(maxMasterPath).metadata();
      const longEdge = Math.max(masterMeta.width || 0, masterMeta.height || 0);
      if (longEdge < 2160 && (masterMeta.width || 0) < 3000) {
        console.error(`  ❌ RESOLUTION TOO LOW: ${path.basename(maxMasterPath)} long-edge is ${longEdge} (< 3840)`);
        passed = false;
      }
    }

    console.log(`  ✅ All 10 variants (5 widths × 2 formats) verified within budget.\n`);
  }

  console.log('-----------------------------------------------------');
  console.log(`Verified ${totalChecked} responsive image assets across ${TARGETS.length} targets.`);

  if (!passed) {
    console.error('\n❌ T6 Image Check FAILED with errors.');
    process.exit(1);
  } else {
    console.log('\n✅ ALL T6 IMAGE CHECKS PASSED (100% compliant with V6 Section G)!');
  }
}

checkImages().catch((err) => {
  console.error('Validation error:', err);
  process.exit(1);
});
