import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import path from 'path';

console.log('Testing ffmpeg with ffmpeg-static at:', ffmpegPath);
const out = execSync(`"${ffmpegPath}" -version`, { encoding: 'utf-8' });
console.log('FFmpeg version line 1:', out.split('\n')[0]);
