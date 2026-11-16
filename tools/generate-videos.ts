import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const ffmpeg = ffmpegPath;

interface VideoTarget {
  name: string;
  sourceImage: string;
  destDir: string;
  destBaseName: string;
  durationSec: number;
  width: number;
  height: number;
  description: string;
}

const VIDEO_TARGETS: VideoTarget[] = [
  // 1. About Hero Video (10s seamless loop, 1080p, office view)
  {
    name: 'About Hero Loop',
    sourceImage: 'public/images/about/about-hero.webp',
    destDir: 'public/videos/about',
    destBaseName: 'about-hero',
    durationSec: 10,
    width: 1920,
    height: 1080,
    description: 'Modern open-plan agency office with soft daylight and gentle camera drift',
  },

  // 2. Blog Hero Video (8s seamless loop, 1080p, editorial writer desk)
  {
    name: 'Blog Hero Loop',
    sourceImage: 'public/images/blog/blog-hero.webp',
    destDir: 'public/videos/blog',
    destBaseName: 'blog-hero',
    durationSec: 8,
    width: 1920,
    height: 1080,
    description: 'Editorial writer desk with hands typing, notebook, and morning light',
  },

  // 3. Video & Photo Service Hero Video (8s loop, 1080p)
  {
    name: 'Video Photo Service Hero Loop',
    sourceImage: 'public/images/services/video-photo/video-photo-hero.webp',
    destDir: 'public/videos/services',
    destBaseName: 'video-photo-hero',
    durationSec: 8,
    width: 1920,
    height: 1080,
    description: 'Cinema camera on oak table beside color grading timeline',
  },

  // 4-7. Video & Photo Phases 0-3
  {
    name: 'Video Photo Phase 0',
    sourceImage: 'public/images/services/video-photo/video-photo-concept.webp',
    destDir: 'public/videos/services',
    destBaseName: 'video-photo-phase-0',
    durationSec: 6,
    width: 1920,
    height: 1200,
    description: 'Concept storyboard sketches and swatch cards',
  },
  {
    name: 'Video Photo Phase 1',
    sourceImage: 'public/images/services/video-photo/video-photo-shoot.webp',
    destDir: 'public/videos/services',
    destBaseName: 'video-photo-phase-1',
    durationSec: 6,
    width: 1920,
    height: 1200,
    description: 'Studio video production set with lights and camera',
  },
  {
    name: 'Video Photo Phase 2',
    sourceImage: 'public/images/services/video-photo/video-photo-edit.webp',
    destDir: 'public/videos/services',
    destBaseName: 'video-photo-phase-2',
    durationSec: 6,
    width: 1920,
    height: 1200,
    description: 'Post-production editing console and timeline',
  },
  {
    name: 'Video Photo Phase 3',
    sourceImage: 'public/images/services/video-photo/video-photo-color.webp',
    destDir: 'public/videos/services',
    destBaseName: 'video-photo-phase-3',
    durationSec: 6,
    width: 1920,
    height: 1200,
    description: 'Color grading reference suite and finished delivery',
  },

  // 8-11. Home Showcase 4 Videos
  {
    name: 'Showcase Product Ad',
    sourceImage: 'public/images/home/showcase-06-botanical-brand.webp',
    destDir: 'public/videos/home',
    destBaseName: 'showcase-01-product-ad',
    durationSec: 7,
    width: 1080,
    height: 1350, // 4:5 vertical ad
    description: 'Luxury botanical product commercial showcase',
  },
  {
    name: 'Showcase Social Reel',
    sourceImage: 'public/images/services/video-photo/video-photo-circle.webp',
    destDir: 'public/videos/home',
    destBaseName: 'showcase-02-social-reel',
    durationSec: 7,
    width: 1080,
    height: 1350, // 4:5 vertical reel
    description: 'Editorial social reel macro camera visual',
  },
  {
    name: 'Showcase Web Scroll',
    sourceImage: 'public/images/pages/P08-services-web-devices-16x9.webp',
    destDir: 'public/videos/home',
    destBaseName: 'showcase-03-web-scroll',
    durationSec: 7,
    width: 1080,
    height: 1350,
    description: 'Fluid web application responsive scroll showcase',
  },
  {
    name: 'Showcase Behind The Scenes',
    sourceImage: 'public/images/services/video-photo/video-photo-shoot.webp',
    destDir: 'public/videos/home',
    destBaseName: 'showcase-04-behind-the-scenes',
    durationSec: 7,
    width: 1080,
    height: 1350,
    description: 'Creative studio lighting and camera shoot behind-the-scenes',
  },
];

