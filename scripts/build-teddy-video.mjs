import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import ffmpeg from 'ffmpeg-static';

const framesDir = 'public/temp_frames';
if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });
const outVideosDir = 'public/videos/hero';
if (!fs.existsSync(outVideosDir)) fs.mkdirSync(outVideosDir, { recursive: true });

async function createVideo() {
  console.log('Loading base character...');
  const baseImg = await sharp('public/images/hero/teddy-character-seamless.webp').toBuffer();
  const meta = await sharp(baseImg).metadata();
  console.log('Base character dimensions:', meta.width, 'x', meta.height);

  const canvasW = 540;
  const canvasH = 620;
  const totalFrames = 300; // 10 seconds at 30 fps
  const fps = 30;

  console.log('Generating 300 animation frames...');
  for (let i = 0; i < totalFrames; i++) {
    const t = i / fps;
    let x = -560;
    let y = 60;

    if (t < 1.5) {
      // 0.0 - 1.5s: Entrance
      const p = t / 1.5;
      const eased = 1 + 1.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2);
      x = Math.round(-460 + 460 * Math.min(1, Math.max(0, eased)));
    } else if (t < 2.5) {
      // 1.5 - 2.5s: Arrive & eye contact
      const p = (t - 1.5);
      x = 0;
      y = Math.round(60 + Math.sin(p * Math.PI) * 4);
    } else if (t < 3.5) {
      // 2.5 - 3.5s: Wave 1
      const p = (t - 2.5);
      x = 0;
      y = Math.round(60 + Math.cos(p * Math.PI * 2) * 3);
    } else if (t < 5.0) {
      // 3.5 - 5.0s: Wave 2
      const p = (t - 3.5);
      x = 0;
      y = Math.round(60 + Math.sin(p * Math.PI * 2.5) * 3.5);
    } else if (t < 7.0) {
      // 5.0 - 7.0s: Exit
      const p = (t - 5.0) / 2.0;
      const eased = p * p * p;
      x = Math.round(-520 * eased);
    } else {
      // 7.0 - 10.0s: Hidden for exactly 3 seconds
      x = -600;
    }

    const frameFile = path.join(framesDir, `frame_${String(i).padStart(4, '0')}.png`);

    if (x <= -460) {
      // Pure black frame
      await sharp({
        create: {
          width: canvasW,
          height: canvasH,
          channels: 3,
          background: { r: 0, g: 0, b: 0 }
        }
      }).png().toFile(frameFile);
    } else {
      // If x is negative, extract crop or composite
      if (x < 0) {
        const visibleWidth = meta.width + x;
        if (visibleWidth > 0) {
          const croppedPart = await sharp(baseImg)
            .extract({ left: -x, top: 0, width: visibleWidth, height: meta.height })
            .toBuffer();

          await sharp({
            create: {
              width: canvasW,
              height: canvasH,
              channels: 3,
              background: { r: 0, g: 0, b: 0 }
            }
          })
          .composite([{
            input: croppedPart,
            left: 0,
            top: y
          }])
          .png()
          .toFile(frameFile);
        } else {
          await sharp({
            create: {
              width: canvasW,
              height: canvasH,
              channels: 3,
              background: { r: 0, g: 0, b: 0 }
            }
          }).png().toFile(frameFile);
        }
      } else {
        await sharp({
          create: {
            width: canvasW,
            height: canvasH,
            channels: 3,
            background: { r: 0, g: 0, b: 0 }
          }
        })
        .composite([{
          input: baseImg,
          left: x,
          top: y
        }])
        .png()
        .toFile(frameFile);
      }
    }
  }

  console.log('All 300 frames rendered! Now encoding WebM and MP4 with ffmpeg...');
  const outWebm = 'public/videos/hero/teddy-hero-anim.webm';
  const outMp4 = 'public/videos/hero/teddy-hero-anim.mp4';

  const webmCmd = `"${ffmpeg}" -y -framerate 30 -i "${framesDir}/frame_%04d.png" -c:v libvpx-vp9 -b:v 1800k -pix_fmt yuv420p "${outWebm}"`;
  execSync(webmCmd, { stdio: 'inherit' });
  console.log('WebM created successfully!');

  const mp4Cmd = `"${ffmpeg}" -y -framerate 30 -i "${framesDir}/frame_%04d.png" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 20 "${outMp4}"`;
  execSync(mp4Cmd, { stdio: 'inherit' });
  console.log('MP4 created successfully!');

  // Cleanup temporary frames
  fs.rmSync(framesDir, { recursive: true, force: true });
  console.log('Cleaned up temporary frames!');
}

createVideo().catch(err => {
  console.error('Error generating video:', err);
  process.exit(1);
});
