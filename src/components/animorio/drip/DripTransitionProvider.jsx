'use client';

/*
  "The drip page transition" from Animorio — https://animorio.com
  License: free on your own sites and your clients' sites, paid work included.
  Not for resale, redistribution, templates or code collections — https://animorio.com/en/license/
*/

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';

const DripContext = createContext({
  navigate: (href, originX) => {},
  notifyHover: (xRatio, isHovered) => {},
});

export const useDrip = () => useContext(DripContext);

export function DripTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const busyRef = useRef(false);

  // Settings per specification
  const FILL = 1.25;
  const RELEASE = 1.15;
  const DRIPS = 11;
  const SPREAD = 0.32;
  const BULB = 1.25;
  const STRANDS = 3;
  const DROPS = 2;
  const SPEED = 1.0;

  // Colors: charcoal paint with lime glint per V3 spec
  const PAINT = '#14110F';
  const GLINT = '#C9F53D';
  const BAND = 3;
  const STEP = 3;

  const clamp = (a, b, v) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => {
    const x = clamp(0, 1, (v - a) / (b - a));
    return x * x * (3 - 2 * x);
  };

  const stateRef = useRef({
    W: 0,
    H: 0,
    dpr: 1,
    clock: 0,
    band: 1,
    pour: null,
    sag: { x: 0.5, h: 0, v: 0, target: 0 },
    reduced: false,
  });

  const random = (seed) => {
    let s = seed >>> 0;
    return () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const makePour = (cx) => {
    const { W } = stateRef.current;
    const rnd = random(Math.floor(Math.random() * 1e9));
    const n = clamp(5, 26, Math.round(DRIPS * (0.35 + (0.65 * W) / 1000)));
    const drips = [];
    const far = Math.max(cx, 1 - cx, 0.001);

    for (let i = 0; i < n; i++) {
      const c = (i + 0.5 + (rnd() - 0.5) * 0.55) / n;
      const d = SPREAD * (Math.abs(c - cx) / far) * (0.8 + 0.4 * rnd()) + rnd() * 0.04;
      drips.push({
        c,
        hw: (0.16 + rnd() * 0.26) / n,
        d,
        e: Math.max(d + 0.4, 0.6 + rnd() * 0.24),
        reach: 1.15 + rnd() * 0.4,
        wob: rnd() * 6.28,
        drop: null,
      });
    }

    const order = drips
      .map((p, i) => i)
      .sort((i, j) => Math.abs(drips[i].c - cx) - Math.abs(drips[j].c - cx));
    const pick = [order[0], ...order.slice(1).sort(() => rnd() - 0.5)].slice(0, clamp(0, n, DROPS));
    for (const i of pick) drips[i].drop = { at: 0.42 + rnd() * 0.16 };

    const strands = [];
    let tries = 0;
    const want = clamp(0, 8, STRANDS);
    while (strands.length < want && tries < 200) {
      tries++;
      const x = strands.length === 0 ? clamp(0.14, 0.86, cx + (rnd() - 0.5) * 0.16) : 0.1 + rnd() * 0.8;
      if (strands.some((s) => Math.abs(s.x - x) < 0.6 / (want + 1))) continue;
      strands.push({ x, w: 9 + rnd() * 6, snap: 0.24 + rnd() * 0.34, wob: 14 + rnd() * 8 });
    }
    return { t: 0, cx, drips, strands };
  };

  const measure = useCallback(() => {
    if (!canvasRef.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    stateRef.current.W = w;
    stateRef.current.H = h;
    stateRef.current.dpr = dpr;
    canvasRef.current.width = Math.round(w * dpr);
    canvasRef.current.height = Math.round(h * dpr);
  }, []);

  const tipOf = (p, f) => {
    const { H } = stateRef.current;
    const q = clamp(0, 1, (f - p.d) / (p.e - p.d));
    return { q, y: BAND + p.reach * H * (q * q * (0.25 + 0.75 * q)) };
  };

  const frontOf = (f, x) => {
    const { H } = stateRef.current;
    const q = clamp(0, 1, (f - 0.12) / 0.88);
    const y = BAND + (H + 60) * Math.pow(q, 1.8);
    return y + Math.sin(x * 0.013 + 1.7) * 7 * q * (1 - q) * 4 + Math.sin(x * 0.031) * 3 * (1 - q);
  };

  const drawGlint = (ctx, x, y, r) => {
    if (r < 4) return;
    ctx.strokeStyle = GLINT;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = Math.min(1.6, r * 0.12);
    ctx.beginPath();
    ctx.arc(x, y, r * 0.64, Math.PI * 1.08, Math.PI * 1.36);
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  const drawBand = (ctx) => {
    const { W, band, sag, clock } = stateRef.current;
    const h0 = BAND * band;
    if (h0 <= 0.01) return;
    const sx = sag.x * W;
    ctx.fillStyle = PAINT;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(W, 0);
    for (let x = W; x >= -STEP; x -= STEP) {
      const u = (x - sx) / 22;
      const y = h0 + Math.sin(x * 0.02 + clock * 1.3) * 0.35 + Math.max(0, sag.h) * Math.exp(-u * u);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    if (sag.h > 3) {
      const r = Math.min(6, sag.h * 0.42);
      ctx.beginPath();
      ctx.arc(sx, h0 + sag.h - r, r, 0, Math.PI * 2);
      ctx.fill();
      drawGlint(ctx, sx, h0 + sag.h - r, r);
    }
  };

  const drawFill = (ctx, g, f) => {
    const { W, H, clock } = stateRef.current;
    const drips = g.drips.map((p) => {
      const tip = tipOf(p, f);
      const cx = p.c * W;
      const hw = Math.max(3, p.hw * W);
      const front = frontOf(f, cx);
      let L = Math.max(0, tip.y - front);
      let r = hw * 0.62 * BULB * (0.78 + 0.22 * smooth(0, 0.6, tip.q));

      let drop = null;
      if (p.drop && tip.q > p.drop.at) {
        const born = tipOf(p, p.d + p.drop.at * (p.e - p.d));
        const dt = ((f - (p.d + p.drop.at * (p.e - p.d))) * FILL) / SPEED;
        const fall = born.y + H * 1.6 * dt + 0.5 * H * 7 * dt * dt;
        const back = Math.exp(-dt * 9);
        r *= 1 - 0.32 * back;
        L -= hw * 0.9 * back * smooth(0, 0.04, dt);
        drop = { y: fall, r: hw * 0.62 * BULB * 0.9, v: 1.6 + 7 * dt, dt };
      }
      L = Math.max(0, L);
      const rr = Math.min(r, L * 0.55);
      return { cx, hw, front, L, r: rr, drop, wob: p.wob };
    });

    ctx.fillStyle = PAINT;
    ctx.beginPath();
    ctx.moveTo(-2, -2);
    ctx.lineTo(W + 2, -2);
    for (let x = W + STEP; x >= -STEP; x -= STEP) {
      let y = frontOf(f, x);
      for (const d of drips) {
        const u = Math.abs(x - d.cx) / d.hw;
        if (u > 1.7 || d.L <= 0) continue;
        const neck = Math.max(0, d.L - d.r);
        y = Math.max(y, d.front + neck * (1 - smooth(0.5, 1.65, u)));
      }
      ctx.lineTo(x, Math.max(BAND, y));
    }
    ctx.closePath();
    ctx.fill();

    for (const d of drips) {
      if (d.r < 0.8) continue;
      const by = d.front + d.L - d.r;
      const rx = d.r * (1 + 0.025 * Math.sin(clock * 9 + d.wob));
      ctx.fillStyle = PAINT;
      ctx.beginPath();
      ctx.ellipse(d.cx, by, rx, d.r, 0, 0, Math.PI * 2);
      ctx.fill();
      if (by + d.r < H) drawGlint(ctx, d.cx, by, d.r);
    }

    for (const d of drips) {
      if (!d.drop || d.drop.y - d.drop.r > H) continue;
      const s = Math.min(0.55, d.drop.v * 0.05);
      const tipY = d.front + d.L;
      ctx.fillStyle = PAINT;
      if (d.drop.dt < 0.09) {
        const k = 1 - d.drop.dt / 0.09;
        ctx.beginPath();
        ctx.moveTo(d.cx - d.hw * 0.4 * k, tipY - 2);
        ctx.lineTo(d.cx + d.hw * 0.4 * k, tipY - 2);
        ctx.lineTo(d.cx + 0.6 * k, d.drop.y - d.drop.r * 0.6);
        ctx.lineTo(d.cx - 0.6 * k, d.drop.y - d.drop.r * 0.6);
        ctx.closePath();
        ctx.fill();
      }
      ctx.beginPath();
      ctx.ellipse(d.cx, d.drop.y, d.drop.r * (1 - s * 0.35), d.drop.r * (1 + s), 0, 0, Math.PI * 2);
      ctx.fill();
      drawGlint(ctx, d.cx, d.drop.y, d.drop.r);
    }
  };

  const drawRelease = (ctx, g, k) => {
    const { W, H, clock } = stateRef.current;
    const fall = H + 90;
    const S = BAND + fall * Math.pow(k, 1.7);
    const peaks = [];
    ctx.fillStyle = PAINT;

    for (const s of g.strands) {
      const x = s.x * W;
      const snapAt = s.snap * H;
      if (S < snapAt) {
        const w = s.w * (1 - 0.68 * Math.pow(S / snapAt, 0.8));
        const flare = Math.min(14, S * 0.25);
        ctx.beginPath();
        ctx.moveTo(x - w / 2 - flare * 0.9, 0);
        ctx.quadraticCurveTo(x - w / 2, 0, x - w / 2, flare);
        ctx.quadraticCurveTo(x - w * 0.16, S * 0.55, x - w / 2, S - flare);
        ctx.quadraticCurveTo(x - w / 2, S, x - w / 2 - flare * 1.4, S + 4);
        ctx.lineTo(x + w / 2 + flare * 1.4, S + 4);
        ctx.quadraticCurveTo(x + w / 2, S, x + w / 2, S - flare);
        ctx.quadraticCurveTo(x + w * 0.16, S * 0.55, x + w / 2, flare);
        ctx.quadraticCurveTo(x + w / 2, 0, x + w / 2 + flare * 0.9, 0);
        ctx.closePath();
        ctx.fill();
        peaks.push({ x, h: Math.min(28, S * 0.12), w: 26 });
      } else {
        const kSnap = Math.pow(Math.max(0, snapAt - BAND) / fall, 1 / 1.7);
        const tau = Math.max(0, ((k - kSnap) * RELEASE) / SPEED);
        const up =
          snapAt *
          0.16 *
          Math.pow(Math.max(0, 1 - tau / 0.42), 2) *
          (1 + 0.18 * Math.sin(tau * 34) * Math.exp(-tau * 8));

        if (up > 0.5) {
          const w = s.w * 0.24;
          const r = Math.min(w * 1.3, up * 0.5);
          ctx.beginPath();
          ctx.moveTo(x - w - 6, 0);
          ctx.quadraticCurveTo(x - w * 0.5, 0, x - w * 0.5, Math.min(6, up));
          ctx.lineTo(x - w * 0.5, up - r);
          ctx.lineTo(x + w * 0.5, up - r);
          ctx.lineTo(x + w * 0.5, Math.min(6, up));
          ctx.quadraticCurveTo(x + w * 0.5, 0, x + w + 6, 0);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, up - r, r, 0, Math.PI * 2);
          ctx.fill();
        }
        const low = snapAt * 0.22 * Math.pow(Math.max(0, 1 - tau / 0.16), 2);
        const ring = 28 * Math.exp(-tau * 6.5) * Math.cos(tau * s.wob);
        peaks.push({ x, h: low + (Math.min(28, snapAt * 0.12) * ring) / 28, w: 26 + low * 0.2, thin: low });
      }
    }

    const edge = (x) => {
      let y = S + Math.sin(x * 0.017 + clock * 2) * 2.5 * (1 - k);
      for (const p of peaks) {
        const u = (x - p.x) / (p.thin ? 5 + p.w * 0.25 : p.w);
        y -= p.h * Math.exp(-u * u);
      }
      return y;
    };

    ctx.beginPath();
    ctx.moveTo(-2, H + 2);
    for (let x = -STEP; x <= W + STEP; x += STEP) ctx.lineTo(x, edge(x));
    ctx.lineTo(W + 2, H + 2);
    ctx.closePath();
    ctx.fill();

    if (S < H + 10) {
      ctx.strokeStyle = GLINT;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = -STEP; x <= W + STEP; x += STEP) {
        const y = edge(x);
        if (x === -STEP) ctx.moveTo(x, y + 1.2);
        else ctx.lineTo(x, y + 1.2);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };

  const render = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const { W, H, dpr, pour, sag } = stateRef.current;
    if (W === 0 || H === 0) return;

    stateRef.current.clock += 0.016;

    // Sag spring physics
    const f = (sag.target - sag.h) * 0.12;
    sag.v = (sag.v + f) * 0.78;
    sag.h += sag.v;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    if (pour) {
      if (pour.t < 1) {
        drawFill(ctx, pour, pour.t);
      } else {
        drawRelease(ctx, pour, pour.t - 1);
      }
    } else {
      drawBand(ctx);
    }

    ctx.restore();
  }, []);

  useEffect(() => {
    stateRef.current.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    measure();
    window.addEventListener('resize', measure);

    gsap.ticker.add(render);
    return () => {
      window.removeEventListener('resize', measure);
      gsap.ticker.remove(render);
    };
  }, [measure, render]);

  const notifyHover = useCallback((xRatio, isHovered) => {
    stateRef.current.sag.x = xRatio;
    stateRef.current.sag.target = isHovered ? 8 : 0;
  }, []);

  const navigate = useCallback(
    (href, originX = 0.5) => {
      if (busyRef.current) return;
      if (href === pathname) return;

      busyRef.current = true;
      const { reduced } = stateRef.current;

      if (reduced) {
        gsap.to(document.body, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            router.push(href);
            window.scrollTo(0, 0);
            gsap.to(document.body, {
              opacity: 1,
              duration: 0.2,
              onComplete: () => {
                busyRef.current = false;
                window.dispatchEvent(new Event('route:revealed'));
              },
            });
          },
        });
        return;
      }

      const pour = makePour(originX);
      stateRef.current.pour = pour;

      // Phase 1: COVER (0 -> 1)
      gsap.to(pour, {
        t: 1,
        duration: FILL / SPEED,
        ease: 'power3.in',
        onComplete: () => {
          // Push route
          router.push(href);
          window.scrollTo(0, 0);

          // Hard timeout of 1200ms or immediate wait
          const timeout = setTimeout(() => {
            startRelease();
          }, 450);

          const handleReady = () => {
            clearTimeout(timeout);
            startRelease();
          };

          window.addEventListener('route:ready', handleReady, { once: true });

          function startRelease() {
            // Phase 2: RELEASE (1 -> 2)
            gsap.to(pour, {
              t: 2,
              duration: RELEASE / SPEED,
              ease: 'power2.out',
              onComplete: () => {
                stateRef.current.pour = null;
                busyRef.current = false;
                window.dispatchEvent(new Event('route:revealed'));
                const h1 = document.querySelector('h1');
                if (h1) {
                  h1.setAttribute('tabindex', '-1');
                  h1.focus();
                }
              },
            });
          }
        },
      });
    },
    [pathname, router, FILL, RELEASE, SPEED]
  );

  return (
    <DripContext.Provider value={{ navigate, notifyHover }}>
      <div ref={containerRef} className="relative min-h-screen">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: 'none',
            width: '100vw',
            height: '100vh',
          }}
        />
        {children}
      </div>
    </DripContext.Provider>
  );
}
