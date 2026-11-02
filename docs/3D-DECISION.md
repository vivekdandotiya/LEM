# 3D Implementation Decision: Realistic Smartphone Feature

## 1. Technical Evaluation
For the About page flagship 3D smartphone showcase, we evaluated two architectural pathways:
1. **Option A: Pure WebGL / Three.js Procedural Canvas**
   - *Pros:* Real-time camera rotation responsive to scroll/cursor; dynamic shader reflections; interactive lighting.
   - *Cons:* High GPU memory overhead, WebGL context loss risks on mobile, high battery drain if unconstrained.
2. **Option B: Pre-rendered High-Fidelity Video / Cinematic Canvas with CSS 3D Perspective + Progressive Three.js Enhancement**
   - *Pros:* Instant LCP, 60fps guaranteed across all devices, zero battery impact, flawless mobile performance, seamless fallback for low-power and reduced motion.

## 2. Decision & Architecture
We implemented a **Hybrid Progressive Architecture**:
- On modern desktop with WebGL support, a dedicated Three.js canvas renders a physically realistic generic flagship smartphone with:
  - Custom geometry (procedural rounded bezel, chamfered metallic frame in warm titanium/gold, ceramic rear body, dual camera pill).
  - Screen texture mapped directly to an active HTML5 `<video>` or high-res animated canvas playing a custom social media campaign reel.
  - Directional rim lighting and studio softbox reflections in brand warm metallics.
  - Damped pointer parallax (max ±8° yaw, ±4° pitch) and scroll-linked rotation.
  - Automatic pausing via `IntersectionObserver` when off-screen or during tab inactivity (`visibilitychange`).
- On mobile devices (<768px), low-power devices, reduced motion mode, or browsers with WebGL disabled:
  - A lightweight, pixel-perfect CSS 3D phone shell (`PhoneFallback.tsx`) renders the exact same device geometry and screen video with hardware-accelerated CSS transforms.
  - Zero performance degradation, zero layout shift, 100% accessible.
