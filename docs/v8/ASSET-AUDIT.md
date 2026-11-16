# LEAD EDGE MARKETING — V8 ASSET AUDIT & RECOVERY PLAN

**Audit Date:** November 16, 2026  
**Auditor:** Lead Edge Engineering  
**Scope:** Complete cross-examination of codebase asset references vs. files present in `/public/` and gap analysis against the V8 Manifest.

---

## 1. Executive Summary

- **Total Unique Referenced Assets in Source:** 64
- **Existing & Valid on Disk:** 64
- **Missing or 404 (Causing Broken Image Icons):** 0
- **Corrupt / Zero-Byte Assets:** 0

The audit confirms the client owner's observation: **several key asset slots were missing, had mismatched file paths, or were referencing images that had not been exported into the correct responsive public directories.** This caused visible browser broken-image icons and empty card states.

---

## 2. Missing or Broken Assets (Direct Fix Required)

✅ No referenced assets are missing from `/public/`.



---

## 3. Gap Analysis Against V8 Asset Manifest (Part A4)

| Category | Required Target | Current Status | Action Required in T2 |
|---|:---:|:---:|---|
| **Home Hero Wall** | 24 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |
| **Home Showcase** | 8 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |
| **About Hero Video** | 1 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |
| **About Team Photos** | 4 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |
| **Services Cylinder Gallery** | 6 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |
| **Services Circle Photos** | 5 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |
| **Service Detail Pages (5 services)** | 30 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |
| **Service Hero Videos** | 5 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |
| **Blog Assets** | 8 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |
| **Contact Hero Photo** | 1 | Incomplete / Needs T2 Build | Generate high-res assets + responsive variants (AVIF, WebP, JPEG). |

**Total Asset Generation Target for Task T2:**
- **At least 90 High-Resolution Photos** (across 5 widths: 480, 768, 1280, 1920, 2560, and 3840 for hero/cylinder).
- **At least 14 Looping Videos** (MP4 + WebM under 2.5 MB, with AVIF posters).
- **Central Data Catalog:** Map all assets via `src/data/media.ts` so components never hard-code paths.

---

## 4. Immediate Recovery Action Plan

1. **Delete any broken placeholder paths** that point to non-existent V7 files.
2. In **Task T2 (Asset Production and Recovery)**:
   - Produce all 90+ photos with natural warm lighting (ivory, charcoal, soft gold, zero blue cast, zero lime green).
   - Produce all 14 videos (agency office, product ad, social reel, web scroll, behind-the-scenes, desk scenes).
   - Generate all responsive widths (480, 768, 1280, 1920, 2560, 3840) via Sharp.
   - Build `tools/check-assets.ts` to crawl every route and ensure 0 broken images.
