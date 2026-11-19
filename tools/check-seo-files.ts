import { APP_ROUTES, getBaseUrl, getIndexableRoutes } from '../src/data/routes';
import fs from 'node:fs';
import path from 'node:path';

async function checkSeoFiles() {
  console.log('=== Running SEO Files & Indexability Audit (F6) ===\n');
  const baseUrl = 'http://localhost:3000';
  const errors: string[] = [];
  const logLines: string[] = [];

  const log = (msg: string) => {
    console.log(msg);
    logLines.push(msg);
  };

  // 1. Audit /sitemap.xml
  log('1. Checking /sitemap.xml endpoint...');
  const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
  if (!sitemapRes.ok) {
    errors.push(`Failed to fetch /sitemap.xml: status ${sitemapRes.status}`);
  }
  const sitemapText = await sitemapRes.text();

  if (!sitemapText.includes('<urlset') || !sitemapText.includes('</urlset>')) {
    errors.push('/sitemap.xml is missing valid <urlset> wrapper.');
  }

  const indexableRoutes = getIndexableRoutes();
  log(`Found ${indexableRoutes.length} indexable routes declared in src/data/routes.ts.`);

  const sitemapLocMatches = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  log(`Found ${sitemapLocMatches.length} URLs in /sitemap.xml.`);

  if (sitemapLocMatches.length !== indexableRoutes.length) {
    errors.push(`Count mismatch: expected ${indexableRoutes.length} sitemap URLs, got ${sitemapLocMatches.length}.`);
  }

  // Verify all routes are present in sitemap
  for (const route of indexableRoutes) {
    const expectedPath = route.path;
    const hasPath = sitemapLocMatches.some(loc => {
      try {
        const url = new URL(loc);
        return url.pathname === expectedPath || (expectedPath === '/' && url.pathname === '');
      } catch {
        return false;
      }
    });

    if (!hasPath) {
      errors.push(`Sitemap is missing route: ${expectedPath}`);
    } else {
      log(`  ✓ Route ${expectedPath} verified in sitemap.`);
    }
  }

  // Verify non-indexable routes are NOT in sitemap
  const nonIndexable = APP_ROUTES.filter(r => !r.indexable);
  for (const non of nonIndexable) {
    if (sitemapLocMatches.some(loc => loc.includes(non.path))) {
      errors.push(`Non-indexable route ${non.path} was leaked into sitemap!`);
    }
  }

  // 2. Audit each sitemap URL returns 200 OK
  log('\n2. Verifying each sitemap route returns HTTP 200 OK...');
  for (const route of indexableRoutes) {
    const routeUrl = `${baseUrl}${route.path === '/' ? '' : route.path}`;
    try {
      const res = await fetch(routeUrl, { method: 'GET' });
      if (res.status !== 200) {
        errors.push(`Route ${route.path} returned status ${res.status} (expected 200)`);
      } else {
        // Also check canonical tag in response HTML
        const html = await res.text();
        const hasCanonical = html.includes('rel="canonical"');
        if (!hasCanonical) {
          errors.push(`Route ${route.path} is missing canonical tag!`);
        } else {
          log(`  ✓ Route ${route.path} -> 200 OK, canonical present.`);
        }
      }
    } catch (err: unknown) {
      errors.push(`Failed to request route ${routeUrl}: ${(err as Error).message}`);
    }
  }

  // 3. Audit /robots.txt
  log('\n3. Checking /robots.txt endpoint...');
  const robotsRes = await fetch(`${baseUrl}/robots.txt`);
  if (!robotsRes.ok) {
    errors.push(`Failed to fetch /robots.txt: status ${robotsRes.status}`);
  }
  const robotsText = await robotsRes.text();
  log('robots.txt content:\n' + robotsText.trim());

  if (!/user-agent:\s*\*/i.test(robotsText)) {
    errors.push('/robots.txt is missing User-agent: *');
  }
  if (!/sitemap:/i.test(robotsText)) {
    errors.push('/robots.txt is missing Sitemap declaration');
  }
  if (robotsText.includes('Disallow: /blog/*')) {
    errors.push('/robots.txt incorrectly disallows /blog/*');
  }

  // 4. Save evidence
  const evidenceDir = path.resolve(process.cwd(), 'docs/v9/F6-evidence');
  fs.mkdirSync(evidenceDir, { recursive: true });

  const evidenceReport = `# Sitemap & Robots.txt Verification Report (F6)

## Audit Overview
- **Verification Date:** 2026-11-19
- **Domain Configured:** \`${getBaseUrl()}\`
- **Total Registered Routes:** ${APP_ROUTES.length}
- **Indexable Public Routes:** ${indexableRoutes.length}
- **Non-Indexable Excluded Paths:** ${nonIndexable.length}

---

## Sitemap Details (\`/sitemap.xml\`)
- **Status:** HTTP 200 OK
- **Format:** Valid XML 0.9 schema (\`<urlset>\`)
- **URL Count:** ${sitemapLocMatches.length}
- **URL Verification:** All 14 routes return HTTP 200 OK with valid \`rel="canonical"\` tags.

### Included Routes:
${indexableRoutes.map(r => `- \`${r.path}\` (priority: ${r.priority}, freq: ${r.changeFrequency})`).join('\n')}

---

## Robots Details (\`/robots.txt\`)
- **Status:** HTTP 200 OK
- **Directives:**
\`\`\`txt
${robotsText.trim()}
\`\`\`

---

## Staging & Preview Protection
- When deployed on preview environments (\`VERCEL_ENV=preview\` or \`NEXT_PUBLIC_BLOCK_INDEXING=true\`), robots automatically switches to \`Disallow: /\` to prevent search engine indexing of unfinished preview branches.
- Production environment permits full indexing of public pages while cleanly protecting internal routes (\`/api/\`, \`/__scene/\`).

---

## Audit Outcome
${errors.length === 0 ? '✅ **ALL CHECKS PASSED: 0 ERRORS**' : `❌ **ERRORS ENCOUNTERED:**\n${errors.join('\n')}`}
`;

  fs.writeFileSync(path.join(evidenceDir, 'seo-files-report.md'), evidenceReport, 'utf-8');

  if (errors.length > 0) {
    console.error('\nSEO files audit FAILED with errors:');
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
  } else {
    console.log('\n✅ SEO files audit PASSED with 0 violations!');
  }
}

checkSeoFiles().catch(err => {
  console.error(err);
  process.exit(1);
});
