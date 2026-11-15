import fs from 'fs';

const t0 = JSON.parse(fs.readFileSync('docs/v6/T0-evidence/baseline-metrics.json', 'utf8'));
const t8 = JSON.parse(fs.readFileSync('docs/v6/T8-evidence/baseline-metrics.json', 'utf8'));

console.log('=== NORMAL PROFILE (1x CPU) ===');
for (const r of t0.filter(x => x.profile === 'normal')) {
  const m8 = t8.find(x => x.route === r.route && x.profile === 'normal') || {};
  console.log(
    `${r.route.padEnd(26)} | T0 p95: ${r.stats.p95.toFixed(1).padStart(5)}ms, LT: ${r.longTasksCount.toString().padStart(2)} (max ${r.maxLongTask.toFixed(0).padStart(4)}ms) -> T8 p95: ${m8.stats?.p95.toFixed(1).padStart(5)}ms, LT: ${m8.longTasksCount?.toString().padStart(2)} (max ${m8.maxLongTask?.toFixed(0).padStart(4)}ms)`
  );
}

console.log('\n=== 4x CPU SLOWDOWN PROFILE ===');
for (const r of t0.filter(x => x.profile === 'cpu-4x')) {
  const m8 = t8.find(x => x.route === r.route && x.profile === 'cpu-4x') || {};
  console.log(
    `${r.route.padEnd(26)} | T0 median: ${r.stats.median.toFixed(1).padStart(5)}ms, p95: ${r.stats.p95.toFixed(1).padStart(5)}ms, LT: ${r.longTasksCount.toString().padStart(3)} -> T8 median: ${m8.stats?.median.toFixed(1).padStart(5)}ms, p95: ${m8.stats?.p95.toFixed(1).padStart(5)}ms, LT: ${m8.longTasksCount?.toString().padStart(3)}`
  );
}
