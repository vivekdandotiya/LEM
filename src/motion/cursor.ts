import gsap from 'gsap';

export interface CursorOptions {
  lenis?: { on: (event: string, callback: () => void) => void; off?: (event: string, callback: () => void) => void };
}

let isInitialized = false;

export function initCursor(options: CursorOptions = {}) {
  if (typeof window === 'undefined') return () => {};
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  if (isInitialized) return () => {};
  isInitialized = true;

  const el = document.querySelector<HTMLElement>('.cursor');
  const label = el?.querySelector<HTMLElement>('.cursor__label');
  if (!el || !label) {
    isInitialized = false;
    return () => {};
  }

  let lastX = -100;
  let lastY = -100;
  let currentState: 'default' | 'view' | 'drag' | 'link' | 'none' = 'default';

  gsap.set(el, { xPercent: -50, yPercent: -50 });

  const setPos = {
    x: gsap.quickTo(el, 'x', { duration: 0.16, ease: 'power2.out' }),
    y: gsap.quickTo(el, 'y', { duration: 0.16, ease: 'power2.out' }),
  };

  function applyState(next: typeof currentState, text = '') {
    if (currentState === next && label!.textContent === text) return;
    currentState = next;
    el!.dataset.state = next;
    label!.textContent = text;
  }

  function evaluate(x: number, y: number) {
    if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
      applyState('default');
      return;
    }

    const hit = document.elementFromPoint(x, y);
    if (!hit) {
      applyState('default');
      return;
    }

    const target = hit.closest<HTMLElement>('[data-cursor]');
    if (!target) {
      // Automatic detection for native interactive elements without explicit data-cursor
      const isInteractive = !!hit.closest('a, button, input, textarea, select, [role="button"]');
      applyState(isInteractive ? 'link' : 'default');
      return;
    }

    const mode = target.getAttribute('data-cursor');
    if (mode === 'view') {
      applyState('view', target.getAttribute('data-cursor-label') || 'VIEW');
    } else if (mode === 'drag') {
      applyState('drag', target.getAttribute('data-cursor-label') || 'DRAG');
    } else if (mode === 'link') {
      applyState('link');
    } else if (mode === 'none') {
      applyState('none');
    } else {
      applyState('default');
    }
  }

  const onPointerMove = (e: PointerEvent) => {
    lastX = e.clientX;
    lastY = e.clientY;
    setPos.x(lastX);
    setPos.y(lastY);
    evaluate(lastX, lastY);
  };

  const reEvaluate = () => {
    if (lastX >= 0 && lastY >= 0) {
      evaluate(lastX, lastY);
    }
  };

  // Re-evaluate on every frame while an active non-default state is held
  const ticker = () => {
    if (currentState !== 'default') {
      evaluate(lastX, lastY);
    }
  };

  const onMouseOut = (e: MouseEvent) => {
    if (!e.relatedTarget) {
      applyState('default');
    }
  };

  const onBlur = () => applyState('default');
  const onVisibilityChange = () => {
    if (document.hidden) applyState('default');
  };

  const onRouteStart = () => applyState('default');
  const onRouteRevealed = () => reEvaluate();

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('scroll', reEvaluate, { passive: true });
  window.addEventListener('wheel', reEvaluate, { passive: true });
  window.addEventListener('resize', reEvaluate, { passive: true });
  document.addEventListener('mouseout', onMouseOut);
  window.addEventListener('blur', onBlur);
  document.addEventListener('visibilitychange', onVisibilityChange);

  // Custom route transition events
  window.addEventListener('route:start', onRouteStart);
  window.addEventListener('route:revealed', onRouteRevealed);

  // Hook into Lenis if supplied or available on window
  const activeLenis = options.lenis || (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void } }).__lenis;
  activeLenis?.on?.('scroll', reEvaluate);

  gsap.ticker.add(ticker);

  return () => {
    isInitialized = false;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', reEvaluate);
    window.removeEventListener('wheel', reEvaluate);
    window.removeEventListener('resize', reEvaluate);
    document.removeEventListener('mouseout', onMouseOut);
    window.removeEventListener('blur', onBlur);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('route:start', onRouteStart);
    window.removeEventListener('route:revealed', onRouteRevealed);
    gsap.ticker.remove(ticker);
  };
}
