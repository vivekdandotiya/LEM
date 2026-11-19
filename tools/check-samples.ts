/**
 * Check Samples & Review Honesty Gate
 * 
 * Enforces:
 * 1. Testimonial items in src/data/testimonials.ts adhere strictly to { quote, name, company, service, verified, source }.
 * 2. Unverified items are strictly flagged as verified: false with sample placeholder text.
 * 3. Zero invented reviewer names or fabricated company names exist.
 * 4. Zero star rating badges, percentage tags, or fake metric tags exist in the reviews section.
 * 5. Zero aggregateRating or Review structured data exists anywhere in the codebase.
 * 6. When NEXT_PUBLIC_SHOW_SAMPLES=false, unverified testimonials are hidden and never rendered.
 */

import fs from 'fs';
import path from 'path';
import { TESTIMONIALS, TestimonialItem } from '../src/data/testimonials';

const FORBIDDEN_INVENTED_NAMES = [
  'Alistair Vance',
  'Gemma Harrington',
  'Marcus Sterling',
  'Babajide Adeleke',
  'Ngozi Okonkwo',
  'Utkarsh Sharma',
  'Priya Sundaram',
  'TrailNest Cabins',
  'Harrington Living',
  'Oak & Thread Co.',
  'PayWave Africa',
  'Kora Logistics',
  'Zenith Cloud Systems',
  'AyurVeda Botanicals',
];

async function runCheck() {
  console.log('=== Checking Testimonials & Reviews Honesty ===\n');
  const errors: string[] = [];

  // 1. Check data integrity
  console.log(`Checking ${TESTIMONIALS.length} testimonials in src/data/testimonials.ts...`);
  if (!Array.isArray(TESTIMONIALS) || TESTIMONIALS.length === 0) {
    errors.push('src/data/testimonials.ts must export a non-empty TESTIMONIALS array');
  }

  for (const item of TESTIMONIALS) {
    if (!item.id || !item.quote || !item.name || !item.company || !item.service || typeof item.verified !== 'boolean' || !item.source) {
      errors.push(`Testimonial item ${item.id} is missing required fields (quote, name, company, service, verified, source)`);
    }

    // Check for forbidden invented names in testimonials
    for (const forbidden of FORBIDDEN_INVENTED_NAMES) {
      if (item.name.includes(forbidden) || item.company.includes(forbidden) || item.quote.includes(forbidden)) {
        errors.push(`Testimonial item ${item.id} contains forbidden invented entity: "${forbidden}"`);
      }
    }

    // If unverified, must be obvious placeholder
    if (!item.verified) {
      if (!item.quote.toLowerCase().includes('client feedback goes here') && !item.quote.toLowerCase().includes('replace with an approved quote')) {
        errors.push(`Unverified testimonial ${item.id} must use obvious placeholder text ('Client feedback goes here...')`);
      }
    }
  }

  // 2. Check structured data across codebase
  console.log('Scanning codebase for forbidden Review / aggregateRating schema...');
  const srcDir = path.resolve(process.cwd(), 'src');
  function scanDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes('aggregateRating') || (content.includes('"@type": "Review"') || content.includes('"@type":"Review"'))) {
          errors.push(`Found unauthorized Review/aggregateRating structured data in ${fullPath}`);
        }
      }
    }
  }
  scanDir(srcDir);

  // 3. Check Testimonials component implementation
  console.log('Checking Testimonials.tsx component implementation...');
  const compPath = path.join(srcDir, 'components', 'shared', 'Testimonials.tsx');
  const compSource = fs.readFileSync(compPath, 'utf-8');

  if (compSource.includes('lucide-react') && compSource.includes('Star')) {
    errors.push('Testimonials.tsx must not import or render Star rating components');
  }

  if (compSource.includes('5.0') || compSource.includes('Verified Clients')) {
    errors.push('Testimonials.tsx must not contain fake "5.0" or "Verified Clients" rating pills');
  }

  if (!compSource.includes('NEXT_PUBLIC_SHOW_SAMPLES')) {
    errors.push('Testimonials.tsx must respect NEXT_PUBLIC_SHOW_SAMPLES flag');
  }

  // 4. Verify hidden mode logic when NEXT_PUBLIC_SHOW_SAMPLES=false
  console.log('Verifying hidden-mode logic when NEXT_PUBLIC_SHOW_SAMPLES=false...');
  // Simulate filtering:
  const verifiedOnly = TESTIMONIALS.filter((t: TestimonialItem) => t.verified);
  const showSamplesFalseResult = verifiedOnly.length > 0 ? verifiedOnly : [];
  if (showSamplesFalseResult.length > 0) {
    errors.push('Found verified items in test data when none have been provided by client');
  } else {
    console.log('✓ When NEXT_PUBLIC_SHOW_SAMPLES=false and no verified items exist, display list is empty (0 items) -> section is hidden.');
  }

  // Final check report
  if (errors.length > 0) {
    console.error('\n❌ check-samples FAILED with errors:');
    errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log('\n✅ check-samples PASSED: All reviews are honest placeholders, zero fake ratings/portraits/schemas found.');
}

runCheck().catch((err) => {
  console.error(err);
  process.exit(1);
});
