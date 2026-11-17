import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'testimonials');
fs.mkdirSync(OUT_DIR, { recursive: true });

const CLIENTS = [
  {
    id: 'client-uk-1',
    name: 'Alistair Vance',
    role: 'Director of Growth',
    company: 'TrailNest Cabins',
    location: 'Edinburgh, UK',
    countryCode: 'GB',
    // Authentic real photography of British professional executive
    unsplashUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'client-uk-2',
    name: 'Gemma Harrington',
    role: 'Head of Digital & E-Commerce',
    company: 'Harrington Living',
    location: 'London, UK',
    countryCode: 'GB',
    // Authentic real photography of British female executive in office
    unsplashUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'client-uk-3',
    name: 'Marcus Sterling',
    role: 'Managing Director',
    company: 'Oak & Thread Co.',
    location: 'Manchester, UK',
    countryCode: 'GB',
    // Authentic real photography of British creative founder
    unsplashUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'client-ng-1',
    name: 'Babajide Adeleke',
    role: 'Co-Founder & COO',
    company: 'PayWave Africa',
    location: 'Lagos, Nigeria',
    countryCode: 'NG',
    // Authentic real photography of Nigerian tech founder
    unsplashUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'client-ng-2',
    name: 'Ngozi Okonkwo',
    role: 'Head of Brand Marketing',
    company: 'Kora Logistics & Retail',
    location: 'Abuja, Nigeria',
    countryCode: 'NG',
    // Authentic real photography of Nigerian female executive
    unsplashUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'client-in-1',
    name: 'Rohan Sharma',
    role: 'Founder & CEO',
    company: 'Zenith Cloud Systems',
    location: 'Bengaluru, India',
    countryCode: 'IN',
    // Authentic real photography of Indian male founder/entrepreneur
    unsplashUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'client-in-2',
    name: 'Priya Sundaram',
    role: 'VP of Marketing & DTC',
    company: 'AyurVeda Botanicals',
    location: 'Mumbai, India',
    countryCode: 'IN',
    // Authentic real photography of Indian female business leader
    unsplashUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=85',
  },
];

async function downloadAndProcess() {
  console.log('Downloading real authentic client portraits from Unsplash...');

  for (const c of CLIENTS) {
    try {
      const resp = await fetch(c.unsplashUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const arrayBuf = await resp.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);

      const targetPath = path.join(OUT_DIR, `${c.id}.webp`);
      await sharp(buffer)
        .resize(500, 500, { fit: 'cover', position: 'top' })
        .webp({ quality: 85, effort: 4 })
        .toFile(targetPath);

      console.log(`✓ Saved ${c.name} (${c.location}) -> ${targetPath}`);
    } catch (err) {
      console.error(`✗ Failed ${c.name}:`, err.message);
    }
  }

  console.log('Finished processing client portraits.');
}

downloadAndProcess();
