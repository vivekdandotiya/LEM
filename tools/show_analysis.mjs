import fs from 'fs';

const data = JSON.parse(fs.readFileSync('docs/v6/T0-evidence/trace-analysis.json', 'utf8'));
for (const [k, v] of Object.entries(data)) {
  console.log(`=== ${k} ===`);
  for (const off of (v.topOffenders || []).slice(0, 6)) {
    console.log(`  ${off.name}: count=${off.count}, total=${off.totalDurationMs}ms, max=${off.maxDurationMs}ms`);
  }
}
