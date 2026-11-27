'use client';

import React, { useEffect, useRef } from 'react';

interface WaterRippleCanvasProps {
  className?: string;
  parentRef: React.RefObject<HTMLElement | null>;
}

interface Drop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
}

export function WaterRippleCanvas({ className = '', parentRef }: WaterRippleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropsRef = useRef<Drop[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive canvas resizing with High DPI support
    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(parent);

    const addRipple = (x: number, y: number, intensity = 1) => {
      const rect = parent.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      // Primary wave
      dropsRef.current.push({
        x: relX,
        y: relY,
        radius: 4,
        maxRadius: Math.max(rect.width * 0.45, 120),
        alpha: 0.45 * intensity,
        speed: 3.2,
        color: 'rgba(56, 189, 248, ', // Crystal clear water blue
      });

      // Secondary echo wave (gentle refractive offset)
      dropsRef.current.push({
        x: relX,
        y: relY,
        radius: 1,
        maxRadius: Math.max(rect.width * 0.35, 90),
        alpha: 0.35 * intensity,
        speed: 2.2,
        color: 'rgba(247, 172, 79, ', // Warm amber brand glint in water reflection
      });

      // Cap active ripples to maintain ultra-fast performance
      if (dropsRef.current.length > 25) {
        dropsRef.current.splice(0, dropsRef.current.length - 25);
      }
    };

    let lastMoveTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      isHoveredRef.current = true;
      const now = performance.now();
      // Throttle movement ripples to avoid cluttering while keeping it fluid
      if (now - lastMoveTime > 45) {
        addRipple(e.clientX, e.clientY, 0.7);
        lastMoveTime = now;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isHoveredRef.current = true;
      // Splash drop on enter
      addRipple(e.clientX, e.clientY, 1.2);
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      // Powerful ripple pulse on click
      addRipple(e.clientX, e.clientY, 1.6);
      setTimeout(() => addRipple(e.clientX, e.clientY, 0.9), 120);
    };

    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    parent.addEventListener('click', handleClick, { passive: true });

    // Render loop: draws realistic water ripple wave interference
    let angle = 0;
    const render = () => {
      const rect = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      angle += 0.03;

      // Subtle resting water shimmer if hovered
      if (isHoveredRef.current) {
        const grad = ctx.createLinearGradient(0, 0, rect.width, 0);
        const shimmerPos = (Math.sin(angle) + 1) / 2;
        grad.addColorStop(Math.max(0, shimmerPos - 0.25), 'rgba(255, 255, 255, 0)');
        grad.addColorStop(shimmerPos, 'rgba(56, 189, 248, 0.07)');
        grad.addColorStop(Math.min(1, shimmerPos + 0.25), 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      // Update and draw ripple drops
      for (let i = dropsRef.current.length - 1; i >= 0; i--) {
        const drop = dropsRef.current[i];
        drop.radius += drop.speed;
        drop.alpha *= 0.965; // Smooth exponential fade

        if (drop.alpha < 0.008 || drop.radius > drop.maxRadius) {
          dropsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        // Slightly elliptical horizontal wave to match wide pill navbar shape
        ctx.ellipse(drop.x, drop.y, drop.radius * 1.35, drop.radius * 0.75, 0, 0, Math.PI * 2);

        // Water ripple ring stroke
        ctx.strokeStyle = `${drop.color}${drop.alpha})`;
        ctx.lineWidth = Math.max(1, 2.5 * (1 - drop.radius / drop.maxRadius));
        ctx.stroke();

        // Delicate inner highlight ring
        if (drop.radius > 12) {
          ctx.beginPath();
          ctx.ellipse(drop.x, drop.y, (drop.radius - 6) * 1.35, (drop.radius - 6) * 0.75, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${drop.alpha * 0.55})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('click', handleClick);
      ro.disconnect();
    };
  }, [parentRef]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none rounded-full overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
