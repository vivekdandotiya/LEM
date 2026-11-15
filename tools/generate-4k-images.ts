import sharp, { type ResizeOptions } from 'sharp';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface ImageTarget {
  name: string;
  sourcePath: string;
  isPortrait?: boolean;
}

const IN_SCOPE_IMAGES: ImageTarget[] = [
  // Flagship card images
  { name: 'P01-services-seo-hero-16x9', sourcePath: 'public/images/pages/P01-services-seo-hero-16x9.webp' },
  { name: 'P02-services-seo-audit-4x5', sourcePath: 'public/images/pages/P02-services-seo-audit-4x5.webp', isPortrait: true },
  { name: 'P03-services-meta-hero-16x9', sourcePath: 'public/images/pages/P03-services-meta-hero-16x9.webp' },
  { name: 'P04-services-meta-creative-4x5', sourcePath: 'public/images/pages/P04-services-meta-creative-4x5.webp', isPortrait: true },
  { name: 'P05-services-social-hero-16x9', sourcePath: 'public/images/pages/P05-services-social-hero-16x9.webp' },
  { name: 'P06-services-social-calendar-4x5', sourcePath: 'public/images/pages/P06-services-social-calendar-4x5.webp', isPortrait: true },
  { name: 'P07-services-web-hero-16x9', sourcePath: 'public/images/pages/P07-services-web-hero-16x9.webp' },
  { name: 'P08-services-web-devices-16x9', sourcePath: 'public/images/pages/P08-services-web-devices-16x9.webp' },
  { name: 'P09-about-hero-4x5', sourcePath: 'public/images/pages/P09-about-hero-4x5.webp', isPortrait: true },
  { name: 'P12-blog-featured-16x9', sourcePath: 'public/images/pages/P12-blog-featured-16x9.webp' },

  // Stage posters from T5
  { name: 'seo-phase-0-poster', sourcePath: 'public/videos/services/seo-phase-0-poster.webp' },
  { name: 'seo-phase-1-poster', sourcePath: 'public/videos/services/seo-phase-1-poster.webp' },
  { name: 'seo-phase-2-poster', sourcePath: 'public/videos/services/seo-phase-2-poster.webp' },
  { name: 'seo-phase-3-poster', sourcePath: 'public/videos/services/seo-phase-3-poster.webp' },
  { name: 'ppc-phase-0-poster', sourcePath: 'public/videos/services/ppc-phase-0-poster.webp' },
  { name: 'ppc-phase-1-poster', sourcePath: 'public/videos/services/ppc-phase-1-poster.webp' },
  { name: 'ppc-phase-2-poster', sourcePath: 'public/videos/services/ppc-phase-2-poster.webp' },
  { name: 'ppc-phase-3-poster', sourcePath: 'public/videos/services/ppc-phase-3-poster.webp' },
  { name: 'social-media-phase-0-poster', sourcePath: 'public/videos/services/social-media-phase-0-poster.webp' },
  { name: 'social-media-phase-1-poster', sourcePath: 'public/videos/services/social-media-phase-1-poster.webp' },
  { name: 'social-media-phase-2-poster', sourcePath: 'public/videos/services/social-media-phase-2-poster.webp' },
  { name: 'social-media-phase-3-poster', sourcePath: 'public/videos/services/social-media-phase-3-poster.webp' },
  { name: 'web-development-phase-0-poster', sourcePath: 'public/videos/services/web-development-phase-0-poster.webp' },
  { name: 'web-development-phase-1-poster', sourcePath: 'public/videos/services/web-development-phase-1-poster.webp' },
  { name: 'web-development-phase-2-poster', sourcePath: 'public/videos/services/web-development-phase-2-poster.webp' },
  { name: 'web-development-phase-3-poster', sourcePath: 'public/videos/services/web-development-phase-3-poster.webp' },
];

const TARGET_WIDTHS = [3840, 2560, 1920, 1280, 768];

interface GeneratedLog {
  sourcePath: string;
  outputPath: string;
  dimensions: string;
  format: string;
  sizeKB: number;
  hash: string;
}

