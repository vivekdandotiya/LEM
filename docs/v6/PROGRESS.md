# Lead Edge Marketing — V6 Progress Log

This document tracks progress through tasks T0 to T8 in strict accordance with the V6 Master Prompt Operating Protocol.

---

## T0: Setup and True Baseline
- **Date:** 2026-11-15
- **Branch:** `v6-stack-video-drip` (branched from `main`)
- **Status:** **PASSED**
- **Changes & Findings:**
  - Created measurement tooling (`tools/measure.mjs`, `tools/analyze-traces.mjs`) driving real headed Google Chrome via Playwright CDP Tracing with hardware acceleration.
  - Confirmed `npm run build` succeeds cleanly.
  - Ran measurement on production server (`npm run start` on port 3000) under both normal (1x CPU) and 4x CPU slowdown profiles.
  - Proved real baseline bottlenecks: Homepage normal p95 is 99.9ms (5 long tasks up to 561ms); 4x CPU slowdown median drops to 100ms with p95 at 900ms and 163 long tasks. SEO page normal p95 is 366.6ms.
  - Mobile Lighthouse baseline captured: Homepage score 39 (TBT 11,940ms), Services score 49 (TBT 3,590ms), SEO score 68 (TBT 3,890ms).
  - Documented Top 10 cost offenders in `docs/v6/BASELINE.md`.
  - Raw traces and Lighthouse reports saved in `docs/v6/T0-evidence/`.
- **Files Touched:**
  - `tools/measure.mjs` (measurement harness)
  - `tools/analyze-traces.mjs` (trace analysis script)
  - `docs/v6/BASELINE.md`
  - `docs/v6/PROGRESS.md`
  - Evidence: `docs/v6/T0-evidence/traces/*.json`, `docs/v6/T0-evidence/lighthouse/*`
- **Commit:** `T0: baseline measurements`
