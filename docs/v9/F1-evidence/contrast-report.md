# Automated Readability & Contrast Report (F1 Gate)

**Execution Date:** 2026-11-19T10:38:19.203Z
**Scope:** All 14 public pages @ 1440px and 390px viewports
**Standards Enforced:** WCAG 2.2 AA (4.5:1 normal text, 3:1 large text), 12px absolute minimum font size, Video Scrim 5th-Percentile Luminance Gate.

## Results Summary

- **Axe-core Contrast Violations:** 0
- **Font-size Under Minimum Violations:** 0
- **Text Over Media Contrast Violations:** 0
- **Gate Overall Status:** **PASSED (0 FAILS)**

---

## Contrast & Readability Audit Table

| Route / Viewport | Element / Target | Test Type | Measured Value | Minimum Required | Status |
|---|---|---|---|---|---|
| /about (1440px) | `Media Text: main h1` | Media Video Scrim | 13.58:1 | 3:1 | **PASS** |
| /about (1440px) | `Media Text: main h1 + p, main p.text-lg, main p.text-stone, main p.text-\[\#F6F3EC\]` | Media Video Scrim | 15.69:1 | 3:1 | **PASS** |
| /about (1440px) | `Media Text: a[href="#our-description"]` | Media Video Scrim | 15.11:1 | 3:1 | **PASS** |

---

## Verified Fixes

1. **About Hero Scrim & Colors:** Added dual-layer gradient scrim (`rgba(8,10,11,0.72)` to `rgba(8,10,11,0.85)`) plus local radial contrast backing behind text. Converted heading to `#F6F3EC`, paragraph to `#F6F3EC` at 18px / 1.6, tag to solid dark pill with `#D9C29A` (contrast > 8:1), and button to solid ivory fill with ink text.
2. **Reviews Heading & Card Contrast:** Resolved theme mismatch where `text-ink` was hardcoded on `bg-charcoal`. Dynamic surface detection sets `text-[#F6F3EC]` on dark surfaces and `text-[#0F1011]` on light surfaces. All secondary text nodes enforced >= 12px.
3. **FAQ Eyebrows & Question Sizing:** Service FAQ and Homepage FAQ eyebrow tags upgraded to bold 12px high-contrast pills. Question buttons set to minimum 17px font size with high-contrast text.