async function run4KPipeline() {
  console.log('=====================================================');
  console.log('LEAD EDGE MARKETING — T6 4K IMAGE GENERATION PIPELINE');
  console.log('=====================================================\n');

  const logs: GeneratedLog[] = [];

  for (const item of IN_SCOPE_IMAGES) {
    const fullSourcePath = path.join(process.cwd(), item.sourcePath);
    if (!fs.existsSync(fullSourcePath)) {
      console.warn(`Source not found: ${item.sourcePath}`);
      continue;
    }

    const dir = path.dirname(fullSourcePath);
    const ext = path.extname(fullSourcePath);
    const baseName = path.basename(fullSourcePath, ext);

    console.log(`Processing: ${baseName} (${item.sourcePath})`);

    const image = sharp(fullSourcePath);
    const meta = await image.metadata();

    for (const w of TARGET_WIDTHS) {
      // Calculate target width & height (maintain aspect ratio)
      let resizeOptions: ResizeOptions;
      if (item.isPortrait) {
        // For portrait cards (e.g. 4:5), width is scaled proportionally
        resizeOptions = { width: Math.round(w * 0.8), kernel: sharp.kernel.lanczos3 };
      } else {
        resizeOptions = { width: w, kernel: sharp.kernel.lanczos3 };
      }

      // 1. Generate AVIF variant
      const avifFileName = `${baseName}-${w}w.avif`;
      const avifOutPath = path.join(dir, avifFileName);
      await sharp(fullSourcePath)
        .resize(resizeOptions)
        .avif({ quality: 80, effort: 4 })
        .toFile(avifOutPath);

      const avifStat = fs.statSync(avifOutPath);
      const avifMeta = await sharp(avifOutPath).metadata();
      const avifHash = crypto.createHash('sha256').update(fs.readFileSync(avifOutPath)).digest('hex').slice(0, 12);
      logs.push({
        sourcePath: item.sourcePath,
        outputPath: path.relative(process.cwd(), avifOutPath).replace(/\\/g, '/'),
        dimensions: `${avifMeta.width}x${avifMeta.height}`,
        format: 'AVIF',
        sizeKB: Math.round(avifStat.size / 1024),
        hash: avifHash,
      });

      // 2. Generate WebP variant
      const webpFileName = `${baseName}-${w}w.webp`;
      const webpOutPath = path.join(dir, webpFileName);
      await sharp(fullSourcePath)
        .resize(resizeOptions)
        .webp({ quality: 88, effort: 4 })
        .toFile(webpOutPath);

      const webpStat = fs.statSync(webpOutPath);
      const webpMeta = await sharp(webpOutPath).metadata();
      const webpHash = crypto.createHash('sha256').update(fs.readFileSync(webpOutPath)).digest('hex').slice(0, 12);
      logs.push({
        sourcePath: item.sourcePath,
        outputPath: path.relative(process.cwd(), webpOutPath).replace(/\\/g, '/'),
        dimensions: `${webpMeta.width}x${webpMeta.height}`,
        format: 'WebP',
        sizeKB: Math.round(webpStat.size / 1024),
        hash: webpHash,
      });

      console.log(`  ${w}w -> AVIF: ${Math.round(avifStat.size / 1024)}KB, WebP: ${Math.round(webpStat.size / 1024)}KB`);
    }
  }

  // Write IMAGE-LOG.md
  console.log('\nWriting docs/IMAGE-LOG.md...');
  let logMd = `# Lead Edge Marketing — Visual Asset Production Log (V6 Responsive 4K)\n\n`;
  logMd += `**Total Generated Assets:** ${logs.length}\n`;
  logMd += `**Standards:** True 4K Master long-edge, 5 responsive widths (3840w, 2560w, 1920w, 1280w, 768w), dual AVIF (q=80) + WebP (q=88) formats.\n`;
  logMd += `**Budgets:** 3840w <= 850 KB, 1920w <= 320 KB, 768w <= 95 KB.\n\n`;
  logMd += `| Output Path | Dimensions | Format | Size | Hash | Source |\n`;
  logMd += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  for (const l of logs) {
    logMd += `| \`${l.outputPath}\` | ${l.dimensions} | ${l.format} | ${l.sizeKB} KB | \`${l.hash}\` | \`${l.sourcePath}\` |\n`;
  }

  fs.writeFileSync(path.join(process.cwd(), 'docs', 'IMAGE-LOG.md'), logMd);
  console.log('✅ Generated assets logged to docs/IMAGE-LOG.md');
}

run4KPipeline().catch((err) => {
  console.error('Pipeline error:', err);
  process.exit(1);
});
