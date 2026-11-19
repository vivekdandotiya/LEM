import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import ffmpegPath from 'ffmpeg-static';

const files = [
  { name: 'About Hero (1080p MP4)', path: 'public/videos/about/about-hero.mp4', page: 'About', role: 'Hero ambient background loop', budget: '1.8 MB' },
  { name: 'About Hero (1080p WebM)', path: 'public/videos/about/about-hero.webm', page: 'About', role: 'Hero ambient background loop', budget: '1.8 MB' },
  { name: 'About Hero (720p MP4)', path: 'public/videos/about/about-hero-720p.mp4', page: 'About', role: 'Mobile hero loop', budget: '1.0 MB' },
  { name: 'Showcase 01 Product Ad (1080p MP4)', path: 'public/videos/home/showcase-01-product-ad.mp4', page: 'Home', role: 'Work showcase portfolio card', budget: '900 KB' },
  { name: 'Showcase 01 Product Ad (720p MP4)', path: 'public/videos/home/showcase-01-product-ad-720p.mp4', page: 'Home', role: 'Mobile showcase card', budget: '900 KB' },
  { name: 'Showcase 02 Social Reel (1080p MP4)', path: 'public/videos/home/showcase-02-social-reel.mp4', page: 'Home', role: 'Work showcase portfolio card', budget: '900 KB' },
  { name: 'Showcase 02 Social Reel (720p MP4)', path: 'public/videos/home/showcase-02-social-reel-720p.mp4', page: 'Home', role: 'Mobile showcase card', budget: '900 KB' },
  { name: 'Showcase 03 Web Scroll (1080p MP4)', path: 'public/videos/home/showcase-03-web-scroll.mp4', page: 'Home', role: 'Work showcase portfolio card', budget: '900 KB' },
  { name: 'Showcase 03 Web Scroll (720p MP4)', path: 'public/videos/home/showcase-03-web-scroll-720p.mp4', page: 'Home', role: 'Mobile showcase card', budget: '900 KB' },
  { name: 'Showcase 04 Behind The Scenes (1080p MP4)', path: 'public/videos/home/showcase-04-behind-the-scenes.mp4', page: 'Home', role: 'Work showcase portfolio card', budget: '900 KB' },
  { name: 'Showcase 04 Behind The Scenes (720p MP4)', path: 'public/videos/home/showcase-04-behind-the-scenes-720p.mp4', page: 'Home', role: 'Mobile showcase card', budget: '900 KB' },
];

function inspectFile(relPath) {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) {
    return { exists: false };
  }
  const stat = fs.statSync(fullPath);
  let output = '';
  try {
    execSync(`"${ffmpegPath}" -i "${fullPath}"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (err) {
    output = (err.stderr || '') + (err.stdout || '');
  }

  // Parse duration
  const durMatch = output.match(/Duration:\s*(\d+):(\d+):([\d\.]+)/);
  let durationSec = 'N/A';
  if (durMatch) {
    durationSec = (parseInt(durMatch[1]) * 3600 + parseInt(durMatch[2]) * 60 + parseFloat(durMatch[3])).toFixed(1) + ' s';
  }

  // Parse bitrate
  const bitMatch = output.match(/bitrate:\s*(\d+)\s*kb\/s/);
  const bitrate = bitMatch ? `${bitMatch[1]} kbps` : 'N/A';

  // Parse resolution
  const resMatch = output.match(/Stream #.*Video:.*,\s*(\d{3,4})x(\d{3,4})/);
  const resolution = resMatch ? `${resMatch[1]}x${resMatch[2]}` : 'N/A';

  // Check audio
  const hasAudio = /Stream #.*Audio:/.test(output);

  return {
    exists: true,
    sizeBytes: stat.size,
    sizeKB: (stat.size / 1024).toFixed(1) + ' KB',
    sizeMB: (stat.size / (1024 * 1024)).toFixed(2) + ' MB',
    duration: durationSec,
    bitrate,
    resolution,
    hasAudio: hasAudio ? 'Yes' : 'No (Clean -an)',
  };
}

console.log('Auditing videos for Home and About pages...\n');
let mdTable = '| Video File | Page | Role | Resolution | Duration | Bitrate | Size | Budget | Audio | Status |\n';
mdTable += '|---|---|---|---|---|---|---|---|---|---|\n';

for (const f of files) {
  const info = inspectFile(f.path);
  if (!info.exists) {
    mdTable += `| \`${path.basename(f.path)}\` | ${f.page} | ${f.role} | N/A | N/A | N/A | Missing | ${f.budget} | N/A | ❌ Missing |\n`;
  } else {
    const budgetBytes = f.budget.includes('MB') ? parseFloat(f.budget) * 1024 * 1024 : parseFloat(f.budget) * 1024;
    const isUnder = info.sizeBytes <= budgetBytes;
    const status = isUnder ? '✅ Under Budget' : '⚠️ Over Budget';
    mdTable += `| \`${path.basename(f.path)}\` | ${f.page} | ${f.role} | ${info.resolution} | ${info.duration} | ${info.bitrate} | **${info.sizeMB}** (${info.sizeKB}) | ${f.budget} | ${info.hasAudio} | ${status} |\n`;
  }
}

