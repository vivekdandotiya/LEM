import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';

const ARTIFACT_DIR = 'C:/Users/HP/.gemini/antigravity/brain/1112fca7-c255-455f-8374-764b2f0ef2d8';
const RESPONSIVE_WIDTHS = [3840, 2560, 1920, 1280, 768, 480];

// File mappings: name in artifact dir -> destination in public/
export const IMAGE_MAPPINGS = [
  {
    artifactPattern: /video_photo_hero/i,
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-hero',
    isHero: true,
  },
  {
    artifactPattern: /video_photo_concept/i,
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-concept',
    isHero: false,
  },
  {
    artifactPattern: /video_photo_shoot/i,
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-shoot',
    isHero: false,
  },
  {
    artifactPattern: /video_photo_edit/i,
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-edit',
    isHero: false,
  },
  {
    artifactPattern: /video_photo_color/i,
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-color',
    isHero: false,
  },
  {
    artifactPattern: /video_photo_delivery/i,
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-delivery',
    isHero: false,
  },
  {
    artifactPattern: /video_photo_circle/i,
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-circle',
    isHero: false,
  },
  {
    artifactPattern: /video_photo_cylinder/i,
    destDir: 'public/images/services/video-photo',
    destBaseName: 'video-photo-cylinder',
    isHero: true,
  },
  {
    artifactPattern: /about_team_table/i,
    destDir: 'public/images/about',
    destBaseName: 'about-team-table',
    isHero: false,
  },
  {
    artifactPattern: /about_team_whiteboard/i,
    destDir: 'public/images/about',
    destBaseName: 'about-team-whiteboard',
    isHero: false,
  },
  {
    artifactPattern: /about_team_meeting/i,
    destDir: 'public/images/about',
    destBaseName: 'about-team-meeting',
    isHero: false,
  },
  {
    artifactPattern: /about_team_creative/i,
    destDir: 'public/images/about',
    destBaseName: 'about-team-creative',
    isHero: false,
  },
  {
    artifactPattern: /office_hero_still/i,
    destDir: 'public/images/about',
    destBaseName: 'about-hero',
    isHero: true,
  },
  {
    artifactPattern: /blog_hero_still/i,
    destDir: 'public/images/blog',
    destBaseName: 'blog-hero',
    isHero: true,
  },
];

export async function processSingleImage(srcPath, destDir, destBaseName, isHero = false) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  console.log(`Processing: ${path.basename(srcPath)} -> ${destDir}/${destBaseName}`);

  // Base WebP
  const baseWebp = path.join(destDir, `${destBaseName}.webp`);
  await sharp(srcPath)
    .webp({ quality: 90 })
    .toFile(baseWebp);

  // Responsive widths
  const widths = isHero ? RESPONSIVE_WIDTHS : [2560, 1920, 1280, 768, 480];
  for (const w of widths) {
    const avifOut = path.join(destDir, `${destBaseName}-${w}w.avif`);
    const webpOut = path.join(destDir, `${destBaseName}-${w}w.webp`);

    await sharp(srcPath)
      .resize({ width: w, withoutEnlargement: false })
      .avif({ quality: 80 })
      .toFile(avifOut);

    await sharp(srcPath)
      .resize({ width: w, withoutEnlargement: false })
      .webp({ quality: 88 })
      .toFile(webpOut);
  }

  console.log(`  Completed responsive variants for ${destBaseName}`);
}

export async function runImageBatch() {
  const artifactFiles = fs.readdirSync(ARTIFACT_DIR);
  for (const mapping of IMAGE_MAPPINGS) {
    const matched = artifactFiles.find((f) => mapping.artifactPattern.test(f));
    if (matched) {
      const srcPath = path.join(ARTIFACT_DIR, matched);
      await processSingleImage(srcPath, mapping.destDir, mapping.destBaseName, mapping.isHero);
    } else {
      console.log(`Waiting for: ${mapping.destBaseName} (no artifact match yet)`);
    }
  }
}

if (process.argv[1].endsWith('process-asset-pipeline.mjs')) {
  runImageBatch().catch(console.error);
}
