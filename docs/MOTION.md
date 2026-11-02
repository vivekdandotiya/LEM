# Motion System Documentation: Lead Edge Marketing

## 1. Principles
Every animation must have an editorial and UX purpose:
- **Orientation:** Establish visual hierarchy and guide gaze down the page.
- **Storytelling:** Reveal process milestones and campaign craft progressively.
- **Feedback:** Acknowledge user interaction with tactile, physical responsiveness.
- **Zero Scroll-jacking:** Standard native window scrolling is preserved; no hijacked physics or sluggish drag.

## 2. Motion Tokens & Easing Curves
- **Micro-interactions:** 150ms – 200ms (`cubic-bezier(0.22, 1, 0.36, 1)`) for buttons, active link indicators, and hover states.
- **Standard UI Transitions:** 300ms – 450ms for accordions, mobile menu reveal, and filter transitions.
- **Editorial Page Reveals:** 600ms – 850ms with subtle masked translateY (20px to 0px) and opacity.
- **Cinematic Scene Cycling:** 1200ms – 1600ms with smooth cubic crossfades for the 4-layer hero stack.
- **Stagger Timings:** 70ms between consecutive elements, capped at maximum 8 siblings.

## 3. Accessibility & Reduced Motion
- Framer Motion's `useReducedMotion()` hook and CSS `@media (prefers-reduced-motion: reduce)` are strictly observed.
- In reduced motion mode:
  - Hero visual stack does NOT auto-cycle; it displays the primary high-craft layer statically with manual step selection.
  - 3D Smartphone does NOT rotate with scroll; it displays a static, crystal-clear perspective with video controls.
  - Number counters render final values instantly without count-up animation.
  - Page navigations use simple instant opacity transitions rather than scale or push zooms.
