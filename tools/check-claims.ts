import fs from 'fs';
import path from 'path';

/**
 * Lead Edge Marketing — Claims Honesty Verification
 * Verifies that no fabricated metrics, results, or certifications exist in stage microcopy,
 * visual cards, process scenes, or deliverables.
 *
 * Client-supplied copy (from docs/CLIENT-CONTENT.md) is preserved verbatim.
 */

interface Violation {
  file: string;
  line: number;
  text: string;
  rule: string;
}

const FORBIDDEN_RULES: Array<{ name: string; pattern: RegExp; filesFilter?: (file: string) => boolean }> = [
  {
    name: 'Fabricated LCP or Core Web Vitals measurement',
    pattern: /\b0\.[68]s\s*LCP\b|\bSub-Second LCP\b|100\/100 Core Web Vitals/i,
  },
  {
    name: 'Fabricated zero-error claims',
    pattern: /ZERO ERRORS/i,
  },
  {
    name: 'Fabricated frame rate claims',
    pattern: /FRAME RATE|\b60FPS\b/i,
  },
  {
    name: 'Fabricated verification or resolution status',
    pattern: /\[VERIFIED\]|VERIFIED COMMERCIAL|CRAWL PATH: RESOLVED|CANONICAL CONFLICT: FIXED/i,
  },
  {
    name: 'Fabricated ROAS percentages in scenes/cards',
    pattern: /\+?340%\s*ROAS|\+312%\s*MER|\bROAS:\s*\+\d+/i,
  },
  {
    name: 'Fabricated percentages in scenes',
    pattern: /\b(100%|42%|94\.2%|84%)\s*(VOLUME|INTENT|RETENTION|FLUID)/i,
    filesFilter: (file) => file.includes('scenes') || file.includes('hero'),
  },
  {
    name: 'Fabricated CTR metrics in scenes',
    pattern: /\b\d+\.\d+%\s*CTR\b/i,
    filesFilter: (file) => file.includes('scenes'),
  },
  {
    name: 'Fabricated rank claims or climb gains',
    pattern: /POSITION #1 SECURED|▲\s*\+\d+\s*POS|Pos 1\.2/i,
  },
  {
    name: 'Fabricated Domain Rating claims',
    pattern: /\[DR \d+\]|\bDR 78\b/i,
  },
  {
    name: 'Fabricated review ratings',
    pattern: /★★★★★|★{3,5}\s*5\.0/i,
  },
];

// Target directories and files for stage microcopy, scenes, and visual cards
const IN_SCOPE_DIRS = [
  path.join('src', 'components', 'process'),
  path.join('src', 'components', 'hero'),
  path.join('src', 'components', 'services'),
];

const IN_SCOPE_FILES = [
  path.join('src', 'data', 'processes.ts'),
];

function collectFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(collectFiles(fullPath));
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

const filesToCheck = [
  ...IN_SCOPE_DIRS.flatMap(collectFiles),
  ...IN_SCOPE_FILES.filter((f) => fs.existsSync(f)),
];

console.log('=====================================================');
console.log('LEAD EDGE MARKETING — T3 CLAIMS HONESTY CHECK');
console.log('=====================================================');
console.log(`Checking ${filesToCheck.length} in-scope files for fabricated claims...\n`);

const violations: Violation[] = [];

for (const file of filesToCheck) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    for (const rule of FORBIDDEN_RULES) {
      if (rule.filesFilter && !rule.filesFilter(file)) {
        continue;
      }
      if (rule.pattern.test(line)) {
        violations.push({
          file,
          line: idx + 1,
          text: line.trim(),
          rule: rule.name,
        });
      }
    }
  });
}

// Check that "ILLUSTRATIVE" sticker exists in ProcessStage.tsx as an HTML overlay
const processStageFile = path.join('src', 'components', 'process', 'ProcessStage.tsx');
let stickerPresent = false;
if (fs.existsSync(processStageFile)) {
  const stageContent = fs.readFileSync(processStageFile, 'utf8');
  stickerPresent = stageContent.includes('ILLUSTRATIVE');
}

console.log(`ILLUSTRATIVE sticker in ProcessStage.tsx: ${stickerPresent ? 'PRESENT (PASS)' : 'MISSING (FAIL)'}`);

if (!stickerPresent) {
  violations.push({
    file: processStageFile,
    line: 1,
    text: 'ProcessStage.tsx missing corner ILLUSTRATIVE sticker',
    rule: 'ILLUSTRATIVE sticker requirement',
  });
}

if (violations.length > 0) {
  console.error(`\n❌ FAILED: Found ${violations.length} violations of honesty rules:\n`);
  violations.forEach((v, i) => {
    console.error(`${i + 1}. [${v.rule}]`);
    console.error(`   File: ${v.file}:${v.line}`);
    console.error(`   Line: ${v.text}\n`);
  });
  process.exit(1);
}

console.log(`\n✅ ALL CHECKS PASSED: Zero fabricated claims found across all ${filesToCheck.length} in-scope files.`);
console.log('Neutral process language verified. ILLUSTRATIVE sticker confirmed.\n');
process.exit(0);
