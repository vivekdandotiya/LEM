# Lead Edge Marketing — V8 Professional Design System & Contrast Audit

**Version:** V8 (Professional System)  
**Date:** November 16, 2026  
**Status:** 100% WCAG AA / AAA Compliant (Zero Lime, Zero Blue)  

---

## 1. Professional Palette Tokens

The V8 colour system replaces all high-contrast lime and stark neon tones with an elevated, warm-editorial corporate palette derived directly from the brushed gold/bronze mark in the official Lead Edge Marketing emblem (`public/logo/lead-edge-logo.png`).

```css
:root {
  --ivory:     #F6F3EC;   /* Main page background */
  --ivory-2:   #EFEBE2;   /* Alternate sections, footer */
  --white:     #FFFFFF;   /* Cards on ivory, highlights */
  --ink:       #0F1011;   /* Primary text, primary buttons */
  --charcoal:  #1C1D1F;   /* Dark sections */
  --graphite:  #2B2D30;   /* Dark cards, borders on dark */
  --stone:     #6F6A60;   /* Secondary text on ivory */
  --line:      rgba(15, 16, 17, 0.12);          /* Hairlines on ivory */
  --line-dark: rgba(246, 243, 236, 0.16);       /* Hairlines on dark */
  --gold:      #B08D57;   /* Accent: hairlines, icons, hover fills, progress */
  --gold-soft: #D9C29A;   /* Tints, subtle fills */
  --gold-deep: #7A5C2E;   /* Gold used as text on ivory */
}
```

---

## 2. Numerical WCAG Contrast Compliance Table

All text/background combinations evaluated using the standard WCAG relative luminance formula:
$L = 0.2126 \cdot R + 0.7152 \cdot G + 0.0722 \cdot B$  
Contrast Ratio: $(L_1 + 0.05) / (L_2 + 0.05)$

| Text Token | Text Hex | Surface Token | Surface Hex | Contrast Ratio | WCAG AA (>= 4.5:1) | WCAG AAA (>= 7.0:1) |
|---|---|---|---|:---:|:---:|:---:|
| `--ink` (Primary Body/Heading) | `#0F1011` | `--ivory` (Base Page) | `#F6F3EC` | **17.19 : 1** | PASS | PASS |
| `--stone` (Secondary Copy) | `#6F6A60` | `--ivory` (Base Page) | `#F6F3EC` | **4.85 : 1** | PASS | - |
| `--gold-deep` (Serif Accent) | `#7A5C2E` | `--ivory` (Base Page) | `#F6F3EC` | **5.58 : 1** | PASS | - |
| `--ink` (Primary Buttons) | `#0F1011` | `--gold` (Button Hover) | `#B08D57` | **5.46 : 1** | PASS | - |
| `--ivory` (Light Text on Dark) | `#F6F3EC` | `--charcoal` (Dark Section) | `#1C1D1F` | **15.22 : 1** | PASS | PASS |
| `--gold-soft` (Accent on Dark) | `#D9C29A` | `--charcoal` (Dark Section) | `#1C1D1F` | **9.75 : 1** | PASS | PASS |
| `--gold` (Accent on Dark) | `#B08D57` | `--charcoal` (Dark Section) | `#1C1D1F` | **5.46 : 1** | PASS | - |
| `--ivory` (Primary Button Text) | `#F6F3EC` | `--ink` (Primary Button) | `#0F1011` | **17.19 : 1** | PASS | PASS |

**Result:** 100% of text and functional interactive color pairings pass WCAG AA standards. Zero low-contrast violations.

---

## 3. Typography Specifications (A2)

1. **Headlines:**
   - Font: Bricolage Grotesque Variable (`wght 600–700`, `wdth 100`).
   - Line height: `1.05`, Letter spacing: `-0.02em`.
   - `text-wrap: balance` applied to every heading to eliminate orphaned single words.
2. **Serif Accent Word:**
   - Font: Instrument Serif italic.
   - Color: `--gold-deep` on ivory, `--ivory` on dark.
   - Rule: At most one accent word per headline; never a full sentence.
3. **Body Copy:**
   - Font: Inter Variable 17px (`--fs-body`).
   - Line height: `1.6`.
   - Color: `--stone` for secondary descriptions, `--ink` for primary lead sentences.
   - Max measure: `56ch`.
4. **Small Labels & Tags:**
   - Font: Inter Variable 12px (`--fs-small`), uppercase, tracking `0.08em`.
   - Mono font (`JetBrains Mono`) reserved strictly for tiny code tags or file metadata.
5. **Scale Sizes:**
   - Hero: `clamp(2.6rem, 6vw, 5.75rem)`
   - H2: `clamp(2rem, 4vw, 3.5rem)`
   - H3: `clamp(1.25rem, 2vw, 1.6rem)`

---

## 4. Spacing, Radii & Surface Grid

- **8px Grid System:** All paddings, gaps, and margins are multiples of 8px.
- **Section Padding:** `112px` desktop, `72px` mobile.
- **Radii Consistency:**
  - Cards: `20px` (`--radius-lg`)
  - Images: `20px` (`--radius-lg`)
  - Circle service visual: `50%` (`rounded-full`)
  - Buttons & tags: pill (`9999px`)
- **Faint Dot Background:**
  - Ink dots: `rgba(15, 16, 17, 0.11)` on ivory surfaces.
  - Ivory dots: `rgba(246, 243, 236, 0.09)` on dark charcoal surfaces.
  - Spacing: `24px` grid, `1.2px` dot radius, static hardware-accelerated layer.

---

## 5. Interactive Components & States

- **Buttons:**
  - Primary: `--ink` fill, `--ivory` text; hover = `--gold` fill, `--ink` text.
  - Secondary: `1px solid var(--ink)` outline, hover = `--ink` fill, `--ivory` text.
  - On dark sections: Primary = `--ivory` fill, `--ink` text; hover = `--gold` fill.
- **Focus Rings:**
  - On ivory: `2px solid var(--ink)`, `2px offset`.
  - On dark: `2px solid var(--ivory)`, `2px offset`.
- **Text Selection:**
  - `background: var(--gold-soft); color: var(--ink);`.
- **Custom Cursor:**
  - Restrained 8px gold center dot (`--gold`) with 36px ring.
  - Expands to 72px with gold fill and uppercase Inter label on hoverable view targets.
  - Automatically hidden on touch devices and resets on blur/leave/scroll.
- **Ink Drips:**
  - Restrained scale: max `0.55em` downward drop on headlines, `8px` in buttons.
  - Capillary gravity animation with maximum 16 concurrent drops site-wide.