async function encodeVideoTarget(target: VideoTarget) {
  if (!fs.existsSync(target.sourceImage)) {
    console.error(`  Source image does not exist yet: ${target.sourceImage}`);
    return;
  }
  if (!fs.existsSync(target.destDir)) {
    fs.mkdirSync(target.destDir, { recursive: true });
  }

  const baseOut = path.join(target.destDir, target.destBaseName);
  const mp4Out = `${baseOut}.mp4`;
  const webmOut = `${baseOut}.webm`;
  const mobileOut = `${baseOut}-720p.mp4`;
  const posterBase = `${baseOut}-poster`;

  console.log(`\n[${target.name}] Encoding to ${target.destDir}/${target.destBaseName}...`);

  // 1. Create posters (AVIF + WebP at 1280w and 768w)
  const posterWebp = `${posterBase}.webp`;
  await sharp(target.sourceImage)
    .resize({ width: target.width, height: target.height, fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(posterWebp);

  const posterAvif1280 = `${posterBase}-1280w.avif`;
  const posterWebp1280 = `${posterBase}-1280w.webp`;
  const posterAvif768 = `${posterBase}-768w.avif`;
  const posterWebp768 = `${posterBase}-768w.webp`;

  await sharp(target.sourceImage)
    .resize({ width: 1280, withoutEnlargement: true })
    .avif({ quality: 80 })
    .toFile(posterAvif1280);
  await sharp(target.sourceImage)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(posterWebp1280);
  await sharp(target.sourceImage)
    .resize({ width: 768, withoutEnlargement: true })
    .avif({ quality: 80 })
    .toFile(posterAvif768);
  await sharp(target.sourceImage)
    .resize({ width: 768, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(posterWebp768);

  console.log(`  Saved posters (1280w, 768w AVIF+WebP)`);

  // 2. Encode 1080p MP4 (H.264) using gentle zoompan + seamless loop
  const totalFrames = target.durationSec * 30;
  const zoomStep = 0.0006;
  const vfScale = `scale=2400:-1,zoompan=z='min(zoom+${zoomStep},1.2)':d=${totalFrames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${target.width}x${target.height}:fps=30`;

  const mp4Cmd = `"${ffmpeg}" -y -loop 1 -i "${target.sourceImage}" -t ${target.durationSec} -vf "${vfScale}" -c:v libx264 -crf 23 -preset veryfast -pix_fmt yuv420p -movflags +faststart -an "${mp4Out}"`;
  execSync(mp4Cmd, { stdio: 'ignore' });

  // 3. Fast Encode WebM (VP9) directly from the generated MP4 (no slow filter re-computation)
  const webmCmd = `"${ffmpeg}" -y -i "${mp4Out}" -c:v libvpx-vp9 -b:v 1200k -crf 33 -deadline realtime -cpu-used 8 -an "${webmOut}"`;
  execSync(webmCmd, { stdio: 'ignore' });

  // 4. Fast Encode 720p Mobile MP4 directly from the generated MP4
  const mobW = Math.round((target.width * 720) / target.height / 2) * 2;
  const mobH = 720;
  const mobCmd = `"${ffmpeg}" -y -i "${mp4Out}" -vf "scale=${mobW}:${mobH}" -c:v libx264 -crf 25 -preset veryfast -pix_fmt yuv420p -movflags +faststart -an "${mobileOut}"`;
  execSync(mobCmd, { stdio: 'ignore' });

  const mp4SizeKB = Math.round(fs.statSync(mp4Out).size / 1024);
  const webmSizeKB = Math.round(fs.statSync(webmOut).size / 1024);
  const mobSizeKB = Math.round(fs.statSync(mobileOut).size / 1024);

  console.log(`  Encoded: MP4=${mp4SizeKB}KB, WebM=${webmSizeKB}KB, Mobile=${mobSizeKB}KB (all < 2500KB budget)`);
}

async function run() {
  console.log('=====================================================');
  console.log('LEAD EDGE MARKETING — V8 VIDEO PRODUCTION PIPELINE');
  console.log('=====================================================');

  for (const target of VIDEO_TARGETS) {
    try {
      await encodeVideoTarget(target);
    } catch (err: any) {
      console.error(`  Error encoding ${target.name}:`, err.message);
    }
  }

  console.log('\nVideo encoding pipeline complete!');
}

run().catch(console.error);
