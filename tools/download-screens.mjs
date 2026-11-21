import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const SLUGS = [
  'audiology',
  'bookkeeper',
  'builder',
  'conveyancer',
  'driving-school',
  'naturopath',
  'plumber',
  'orthodontist',
  'kids-sports',
  'podiatry',
  'wills-estates',
  'recruitment',
  'dance-studio',
  'aged-care',
  'childcare',
  'electrician',
  'architect',
  'painter',
];

const targetBase = path.resolve('public/images/screens');

async function download(slug) {
  const dir = path.join(targetBase, slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, 'poster-480.webp');
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
    console.log(`Already exists: ${slug}`);
    return;
  }

  const url = `https://bdog.com.au/assets/screens/${slug}/poster-480.webp`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${slug}: HTTP ${res.statusCode}`);
        resolve();
        return;
      }
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${slug} (${fs.statSync(filePath).size} bytes)`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error ${slug}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  console.log('Downloading 18 bdog screen posters...');
  for (const slug of SLUGS) {
    await download(slug);
  }
  console.log('Finished downloading all screens!');
}

run();
