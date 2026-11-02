# Process Scenes Research: Scroll-Driven Visual Storytelling
**Client:** Lead Edge Marketing  
**Document Purpose:** Architectural and interaction benchmarks for scroll-driven "How We Deliver" interactive stages across 4 core service disciplines (SEO, Meta Ads, Social Media, Web Development).

---

## Executive Summary
Modern high-converting studio and tech websites (Linear, Stripe, Vercel, Apple) replace static paragraph cards with **scroll-driven visual stages**. These stages bind user scroll depth to progressive vector/HTML animations. They communicate technical rigor, craftsmanship, and systematic capability without resorting to unprovable vanity metrics.

For Lead Edge Marketing, all scenes adhere strictly to:
- **Brand Palette:** Pure Ink (`#080A0B`), Deep Charcoal (`#17191B`), Acid Lime (`#C9F53D`), Warm Paper (`#EEEBE3`), and Metallic Gold (`#B8925A`). **Strictly ZERO blue**.
- **Honesty & Integrity:** Every stage bears a persistent `[ILLUSTRATIVE]` mono stamp. No fabricated client accounts, proprietary metrics, or false guarantees.
- **Accessibility & Performance:** Native CSS transforms (`translate3d`, `scale`), vector-effect SVGs, zero scroll-jacking, discrete pinned distance (`+=280%`), responsive fallback (<1024px unpinned sequence), and complete static grid fallback under `prefers-reduced-motion`.

---

## 1. Linear (Linear Method & Product Walkthroughs)
- **Reference:** linear.app/method / linear.app/features
- **Pattern:** Sticky Stage with Scrubbed Vector State Machines.
- **Motion Principles:**
  - 40% left sticky copy, 60% right pinned viewport.
  - Scroll triggers discrete discrete state transitions using GSAP ScrollTrigger `scrub: 0.5`.
  - Micro-timelines for element entrances with subtle staggered delays (`stagger: 0.08`).
  - Dark mode canvas with subtle 1px hairline borders (`rgba(255,255,255,0.08)`).
- **Performance Takeaways:**
  - SVG wireframes kept under 50 DOM nodes per phase.
  - Offscreen states use `visibility: hidden` and `pointer-events: none` to avoid layout thrashing.
  - No Canvas overhead where SVG + CSS transforms provide crisp 60fps rendering.
- **Lead Edge Adaptation:**
  - Applied to the overall `ProcessStage` split layout (38% left column, 62% right pinned stage).
  - Adopted Linear's crisp mono phase indicators (`01 / AUDIT`, `02 / ARCHITECTURE`) and high-contrast hairlines.

---

## 2. Stripe (Connect / Terminal Interactive Flow)
- **Reference:** stripe.com/connect
- **Pattern:** Live Data Routing & Node Transmission.
- **Motion Principles:**
  - Radial or branching node hierarchy where particles travel along SVG paths.
  - Energy pulses simulated with `stroke-dashoffset` animations.
  - Interactive scrubbing allows the user to see exactly how funds or data transfer through checkpoints.
- **Performance Takeaways:**
  - Pure SVG paths using `vector-effect="non-scaling-stroke"`.
  - Animating `stroke-dashoffset` instead of redrawing canvas paths maintains GPU efficiency.
- **Lead Edge Adaptation:**
  - Used in **SEO Scene Phase 3 (Authority Orbit)**: backlinks send glowing lime pulses along connecting spline curves into the central client domain.
  - Used in **Web Development Scene Phase 1 (Information Architecture)**: branches spawn from the root URL.

---

## 3. Vercel (Workflow / Edge Network Infrastructure)
- **Reference:** vercel.com/workflow
- **Pattern:** Code-to-Preview Synchronized Morphing.
- **Motion Principles:**
  - Dual-pane presentation: left editor types code tokens, right browser viewport morphs in real time.
  - Minimalistic monospaced syntax highlighting, smooth viewport resizing from desktop to mobile.
- **Performance Takeaways:**
  - Text typing simulated by incrementing string index or revealing pre-rendered `<span>` tags via opacity/width rather than recreating DOM elements.
  - Viewport transitions driven by CSS `transform: scale()` or fixed width transitions with `will-change: width`.
- **Lead Edge Adaptation:**
  - Used in **Web Development Scene Phase 3 (Build & Responsive Engine)**: syntax-highlighted TSX code typing on left; live component preview with interactive viewport resize handle (1440px -> 768px -> 375px) on right.

---

## 4. Apple (Pro Workflow / M-Series Feature Deep Dives)
- **Reference:** apple.com/macbook-pro
- **Pattern:** Layered Exploded Diagrams & Radar Scanners.
- **Motion Principles:**
  - Continuous vertical scrub triggers a sweeping laser plane that exposes underlying component structures.
  - Depth of field created by scaling background elements down (`scale: 0.94`, `opacity: 0.4`) while foreground active elements illuminate.
- **Performance Takeaways:**
  - Elements grouped in CSS `transform-style: preserve-3d` containers.
  - Opacity and matrix transforms used exclusively for zero-layout-shift rendering.
- **Lead Edge Adaptation:**
  - Used in **SEO Scene Phase 1 (Audit & Discovery)**: a lime laser scanner plane sweeps down a wireframe layout, highlighting structural bottlenecks and resolved Core Web Vitals issues with popping badges.

