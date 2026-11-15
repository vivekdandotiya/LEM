# T5 Video Pipeline Documentation

All 16 video stage clips (4 services × 4 phases) were encoded from the T3-sanitized editorial stage canvases at 16:10 aspect ratio.

## FFmpeg Encoding Profiles

### 1. Desktop 1080p Master (H.264 MP4)
```bash
ffmpeg -y -i input.webm -t 6 -vf "scale=1920:1200" -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an output.mp4
```

### 2. Desktop WebM Variant (VP9)
```bash
ffmpeg -y -i input.webm -t 6 -vf "scale=1920:1200" -c:v libvpx-vp9 -crf 33 -b:v 0 -an output.webm
```

### 3. Mobile 720p Variant (H.264 MP4)
```bash
ffmpeg -y -i input.webm -t 6 -vf "scale=1152:720" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an output-720p.mp4
```

## File Size Log (Target: < 1,800 KB desktop, < 900 KB mobile)

| Clip Name | MP4 1080p | WebM VP9 | Mobile 720p | Poster WebP | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `seo-phase-0` | 142 KB | 140 KB | 60 KB | 48 KB | ✅ PASS |
| `seo-phase-1` | 200 KB | 184 KB | 81 KB | 35 KB | ✅ PASS |
| `seo-phase-2` | 214 KB | 210 KB | 84 KB | 35 KB | ✅ PASS |
| `seo-phase-3` | 215 KB | 211 KB | 85 KB | 35 KB | ✅ PASS |
| `ppc-phase-0` | 207 KB | 196 KB | 84 KB | 35 KB | ✅ PASS |
| `ppc-phase-1` | 230 KB | 195 KB | 87 KB | 35 KB | ✅ PASS |
| `ppc-phase-2` | 227 KB | 194 KB | 94 KB | 35 KB | ✅ PASS |
| `ppc-phase-3` | 221 KB | 203 KB | 87 KB | 34 KB | ✅ PASS |
| `social-media-phase-0` | 218 KB | 203 KB | 88 KB | 35 KB | ✅ PASS |
| `social-media-phase-1` | 220 KB | 212 KB | 91 KB | 35 KB | ✅ PASS |
| `social-media-phase-2` | 205 KB | 184 KB | 85 KB | 35 KB | ✅ PASS |
| `social-media-phase-3` | 171 KB | 172 KB | 72 KB | 35 KB | ✅ PASS |
| `web-development-phase-0` | 220 KB | 213 KB | 84 KB | 35 KB | ✅ PASS |
| `web-development-phase-1` | 181 KB | 167 KB | 71 KB | 35 KB | ✅ PASS |
| `web-development-phase-2` | 195 KB | 194 KB | 81 KB | 35 KB | ✅ PASS |
| `web-development-phase-3` | 234 KB | 207 KB | 90 KB | 35 KB | ✅ PASS |
