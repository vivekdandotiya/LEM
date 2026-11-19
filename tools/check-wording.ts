import fs from 'node:fs';
import path from 'node:path';

const FLAGGED_WORDS = [
  'philosophy',
  'manifesto',
  'discipline',
  'conviction',
  'rigorous',
  'synergy',
  'paradigm',
  'leverage',
  'supercharge',
  'unlock',
  'elevate',
  'holistic',
  'bespoke',
  'ecosystem',
  'seamless',
  'cutting-edge',
  'game-changer',
  'revolutionize',
  'unleash',
  'empower',
  'tailored',
  'unrivaled',
  'world-class',
  'state-of-the-art',
  'next-gen',
  'dynamic',
];

// Read verbatim client copy for whitelist checking
const clientContentFile = path.resolve('docs/CLIENT-CONTENT.md');
const clientText = fs.existsSync(clientContentFile)
  ? fs.readFileSync(clientContentFile, 'utf8').toLowerCase()
  : '';

interface Match {
  file: string;
  line: number;
  word: string;
  text: string;
  isClientCopy: boolean;
}

const nonClientViolations: Match[] = [];
const clientCopyFlags: Match[] = [];

function checkLine(file: string, lineNum: number, lineText: string) {
  const trimmed = lineText.trim();
  // Skip code comments or imports
  if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('{/*')) return;
  if (trimmed.startsWith('import ') || trimmed.includes("from 'next/dynamic'")) return;
  if (trimmed.includes('export const dynamic =')) return;
  if (trimmed.includes('prompt:') || trimmed.includes('src="/images/') || trimmed.includes("src='/images/")) return;

  const lower = trimmed.toLowerCase();

  for (const word of FLAGGED_WORDS) {
    const pattern = new RegExp(`\\b${word.replace('-', '[- ]')}\\b`, 'i');
    if (pattern.test(lower)) {
      // Check if it's purely a CSS class, variable, or technical attribute
      if (
        (word === 'dynamic' && (lower.includes('dynamic(') || lower.includes('isdynamic') || lower.includes('dynamicparams') || lower.includes('dynamicroutes') || lower.includes('next/dynamic'))) ||
        (word === 'seamless' && (lower.includes('translatey') || lower.includes('backdrop'))) ||
        (word === 'next-gen' && (lower.includes('avif') || lower.includes('webp') || lower.includes('format'))) ||
        trimmed.startsWith('{/*') ||
        trimmed.includes('//')
      ) {
        continue;
      }

      // Check if this text fragment exists in client source of truth
      // Extract visible string snippet
      const cleanSnippet = trimmed.replace(/<[^>]+>/g, '').replace(/["'`{}]/g, '').trim().toLowerCase();
      const isClient = cleanSnippet.length > 10 && clientText.includes(cleanSnippet.slice(0, 30));

      const match: Match = {
        file: file.replace(/\\/g, '/'),
        line: lineNum,
        word,
        text: trimmed,
        isClientCopy: isClient,
      };

      if (isClient) {
        clientCopyFlags.push(match);
      } else {
        nonClientViolations.push(match);
      }
    }
  }
}

function walkDir(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git', 'docs', 'tests'].includes(entry.name)) continue;
      walkDir(full);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      if (full.endsWith('ui-strings.ts')) continue; // Skip dictionary definitions
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => checkLine(full, idx + 1, line));
    }
  }
}

walkDir(path.resolve('src'));

// Write Client Copy Flags Report
const evidenceDir = path.resolve('docs/v9/F2-evidence');
if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

const clientFlagsDoc = `# Client Copy Flags (Preserved Verbatim)
This file documents instances where flagged buzzwords appear inside verbatim client copy (source: \`docs/CLIENT-CONTENT.md\`).
Per the V9 protocol rule, client copy remains untouched.

| File | Line | Flagged Word | Verbatim Snippet |
|---|---|---|---|
${clientCopyFlags.map(m => `| \`${m.file}\` | L${m.line} | **${m.word}** | \`${m.text.replace(/\|/g, '\\|')}\` |`).join('\n')}
`;

fs.writeFileSync(path.join(evidenceDir, 'client-copy-flags.md'), clientFlagsDoc, 'utf8');

console.log('=== Non-Client Buzzword Audit Results ===');
console.log(`Preserved client copy occurrences: ${clientCopyFlags.length}`);
console.log(`Non-client violations: ${nonClientViolations.length}`);

if (nonClientViolations.length > 0) {
  console.log('\nFound non-client violations:');
  nonClientViolations.forEach(v => {
    console.log(`- ${v.file}:${v.line} [${v.word}]: ${v.text}`);
  });
  process.exit(1);
} else {
  console.log('Plain language pass PASSED with 0 non-client buzzword violations!');
}