---

## 5. Ramp (Automated Expense Intelligence & Card Deals)
- **Reference:** ramp.com
- **Pattern:** Card Shuffling, Dealing & Winner Stamping.
- **Motion Principles:**
  - Stack of cards fans out into 3 distinct variations (A, B, C).
  - Cards tilt with 3D perspective (`rotateY`, `rotateZ`), flip to display conversion and engagement data, and the optimal performer receives an authoritative physical stamp.
- **Performance Takeaways:**
  - CSS 3D transforms (`perspective: 1000px`, `transform-style: preserve-3d`, `backface-visibility: hidden`).
  - GSAP timeline handles fanning and flipping with physics ease (`power3.out`).
- **Lead Edge Adaptation:**
  - Used in **Meta Ads Scene Phase 2 (Creative Testing Matrix)**: three distinct ad hook creatives (Problem Hook, Social Proof Hook, Offer Hook) deal onto the stage, flip, and the top performer gets stamped with a lime `[WINNER: +340% ROAS]` seal.

---

## 6. Raycast (Command Bar Extensions & Workflow Automation)
- **Reference:** raycast.com
- **Pattern:** Instant Input Simulation & Cascading Results.
- **Motion Principles:**
  - Simulated keyboard input into an omnibar / search bar.
  - Autocomplete typing cursor blinking, followed by rapid result list rearrangement using FLIP (First, Last, Invert, Play) animation.
- **Performance Takeaways:**
  - GSAP `Flip` plugin or transform offsets to swap DOM node positions without reordering DOM elements.
  - Hardware accelerated translation on Y-axis.
- **Lead Edge Adaptation:**
  - Used in **SEO Scene Phase 4 (Rank Climb)**: query `"best digital growth studio"` is typed into the search bar, competitor results populate, and the Lead Edge card smoothly climbs from position 9 to `#1` with an acid lime badge.

---

## 7. Wise (Cross-Border Capital Routing & Transparent Fees)
- **Reference:** wise.com
- **Pattern:** Audience Constellation & Algorithmic Filtering.
- **Motion Principles:**
  - Wide cloud of heterogeneous dots representing global users or prospects.
  - Dynamic radar rings or filter gates converge, selecting and highlighting the optimal segment while dimming non-relevant nodes.
- **Performance Takeaways:**
  - SVG `<circle>` or HTML `<span>` nodes initialized once with fixed positions.
  - Color and scale modulated via batch class toggling or GSAP staggered tweens.
- **Lead Edge Adaptation:**
  - Used in **Meta Ads Scene Phase 3 (Audience Modeling)**: a constellation of ~100 audience nodes is filtered by concentric contracting radar rings, locking onto high-intent buyers highlighted in glowing lime.

---

## 8. Framer (Motion Studio & Interactive Canvas Preview)
- **Reference:** framer.com
- **Pattern:** Interactive Phone Shell with Timeline Scrubber.
- **Motion Principles:**
  - 9:16 mobile device frame containing a simulated vertical video feed.
  - Bottom playhead scrubs across a sound wave / timeline; kinetic captions sync with audio peaks.
  - Reaction counters and hearts float upward in real time.
- **Performance Takeaways:**
  - CSS keyframes for floating particle physics.
  - Timeline playhead scrubbed via GSAP timeline progress.
- **Lead Edge Adaptation:**
  - Used in **Social Media Scene Phase 3 & 4 (Short-Form Studio & Community)**: vertical phone mockup with scrubber playhead, kinetic subtitles, and floating inbound interaction notifications.

---

## Synthesis: Architectural Standards for Lead Edge Scenes

| Service Discipline | Visual Metaphor | Key Interaction Pattern | Dominant Color Tone |
| :--- | :--- | :--- | :--- |
| **SEO** | Crawl Scanner & Authority Graph | Sweeping laser -> SERP card -> Orbit links -> #1 Rank Climb | Deep Charcoal (`#17191B`) with Lime accents |
| **Meta Ads** | Funnel & Creative Optimization Engine | 3-Tier funnel -> Card flip deal -> Audience radar -> Scale dial | Ink (`#080A0B`) & Acid Lime (`#C9F53D`) |
| **Social Media** | Editorial Calendar & 9:16 Production Studio | 4 Pillar chips -> Calendar drop -> Scrubber & captions -> Inbound feed | Warm Paper (`#EEEBE3`) with Ink Phone shell |
| **Web Development** | Bespoke Next.js Architecture & Engine | Sitemap tree -> Low-fi to styled UI -> Code & resize handle -> Launch gauges | Charcoal Browser Frame with Lime telemetry |

All scenes feature:
1. **Interactive Phase Selector:** Clicking any of the 4 phase buttons on the left scrubs the stage directly to that phase.
2. **Accessible Skip Option:** Keyboard and screen-reader users can trigger "Skip interactive walkthrough" to proceed immediately to case studies.
3. **Responsive Graceful Degradation:** Mobile users (<1024px) see an unpinned stacked card sequence with self-contained illustrations.
4. **Zero-Blue Guarantee:** Palette strictly validated against design system tokens.
