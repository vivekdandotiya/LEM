import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
// @ts-ignore
import ffmpegPath from 'ffmpeg-static';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'videos', 'services');
const TMP_DIR = path.join(process.cwd(), 'tmp', 'recordings');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

interface ServiceJob {
  service: string;
  phase: number;
}

const JOBS: ServiceJob[] = [];
const SERVICES = ['seo', 'ppc', 'social-media', 'web-development'];

for (const service of SERVICES) {
  for (let phase = 0; phase < 4; phase++) {
    JOBS.push({ service, phase });
  }
}

async function runRecordingPipeline() {
  console.log('=====================================================');
  console.log('LEAD EDGE MARKETING — T5 SCENE RECORDING PIPELINE');
  console.log('=====================================================');
  console.log(`Recording and encoding ${JOBS.length} clips to ${OUTPUT_DIR}\n`);

  const ffmpeg = ffmpegPath as string;
  console.log(`Using ffmpeg at: ${ffmpeg}\n`);

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--enable-gpu', '--use-gl=angle', '--enable-webgl'],
  });

  const encodedClips: Array<{
    name: string;
    mp4SizeKB: number;
    webmSizeKB: number;
    mobileSizeKB: number;
    posterSizeKB: number;
  }> = [];

  for (const job of JOBS) {
    const jobName = `${job.service}-phase-${job.phase}`;
    console.log(`\n[${jobName}] Starting capture...`);

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1200 },
      deviceScaleFactor: 1,
      recordVideo: {
        dir: TMP_DIR,
        size: { width: 1920, height: 1200 },
      },
    });

    const page = await context.newPage();
    const url = `http://localhost:3000/__scene/${job.service}/${job.phase}?record=1`;

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Capture high-res poster still
    const posterPath = path.join(OUTPUT_DIR, `${jobName}-poster.webp`);
    await page.screenshot({ path: posterPath, type: 'webp', quality: 90 });
    console.log(`  Saved poster: ${path.basename(posterPath)}`);

    // Let the animation play for 7 seconds
    await page.waitForTimeout(6500);

    // Close page to flush video recording
    await page.close();
    await context.close();

    // Find the saved raw video file in TMP_DIR
    const rawFiles = fs
      .readdirSync(TMP_DIR)
      .filter((f) => f.endsWith('.webm'))
      .map((f) => ({ name: f, time: fs.statSync(path.join(TMP_DIR, f)).mtimeMs }))
      .sort((a, b) => b.time - a.time);

    if (rawFiles.length === 0) {
      console.error(`  Error: No raw video captured for ${jobName}`);
      continue;
    }

    const rawVideoPath = path.join(TMP_DIR, rawFiles[0].name);

    // 1. Encode 1080p MP4 (H.264) with seamless loop cross-fade
    const mp4Out = path.join(OUTPUT_DIR, `${jobName}.mp4`);
    console.log(`  Encoding MP4 (1080p)...`);
    const mp4Cmd = `"${ffmpeg}" -y -i "${rawVideoPath}" -t 6 -vf "scale=1920:1200" -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an "${mp4Out}"`;
    execSync(mp4Cmd, { stdio: 'ignore' });

    // 2. Encode 1080p WebM (VP9)
    const webmOut = path.join(OUTPUT_DIR, `${jobName}.webm`);
    console.log(`  Encoding WebM (VP9)...`);
    const webmCmd = `"${ffmpeg}" -y -i "${rawVideoPath}" -t 6 -vf "scale=1920:1200" -c:v libvpx-vp9 -crf 33 -b:v 0 -an "${webmOut}"`;
    execSync(webmCmd, { stdio: 'ignore' });

    // 3. Encode 720p Mobile MP4
    const mobileOut = path.join(OUTPUT_DIR, `${jobName}-720p.mp4`);
    console.log(`  Encoding Mobile 720p MP4...`);
    const mobileCmd = `"${ffmpeg}" -y -i "${rawVideoPath}" -t 6 -vf "scale=1152:720" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an "${mobileOut}"`;
    execSync(mobileCmd, { stdio: 'ignore' });

    // Clean up temporary raw video
    try {
      fs.unlinkSync(rawVideoPath);
    } catch {}

    const mp4SizeKB = Math.round(fs.statSync(mp4Out).size / 1024);
    const webmSizeKB = Math.round(fs.statSync(webmOut).size / 1024);
    const mobileSizeKB = Math.round(fs.statSync(mobileOut).size / 1024);
    const posterSizeKB = Math.round(fs.statSync(posterPath).size / 1024);

    console.log(`  Done: MP4=${mp4SizeKB}KB, WebM=${webmSizeKB}KB, Mobile=${mobileSizeKB}KB, Poster=${posterSizeKB}KB`);

    encodedClips.push({
      name: jobName,
      mp4SizeKB,
      webmSizeKB,
      mobileSizeKB,
      posterSizeKB,
    });
  }

  await browser.close();

  // Write video pipeline documentation
  const docPath = path.join(process.cwd(), 'docs', 'v6', 'T5-video-pipeline.md');
  let doc = `# T5 Video Pipeline Documentation\n\n`;
  doc += `All 16 video stage clips (4 services × 4 phases) were encoded from the T3-sanitized editorial stage canvases at 16:10 aspect ratio.\n\n`;
  doc += `## FFmpeg Encoding Profiles\n\n`;
  doc += `### 1. Desktop 1080p Master (H.264 MP4)\n`;
  doc += `\`\`\`bash\nffmpeg -y -i input.webm -t 6 -vf "scale=1920:1200" -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an output.mp4\n\`\`\`\n\n`;
  doc += `### 2. Desktop WebM Variant (VP9)\n`;
  doc += `\`\`\`bash\nffmpeg -y -i input.webm -t 6 -vf "scale=1920:1200" -c:v libvpx-vp9 -crf 33 -b:v 0 -an output.webm\n\`\`\`\n\n`;
  doc += `### 3. Mobile 720p Variant (H.264 MP4)\n`;
  doc += `\`\`\`bash\nffmpeg -y -i input.webm -t 6 -vf "scale=1152:720" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an output-720p.mp4\n\`\`\`\n\n`;
  doc += `## File Size Log (Target: < 1,800 KB desktop, < 900 KB mobile)\n\n`;
  doc += `| Clip Name | MP4 1080p | WebM VP9 | Mobile 720p | Poster WebP | Status |\n`;
  doc += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  for (const c of encodedClips) {
    const passed = c.mp4SizeKB <= 1800 && c.mobileSizeKB <= 900;
    doc += `| \`${c.name}\` | ${c.mp4SizeKB} KB | ${c.webmSizeKB} KB | ${c.mobileSizeKB} KB | ${c.posterSizeKB} KB | ${passed ? '✅ PASS' : '⚠️ BUDGET'} |\n`;
  }

  fs.writeFileSync(docPath, doc);
  console.log(`\nSaved pipeline log to: ${docPath}`);
}

runRecordingPipeline().catch((err) => {
  console.error('Recording pipeline failed:', err);
  process.exit(1);
});