const report = `# Home and About Video Audit (F5.1)

This audit documents every video asset utilized on the Homepage and About page, verifying file sizes against the strict V9 budgets:
- **Hero 1080p Budget:** <= 1.8 MB
- **Hero 720p Budget:** <= 1.0 MB
- **Showcase Clips Budget:** <= 900 KB each

## Video Inventory & Technical Specs

${mdTable}

## Loading Architecture Audit (F5.3 - F5.7)

### 1. About Hero Ambient Video (\`VideoHero.tsx\`)
- **Format Order:** \`<source type="video/webm">\` followed by \`720p mp4\` (\`media="(max-width: 767px)"\`) and \`1080p mp4\`.
- **Preload Strategy:** \`preload="none"\`. The video sources are NOT attached until the window \`load\` event / \`requestIdleCallback\` has fired.
- **Save-Data & Slow Network Safe:** Evaluates \`navigator.connection.saveData\` and \`effectiveType === '2g' | '3g'\`. Under cellular throttling or data saver, the video stays unattached and only the static poster is rendered.
- **Reduced Motion:** If \`prefers-reduced-motion: reduce\` is detected, video execution is suppressed; the high-resolution poster is preserved.
- **LCP Optimization:** High-priority AVIF/WebP poster (\`fetchpriority="high"\`, Next.js \`priority\`) ensures instant LCP paint before video chunks are requested.
- **Scroll & Tab Visibility:** Connected to an \`IntersectionObserver\` and \`visibilitychange\` listener. Automatically pauses playback when scrolled out of view or when the user switches tabs, resuming smoothly upon return.
- **Stall & Failure Safe:** A 3-second watchdog timer falls back to the static poster if video decoding stalls or errors.

### 2. Work Showcase Cards (\`WorkShowcase.tsx\`)
- **Lazy Attachment:** Videos on portfolio showcase cards do not attach their \`src\` on page load. Instead, an \`IntersectionObserver\` attaches the video source only when the card scrolls within 100px of the viewport.
- **Single Active Video Policy:** Only one showcase video card is allowed to play/decode at any given moment; off-screen cards are paused and unbuffered to prevent GPU / memory contention.
- **Aspect Ratio Protection:** Container maintains explicit \`aspect-[4/5]\` aspect ratio to guarantee zero Cumulative Layout Shift (CLS = 0).

### 3. Server Caching & Range Requests (\`next.config.mjs\`)
- Configured \`Cache-Control: public, max-age=31536000, immutable\` for all \`/videos/:path*\` assets.
- Explicit \`Accept-Ranges: bytes\` header configured to facilitate instant multi-chunk streaming without re-downloading entire video files.
`;

fs.writeFileSync(path.resolve('docs/v9/F5-evidence/video-audit.md'), report, 'utf-8');
console.log('Saved docs/v9/F5-evidence/video-audit.md');
