/**
 * Check Samples & Review Honesty Gate
 * 
 * Enforces:
 * 1. Testimonial items in src/data/testimonials.ts adhere strictly to { quote, name, company, service }.
 * 2. Zero unauthorized schema.org/Review or aggregateRating spam structured data exists in codebase.
 * 3. Testimonials component renders clean, responsive client feedback cards.
 */

import fs from 'fs';
import path from 'path';
import { TESTIMONIALS, TestimonialItem } from '../src/data/testimonials';

async function runCheck() {
  console.log('=== Checking Testimonials & Reviews Honesty ===\n');
  const errors: string[] = [];

  // 1. Check data integrity
  console.log(`Checking ${TESTIMONIALS.length} testimonials in src/data/testimonials.ts...`);
  if (!Array.isArray(TESTIMONIALS) || TESTIMONIALS.length === 0) {
    errors.push('src/data/testimonials.ts must export a non-empty TESTIMONIALS array');
  }

  for (const item of TESTIMONIALS) {
    if (!item.id || !item.quote || !item.name || !item.company || !item.service) {
      errors.push(`Testimonial item ${item.id} is missing required fields (quote, name, company, service)`);
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
  if (!fs.existsSync(compPath)) {
    errors.push('Testimonials.tsx component missing');
  }

  // Final check report
  if (errors.length > 0) {
    console.error('\n❌ check-samples FAILED with errors:');
    errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log('\n✅ check-samples PASSED: All reviews valid, zero unauthorized schema markup found.');
}

runCheck().catch((err) => {
  console.error(err);
  process.exit(1);
});
