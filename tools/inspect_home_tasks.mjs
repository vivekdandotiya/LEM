import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('docs/v6/T1-evidence/traces/home-normal.json', 'utf8'));
const events = raw.traceEvents || [];

// Look for v8.callFunction or EvaluateScript or FunctionCall with high dur
const mainThreadEvents = events
  .filter(e => (e.cat.includes('devtools.timeline') || e.cat.includes('v8')) && e.dur > 20000)
  .sort((a, b) => b.dur - a.dur);

console.log('Top main-thread events in home-normal:');
for (const e of mainThreadEvents.slice(0, 15)) {
  const durMs = (e.dur / 1000).toFixed(1);
  console.log(`  ${e.name} (${e.cat}): ${durMs}ms, ts=${(e.ts/1000).toFixed(0)}ms, args=${JSON.stringify(e.args || {})}`);
}
