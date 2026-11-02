'use client';
import './InkThatReveals.css';
/*
  "Ink that reveals" from Animorio · https://animorio.com
  License: free on your own sites and your clients’ sites, paid work included.
  Not for resale, redistribution, templates or code collections · https://animorio.com/en/license/
*/
/* Ink that reveals, as a React component. Made by Animorio from the demo's own code.
   npm install gsap @gsap/react @fontsource-variable/mona-sans
   The CSS is the style.css tab: save it next to this file as InkThatReveals.css. */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import '@fontsource-variable/mona-sans/standard.css';
import './InkThatReveals.css';

gsap.registerPlugin(useGSAP);

export default function InkThatReveals({ word = 'Momentum', height = 'min(88svh, 900px)', hint = 'Move across the paper. The same word sits underneath, inflated.' }) {
  const container = useRef(null);

  useGSAP(() => {
    const initialMarkup = container.current.innerHTML;
    const cleanups = [];
    const watched = (Observer) => class extends Observer { constructor(...args) { super(...args); cleanups.push(() => this.disconnect()); } };
    const IntersectionObserver = watched(window.IntersectionObserver);
    let mounted = true;
    const addPageListener = (target, ...args) => { target.addEventListener(...args); cleanups.push(() => target.removeEventListener(...args)); };
    const nextFrame = (callback) => (mounted ? requestAnimationFrame(callback) : 0);
    const addTimeout = (...args) => { const id = setTimeout(...args); cleanups.push(() => clearTimeout(id)); return id; };
    const pageFontsLoad = (...args) => new Promise((resolve, reject) => document.fonts.load(...args).then((v) => mounted && resolve(v), (e) => mounted && reject(e)));

    document.documentElement.classList.add('js');

    /* L'inchiostro che scopre
       Una parola nera stampata su carta bianca. Il puntatore ci passa sopra come un pennello bagnato:
       dove passa, la carta diventa inchiostro nero e sotto compare la stessa parola gonfia, come un
       palloncino d'argento. Dopo qualche secondo l'inchiostro si ritira e la carta si richiude.
       L'inchiostro è un fluido vero, risolto in WebGL2 su una griglia: il puntatore spinge la velocità
       e versa colore, la velocità trasporta il colore, la pressione tiene il fluido senza compressioni,
       e a ogni fotogramma velocità e colore sbiadiscono un poco. Il bordo netto viene da una soglia.
       La parola gonfia nasce da una mappa d'altezza (la parola sfocata): le sue pendenze danno le
       normali, e le normali riflettono un orizzonte come fa il metallo. */

    /* ---- valori da cambiare ---- */
    const TOCCO = matchMedia('(hover: none), (pointer: coarse)').matches;
    const GRIGLIA = TOCCO ? 128 : 256;        /* celle del fluido sul lato corto */
    const RIS_INCHIOSTRO = TOCCO ? 384 : 512; /* risoluzione dell'inchiostro sul lato corto */
    const ITERAZIONI = TOCCO ? 12 : 20;       /* passi per la pressione: più passi, fluido più preciso */
    const SPINTA = 6;                         /* quanto il pennello spinge il fluido (per ogni cella di movimento) */
    const PENNELLO = 0.075;                   /* raggio del pennello, in frazioni del corpo della parola */
    const RESTA_VELOCITA = 0.962;             /* quanto resta della velocità a ogni sessantesimo di secondo */
    const RESTA_INCHIOSTRO = 0.988;           /* quanto resta dell'inchiostro: più vicino a 1, più dura la traccia */
    const RICCIOLI = 12;                      /* quanto il fluido si arriccia (0 = niente vortici) */
    const SOGLIA = 0.5;                       /* dove l'inchiostro diventa netto */
    const DENSITA = 3.9;                      /* moltiplica l'inchiostro prima della soglia */
    const GONFIO = 5;                         /* quanto è bombata la parola d'argento */
    const ATTESA_FANTASMA = 2500;             /* millisecondi senza gesti prima che il pennello dipinga da solo */

    const RIDOTTO = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DENTRO = window.self !== window.top;
    const palco = container.current.querySelector('[data-palco]');
    if (palco) palco.style.setProperty('--schermo', height);
    const parola = container.current.querySelector('[data-parola]');
    const tela = container.current.querySelector('[data-tela]');
    const gemello = container.current.querySelector('[data-gemello]');
    if (DENTRO && TOCCO) palco.classList.add('ink-palco--dentro');

    /* ---------------------------------------------------------------- la parola, lettera per lettera */
    const TESTO = parola.textContent.trim();
    parola.setAttribute('aria-label', TESTO);
    parola.innerHTML = [...TESTO].map((c) => `<span aria-hidden="true">${c}</span>`).join('') + '<span class="ink-linea-base" aria-hidden="true"></span>';
    const lettere = [...parola.querySelectorAll('span:not(.ink-linea-base)')];

    /* la parola si misura a cento pixel e si scala perché riempia il 90% della larghezza */
    function adatta() {
      palco.style.setProperty('--corpo', '100px');
      const largo = parola.getBoundingClientRect().width;
      const corpo = Math.min((100 * palco.clientWidth * 0.9) / largo, palco.clientHeight * 0.5);
      palco.style.setProperty('--corpo', `${corpo.toFixed(2)}px`);
    }

    /* ---------------------------------------------------------------- WebGL2 con bersagli a mezza precisione */
    function contesto() {
      const gl = tela.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' });
      if (!gl) return null;
      gl.getExtension('EXT_color_buffer_float');
      gl.getExtension('EXT_color_buffer_half_float');
      /* prova: un bersaglio RGBA16F deve essere completo, altrimenti il fluido non si può scrivere */
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, 4, 4, 0, gl.RGBA, gl.HALF_FLOAT, null);
      const f = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, f);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.deleteFramebuffer(f);
      gl.deleteTexture(t);
      return ok ? gl : null;
    }
    const gl = contesto();

    const VERT = `#version 300 es
in vec2 aPos;
uniform vec2 uTexel;
out vec2 vUv, vL, vR, vT, vB;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;
    const TESTA = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv, vL, vR, vT, vB;
out vec4 o;
`;

    /* il pennello: una macchia gaussiana che si somma a quello che c'è */
    const F_MACCHIA = TESTA + `
uniform sampler2D uBersaglio;
uniform float uAspetto, uRaggio;
uniform vec2 uPunto;
uniform vec3 uColore;
void main() {
  vec2 p = vUv - uPunto;
  p.x *= uAspetto;
  o = vec4(texture(uBersaglio, vUv).xyz + exp(-dot(p, p) / uRaggio) * uColore, 1.0);
}`;
    /* il trasporto: ogni punto prende il valore da dove la velocità lo porta, e sbiadisce */
    const F_TRASPORTO = TESTA + `
uniform sampler2D uVelocita, uSorgente;
uniform vec2 uCella;
uniform float uDt, uResta;
void main() {
  vec2 da = vUv - uDt * texture(uVelocita, vUv).xy * uCella;
  o = uResta * texture(uSorgente, da);
}`;
    const F_DIVERGENZA = TESTA + `
uniform sampler2D uVelocita;
void main() {
  float L = texture(uVelocita, vL).x;
  float R = texture(uVelocita, vR).x;
  float T = texture(uVelocita, vT).y;
  float B = texture(uVelocita, vB).y;
  vec2 C = texture(uVelocita, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;
    const F_ROTORE = TESTA + `
uniform sampler2D uVelocita;
void main() {
  float L = texture(uVelocita, vL).y;
  float R = texture(uVelocita, vR).y;
  float T = texture(uVelocita, vT).x;
  float B = texture(uVelocita, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`;
    const F_VORTICI = TESTA + `
uniform sampler2D uVelocita, uRotore;
uniform float uForza, uDt;
void main() {
  float L = texture(uRotore, vL).x;
  float R = texture(uRotore, vR).x;
  float T = texture(uRotore, vT).x;
  float B = texture(uRotore, vB).x;
  float C = texture(uRotore, vUv).x;
  vec2 f = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  f /= length(f) + 0.0001;
  f *= uForza * C;
  f.y *= -1.0;
  o = vec4(clamp(texture(uVelocita, vUv).xy + f * uDt, -1000.0, 1000.0), 0.0, 1.0);
}`;
    const F_PRESSIONE = TESTA + `
uniform sampler2D uPressione, uDivergenza;
void main() {
  float L = texture(uPressione, vL).x;
  float R = texture(uPressione, vR).x;
  float T = texture(uPressione, vT).x;
  float B = texture(uPressione, vB).x;
  o = vec4((L + R + B + T - texture(uDivergenza, vUv).x) * 0.25, 0.0, 0.0, 1.0);
}`;
    const F_GRADIENTE = TESTA + `
uniform sampler2D uPressione, uVelocita;
void main() {
  float L = texture(uPressione, vL).x;
  float R = texture(uPressione, vR).x;
  float T = texture(uPressione, vT).x;
  float B = texture(uPressione, vB).x;
  o = vec4(texture(uVelocita, vUv).xy - vec2(R - L, T - B), 0.0, 1.0);
}`;
    const F_SCALA = TESTA + `
uniform sampler2D uSorgente;
uniform float uValore;
void main() { o = uValore * texture(uSorgente, vUv); }`;
    /* lo schermo: dove c'è inchiostro, fondo nero e parola d'argento; altrove trasparente (si vede la carta) */
    const F_SCHERMO = TESTA + `
uniform sampler2D uInchiostro, uAltezza;
uniform vec2 uAltCella, uPunto;
uniform float uSoglia, uDensita, uGonfio, uModo, uRaggio, uAspetto;
float alt(vec2 uv) { return texture(uAltezza, uv).r; }
void main() {
  float m;
  if (uModo < 0.5) {
    /* la soglia è stretta ma larga almeno un pixel dello schermo: bordo netto senza scalini */
    float d = texture(uInchiostro, vUv).r * uDensita;
    float w = max(fwidth(d) * 0.75, 0.005);
    m = smoothstep(uSoglia - w, uSoglia + w, d);
  } else {
    vec2 p = vUv - uPunto;
    p.x *= uAspetto;
    m = 1.0 - smoothstep(uRaggio * 0.78, uRaggio, length(p));
  }
  if (m < 0.002) { o = vec4(0.0); return; }
  float h = alt(vUv);
  vec3 n = normalize(vec3(
    (alt(vUv - vec2(uAltCella.x, 0.0)) - alt(vUv + vec2(uAltCella.x, 0.0))) * uGonfio,
    (alt(vUv - vec2(0.0, uAltCella.y)) - alt(vUv + vec2(0.0, uAltCella.y))) * uGonfio,
    1.0));
  /* il metallo riflette un orizzonte: cielo chiaro sopra, terra scura sotto, una riga netta in mezzo */
  vec3 r = reflect(vec3(0.0, 0.0, -1.0), n);
  float cielo = smoothstep(-0.03, 0.03, r.y + 0.16);
  vec3 terra = mix(vec3(0.03), vec3(0.3, 0.3, 0.32), smoothstep(-1.0, -0.1, r.y));
  vec3 aria = mix(vec3(0.58, 0.59, 0.63), vec3(0.98), smoothstep(-0.2, 0.75, r.y));
  vec3 col = mix(terra, aria, cielo);
  /* un lampo di luce da in alto a sinistra */
  vec3 luce = normalize(vec3(-0.5, 0.62, 0.6));
  col += pow(max(dot(reflect(-luce, n), vec3(0.0, 0.0, 1.0)), 0.0), 36.0) * 0.8;
  float a = smoothstep(0.2, 0.42, h);
  /* l'alfa è premoltiplicata: il colore non può superarla */
  o = vec4(min(col, vec3(1.0)) * a * m, m);
}`;

    let prog = null;
    let pronto = false;
    let vel, pressione, divergenza, rotore, inchiostro, altezza = null;
    let altCella = [1, 1];

    function compila(tipo, fonte) {
      const s = gl.createShader(tipo);
      gl.shaderSource(s, fonte);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    }
    function programma(frag) {
      const p = gl.createProgram();
      gl.attachShader(p, compila(gl.VERTEX_SHADER, VERT));
      gl.attachShader(p, compila(gl.FRAGMENT_SHADER, frag));
      gl.bindAttribLocation(p, 0, 'aPos');
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
      const u = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const nome = gl.getActiveUniform(p, i).name;
        u[nome] = gl.getUniformLocation(p, nome);
      }
      return { p, u };
    }

    /* un bersaglio: una trama a mezza precisione dentro cui disegnare */
    function bersaglio(w, h, filtro) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtro);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtro);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        tex, fbo, w, h, cella: [1 / w, 1 / h],
        lega(unita) { gl.activeTexture(gl.TEXTURE0 + unita); gl.bindTexture(gl.TEXTURE_2D, tex); return unita; },
        via() { gl.deleteTexture(tex); gl.deleteFramebuffer(fbo); },
      };
    }
    /* due bersagli che si scambiano: si legge da uno e si scrive nell'altro */
    function doppio(w, h, filtro) {
      let a = bersaglio(w, h, filtro);
      let b = bersaglio(w, h, filtro);
      return {
        w, h, cella: [1 / w, 1 / h],
        get leggi() { return a; },
        get scrivi() { return b; },
        scambia() { [a, b] = [b, a]; },
        via() { a.via(); b.via(); },
      };
    }
    function lato(ris) {
      const W = gl.drawingBufferWidth;
      const H = gl.drawingBufferHeight;
      const r = W > H ? W / H : H / W;
      const corto = Math.round(ris);
      const lungo = Math.round(ris * r);
      return W > H ? [lungo, corto] : [corto, lungo];
    }
    function disegna(dest) {
      if (dest) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, dest.fbo);
        gl.viewport(0, 0, dest.w, dest.h);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function usa(pr, cella) {
      gl.useProgram(pr.p);
      if (pr.u.uTexel) gl.uniform2f(pr.u.uTexel, cella ? cella[0] : 0, cella ? cella[1] : 0);
      return pr.u;
    }

    function preparaGL() {
      prog = {
        macchia: programma(F_MACCHIA), trasporto: programma(F_TRASPORTO), divergenza: programma(F_DIVERGENZA),
        rotore: programma(F_ROTORE), vortici: programma(F_VORTICI), pressione: programma(F_PRESSIONE),
        gradiente: programma(F_GRADIENTE), scala: programma(F_SCALA), schermo: programma(F_SCHERMO),
      };
      /* un solo triangolo che copre tutto lo schermo */
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.disable(gl.BLEND);
    }

    /* la tela alla misura del palco; i campi del fluido ripartono da zero */
    function dimensiona() {
      const dpr = Math.min(window.devicePixelRatio || 1, TOCCO ? 1.5 : 2);
      tela.width = Math.round(palco.clientWidth * dpr);
      tela.height = Math.round(palco.clientHeight * dpr);
      [vel, pressione, divergenza, rotore, inchiostro].forEach((b) => b && b.via());
      const [gw, gh] = lato(GRIGLIA);
      const [iw, ih] = lato(RIS_INCHIOSTRO);
      vel = doppio(gw, gh, gl.LINEAR);
      pressione = doppio(gw, gh, gl.NEAREST);
      divergenza = bersaglio(gw, gh, gl.NEAREST);
      rotore = bersaglio(gw, gh, gl.NEAREST);
      inchiostro = doppio(iw, ih, gl.LINEAR);
    }

    /* ---------------------------------------------------------------- la parola gonfia: una mappa d'altezza */
    /* sfocatura a scatola sulle righe e sulle colonne; tre giri somigliano a una gaussiana */
    function scatola(src, dst, W, H, r, passo, righe, lungo) {
      const d = 2 * r + 1;
      for (let k = 0; k < righe; k++) {
        const o = k * (passo === 1 ? W : 1);
        const at = (i) => src[o + Math.min(lungo - 1, Math.max(0, i)) * passo];
        let s = 0;
        for (let i = -r; i <= r; i++) s += at(i);
        for (let i = 0; i < lungo; i++) {
          dst[o + i * passo] = s / d;
          s += at(i + r + 1) - at(i - r);
        }
      }
    }
    function mappaAltezza() {
      const box = palco.getBoundingClientRect();
      const stile = getComputedStyle(parola);
      const corpo = parseFloat(stile.fontSize);
      /* la mappa è disegnata con la parola alta sempre 90 pixel: la stessa bombatura a ogni misura */
      const s = Math.min(1, 90 / corpo);
      const W = Math.max(32, Math.round(box.width * s));
      const H = Math.max(32, Math.round(box.height * s));
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      const x = c.getContext('2d', { willReadFrequently: true });
      x.fillStyle = '#000';
      x.fillRect(0, 0, W, H);
      x.fillStyle = '#fff';
      x.font = `${stile.fontWeight} ${corpo * s}px ${stile.fontFamily}`;
      x.textBaseline = 'alphabetic';
      /* ogni lettera va dove la mette la pagina: stesso punto, stessa linea di base */
      const riga = parola.getBoundingClientRect();
      const base = parola.querySelector('.ink-linea-base').getBoundingClientRect().top - box.top;
      for (const l of lettere) x.fillText(l.textContent.toLocaleUpperCase('it'), (riga.left - box.left + l.offsetLeft) * s, base * s);
      const px = x.getImageData(0, 0, W, H).data;
      let a = new Float32Array(W * H);
      let b = new Float32Array(W * H);
      for (let i = 0; i < W * H; i++) a[i] = px[i * 4] / 255;
      const r = Math.max(2, Math.round(corpo * s * 0.055));
      for (let giro = 0; giro < 3; giro++) {
        scatola(a, b, W, H, r, 1, H, W);
        scatola(b, a, W, H, r, W, W, H);
      }
      /* la radice rende i fianchi ripidi e la cima tonda, come un palloncino; le righe si capovolgono per WebGL */
      const dati = new Float32Array(W * H);
      for (let y = 0; y < H; y++) {
        for (let k = 0; k < W; k++) dati[(H - 1 - y) * W + k] = Math.sqrt(Math.max(0, a[y * W + k]));
      }
      if (altezza) gl.deleteTexture(altezza);
      altezza = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, altezza);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.R16F, W, H, 0, gl.RED, gl.FLOAT, dati);
      altCella = [1 / W, 1 / H];
    }

    /* ---------------------------------------------------------------- il pennello */
    /* il pennello si misura sulla parola: al telefono la parola è piccola e la scia deve esserlo con lei */
    let raggioPx = 24;
    /* dove sta la parola, in frazioni del palco (y in su): il pennello fantasma le gira intorno */
    let area = { x: 0.5, y: 0.5, w: 0.8, h: 0.3 };
    function misuraPennello() {
      const box = palco.getBoundingClientRect();
      const r = parola.getBoundingClientRect();
      raggioPx = Math.max(12, parseFloat(getComputedStyle(parola).fontSize) * PENNELLO);
      area = {
        x: (r.left + r.width / 2 - box.left) / box.width,
        y: 1 - (r.top + r.height / 2 - box.top) / box.height,
        w: r.width / box.width,
        h: r.height / box.height,
      };
    }
    const coda = [];
    let ultimoGesto = -Infinity;
    let fantasma = null;

    /* una pennellata da un punto all'altro (in frazioni del palco, y in su): macchie ravvicinate lungo il tratto */
    function tratto(x0, y0, x1, y1, spinta, versato = 1) {
      const W = palco.clientWidth;
      const H = palco.clientHeight;
      const dx = (x1 - x0) * W;
      const dy = (y1 - y0) * H;
      const lungo = Math.hypot(dx, dy);
      if (lungo < 0.5) return;
      /* la spinta si conta in celle della griglia: uguale in orizzontale e in verticale, su ogni schermo */
      const cella = Math.min(W, H) / GRIGLIA;
      const n = Math.min(8, Math.ceil(lungo / (raggioPx * 0.6)));
      const quanto = Math.min(1, lungo / n / (raggioPx * 0.5)) * versato;
      for (let i = 1; i <= n; i++) {
        const t = i / n;
        coda.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, (dx / cella) * spinta, (dy / cella) * spinta, quanto]);
      }
    }
    function versa(x, y, dx, dy, quanto) {
      const u = usa(prog.macchia);
      gl.uniform1f(u.uAspetto, tela.width / tela.height);
      gl.uniform2f(u.uPunto, x, y);
      gl.uniform1f(u.uRaggio, (raggioPx / palco.clientHeight) ** 2);
      gl.uniform1i(u.uBersaglio, vel.leggi.lega(0));
      gl.uniform3f(u.uColore, dx, dy, 0);
      disegna(vel.scrivi);
      vel.scambia();
      gl.uniform1i(u.uBersaglio, inchiostro.leggi.lega(0));
      gl.uniform3f(u.uColore, quanto, 0, 0);
      disegna(inchiostro.scrivi);
      inchiostro.scambia();
    }

    /* ---------------------------------------------------------------- un passo del fluido */
    function simula(dt) {
      const c = vel.cella;
      let u;
      if (RICCIOLI > 0) {
        u = usa(prog.rotore, c);
        gl.uniform1i(u.uVelocita, vel.leggi.lega(0));
        disegna(rotore);
        u = usa(prog.vortici, c);
        gl.uniform1i(u.uVelocita, vel.leggi.lega(0));
        gl.uniform1i(u.uRotore, rotore.lega(1));
        gl.uniform1f(u.uForza, RICCIOLI);
        gl.uniform1f(u.uDt, dt);
        disegna(vel.scrivi);
        vel.scambia();
      }
      u = usa(prog.divergenza, c);
      gl.uniform1i(u.uVelocita, vel.leggi.lega(0));
      disegna(divergenza);
      /* la pressione del passo prima, ridotta, è un buon punto di partenza */
      u = usa(prog.scala, c);
      gl.uniform1i(u.uSorgente, pressione.leggi.lega(0));
      gl.uniform1f(u.uValore, 0.8);
      disegna(pressione.scrivi);
      pressione.scambia();
      u = usa(prog.pressione, c);
      gl.uniform1i(u.uDivergenza, divergenza.lega(1));
      for (let i = 0; i < ITERAZIONI; i++) {
        gl.uniform1i(u.uPressione, pressione.leggi.lega(0));
        disegna(pressione.scrivi);
        pressione.scambia();
      }
      u = usa(prog.gradiente, c);
      gl.uniform1i(u.uPressione, pressione.leggi.lega(0));
      gl.uniform1i(u.uVelocita, vel.leggi.lega(1));
      disegna(vel.scrivi);
      vel.scambia();
      /* la velocità trasporta sé stessa, poi l'inchiostro; tutti e due sbiadiscono */
      u = usa(prog.trasporto, c);
      gl.uniform2f(u.uCella, c[0], c[1]);
      gl.uniform1f(u.uDt, dt);
      gl.uniform1i(u.uVelocita, vel.leggi.lega(0));
      gl.uniform1i(u.uSorgente, vel.leggi.lega(0));
      gl.uniform1f(u.uResta, Math.pow(RESTA_VELOCITA, dt * 60));
      disegna(vel.scrivi);
      vel.scambia();
      gl.uniform1i(u.uVelocita, vel.leggi.lega(0));
      gl.uniform1i(u.uSorgente, inchiostro.leggi.lega(1));
      gl.uniform1f(u.uResta, Math.pow(RESTA_INCHIOSTRO, dt * 60));
      disegna(inchiostro.scrivi);
      inchiostro.scambia();
    }

    let punto = [0.5, -2];
    function mostra() {
      const u = usa(prog.schermo);
      gl.uniform1i(u.uInchiostro, inchiostro.leggi.lega(0));
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, altezza);
      gl.uniform1i(u.uAltezza, 1);
      gl.uniform2f(u.uAltCella, altCella[0], altCella[1]);
      gl.uniform1f(u.uSoglia, SOGLIA);
      gl.uniform1f(u.uDensita, DENSITA);
      gl.uniform1f(u.uGonfio, GONFIO);
      gl.uniform1f(u.uModo, RIDOTTO ? 1 : 0);
      gl.uniform2f(u.uPunto, punto[0], punto[1]);
      gl.uniform1f(u.uRaggio, (raggioPx * 5.5) / palco.clientHeight);
      gl.uniform1f(u.uAspetto, tela.width / tela.height);
      disegna(null);
    }

    /* ---------------------------------------------------------------- il giro dei fotogrammi */
    let attivo = false;
    let visibile = true;
    let prima = 0;
    function giro() {
      if (!visibile || document.hidden) { attivo = false; return; }
      const ora = performance.now();
      const dt = Math.min((ora - prima) / 1000, 1 / 30);
      prima = ora;
      /* nessuno tocca da un po': il pennello fantasma disegna un otto lento */
      if (ora - ultimoGesto > ATTESA_FANTASMA) {
        const t = ora / 1000;
        const p = [area.x + area.w * 0.46 * Math.sin(0.7 * t), area.y + area.h * 0.8 * Math.sin(1.1 * t + 0.6)];
        /* il fantasma è lento: spinge di più e versa meno, così la scia si arriccia come quella vera */
        if (fantasma) tratto(fantasma[0], fantasma[1], p[0], p[1], SPINTA * 2.2, 0.55);
        fantasma = p;
      } else {
        fantasma = null;
      }
      while (coda.length) versa(...coda.shift());
      simula(dt);
      mostra();
      nextFrame(giro);
    }
    function sveglia() {
      if (attivo || !visibile || document.hidden) return;
      attivo = true;
      prima = performance.now();
      nextFrame(giro);
    }

    /* ---------------------------------------------------------------- i gesti */
    let ultimo = null;
    function posizione(e) {
      const r = palco.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
    }
    function movimento(e) {
      const p = posizione(e);
      if (p[0] < 0 || p[0] > 1 || p[1] < 0 || p[1] > 1) { ultimo = null; return; }
      ultimoGesto = performance.now();
      if (RIDOTTO || !pronto) { segui(p); return; }
      if (ultimo) tratto(ultimo[0], ultimo[1], p[0], p[1], SPINTA);
      ultimo = p;
      sveglia();
    }
    addPageListener(window, 'pointermove', movimento);
    addPageListener(window, 'pointerdown', (e) => { ultimo = null; movimento(e); });
    addPageListener(window, 'pointerup', (e) => { if (e.pointerType !== 'mouse') ultimo = null; });
    addPageListener(window, 'pointercancel', () => { ultimo = null; });

    /* movimento ridotto o niente WebGL: un cerchio fermo sotto il puntatore, nessun fluido */
    let chiesto = false;
    function segui(p) {
      if (!pronto) {
        gemello.style.setProperty('--x', `${(p[0] * 100).toFixed(2)}%`);
        gemello.style.setProperty('--y', `${((1 - p[1]) * 100).toFixed(2)}%`);
        gemello.style.setProperty('--r', `${Math.round(raggioPx * 5)}px`);
        return;
      }
      punto = p;
      if (chiesto) return;
      chiesto = true;
      nextFrame(() => { chiesto = false; mostra(); });
    }

    /* ---------------------------------------------------------------- l'avvio */
    function entrata() {
      parola.classList.add('pronta');
      if (RIDOTTO) return;
      /* le lettere salgono dalla linea in ordine sparso, come nel sito */
      gsap.fromTo(gsap.utils.shuffle(lettere.slice()), { yPercent: 120 }, { yPercent: 0, duration: 1.6, ease: 'power4.inOut', stagger: 0.07 });
      gsap.from(container.current.querySelector('.ink-nota'), { autoAlpha: 0, y: 14, duration: 0.9, ease: 'power3.out', delay: 1.3 });
    }

    let misure = '';
    function rifai() {
      adatta();
      misuraPennello();
      if (!pronto) return;
      const chiave = `${palco.clientWidth}x${palco.clientHeight}`;
      if (chiave === misure) return;
      misure = chiave;
      dimensiona();
      mappaAltezza();
      if (RIDOTTO) mostra();
    }

    async function avvia() {
      try {
        await Promise.race([pageFontsLoad('900 100px "Mona Sans Variable"'), new Promise((r) => addTimeout(r, 2500))]);
      } catch (e) { /* senza il font la parola resta nel carattere di sistema */ }
      adatta();
      if (gl) {
        try {
          preparaGL();
          pronto = true;
          rifai();
        } catch (e) {
          pronto = false;
        }
      }
      if (!pronto) document.documentElement.classList.add('modo-css');
      entrata();
      /* il pennello fantasma parte solo dopo l'entrata della parola */
      ultimoGesto = performance.now();
      if (pronto && !RIDOTTO) {
        new IntersectionObserver(([v]) => { visibile = v.isIntersecting; if (visibile) sveglia(); }).observe(palco);
        addPageListener(document, 'visibilitychange', () => { if (!document.hidden) sveglia(); });
        sveglia();
      }
    }

    let attesa = null;
    addPageListener(window, 'resize', () => {
      clearTimeout(attesa);
      attesa = addTimeout(rifai, 180);
    });

    avvia();

    return () => {
      cleanups.forEach((undo) => undo());
      mounted = false;
      container.current.innerHTML = initialMarkup;
    };
  }, { scope: container });

  return (
    <div ref={container} style={{ width: '100%', height: height, position: 'relative', overflow: 'hidden', background: '#F5F3EE' }}>
      <main className="ink-palco" data-palco="">
        <div className="ink-parola" data-parola="" role="heading" aria-level={2}>{word}</div>
        <canvas className="ink-tela" data-tela="" aria-hidden="true" />
        <div className="ink-gemello" data-gemello="" aria-hidden="true">
          <span>{word}</span>
        </div>
        <p className="ink-nota">{hint}</p>
      </main>
    </div>
  );
}
