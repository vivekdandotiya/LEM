'use client';
import './TheCandleLoaderThatBurnsDown.css';
/*
  "The candle loader that burns down" from Animorio · https://animorio.com
  License: free on your own sites and your clients’ sites, paid work included.
  Not for resale, redistribution, templates or code collections · https://animorio.com/en/license/
*/
/* The candle loader that burns down, as a React component. Made by Animorio from the demo's own code.
   npm install gsap @gsap/react @fontsource-variable/mona-sans
   The CSS is the style.css tab: save it next to this file as TheCandleLoaderThatBurnsDown.css.
   A few lookups still use document: with two copies of this component on one page, scope them to the container. */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import '@fontsource-variable/mona-sans/wdth.css';
import './TheCandleLoaderThatBurnsDown.css';

gsap.registerPlugin(useGSAP);

export default function TheCandleLoaderThatBurnsDown({ onDone }) {
  const container = useRef(null);

  useGSAP(() => {
    const initialMarkup = container.current.innerHTML;
    const cleanups = [];
    const watched = (Observer) => class extends Observer { constructor(...args) { super(...args); cleanups.push(() => this.disconnect()); } };
    const ResizeObserver = watched(window.ResizeObserver);
    const addPageListener = (target, ...args) => { target.addEventListener(...args); cleanups.push(() => target.removeEventListener(...args)); };
    const addTicker = (callback, ...args) => { gsap.ticker.add(callback, ...args); cleanups.push(() => gsap.ticker.remove(callback)); };

    /* ---- valori da cambiare ---- */
    const SECONDS = 1.8;            /* quanto ci mette la candela a consumarsi, cioè quanto dura il caricamento della demo, in secondi */
    const HOLD = 0.4;               /* quanti secondi resta la parola nel fumo prima che si accenda una candela nuova */
    const WORD = 'Ignite.';            /* la parola che il fumo scrive dove c'era la fiamma, quando il caricamento finisce */
    const EVENT = 'Lead Edge Marketing';   /* il nome dell'evento sotto la candela */
    const PHASES = ['Warming up the strategy', 'Lighting the campaigns', 'Fuelling momentum'];   /* le tre fasi del caricamento, una dopo l'altra */
    const DONE = 'Ready.';   /* la riga quando il caricamento è finito */
    const FLICKER = 1;              /* quanto trema la fiamma: 0 ferma, 1 una candela vera */
    const WIND = 1;                 /* quanto la fiamma si piega alla corrente d'aria: 0 dritta */
    const DRIPS = 5;                /* quante gocce di cera colano lungo i fianchi in un caricamento */
    const MARKS = ['01', '02', '03', '04'];   /* le ore incise sulla candela, che la cera consuma una alla volta */

    (() => {
      const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const $ = (s) => document.querySelector(s);

      const root = $('[data-candela]');
      const scene = $('[data-scene]');
      const cv = $('[data-canvas]');
      const ctx = cv.getContext('2d');
      const wordEl = $('[data-word]');
      const statusEl = $('[data-status]');
      const numEl = $('[data-num]');
      $('[data-event]').textContent = EVENT;

      /* the drawing lives in a 120 x 240 box; everything below is in those units */
      const VW = 120, VH = 240;
      const WORD_Y = 104;   /* the bottom of the word, where the smoke thins out */
      const L = 44, R = 76, CX = 60, HALF = 16, RY = 3.4;
      const BOTTOM = 214, TOP_FULL = 76, TOP_END = 184;
      const DISH_Y = 216;
      const topAt = (p) => TOP_FULL + (TOP_END - TOP_FULL) * p;

      /* smooth 1D value noise, -1..1: the flame, the air and the light all breathe on it, never in random jumps */
      const hash = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return (x - Math.floor(x)) * 2 - 1; };
      const noise = (x) => {
        const i = Math.floor(x), f = x - i;
        const u = f * f * f * (f * (f * 6 - 15) + 10);
        return hash(i) * (1 - u) + hash(i + 1) * u;
      };
      const mix = (a, b, k) => a + (b - a) * k;
      const rgb = (a, b, k, al = 1) => `rgba(${Math.round(mix(a[0], b[0], k))},${Math.round(mix(a[1], b[1], k))},${Math.round(mix(a[2], b[2], k))},${al})`;

      /* the wax, unlit and lit by its own flame */
      const WAX = {
        shadowDark: [26, 22, 19], shadowLit: [104, 82, 58],
        midDark: [64, 56, 48], midLit: [222, 204, 172],
        highDark: [88, 78, 67], highLit: [250, 238, 214]
      };

      /* the state everything is drawn from */
      const st = {
        p: 0,            /* how much has loaded, 0 to 1: the wax line follows it */
        flame: 0,        /* how lit the flame is, 0 out, 1 burning */
        blow: 1,         /* the flame squeezed by a breath */
        gust: 0,         /* a sudden draught, in degrees */
        ember: 0,        /* the glow left on the wick when it goes out */
        char: 0.15,      /* how much of the wick is burnt black */
        alpha: 0,        /* the whole candle, faded in when a new one is lit */
        lift: 0          /* the new candle settling on the dish */
      };
      const spring = { a: 0, v: 0 };   /* the flame's lean, with a spring so it overshoots and straightens */
      let pointerWind = 0, pointerTarget = 0;
      let phase = -1, done = false, cycle = null;
      let drips = [], plan = [], poolSeed = 0, smoke = [], emitting = 0, emitAcc = 0;

      /* the drips: two run down the edges and spill onto the dish, the others down the front */
      const dripPlan = () => Array.from({ length: Math.max(0, Math.round(DRIPS)) }, (_, i) => {
        const edge = i === 0 ? -1 : i === 1 ? 1 : 0;
        return {
          at: 0.06 + (i + 0.4) / (DRIPS + 0.6) * 0.8,
          x: edge < 0 ? L + 1.1 : edge > 0 ? R - 1.1 : [67.5, 49.4, 71.2, 51.6, 69.4, 47.6][(i - 2) % 6],
          edge,
          len: edge ? (i === 0 ? 999 : 26 + ((i * 13) % 9)) : 20 + ((i * 37) % 13),
          w: edge ? 3.1 : 2.4 + (i % 3) * 0.3,
          born: false
        };
      });

      const birthDrip = (d) => {
        d.born = true;
        const t = topAt(st.p);
        const y0 = t + RY * 0.7;
        const max = d.edge ? BOTTOM - y0 + 1 : Math.min(d.len, BOTTOM - y0 - 4);
        const drip = { x: d.x, edge: d.edge, w: d.w, y0, len: 0, heat: 1, max };
        drips.push(drip);
        if (REDUCED) { drip.len = max; drip.heat = 0; return; }
        /* the hot wax runs in soft surges, slows, stops and sets */
        const step = max / 3;
        gsap.timeline()
          .to(drip, { len: step * 1.25, duration: 0.7, ease: 'power2.out' })
          .to(drip, { len: step * 2.2, duration: 0.8, ease: 'power2.inOut' }, '+=0.35')
          .to(drip, { len: max, duration: 1.1, ease: 'power3.out' }, '+=0.45')
          .to(drip, { heat: 0, duration: 2.6, ease: 'sine.inOut' }, 0.6);
      };

      /* the status line: the old words leave before the new ones come */
      const setStatus = (text) => {
        if (statusEl.textContent === text) return;
        scene.setAttribute('aria-valuetext', text);
        if (REDUCED) {
          gsap.to(statusEl, { opacity: 0, duration: 0.15, onComplete: () => { statusEl.textContent = text; gsap.to(statusEl, { opacity: 1, duration: 0.2 }); } });
          return;
        }
        gsap.timeline()
          .to(statusEl, { yPercent: -110, opacity: 0, duration: 0.2, ease: 'power2.in' })
          .add(() => { statusEl.textContent = text; })
          .fromTo(statusEl, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.42, ease: 'back.out(1.6)' });
      };

      /* the word the smoke writes */
      const buildWord = () => {
        wordEl.textContent = '';
        [...WORD].forEach((ch) => {
          const s = document.createElement('span');
          s.textContent = ch === ' ' ? ' ' : ch;
          if (/[.!?]/.test(ch)) s.className = 'dot';
          wordEl.append(s);
        });
        gsap.set(wordEl.children, { opacity: 0 });
      };
      buildWord();

      /* the canvas follows its box and the screen's density */
      let scale = 1;
      const fit = () => {
        const r = cv.getBoundingClientRect();
        const dpr = Math.min(2.5, window.devicePixelRatio || 1);
        cv.width = Math.max(1, Math.round(r.width * dpr));
        cv.height = Math.max(1, Math.round(r.height * dpr));
        scale = cv.height / VH;
      };
      fit();
      addPageListener(window, 'resize', fit);
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(cv);

      /* ---- the drawing ---- */

      /* the flame's outline: a teardrop whose tip bends more than its base */
      const flamePath = (H, W, bend, wob, time) => {
        const n = 22, pts = [];
        for (let s = 0; s <= 1; s += 1) {
          for (let i = 0; i <= n; i++) {
            const f = s ? 1 - i / n : i / n;
            const prof = Math.sqrt(f) * Math.pow(1 - f, 1.25) / 0.351;
            const w = W * prof * (1 + 0.07 * noise(time * 3.1 + f * 2.3 + s * 5));
            const x = bend * Math.pow(f, 1.8) + wob * Math.pow(f, 2.4) + (s ? w : -w);
            pts.push([x, -H * f]);
          }
        }
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
      };

      const drawFlame = (x, y, time, size, bend, nf) => {
        if (size <= 0.01) return;
        const H = 25 * size * (1 + 0.09 * FLICKER * nf);
        const W = 5.1 * Math.min(1.2, size) * (1 - 0.05 * FLICKER * nf);
        const wob = REDUCED ? 0 : 1.1 * FLICKER * noise(time * 6.3 + 11);
        ctx.save();
        ctx.translate(x, y);
        ctx.globalCompositeOperation = 'lighter';

        /* the glow round the flame */
        /* every radial light is filled exactly on its own circle, so it can never show an edge, however small or bent */
        const gx = bend * 0.3, gy = -H * 0.45, gr = Math.max(1, H * 0.9);
        let g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, `rgba(255,150,60,${0.32 * size})`);
        g.addColorStop(1, 'rgba(255,120,30,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2); ctx.fill();

        /* the outer flame: orange, soft at the edges, gone at the tip */
        ctx.shadowColor = 'rgba(255,110,20,.9)';
        ctx.shadowBlur = 5 * scale;
        flamePath(H, W, bend, wob, time);
        g = ctx.createLinearGradient(0, 0, 0, -H);
        g.addColorStop(0, 'rgba(255,120,30,0)');
        g.addColorStop(0.14, 'rgba(255,128,36,.92)');
        g.addColorStop(0.6, 'rgba(255,100,22,.82)');
        g.addColorStop(0.88, 'rgba(240,70,10,.35)');
        g.addColorStop(1, 'rgba(220,50,0,0)');
        ctx.fillStyle = g;
        ctx.fill();
        ctx.shadowBlur = 0;

        /* the yellow heart */
        ctx.save();
        ctx.translate(0, -H * 0.03);
        flamePath(H * 0.72, W * 0.6, bend * 0.62, wob * 0.5, time + 9);
        g = ctx.createLinearGradient(0, 0, 0, -H * 0.72);
        g.addColorStop(0, 'rgba(255,246,222,0)');
        g.addColorStop(0.16, 'rgba(255,244,214,.95)');
        g.addColorStop(0.5, 'rgba(255,214,120,.9)');
        g.addColorStop(1, 'rgba(255,170,60,0)');
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();

        /* the warm-white base where the wax vapour burns */
        g = ctx.createRadialGradient(0, -2.2, 0, 0, -2.2, W * 0.95);
        g.addColorStop(0, 'rgba(255,246,222,.85)');
        g.addColorStop(0.45, 'rgba(255,214,150,.55)');
        g.addColorStop(1, 'rgba(255,160,60,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(0, -2.2, W * 0.95, 3.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      /* the hot wax colour at a point across the candle, from the shadowed left to the lit middle and back */
      const bodyGradient = (lit, y0, y1) => {
        const g = ctx.createLinearGradient(L, 0, R, 0);
        const sh = rgb(WAX.shadowDark, WAX.shadowLit, lit);
        const md = rgb(WAX.midDark, WAX.midLit, lit);
        const hi = rgb(WAX.highDark, WAX.highLit, lit);
        g.addColorStop(0, sh);
        g.addColorStop(0.2, md);
        g.addColorStop(0.42, hi);
        g.addColorStop(0.62, md);
        g.addColorStop(0.9, rgb(WAX.shadowDark, WAX.shadowLit, lit * 0.8));
        g.addColorStop(1, rgb(WAX.shadowDark, WAX.shadowDark, 0));
        return g;
      };

      const drawDish = (lit, time) => {
        /* a warm smear of light on the table */
        ctx.save();
        ctx.translate(CX, DISH_Y + 3);
        ctx.scale(1, 0.22);
        let g = ctx.createRadialGradient(0, 0, 0, 0, 0, 66);
        g.addColorStop(0, `rgba(255,140,60,${0.12 * lit})`);
        g.addColorStop(1, 'rgba(255,140,60,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(0, 0, 66, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        /* the pewter dish: its underside, then the top with the flame caught on the rim */
        ctx.beginPath();
        ctx.ellipse(CX, DISH_Y + 2.2, 40, 7.6, 0, 0, Math.PI);
        ctx.fillStyle = rgb([16, 15, 14], [62, 52, 42], lit * 0.8);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(CX, DISH_Y, 40, 7.6, 0, 0, Math.PI * 2);
        g = ctx.createLinearGradient(CX - 40, 0, CX + 40, 0);
        g.addColorStop(0, rgb([18, 17, 16], [52, 46, 40], lit));
        g.addColorStop(0.45, rgb([34, 32, 30], [104, 92, 78], lit));
        g.addColorStop(1, rgb([14, 13, 12], [44, 38, 33], lit));
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(CX, DISH_Y, 36, 6.2, 0, 0, Math.PI * 2);
        ctx.fillStyle = rgb([12, 11, 10], [40, 34, 29], lit);
        ctx.fill();
        /* the rim catches the flame: a warm highlight on the far edge, a cooler one on the near edge */
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = `rgba(255,190,120,${0.55 * lit})`;
        ctx.beginPath();
        ctx.ellipse(CX, DISH_Y, 40, 7.6, 0, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = `rgba(255,205,150,${0.16 * lit + 0.03})`;
        ctx.beginPath();
        ctx.ellipse(CX, DISH_Y, 40, 7.6, 0, Math.PI * 0.36, Math.PI * 0.58);
        ctx.stroke();
        /* the flame reflected in the metal */
        g = ctx.createRadialGradient(CX + 6, DISH_Y + 4, 0, CX + 6, DISH_Y + 4, 9);
        g.addColorStop(0, `rgba(255,170,80,${0.35 * lit})`);
        g.addColorStop(1, 'rgba(255,170,80,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(CX + 6, DISH_Y + 4, 9, 0, Math.PI * 2); ctx.fill();
      };

      const drawPool = (lit) => {
        /* the wax that ran down spreads on the dish, a little uneven */
        const rx = 18 + 13 * Math.min(1, st.p * 1.1);
        ctx.beginPath();
        for (let i = 0; i <= 48; i++) {
          const a = (i / 48) * Math.PI * 2;
          const r = 1 + 0.08 * noise(a * 1.7 + poolSeed) + 0.05 * noise(a * 4.1 + poolSeed * 2);
          const x = CX + Math.cos(a) * rx * r, y = DISH_Y - 0.6 + Math.sin(a) * rx * 0.2 * r;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.closePath();
        const g = ctx.createRadialGradient(CX, DISH_Y - 1, 2, CX, DISH_Y - 1, rx);
        g.addColorStop(0, rgb(WAX.midDark, WAX.midLit, lit * 0.85));
        g.addColorStop(0.75, rgb(WAX.midDark, [176, 158, 128], lit));
        g.addColorStop(1, rgb(WAX.shadowDark, [92, 74, 54], lit));
        ctx.fillStyle = g;
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = `rgba(255,236,204,${0.18 * lit})`;
        ctx.stroke();
      };

      const dripShape = (d, t, lit, time) => {
        const y0 = Math.max(d.y0, t + RY * 0.6);
        const y1 = d.y0 + d.len;
        if (y1 <= y0 + 0.4) return;
        const w0 = d.w, r = d.w * 0.6;
        const span = Math.max(1, y1 - r - y0);
        /* wider at the neck where it leaves the rim, thinner as it runs, with little beads where it paused */
        const wl = (y) => {
          const k = (y - y0) / span;
          const neck = Math.max(0, 1 - (y - y0) / 3.2);
          const beads = 0.16 * Math.pow(Math.max(0, Math.sin((y - d.y0) * 0.55 + d.x)), 6);
          return d.w * (0.5 + 0.22 * (1 - k) + neck * 0.75 + beads);
        };
        const wx = (y) => d.x + d.edge * 0.5 + 0.35 * Math.sin((y - d.y0) * 0.21 + d.x * 3);
        const pts = 22;
        const shape = (ox, oy) => {
          ctx.beginPath();
          for (let i = 0; i <= pts; i++) {
            const y = mix(y0, y1 - r, i / pts);
            const x = wx(y) - wl(y) / 2;
            i ? ctx.lineTo(x + ox, y + oy) : ctx.moveTo(x + ox, y + oy);
          }
          ctx.arc(wx(y1 - r) + ox, y1 - r + oy, r, Math.PI, 0, true);
          for (let i = pts; i >= 0; i--) {
            const y = mix(y0, y1 - r, i / pts);
            ctx.lineTo(wx(y) + wl(y) / 2 + ox, y + oy);
          }
          ctx.closePath();
        };
        shape(0.6, 0.5);
        /* its shadow on the wax, so the drip stands off the body */
        ctx.fillStyle = `rgba(40,24,10,${0.34 * lit + 0.12})`;
        ctx.fill();
        shape(0, 0);
        /* a fresh drip is warmer and glossier; a set one is matte and a touch darker */
        const g = ctx.createLinearGradient(d.x - w0, 0, d.x + w0, 0);
        const hot = d.heat;
        g.addColorStop(0, rgb(WAX.shadowDark, WAX.shadowLit, lit * 0.9));
        g.addColorStop(0.42, rgb(WAX.highDark, [255, 232, 196], lit * (0.88 + 0.12 * hot)));
        g.addColorStop(1, rgb(WAX.shadowDark, WAX.shadowLit, lit * 0.7));
        ctx.fillStyle = g;
        ctx.fill();
        /* the gloss line and the tiny highlight on the bead */
        ctx.lineWidth = 0.35;
        ctx.strokeStyle = `rgba(255,248,232,${(0.25 + 0.45 * hot) * lit})`;
        ctx.beginPath();
        for (let i = 0; i <= 10; i++) {
          const y = mix(y0 + 1.5, y1 - r * 1.2, i / 10);
          const x = wx(y) - wl(y) * 0.2;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = `rgba(255,250,236,${(0.35 + 0.5 * hot) * lit})`;
        ctx.beginPath();
        ctx.arc(wx(y1 - r) - r * 0.35, y1 - r * 1.15, r * 0.26, 0, Math.PI * 2);
        ctx.fill();
      };

      const drawCandle = (t, lit, nf, time, bend) => {
        /* the body, standing in its pool */
        ctx.beginPath();
        ctx.moveTo(L, t);
        ctx.lineTo(L, BOTTOM);
        ctx.ellipse(CX, BOTTOM, HALF, RY * 0.9, 0, Math.PI, 0, true);
        ctx.lineTo(R, t);
        ctx.ellipse(CX, t, HALF, RY, 0, 0, Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = bodyGradient(lit);
        ctx.fill();

        ctx.save();
        ctx.clip();
        /* further from the flame the wax goes into shadow */
        let g = ctx.createLinearGradient(0, t, 0, BOTTOM);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(0.35, 'rgba(0,0,0,.18)');
        g.addColorStop(1, 'rgba(0,0,0,.62)');
        ctx.fillStyle = g;
        ctx.fillRect(L - 2, t - 4, R - L + 4, BOTTOM - t + 8);
        /* the light goes into the wax just under the rim and glows through it */
        ctx.globalCompositeOperation = 'lighter';
        g = ctx.createLinearGradient(0, t, 0, t + 30);
        g.addColorStop(0, `rgba(255,170,80,${0.5 * lit * (0.92 + 0.08 * nf)})`);
        g.addColorStop(0.4, `rgba(255,140,60,${0.16 * lit})`);
        g.addColorStop(1, 'rgba(255,120,40,0)');
        ctx.fillStyle = g;
        ctx.fillRect(L - 2, t - 4, R - L + 4, 36);
        ctx.globalCompositeOperation = 'source-over';
        /* the hours engraved on the front: a dark cut with a lit lower lip */
        ctx.font = `500 5px 'Mona Sans Variable', system-ui, sans-serif`;
        MARKS.forEach((m, i) => {
          const y = TOP_FULL + (TOP_END - TOP_FULL) * (i + 1) / MARKS.length - 2;
          if (y < t + RY + 1.5) return;
          ctx.lineWidth = 0.45;
          ctx.strokeStyle = `rgba(40,28,18,${0.28 + 0.3 * lit})`;
          ctx.beginPath(); ctx.ellipse(CX, y, HALF, RY * 0.9, 0, 0.05, Math.PI - 0.05); ctx.stroke();
          ctx.strokeStyle = `rgba(255,240,214,${0.2 * lit})`;
          ctx.beginPath(); ctx.ellipse(CX, y + 0.45, HALF, RY * 0.9, 0, 0.25, Math.PI - 0.25); ctx.stroke();
          ctx.textAlign = 'center';
          ctx.fillStyle = `rgba(255,240,214,${0.16 * lit})`;
          ctx.fillText(m, CX - 3.6, y + 9.4);
          ctx.fillStyle = `rgba(56,40,26,${0.32 + 0.4 * lit})`;
          ctx.fillText(m, CX - 3.6, y + 9);
        });
        ctx.restore();

        /* the drips, cut where the wax has already burnt away */
        drips.forEach((d) => dripShape(d, t, lit, time));

        /* the top: the lip of the cup, then the melted pool inside, glowing amber */
        ctx.beginPath();
        ctx.ellipse(CX, t, HALF, RY, 0, 0, Math.PI * 2);
        ctx.fillStyle = rgb(WAX.midDark, [244, 228, 200], lit);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(CX, t + 0.35, HALF - 2.4, RY - 0.9, 0, 0, Math.PI * 2);
        g = ctx.createRadialGradient(CX + bend * 0.05, t + 0.2, 0, CX, t + 0.2, HALF - 2.4);
        g.addColorStop(0, `rgba(255,214,140,${0.04 + 0.9 * lit})`);
        g.addColorStop(0.55, rgb([60, 46, 30], [255, 186, 104], lit, 0.95));
        g.addColorStop(1, rgb(WAX.midDark, [214, 176, 128], lit));
        ctx.fillStyle = g;
        ctx.fill();
        /* the flame shining on the liquid wax */
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = `rgba(255,236,190,${0.55 * lit * (0.9 + 0.1 * nf)})`;
        ctx.beginPath();
        ctx.ellipse(CX + 2.6 + bend * 0.08, t + 0.9, 3.2, 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        /* the near rim, where the wax is thinnest and the light comes through */
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = `rgba(255,214,160,${0.7 * lit})`;
        ctx.beginPath();
        ctx.ellipse(CX, t, HALF - 0.3, RY - 0.3, 0, 0.12, Math.PI - 0.12);
        ctx.stroke();
      };

      /* the wick: white cotton at the foot, burnt black above, bending as it burns, with its ember */
      const drawWick = (t, bend, lit) => {
        const len = 7.4;
        const curl = 0.8 + 2.8 * st.char + bend * 0.04;
        const x0 = CX, y0 = t + 0.4, x1 = CX + curl, y1 = t - len;
        const cx1 = CX + curl * 0.1, cy1 = t - len * 0.65;
        const at = (k) => [
          (1 - k) * (1 - k) * x0 + 2 * (1 - k) * k * cx1 + k * k * x1,
          (1 - k) * (1 - k) * y0 + 2 * (1 - k) * k * cy1 + k * k * y1
        ];
        const n = 10;
        for (let i = 0; i < n; i++) {
          const [ax, ay] = at(i / n), [bx, by] = at((i + 1) / n);
          const k = i / n;
          const black = k > 0.32 - st.char * 0.2;
          ctx.lineCap = 'round';
          ctx.lineWidth = mix(1.15, 0.8, k);
          ctx.strokeStyle = black ? `rgb(${Math.round(16 + 30 * lit)},${Math.round(13 + 18 * lit)},${Math.round(11 + 10 * lit)})` : rgb([60, 56, 50], [236, 226, 206], lit);
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        }
        /* the glowing tip: bright while it burns, an ember when it goes out */
        const glow = Math.max(st.ember, st.flame * 0.8);
        if (glow > 0.01) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          const g = ctx.createRadialGradient(x1, y1, 0, x1, y1, 2.4);
          g.addColorStop(0, `rgba(255,190,90,${glow})`);
          g.addColorStop(0.4, `rgba(255,90,20,${glow * 0.7})`);
          g.addColorStop(1, 'rgba(255,60,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x1, y1, 2.4, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
        return [x1, y1];
      };

      /* the smoke: puffs born one after another at the wick; each sways on its own phase and the sway grows as it climbs,
         so the chain of them is a ribbon that curls, thickens, drifts and thins out. Two strands, the second fainter */
      let emitClock = 0;
      const updateSmoke = (dt, time, tip) => {
        if (emitting > 0) {
          emitting -= dt;
          emitAcc += dt * 70;
          while (emitAcc >= 1) {
            emitAcc -= 1;
            emitClock += 1 / 70;
            smoke.push({ x0: tip[0], x: tip[0], y0: tip[1], y: tip[1] - 0.6, vy: -38 - 14 * Math.max(0, emitting), age: 0, life: 3.8, ph: emitClock * 4.2 });
          }
        }
        smoke.forEach((s) => {
          s.age += dt;
          s.vy *= Math.pow(0.55, dt);
          s.y += s.vy * dt;
          const drift = noise(time * 0.4 + 3) * 4 * s.age;
          s.x = s.x0 + drift;
        });
        smoke = smoke.filter((s) => s.age < s.life);
      };

      /* like real candle smoke: a straight column for a short way, then a wave that travels up it and grows as it climbs,
         drawn in long soft pieces so the thread never beads */
      let smokeTime = 0;
      const strand = (amp, shift, width, alpha) => {
        if (smoke.length < 3) return;
        const P = smoke.map((s) => {
          const d = Math.max(0, s.y0 - s.y);
          const grow = Math.pow(Math.max(0, d - 10) / 42, 1.35);
          const x = s.x + amp * grow * (Math.sin(d * 0.13 - smokeTime * 2.1 + shift) + 0.32 * Math.sin(d * 0.31 - smokeTime * 3.3 + shift * 2));
          return { x, y: s.y, k: s.age / s.life, age: s.age };
        });
        const CH = 5;
        for (let c = 0; c < P.length - 1; c += CH) {
          const seg = P.slice(c, Math.min(P.length, c + CH + 1));
          if (seg.length < 2) continue;
          const m = seg[Math.floor(seg.length / 2)];
          const nearWord = Math.min(1, Math.max(0, (m.y - WORD_Y) / 30));
          const al = alpha * (1 - m.k) * (1 - m.k) * Math.min(1, m.age * 5) * nearWord;
          if (al < 0.006) continue;
          ctx.strokeStyle = `rgba(222,214,202,${al})`;
          ctx.lineWidth = width * (0.55 + m.k * 3);
          ctx.beginPath();
          ctx.moveTo(seg[0].x, seg[0].y);
          for (let i = 1; i < seg.length - 1; i++) {
            const xc = (seg[i].x + seg[i + 1].x) / 2, yc = (seg[i].y + seg[i + 1].y) / 2;
            ctx.quadraticCurveTo(seg[i].x, seg[i].y, xc, yc);
          }
          ctx.lineTo(seg[seg.length - 1].x, seg[seg.length - 1].y);
          ctx.stroke();
        }
      };

      const drawSmoke = (dt) => {
        smokeTime += dt;
        if (smoke.length < 3) return;
        ctx.save();
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'round';
        /* the soft body first, wide and faint, then the threads */
        ctx.shadowColor = 'rgba(210,200,186,.45)';
        ctx.shadowBlur = 5 * scale;
        strand(9, 0, 3.2, 0.07);
        ctx.shadowBlur = 0;
        strand(9, 0, 0.85, 0.6);
        strand(6, 2.1, 0.55, 0.3);
        ctx.restore();
      };

      /* drawing, every frame */
      let last = 0;
      const draw = (time) => {
        const dt = Math.min(0.05, last ? time - last : 0.016);
        last = time;
        const t = topAt(st.p);

        /* the flame's motion: a soft flicker on noise, the air, the pointer, and a spring that bends it */
        const still = REDUCED || FLICKER <= 0;
        const nf = still ? 0 : noise(time * 4.1) * 0.6 + noise(time * 9.7 + 3) * 0.4;
        pointerWind += (pointerTarget - pointerWind) * Math.min(1, dt * 4);
        const air = REDUCED ? 0 : WIND * (noise(time * 0.35) * 4 + noise(time * 1.3 + 7) * 1.6);
        const target = air + pointerWind + st.gust;
        if (REDUCED) { spring.a = 0; spring.v = 0; } else {
          spring.v += ((target - spring.a) * 70 - spring.v * 8) * dt;
          spring.a += spring.v * dt;
        }
        const bend = spring.a * 0.42;

        const breathe = 0.9 + 0.1 * noise(time * 0.6 + 2);
        const lit = Math.min(1, st.flame) * (0.92 + 0.08 * nf) * breathe + st.ember * 0.06;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.setTransform(scale, 0, 0, scale, (cv.width - VW * scale) / 2, 0);

        /* the halo the flame throws into the dark */
        const tipGuess = t - 9;
        if (lit > 0.01) {
          const hx = CX + bend * 0.4, hy = tipGuess - 8;
          const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 74);
          g.addColorStop(0, `rgba(255,150,60,${0.2 * lit})`);
          g.addColorStop(0.35, `rgba(255,120,40,${0.07 * lit})`);
          g.addColorStop(1, 'rgba(255,110,30,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(hx, hy, 74, 0, Math.PI * 2); ctx.fill();
        }

        ctx.save();
        ctx.globalAlpha = st.alpha;
        ctx.translate(0, st.lift);
        drawDish(lit, time);
        drawPool(lit);
        drawCandle(t, lit, nf, time, bend);
        const tip = drawWick(t, bend, lit);
        ctx.restore();

        drawFlame(tip[0], tip[1] + 2.6 + st.lift, time, st.flame * st.blow, bend, nf);

        updateSmoke(dt, time, [tip[0], tip[1] + st.lift]);
        drawSmoke(dt);

        /* the numbers and the phases follow the wax */
        const pct = Math.round(st.p * 100);
        numEl.textContent = pct + '%';
        scene.setAttribute('aria-valuenow', pct);
        if (!done) {
          const ph = Math.min(PHASES.length - 1, Math.floor(st.p * PHASES.length * 0.999));
          if (ph !== phase) { phase = ph; setStatus(PHASES[ph]); }
        }
        plan.forEach((d) => { if (!d.born && st.p >= d.at) birthDrip(d); });
      };
      addTicker(draw);

      /* a draught every few seconds, so the flame is never mechanical */
      const gusts = () => {
        if (REDUCED || WIND <= 0) return;
        gsap.timeline({ delay: 2.4 + Math.random() * 2.6, onComplete: gusts })
          .to(st, { gust: (Math.random() < 0.5 ? -1 : 1) * (7 + Math.random() * 5) * WIND, duration: 0.3, ease: 'power2.out' })
          .to(st, { gust: 0, duration: 0.9, ease: 'sine.inOut' });
      };

      /* one load: the wax goes down in steps, as a real load does, and the wick chars as it burns */
      const burn = () => {
        const k = SECONDS / 5.6;
        return gsap.timeline()
          .to(st, { p: 0.18, duration: 1.0 * k, ease: 'power1.inOut' })
          .to(st, { p: 0.47, duration: 1.3 * k, ease: 'power1.inOut' }, '+=' + 0.25 * k)
          .to(st, { p: 0.72, duration: 1.0 * k, ease: 'power1.inOut' }, '+=' + 0.35 * k)
          .to(st, { p: 1, duration: 1.7 * k, ease: 'power2.in' })
          .to(st, { char: 1, duration: 6.2 * k, ease: 'power1.out' }, 0);
      };

      /* the end: the flame gasps and goes out, the smoke rises, curls and writes the word */
      const goOut = () => {
        done = true;
        const tl = gsap.timeline();
        if (REDUCED) {
          tl.to(st, { flame: 0, duration: 0.4 })
            .add(() => setStatus(DONE))
            .to(wordEl.children, { opacity: 1, duration: 0.5, stagger: 0.05 });
          return tl;
        }
        gsap.set(wordEl.children, { opacity: 0, y: 18, filter: 'blur(3px)', fontVariationSettings: "'wdth' 75" });
        tl.to(st, { blow: 1.25, duration: 0.12, ease: 'power2.out' })
          .to(st, { gust: 14, duration: 0.12, ease: 'power2.out' }, 0)
          .to(st, { flame: 0, blow: 0.3, duration: 0.3, ease: 'power3.in' })
          .to(st, { gust: 0, duration: 0.6, ease: 'sine.out' }, '<')
          .set(st, { ember: 1 })
          .add(() => { emitting = 2.2; emitAcc = 0; emitClock = 0; })
          .to(st, { ember: 0, duration: 1.8, ease: 'power1.in' })
          .add(() => setStatus(DONE), 0.6)
          .to(wordEl.children, {
            y: 0, filter: 'blur(0px)', fontVariationSettings: "'wdth' 112",
            duration: 1.2, ease: 'power3.out', stagger: 0.1
          }, 1.5)
          .to(wordEl.children, { opacity: 1, duration: 0.9, ease: 'power2.in', stagger: 0.1 }, 1.5)
          .to(wordEl.lastElementChild, { y: -1, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 }, '>-0.15');
        return tl;
      };

      /* a new candle, set on the dish and lit with a spark */
      const relight = (first) => {
        const tl = gsap.timeline();
        if (!first) {
          tl.to(wordEl.children, REDUCED ? { opacity: 0, duration: 0.3 } :
            { opacity: 0, y: -12, filter: 'blur(3px)', duration: 0.45, ease: 'power2.out', stagger: 0.04 })
            .to(st, { alpha: 0, duration: 0.4, ease: 'power1.in' }, '<0.1');
        }
        tl.add(() => {
          st.p = 0; st.char = 0.12; done = false; phase = -1;
          drips = []; plan = dripPlan(); poolSeed = Math.random() * 40;
        });
        if (REDUCED) {
          tl.set(st, { alpha: 1, lift: 0 }).to(st, { flame: 1, duration: 0.5 });
          return tl;
        }
        tl.fromTo(st, { alpha: 0, lift: -6 }, { alpha: 1, lift: 0, duration: 0.6, ease: 'back.out(2.4)' })
          .set(st, { ember: 1 }, '-=0.1')
          .to(st, { ember: 0, duration: 0.5 })
          .fromTo(st, { flame: 0, blow: 1 }, { flame: 1, duration: 0.85, ease: 'elastic.out(1, 0.45)' }, '<0.08');
        return tl;
      };

      const run = (first) => {
        if (cycle) cycle.kill();
        cycle = gsap.timeline({ onComplete: () => onDone?.() })
          .add(relight(first))
          .add(burn(), REDUCED ? '+=0.1' : '-=0.45')
          .add(goOut())
          .to({}, { duration: HOLD });
      };

      draw(0);
      run(true);
      gusts();

      /* the pointer is a draught: the flame leans away from it */
      root.addEventListener('pointermove', (e) => {
        const r = cv.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(80, r.width);
        pointerTarget = REDUCED ? 0 : Math.max(-1, Math.min(1, dx)) * -12 * WIND;
      });
      root.addEventListener('pointerleave', () => { pointerTarget = 0; });

      /* a click blows on the flame, or lights a new candle when it is out */
      root.addEventListener('click', () => {
        if (done) { onDone?.(); return; }
        if (REDUCED) return;
        gsap.timeline()
          .to(st, { gust: (pointerWind >= 0 ? 1 : -1) * 18, blow: 0.6, duration: 0.16, ease: 'power2.out' })
          .to(st, { gust: 0, blow: 1, duration: 0.9, ease: 'sine.inOut' });
      });
    })();

    return () => {
      cleanups.forEach((undo) => undo());
      container.current.innerHTML = initialMarkup;
    };
  }, { scope: container });

  return (
    <div ref={container} style={{ display: 'contents' }}>
      <main className="candle-stage">
        <section className="candle-loader" aria-label="Halloween night loading" data-candela="">
          <div className="candle-loader__scene" role="progressbar" aria-label="Loading" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="Lighting the candles" data-scene="">
            <canvas className="candle-canvas" aria-hidden="true" data-canvas="" />
            <p className="candle-word" aria-hidden="true" data-word="" />
          </div>
          <div className="candle-loader__meta">
            <p className="candle-event">
              <span className="candle-event__name" data-event="">The Lantern Walk</span>
              <span className="candle-event__date">Digital growth studio</span>
            </p>
            <p className="candle-status" aria-live="polite">
              <span className="candle-status__text" data-status="">Lighting the candles</span>
              {' '}
              <span className="candle-status__num" data-num="">0%</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
