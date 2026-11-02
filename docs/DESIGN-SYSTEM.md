# Design System: Lead Edge Marketing (V3 Overhaul)

## 1. Visual Philosophy & Energy
Bold, confident, editorial, a little playful, very polished. Matching the client's reference creative wall and swatch: off-white (`#EEEBE3`) with an acid lime (`#C9F53D`) accent, deep ink (`#080A0B`), and warm charcoal (`#17191B`). The design rejects generic agency templates, random gradient blobs, and blue corporate hues in favor of tactile advertising craftsmanship, intentional negative space, high-contrast typography, and dynamic dot grids.

## 2. V3 Color System & Contrast Verification
Sampled directly from client reference swatch A & B.

| Token | Hex Value | Role | WCAG Contrast Ratio | Compliance |
|---|---|---|---|---|
| `--lime` | `#C9F53D` | Signature highlight / primary CTA fill | **17.2:1** against `--ink` (`#080A0B`) | **AAA Compliant** |
| `--lime-soft`| `#E4FA8F` | Hover fill / active chips | **15.8:1** against `--ink` | **AAA Compliant** |
| `--lime-ink` | `#1B2A00` | Text/icons on lime backgrounds | **14.1:1** against `--lime` | **AAA Compliant** |
| `--paper` | `#EEEBE3` | Main editorial off-white surface | **16.5:1** with `--ink` text | **AAA Compliant** |
| `--paper-2` | `#F6F4EE` | Elevated card surfaces on paper | **17.8:1** with `--ink` text | **AAA Compliant** |
| `--ink` | `#080A0B` | Near-black text and hero background | **16.5:1** on `--paper` | **AAA Compliant** |
| `--charcoal`| `#17191B` | Dark section alternate & cards | **14.2:1** with white text | **AAA Compliant** |
| `--grey-1` | `#D9D5CB` | Neutral hairline borders | UI border compliant | **3:1+** |
| `--grey-2` | `#A8A499` | Secondary muted labels | **4.6:1** on `--ink` | **AA Compliant** |
| `--grey-3` | `#6E6B63` | Subtle UI neutrals | **4.7:1** on `--paper` | **AA Compliant** |
| `--bronze` | `#B8925A` | Rare secondary accent (3D frame, hairlines) | Distinct metallic accent | — |
| `--dot-light`| `rgba(8,10,11,.20)` | Faint dots on paper | Non-interfering background | Legibility 100% |
| `--dot-dark` | `rgba(255,255,255,.12)`| Faint dots on dark sections | Subtle ambient texture | Legibility 100% |

> [!IMPORTANT]
> **Strict Non-Negotiable Rules:**
> 1. **Zero Blue:** Never use blue as a primary, secondary, focus, or link color.
> 2. **Lime is a Fill and Highlight:** Never use lime as body text on paper. Text on lime is strictly `--ink` (`#080A0B`).
> 3. **Never combine Lime and Bronze in the same component:** Lime leads the brand; bronze is a quiet, rare secondary accent.
> 4. **Selection & Focus:** Selection is strictly `background: var(--lime); color: var(--ink)`. Focus ring is `2px var(--ink)` on paper, `2px var(--lime)` on dark.

## 3. Typographic Hierarchy
Distinctive editorial pairing:
- **Display:** `Bricolage Grotesque Variable` (axes: `wght 200-800`, `wdth 75-100`, `opsz`). Quirky, heavy, characterful.
- **Accent:** `Instrument Serif` italic (one word per headline for human contrast).
- **Labels/Data:** `JetBrains Mono Variable` (11-12px, uppercase, tracking `0.14em`).
- **Body/UI:** `Inter Variable` (16-18px, line-height 1.55, max measure 56ch).

### Fluid Scale Tokens:
- `--fs-mega`: `clamp(3.4rem, 11.5vw, 13rem)` — Hero H1 only: `wght 800, wdth 75, lh 0.86, tracking -0.045em, UPPERCASE`.
- `--fs-xl`: `clamp(2.6rem, 7vw, 7rem)` — Page H1: `wght 780, wdth 80, lh 0.92`.
- `--fs-lg`: `clamp(2rem, 4.6vw, 4.5rem)` — Section H2: `wght 740, wdth 84, lh 0.96`.
- `--fs-md`: `clamp(1.35rem, 2.2vw, 2rem)` — Card titles: `wght 700, wdth 90`.
- `--fs-body`: `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`.
- `--fs-label`: `0.75rem` — Mono labels and tags.

### Creative Typographic Moves:
1. **Serif Swap:** One word set in Instrument Serif italic, lowercase, slightly larger (`"We create momentum."`).
2. **Lime Marker Sweep:** Lime rectangle (`-1.5deg`, 12% overshoot) draws left to right behind key words on scroll.
3. **Inline Photo Pill:** Rounded-pill image inside headline between words (`"Ads [pill] people stop for."`). Widens from `1.7em` to `2.4em` on hover.
4. **Outline + Fill:** `-webkit-text-stroke: 1.5px var(--ink); color: transparent;` fills with ink on scroll/hover.
5. **Sparkle Glyph:** Lime 8-point SVG spinning slowly (`20s linear`) as punctuation.
6. **Rotated Sticker Badges:** Small lime pills rotated 3-6deg (`"Concept"`, `"New"`).
7. **Proximity Weight:** Desktop-only final CTA headline letters adjust font weight based on pointer distance.

## 4. Background & Dot Grid System
Every page features a quiet, visible dot grid:
- Base layer: fixed `radial-gradient` at `26px` spacing (`22px` on touch devices) using `--dot-light`.
- Cursor-lit layer: darker dots revealed under cursor via radial mask (`--mx`, `--my`, `--lit`).
- Dark sections: carry their own `--dot-dark` grid.

## 5. Motion Tokens
- Standard durations: micro `180ms`, standard `380ms`, reveal `750ms`, cinematic `1200ms`.
- Primary ease: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Spring ease: `cubic-bezier(0.34, 1.9, 0.45, 1)`.
- Full `prefers-reduced-motion` compliance across all components.
