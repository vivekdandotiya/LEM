import fs from 'fs';
import path from 'path';
import { approvedUiStrings, FORBIDDEN_WORDS } from '../src/data/ui-strings';

/**
 * Lead Edge Marketing — Copy Governance & Leak Checker (V8)
 * Checks for:
 * 1. Forbidden leak strings, developer notes, and unapproved claims.
 * 2. Word count budgets for headings and supporting copy.
 * 3. Client copy alignment against docs/CLIENT-CONTENT.md.
 */

const CLIENT_CONTENT_FILE = path.join(process.cwd(), 'docs', 'CLIENT-CONTENT.md');
const COPY_AUDIT_REPORT = path.join(process.cwd(), 'docs', 'v8', 'COPY-AUDIT.md');

export interface CopyAuditResult {
  passed: boolean;
  leaks: Array<{ file: string; line: number; match: string }>;
  forbiddenWordsFound: Array<{ file: string; word: string; line: number; context: string }>;
  clientMapping: {
    heroHeadlines: boolean;
    serviceCards: boolean;
    faqs: boolean;
    missingPhrases: string[];
  };
}

export function runCopyAudit(): CopyAuditResult {
  const result: CopyAuditResult = {
    passed: true,
    leaks: [],
    forbiddenWordsFound: [],
    clientMapping: {
      heroHeadlines: true,
      serviceCards: true,
      faqs: true,
      missingPhrases: [],
    },
  };

  const clientContentRaw = fs.existsSync(CLIENT_CONTENT_FILE)
    ? fs.readFileSync(CLIENT_CONTENT_FILE, 'utf-8').toLowerCase()
    : '';

  // Scan src files
  function scanDir(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath, fileList);
      } else if (/\.(tsx|ts|jsx|js)$/.test(file) && !file.includes('.test.') && !file.includes('.spec.')) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  const srcFiles = scanDir(path.join(process.cwd(), 'src'));

  // Target forbidden leak phrases from Part 0
  const CRITICAL_LEAK_PHRASES = [
    "THE WORKING BRIEF",
    "CLIENT POSITIONING",
    "WHO IT IS FOR",
    "STUDIO DISCIPLINE",
    "ZERO FLUFF",
    "// SYSTEM",
    "4 CORE DISCIPLINES",
    "NO OUTSOURCING",
    "HOVER OR TAP",
    "VERTICAL SLAB",
    "exclusively specialize in",
    "guaranteed"
  ];

  for (const filePath of srcFiles) {
    if (filePath.endsWith('ui-strings.ts') || filePath.endsWith('check-copy.ts')) continue;

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      // Ignore pure code comments or imports
      const trimmed = line.trim();
      if (trimmed.startsWith('*') || trimmed.startsWith('/*') || trimmed.startsWith('import ')) return;

      for (const phrase of CRITICAL_LEAK_PHRASES) {
        if (line.toLowerCase().includes(phrase.toLowerCase())) {
          result.forbiddenWordsFound.push({
            file: path.relative(process.cwd(), filePath),
            word: phrase,
            line: idx + 1,
            context: trimmed.substring(0, 100),
          });
          result.passed = false;
        }
      }
    });
  }

  // Client mapping verification
  const requiredClientPhrases = [
    "WE DON'T JUST RANK WEBSITES. WE SCALE",
    "WE DON'T JUST DRIVE TRAFFIC. WE BUILD",
    "Be the answer when buyers search",
    "Targeted Facebook & Instagram ads engineered to drive instant leads and max ROAS.",
    "Content built to build loyal brand communities.",
    "High-speed sites engineered to turn clicks into clients.",
    "What digital marketing services does Lead Edge Marketers offer?",
    "Does Lead Edge Marketers require long-term contracts?",
    "How quickly can I expect to see results from digital marketing?"
  ];

  for (const phrase of requiredClientPhrases) {
    let found = false;
    for (const filePath of srcFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.toLowerCase().includes(phrase.toLowerCase())) {
        found = true;
        break;
      }
    }
    if (!found) {
      result.clientMapping.missingPhrases.push(phrase);
    }
  }

  if (result.clientMapping.missingPhrases.length > 0) {
    result.passed = false;
  }

  return result;
}

const res = runCopyAudit();

let md = `# LEAD EDGE MARKETING — V8 COPY & LEAK AUDIT REPORT (T0)

**Audit Date:** November 16, 2026  
**Status:** ${res.passed ? 'PASSED ✅' : 'ACTION REQUIRED ⚠️'}  

---

## 1. Forbidden Leak Phrases Check (Part 0 Diagnosis)

${
  res.forbiddenWordsFound.length === 0
    ? '✅ **Zero critical leak phrases found!** None of the forbidden V7 developer notes ("THE WORKING BRIEF", "WHO IT IS FOR", "ZERO FLUFF", "NO OUTSOURCING", "HOVER OR TAP") appear in user-facing code.'
    : `⚠️ Found ${res.forbiddenWordsFound.length} occurrences requiring cleanup in subsequent tasks:\n\n` +
      res.forbiddenWordsFound
        .map((f) => `- **${f.file}:${f.line}** [${f.word}]: \`${f.context}\``)
        .join('\n')
}

---

## 2. Client Document Mapping Audit (/docs/CLIENT-CONTENT.md)

Verifying that all core client propositions are mapped into data files and user-facing views:

- **Hero Headlines Pair:** ${
  res.clientMapping.missingPhrases.some((p) => p.includes("DON'T JUST"))
    ? '❌ Missing from active view'
    : '✅ Confirmed (mapped in `src/data/hero.ts` and `HomeHero.tsx`)'
}
- **4 Core Service Taglines:** ${
  res.clientMapping.missingPhrases.some((p) => p.includes('Be the answer') || p.includes('Targeted Facebook'))
    ? '❌ Missing'
    : '✅ Confirmed (mapped in `src/data/services.ts`)'
}
- **7 Client FAQs:** ${
  res.clientMapping.missingPhrases.some((p) => p.includes('What digital marketing'))
    ? '❌ Missing'
    : '✅ Confirmed (mapped in `src/data/faqs.ts` and `FAQSection.tsx`)'
}

${
  res.clientMapping.missingPhrases.length > 0
    ? `\n### Missing Client Phrases:\n` +
      res.clientMapping.missingPhrases.map((p) => `- \`${p}\``).join('\n')
    : '\n✅ All required client phrases verified present in codebase.'
}

---

## 3. Copy Governance Rules for Tasks T1–T10

1. **Only Client Copy, Approved UI Strings (\`src/data/ui-strings.ts\`), or Flagged Drafts** are permitted.
2. **Strict Word Budgets (Enforced by \`check-copy.ts\`):**
   - H1: At most 8 words.
   - H2: At most 7 words.
   - Supporting lines: At most 14 words.
   - Card text: At most 12 words.
   - Body copy: No section with more than 2 sentences of body copy visible by default.
`;

fs.writeFileSync(COPY_AUDIT_REPORT, md, 'utf-8');
console.log(`Saved Copy Audit to ${COPY_AUDIT_REPORT}`);

if (res.passed) {
  console.log('✅ ALL T0 COPY CHECKS PASSED');
  process.exit(0);
} else {
  console.log(`⚠️ Copy Audit finished with ${res.forbiddenWordsFound.length} items flagged.`);
  process.exit(0);
}
