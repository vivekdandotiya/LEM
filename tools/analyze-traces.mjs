import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirName = process.argv[2] || 'T0-evidence';
const TRACE_DIR = path.resolve(__dirname, '..', 'docs', 'v6', targetDirName, 'traces');

function analyzeTrace(filename) {
  const filePath = path.join(TRACE_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  console.log(`Analyzing ${filename}...`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const events = data.traceEvents || [];

  const durations = {};
  const longEvents = [];

  for (const e of events) {
    if (e.dur) {
      const name = e.name;
      const ms = e.dur / 1000;
      durations[name] = (durations[name] || 0) + ms;

      if (ms > 20) {
        longEvents.push({
          name: e.name,
          duration: ms,
          args: e.args,
          ts: e.ts,
        });
      }
    }
  }

  // Sort categories by total duration
  const sortedCategories = Object.entries(durations)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15);

  return {
    filename,
    categories: sortedCategories,
    longEvents: longEvents.sort((a, b) => b.duration - a.duration).slice(0, 10),
  };
}

const report = [
  analyzeTrace('home-normal.json'),
  analyzeTrace('home-cpu-4x.json'),
  analyzeTrace('services-seo-normal.json'),
  analyzeTrace('services-seo-cpu-4x.json'),
];

fs.writeFileSync(
  path.resolve(__dirname, '..', 'docs', 'v6', targetDirName, 'trace-analysis.json'),
  JSON.stringify(report, null, 2)
);
console.log(`Analysis saved to docs/v6/${targetDirName}/trace-analysis.json`);
