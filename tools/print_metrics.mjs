import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('docs/v6/T1-evidence/baseline-metrics.json', 'utf8'));
console.log('Route                     | Profile      | Median   | p95      | Max      | LongTasks  | Max LT');
console.log('---------------------------------------------------------------------------------------------');
for (const d of raw) {
  const r = d.route.padEnd(25);
  const p = d.profile.padEnd(12);
  const m = d.stats.median.toFixed(1).padEnd(8);
  const p95 = d.stats.p95.toFixed(1).padEnd(8);
  const max = d.stats.max.toFixed(1).padEnd(8);
  const lt = String(d.longTasksCount).padEnd(10);
  const maxLt = d.maxLongTask.toFixed(1);
  console.log(`${r} | ${p} | ${m} | ${p95} | ${max} | ${lt} | ${maxLt}`);
}
