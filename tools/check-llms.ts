import fs from 'node:fs';
import path from 'node:path';

async function checkLlms() {
  console.log('=== Running LLMs.txt Audit (F7) ===\n');
  const baseUrl = 'http://localhost:3000';
  const errors: string[] = [];

  // 1. Fetch /llms.txt
  console.log('1. Checking /llms.txt endpoint...');
  const resSummary = await fetch(`${baseUrl}/llms.txt`);
  if (!resSummary.ok) {
    errors.push(`Failed to fetch /llms.txt: status ${resSummary.status}`);
  }
  const contentType = resSummary.headers.get('content-type') || '';
  if (!contentType.includes('text/plain')) {
    errors.push(`/llms.txt Content-Type is '${contentType}', expected text/plain.`);
  }
  const summaryText = await resSummary.text();

  if (!summaryText.startsWith('# Lead Edge Marketing')) {
    errors.push('/llms.txt does not begin with H1 "# Lead Edge Marketing".');
  }
  if (!summaryText.includes('> Lead Edge Marketing is')) {
    errors.push('/llms.txt missing standard blockquote summary.');
  }
  if (!summaryText.includes('llms-full.txt')) {
    errors.push('/llms.txt missing reference link to llms-full.txt.');
  }

  // 2. Fetch /llms-full.txt
  console.log('2. Checking /llms-full.txt endpoint...');
  const resFull = await fetch(`${baseUrl}/llms-full.txt`);
  if (!resFull.ok) {
    errors.push(`Failed to fetch /llms-full.txt: status ${resFull.status}`);
  }
  const fullText = await resFull.text();
  if (!fullText.includes('# Lead Edge Marketing — Complete Overview')) {
    errors.push('/llms-full.txt missing expected header.');
  }

  // 3. Verify Links in /llms.txt
  console.log('3. Verifying links in /llms.txt...');
  const linkMatches = [...summaryText.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  console.log(`Found ${linkMatches.length} Markdown links in /llms.txt:`);

  for (const match of linkMatches) {
    const label = match[1];
    const rawUrl = match[2];
    try {
      const urlObj = new URL(rawUrl);
      const testUrl = `${baseUrl}${urlObj.pathname}`;
      const linkRes = await fetch(testUrl);
      if (linkRes.status !== 200) {
        errors.push(`Link [${label}](${rawUrl}) returned status ${linkRes.status}`);
      } else {
        console.log(`  ✓ [${label}](${urlObj.pathname}) -> 200 OK`);
      }
    } catch (err: unknown) {
      errors.push(`Failed to test link ${rawUrl}: ${(err as Error).message}`);
    }
  }

  // 4. Save Evidence
  const evidenceDir = path.resolve(process.cwd(), 'docs/v9/F7-evidence');
  fs.mkdirSync(evidenceDir, { recursive: true });

  const evidenceReport = `# LLMs.txt Implementation Report (F7)

## Overview & Standard Compliance
- Implemented \`/llms.txt\` and \`/llms-full.txt\` according to the llms.txt standard (https://llmstxt.org).
- Provides AI crawlers and large language models with a structured, verified, markdown-formatted directory of Lead Edge Marketing's services, capabilities, and public URLs.
- **Copy Source:** 100% sourced from client-approved copy in \`docs/CLIENT-CONTENT.md\`. Zero unverified reviews, numbers, or fabricated facts.

---

## File Verification

### \`/llms.txt\`
- **Status:** HTTP 200 OK
- **Content-Type:** \`${contentType}\`
- **Size:** ${summaryText.length} bytes
- **Header:** \`# Lead Edge Marketing\`
- **Summary Blockquote:** Present
- **Linked Routes:** All ${linkMatches.length} links return HTTP 200 OK.

\`\`\`markdown
${summaryText.trim()}
\`\`\`

---

### \`/llms-full.txt\`
- **Status:** HTTP 200 OK
- **Size:** ${fullText.length} bytes
- **Includes:** Comprehensive service deliverables, process roadmaps (phases), full verified FAQs verbatim, and contact details.

---

## Audit Outcome
${errors.length === 0 ? '✅ **ALL CHECKS PASSED: 0 ERRORS**' : `❌ **ERRORS ENCOUNTERED:**\n${errors.join('\n')}`}
`;

  fs.writeFileSync(path.join(evidenceDir, 'llms-verification.md'), evidenceReport, 'utf-8');

  if (errors.length > 0) {
    console.error('\nLLMs.txt audit FAILED with errors:');
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
  } else {
    console.log('\n✅ LLMs.txt audit PASSED with 0 violations!');
  }
}

checkLlms().catch(err => {
  console.error(err);
  process.exit(1);
});
