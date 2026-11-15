import fs from 'fs';

function inspectTrace(filename) {
  console.log(`\n=== Inspecting ${filename} ===`);
  const raw = JSON.parse(fs.readFileSync(filename, 'utf8'));
  const events = raw.traceEvents || [];
  
  // Find top duration events
  const longEvents = events
    .filter(e => e.dur && e.dur > 30000) // > 30ms
    .sort((a, b) => b.dur - a.dur)
    .slice(0, 10);
    
  for (const e of longEvents) {
    const durMs = (e.dur / 1000).toFixed(1);
    console.log(`  Name: ${e.name}, cat: ${e.cat}, dur: ${durMs}ms, args: ${JSON.stringify(e.args || {})}`);
  }
}

inspectTrace('docs/v6/T1-evidence/traces/home-normal.json');
inspectTrace('docs/v6/T1-evidence/traces/services-seo-normal.json');
