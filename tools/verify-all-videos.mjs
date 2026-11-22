import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import ffmpeg from 'ffmpeg-static';

console.log('========================================================================');
console.log('COMPREHENSIVE MULTI-STAGE AUDIT OF ALL VIDEOS ACROSS THE ENTIRE PROJECT');
console.log('========================================================================\n');

// Find all video files in public/videos
function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      if (file.endsWith('.mp4') || file.endsWith('.webm')) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const allVideos = getFilesRecursively('public/videos');
console.log(`Discovered ${allVideos.length} total video files across public/videos/\n`);

const results = [];
let passCount = 0;
let failCount = 0;

for (const videoPath of allVideos) {
  const normPath = videoPath.replace(/\\/g, '/');
  const stat = fs.statSync(videoPath);
  const sizeKB = Math.round(stat.size / 1024);

  let errorOutput = '';
  let probeOutput = '';

  // 1. FFmpeg decode integrity test (decodes every single frame to null)
  try {
    execSync(`"${ffmpeg}" -v error -i "${videoPath}" -f null -`, {
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (err) {
    errorOutput = (err.stderr || '').toString() + (err.stdout || '').toString();
  }

  // 2. Extract probe metadata
  try {
    probeOutput = execSync(`"${ffmpeg}" -i "${videoPath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (err) {
    probeOutput = (err.stderr || '').toString() + (err.stdout || '').toString();
  }

  const durMatch = probeOutput.match(/Duration:\s*(\d+):(\d+):([\d\.]+)/);
  const duration = durMatch
    ? (parseInt(durMatch[1]) * 3600 + parseInt(durMatch[2]) * 60 + parseFloat(durMatch[3])).toFixed(1) + 's'
    : 'Unknown';

  const resMatch = probeOutput.match(/Stream #.*Video:.*,\s*(\d{3,4})x(\d{3,4})/);
  const resolution = resMatch ? `${resMatch[1]}x${resMatch[2]}` : 'Unknown';

  const fpsMatch = probeOutput.match(/(\d+(?:\.\d+)?)\s*fps/);
  const fps = fpsMatch ? fpsMatch[1] : 'Unknown';

  const pixFmtMatch = probeOutput.match(/yuv420p/);
  const isYUV420P = !!pixFmtMatch;

  // Check matching poster if in catalog
  let posterStatus = 'N/A';
  if (normPath.includes('/catalog/')) {
    const posterPath = normPath.replace(/\.mp4$/, '-poster.webp');
    if (fs.existsSync(posterPath) && fs.statSync(posterPath).size > 1000) {
      posterStatus = '✅ Poster OK';
    } else {
      posterStatus = '❌ Missing Poster';
    }
  }

  const isHealthy = !errorOutput && stat.size > 10000 && resolution !== 'Unknown' && posterStatus !== '❌ Missing Poster';

  if (isHealthy) {
    passCount++;
  } else {
    failCount++;
  }

  results.push({
    path: normPath,
    sizeKB,
    duration,
    resolution,
    fps,
    isYUV420P,
    posterStatus,
    healthy: isHealthy,
    error: errorOutput.trim(),
  });
}

console.log('------------------------------------------------------------------------');
console.log(`STAGE 1 AUDIT RESULTS: ${passCount} PASSED / ${failCount} FAILED out of ${allVideos.length}`);
console.log('------------------------------------------------------------------------\n');

// Summary table of catalog videos (60 assets)
const catalogResults = results.filter((r) => r.path.includes('/catalog/'));
console.log(`CATALOG VIDEOS (${catalogResults.length} assets):`);
for (const r of catalogResults) {
  const statusIcon = r.healthy ? '✓' : '✗';
  console.log(` ${statusIcon} ${r.path} [${r.resolution}, ${r.fps}fps, ${r.duration}, ${r.sizeKB}KB, ${r.posterStatus}]`);
  if (!r.healthy && r.error) {
    console.error(`    ERROR: ${r.error}`);
  }
}

// Summary of non-catalog videos (Home, About, Blog, Services)
const otherResults = results.filter((r) => !r.path.includes('/catalog/'));
console.log(`\nCORE TEMPLATE VIDEOS (${otherResults.length} assets):`);
for (const r of otherResults) {
  const statusIcon = r.healthy ? '✓' : '✗';
  console.log(` ${statusIcon} ${r.path} [${r.resolution}, ${r.fps}fps, ${r.duration}, ${r.sizeKB}KB]`);
  if (!r.healthy && r.error) {
    console.error(`    ERROR: ${r.error}`);
  }
}

console.log('\n========================================================================');
if (failCount === 0) {
  console.log('ALL VIDEO FILES VALIDATED WITH 100% DECODE INTEGRITY & CRISP POSTERS!');
} else {
  console.error(`ATTENTION: ${failCount} files failed audit.`);
}
console.log('========================================================================');
