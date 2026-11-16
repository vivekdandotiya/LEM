import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

const ARTIFACT_DIR = 'C:/Users/HP/.gemini/antigravity/brain/1112fca7-c255-455f-8374-764b2f0ef2d8';
const RESPONSIVE_WIDTHS = [3840, 2560, 1920, 1280, 768, 480];

interface AssetTarget {
  name: string;
  destDir: string;
  destBaseName: string;
  sourceType: 'artifact' | 'unsplash';
  sourceVal: string; // pattern for artifact, or unsplash ID
  isHero: boolean;
  aspectRatio: '16:9' | '4:5' | '1:1' | '3:4';
  description: string;
}

const TARGETS: AssetTarget[] = [
  // Video & Photo service
  {
    name: 'Video Photo Hero',
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-hero',
    sourceType: 'artifact',
    sourceVal: 'video_photo_hero',
    isHero: true,
    aspectRatio: '16:9',
    description: 'High-end cinema camera on dark oak desk beside curved color-grading monitor',
  },
  {
    name: 'Video Photo Concept',
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-concept',
    sourceType: 'artifact',
    sourceVal: 'video_photo_concept',
    isHero: false,
    aspectRatio: '16:9',
    description: 'Storyboard sketches, drafting pencils, warm gold swatch cards',
  },
  {
    name: 'Video Photo Shoot',
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-shoot',
    sourceType: 'artifact',
    sourceVal: 'video_photo_shoot',
    isHero: false,
    aspectRatio: '16:9',
    description: 'Studio video production set with cinema camera, tripod, parabolic lighting',
  },
  {
    name: 'Video Photo Edit',
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-edit',
    sourceType: 'artifact',
    sourceVal: 'video_photo_edit',
    isHero: false,
    aspectRatio: '16:9',
    description: 'Dual display editing suite with timeline waveforms and color console',
  },
  {
    name: 'Video Photo Color & Finish',
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-color',
    sourceType: 'unsplash',
    sourceVal: 'photo-1574717024653-61fd2cf4d44d', // Editing & color reference studio
    isHero: false,
    aspectRatio: '16:9',
    description: 'Color grading reference suite with cinematic footage stills and backlighting',
  },
  {
    name: 'Video Photo Delivery',
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-delivery',
    sourceType: 'unsplash',
    sourceVal: 'photo-1544717305-2782549b5136', // Fine art prints & laptop presentation
    isHero: false,
    aspectRatio: '16:9',
    description: 'Linen box presentation prints, laptop client review on honed stone desk',
  },
  {
    name: 'Video Photo Circle',
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-circle',
    sourceType: 'unsplash',
    sourceVal: 'photo-1617042375876-a13e36732a04', // Cinema prime lens macro
    isHero: false,
    aspectRatio: '1:1',
    description: 'High-end cinema prime lens on dark charcoal background with warm gold glass glint',
  },
  {
    name: 'Video Photo Cylinder',
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-cylinder',
    sourceType: 'unsplash',
    sourceVal: 'photo-1512790182412-b19e6d62bc39', // Camera rig in studio
    isHero: true,
    aspectRatio: '3:4',
    description: 'Professional cinematic camera rig and prime lens in portrait orientation',
  },

  // About Team Photos
  {
    name: 'About Team Table',
    destDir: 'public/images/about',
    destBaseName: 'about-team-table',
    sourceType: 'unsplash',
    sourceVal: 'photo-1522071820081-009f0129c71c', // Strategy workspace table
    isHero: false,
    aspectRatio: '4:5',
    description: 'Collaborative strategy desk with laptops, notebooks, coffee in daylight',
  },
  {
    name: 'About Team Whiteboard',
    destDir: 'public/images/about',
    destBaseName: 'about-team-whiteboard',
    sourceType: 'unsplash',
    sourceVal: 'photo-1531403009284-440f080d1e12', // Planning flowcharts hands only
    isHero: false,
    aspectRatio: '4:5',
    description: 'Hands sketching architecture flows on glass whiteboard with markers',
  },
  {
    name: 'About Team Meeting',
    destDir: 'public/images/about',
    destBaseName: 'about-team-meeting',
    sourceType: 'unsplash',
    sourceVal: 'photo-1497366811353-6870744d04b2', // Architecture conference room
    isHero: false,
    aspectRatio: '4:5',
    description: 'Minimalist agency boardroom with floor-to-ceiling glass and oak table',
  },
  {
    name: 'About Team Creative',
    destDir: 'public/images/about',
    destBaseName: 'about-team-creative',
    sourceType: 'unsplash',
    sourceVal: 'photo-1452587925148-ce544e77e70d', // Camera, lens, notebook
    isHero: false,
    aspectRatio: '4:5',
    description: 'Creative desk with mirrorless camera, prime lens, linen notebook, espresso cup',
  },

  // About Hero Video Poster / Still
  {
    name: 'About Hero Still',
    destDir: 'public/images/about',
    destBaseName: 'about-hero',
    sourceType: 'unsplash',
    sourceVal: 'photo-1497366754035-f200968a6e72', // Bright open-plan agency office
    isHero: true,
    aspectRatio: '16:9',
    description: 'Bright open-plan creative office, large factory windows, soft daylight',
  },

  // Blog Hero Video Poster / Still
  {
    name: 'Blog Hero Still',
    destDir: 'public/images/blog',
    destBaseName: 'blog-hero',
    sourceType: 'unsplash',
    sourceVal: 'photo-1499750310107-5fef28a66643', // Editorial desk hands typing
    isHero: true,
    aspectRatio: '16:9',
    description: 'Editorial writer desk with sleek keyboard, fountain pen, notebook, coffee',
  },

  // Home Showcase Campaign Photos
  {
    name: 'Showcase Luxury Residence',
    destDir: 'public/images/home',
    destBaseName: 'showcase-05-luxury-residence',
    sourceType: 'unsplash',
    sourceVal: 'photo-1600585154340-be6161a56a0c', // Luxury estate
    isHero: false,
    aspectRatio: '4:5',
    description: 'Modern luxury architectural estate at dusk with glowing interior lighting',
  },
  {
    name: 'Showcase Botanical Brand',
    destDir: 'public/images/home',
    destBaseName: 'showcase-06-botanical-brand',
    sourceType: 'unsplash',
    sourceVal: 'photo-1556228720-195a672e8a03', // Botanical cosmetic bottle
    isHero: false,
    aspectRatio: '4:5',
    description: 'Minimalist organic botanical serum bottle on textured stone in natural light',
  },
  {
    name: 'Showcase Apparel Editorial',
    destDir: 'public/images/home',
    destBaseName: 'showcase-07-apparel-editorial',
    sourceType: 'unsplash',
    sourceVal: 'photo-1490481651871-ab68de25d43d', // Fashion editorial
    isHero: false,
    aspectRatio: '4:5',
    description: 'Tactile wool and linen apparel editorial photograph in warm morning sun',
  },
  {
    name: 'Showcase Roaster Coffee',
    destDir: 'public/images/home',
    destBaseName: 'showcase-08-roaster-coffee',
    sourceType: 'unsplash',
    sourceVal: 'photo-1514432324607-a09d9b4aefdd', // Coffee roaster beans & cup
    isHero: false,
    aspectRatio: '4:5',
    description: 'Artisanal single-origin coffee beans and ceramic cup in moody warm light',
  },

  // Services Cylinder Extras
  {
    name: 'Cylinder Strategy Session',
    destDir: 'public/images/services',
    destBaseName: 'cylinder-strategy-session',
    sourceType: 'unsplash',
    sourceVal: 'photo-1531482615713-2afd69097998',
    isHero: true,
    aspectRatio: '3:4',
    description: 'Executive digital strategy sprint in warm architectural boardroom',
  },
];

