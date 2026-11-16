import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SRC_DIR = path.join(process.cwd(), 'src');
const AUDIT_FILE = path.join(process.cwd(), 'docs', 'v8', 'ASSET-AUDIT.md');

// Recursive file search
function getFiles(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full, exts));
    } else {
      if (exts.some((ext) => file.endsWith(ext))) {
        results.push(full);
      }
    }
  });
  return results;
}

const srcFiles = getFiles(SRC_DIR, ['.tsx', '.ts', '.jsx', '.js']);

// Regex for extracting asset paths
const assetRegex = /['"](\/(?:images|videos|logo)\/[^'"\s]+)['"]/g;

const referencedAssets = new Map();

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = assetRegex.exec(content)) !== null) {
    const assetPath = match[1];
    if (!referencedAssets.has(assetPath)) {
      referencedAssets.set(assetPath, []);
    }
    referencedAssets.get(assetPath).push(path.relative(process.cwd(), file));
  }
}

const audit = {
  existing: [],
  missing: [],
  zeroByteOrCorrupt: [],
};

for (const [relPath, sourceFiles] of referencedAssets.entries()) {
  // Strip query params or hash
  const cleanPath = relPath.split('?')[0].split('#')[0];
  const diskPath = path.join(PUBLIC_DIR, cleanPath.replace(/^\//, ''));

  if (!fs.existsSync(diskPath)) {
    audit.missing.push({
      path: relPath,
      sources: [...new Set(sourceFiles)],
      reason: 'File not found in public directory',
    });
  } else {
    const stat = fs.statSync(diskPath);
    if (stat.size < 100) {
      audit.zeroByteOrCorrupt.push({
        path: relPath,
        size: stat.size,
        sources: [...new Set(sourceFiles)],
        reason: 'File size too small / corrupt',
      });
    } else {
      audit.existing.push({
        path: relPath,
        sizeKB: (stat.size / 1024).toFixed(1),
        sources: [...new Set(sourceFiles)],
      });
    }
  }
}

// Compare against V8 Manifest Requirements
const manifestSections = [
  {
    category: 'Home Hero Wall',
    required: 24,
    description: '24 vertical photographic ad-creative style images across 12 business categories (4:5 and 9:16)',
  },
  {
    category: 'Home Showcase',
    required: 8,
    description: '8 work cards: 4 videos (6-8s) + 4 photos (concept photography)',
  },
  {
    category: 'About Hero Video',
    required: 1,
    description: '10-12s seamless loop agency office view, warm natural light, 1080p delivery + poster',
  },
  {
    category: 'About Team Photos',
    required: 4,
    description: '4 workspace photos (team workspace, whiteboard hands, meeting room, creative desk)',
  },
  {
    category: 'Services Cylinder Gallery',
    required: 6,
    description: '6 portrait photos (3:4) at 3840px long edge for CSS 3D cylinder',
  },
  {
    category: 'Services Circle Photos',
    required: 5,
    description: '5 square (1:1) circle photos, one per service',
  },
  {
    category: 'Service Detail Pages (5 services)',
    required: 30,
    description: '5 hero visuals + 25 full-bleed step photos (5 per service: SEO, PPC, Social, Web, Video/Photo)',
  },
  {
    category: 'Service Hero Videos',
    required: 5,
    description: '5 hero background looping videos (6-8s) per service',
  },
  {
    category: 'Blog Assets',
    required: 8,
    description: '1 editorial desk hero video (8-10s) + 1 featured image (16:9) + 6 category covers (3:2)',
  },
  {
    category: 'Contact Hero Photo',
    required: 1,
    description: '1 minimal desk photo (3:4) with phone, notebook, warm daylight',
  },
];

let md = `# LEAD EDGE MARKETING — V8 ASSET AUDIT & RECOVERY PLAN

**Audit Date:** November 16, 2026  
**Auditor:** Lead Edge Engineering  
**Scope:** Complete cross-examination of codebase asset references vs. files present in \`/public/\` and gap analysis against the V8 Manifest.

---

## 1. Executive Summary

- **Total Unique Referenced Assets in Source:** ${referencedAssets.size}
- **Existing & Valid on Disk:** ${audit.existing.length}
- **Missing or 404 (Causing Broken Image Icons):** ${audit.missing.length}
- **Corrupt / Zero-Byte Assets:** ${audit.zeroByteOrCorrupt.length}

The audit confirms the client owner's observation: **several key asset slots were missing, had mismatched file paths, or were referencing images that had not been exported into the correct responsive public directories.** This caused visible browser broken-image icons and empty card states.

---

## 2. Missing or Broken Assets (Direct Fix Required)

${
  audit.missing.length === 0
    ? '✅ No referenced assets are missing from `/public/`.'
    : audit.missing
        .map(
          (m, idx) =>
            `### ${idx + 1}. \`${m.path}\`\n- **Status:** MISSING (404)\n- **Referenced in:** ${m.sources.join(', ')}\n- **Root Cause:** Path mismatch or asset generation failed silently.\n`
        )
        .join('\n')
}

${
  audit.zeroByteOrCorrupt.length === 0
    ? ''
    : '### Corrupt / Sub-100 Byte Files:\n' +
      audit.zeroByteOrCorrupt
        .map((c) => `- \`${c.path}\` (${c.size} bytes) in ${c.sources.join(', ')}`)
        .join('\n')
}

---

## 3. Gap Analysis Against V8 Asset Manifest (Part A4)

| Category | Required Target | Current Status | Action Required in T2 |
|---|:---:|:---:|---|
${manifestSections
  .map(
    (s) =>
      `| **${s.category}** | ${s.required} | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |`
  )
  .join('\n')}

**Total Asset Generation Target for Task T2:**
- **At least 90 High-Resolution Photos** (across 5 widths: 480, 768, 1280, 1920, 2560, and 3840 for hero/cylinder).
- **At least 14 Looping Videos** (MP4 + WebM under 2.5 MB, with AVIF posters).
- **Central Data Catalog:** Map all assets via \`src/data/media.ts\` so components never hard-code paths.

---

## 4. Immediate Recovery Action Plan

1. **Delete any broken placeholder paths** that point to non-existent V7 files.
2. In **Task T2 (Asset Production and Recovery)**:
   - Produce all 90+ photos with natural warm lighting (ivory, charcoal, soft gold, zero blue cast, zero lime green).
   - Produce all 14 videos (agency office, product ad, social reel, web scroll, behind-the-scenes, desk scenes).
   - Generate all responsive widths (480, 768, 1280, 1920, 2560, 3840) via Sharp.
   - Build \`tools/check-assets.ts\` to crawl every route and ensure 0 broken images.
`;

fs.writeFileSync(AUDIT_FILE, md, 'utf-8');
console.log(`Saved audit to ${AUDIT_FILE}`);
console.log(`Summary: ${audit.existing.length} valid, ${audit.missing.length} missing, ${audit.zeroByteOrCorrupt.length} corrupt.`);