async function downloadUnsplash(photoId: string): Promise<Buffer> {
  // Fetch high-res 4K image from Unsplash CDN
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=3840&q=90`;
  console.log(`  Downloading ${url}...`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  const arrayBuf = await res.arrayBuffer();
  return Buffer.from(arrayBuf);
}

async function getSourceBuffer(target: AssetTarget): Promise<Buffer> {
  if (target.sourceType === 'artifact') {
    const artifactFiles = fs.readdirSync(ARTIFACT_DIR);
    const matched = artifactFiles.find((f) => f.includes(target.sourceVal) && f.endsWith('.jpg'));
    if (!matched) {
      throw new Error(`Artifact not found matching ${target.sourceVal}`);
    }
    const fullPath = path.join(ARTIFACT_DIR, matched);
    return fs.readFileSync(fullPath);
  } else {
    return await downloadUnsplash(target.sourceVal);
  }
}

async function run() {
  console.log('=====================================================');
  console.log('LEAD EDGE MARKETING — V8 ASSET PRODUCTION PIPELINE');
  console.log('=====================================================\n');

  const newLogEntries: string[] = [];
  const licenseEntries: string[] = [];

  for (const target of TARGETS) {
    console.log(`\n[${target.name}] Processing...`);
    if (!fs.existsSync(target.destDir)) {
      fs.mkdirSync(target.destDir, { recursive: true });
    }

    try {
      const srcBuf = await getSourceBuffer(target);

      // Determine aspect ratio crop if needed
      let pipeline = sharp(srcBuf);
      const meta = await pipeline.metadata();
      const origW = meta.width || 3840;
      const origH = meta.height || 2160;

      // Crop to aspect ratio
      let cropW = origW;
      let cropH = origH;
      if (target.aspectRatio === '16:9') {
        cropH = Math.round(cropW * (9 / 16));
        if (cropH > origH) {
          cropH = origH;
          cropW = Math.round(cropH * (16 / 9));
        }
      } else if (target.aspectRatio === '4:5') {
        cropW = Math.round(cropH * (4 / 5));
        if (cropW > origW) {
          cropW = origW;
          cropH = Math.round(cropW * (5 / 4));
        }
      } else if (target.aspectRatio === '1:1') {
        const side = Math.min(cropW, cropH);
        cropW = side;
        cropH = side;
      } else if (target.aspectRatio === '3:4') {
        cropW = Math.round(cropH * (3 / 4));
        if (cropW > origW) {
          cropW = origW;
          cropH = Math.round(cropW * (4 / 3));
        }
      }

      // Base cropped buffer
      const croppedBuf = await sharp(srcBuf)
        .resize({ width: cropW, height: cropH, fit: 'cover', position: 'center' })
        .toBuffer();

      // 1. Base WebP
      const baseWebp = path.join(target.destDir, `${target.destBaseName}.webp`);
      await sharp(croppedBuf).webp({ quality: 90 }).toFile(baseWebp);
      console.log(`  Saved base WebP: ${baseWebp}`);

      // 2. Responsive variants
      const widths = target.isHero ? RESPONSIVE_WIDTHS : [2560, 1920, 1280, 768, 480];
      for (const w of widths) {
        const avifOut = path.join(target.destDir, `${target.destBaseName}-${w}w.avif`);
        const webpOut = path.join(target.destDir, `${target.destBaseName}-${w}w.webp`);

        await sharp(croppedBuf)
          .resize({ width: w, withoutEnlargement: false })
          .avif({ quality: 80 })
          .toFile(avifOut);

        await sharp(croppedBuf)
          .resize({ width: w, withoutEnlargement: false })
          .webp({ quality: 88 })
          .toFile(webpOut);

        const avifSizeKB = Math.round(fs.statSync(avifOut).size / 1024);
        const webpSizeKB = Math.round(fs.statSync(webpOut).size / 1024);
        console.log(`  Width ${w}w: AVIF=${avifSizeKB}KB, WebP=${webpSizeKB}KB`);

        newLogEntries.push(
          `| \`${avifOut.replace(/\\\\/g, '/')}\` | ${w}w | AVIF | ${avifSizeKB} KB | ${target.description} |`
        );
        newLogEntries.push(
          `| \`${webpOut.replace(/\\\\/g, '/')}\` | ${w}w | WebP | ${webpSizeKB} KB | ${target.description} |`
        );
      }

      // Log license entry
      const sourceName =
        target.sourceType === 'artifact' ? 'Antigravity Image Generator' : `Unsplash (${target.sourceVal})`;
      const licenseName =
        target.sourceType === 'artifact' ? 'Proprietary Commercial Asset' : 'Unsplash Commercial License (Free)';
      licenseEntries.push(
        `| **${path.basename(target.destDir)}** | \`${target.destBaseName}.webp\` | ${target.aspectRatio} | ${target.description} | ${sourceName} | ${licenseName} |`
      );
    } catch (err: any) {
      console.error(`  Error processing ${target.name}:`, err.message);
    }
  }

  // Append to IMAGE-LOG.md and ASSET-LICENSES.md
  if (newLogEntries.length > 0) {
    fs.appendFileSync(
      'docs/IMAGE-LOG.md',
      '\n\n## V8 Added Responsive Assets\n\n| Output Path | Width | Format | Size | Description |\n|---|---|---|---|---|\n' +
        newLogEntries.join('\n') +
        '\n'
    );
    console.log(`\nUpdated docs/IMAGE-LOG.md with ${newLogEntries.length} new entries.`);
  }

  if (licenseEntries.length > 0) {
    fs.appendFileSync(
      'docs/ASSET-LICENSES.md',
      '\n\n## V8 Additional Commercial Assets\n\n| Folder | File Name | Aspect Ratio | Description | Source | License |\n|---|---|---|---|---|---|\n' +
        licenseEntries.join('\n') +
        '\n'
    );
    console.log(`Updated docs/ASSET-LICENSES.md with ${licenseEntries.length} new entries.`);
  }

  console.log('\nAsset generation complete!');
}

run().catch(console.error);
