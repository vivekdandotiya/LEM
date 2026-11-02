'use client';

import React, { useEffect, useRef } from 'react';

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isGold: boolean;
}

export function InteractiveDotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -9999, y: -9999, radius: 140 };
    let dots: Dot[] = [];

    const spacing = 48; // Spacing between dots
    const goldRatio = 0.18; // 18% golden dots, 82% charcoal/black dots

    function initDots() {
      dots = [];
      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const originX = i * spacing + (j % 2 === 0 ? 0 : spacing * 0.5);
          const originY = j * spacing;
          const isGold = Math.random() < goldRatio;
          const radius = isGold ? 1.6 : 1.2;
          const color = isGold ? 'rgba(201, 166, 107, 0.42)' : 'rgba(18, 18, 20, 0.12)';

          dots.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            radius,
            color,
            isGold,
          });
        }
      }
    }

    initDots();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDots();
    };

    const handlePointerMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    let animId: number;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    function render() {
      if (!ctx || !isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        if (!reducedMotion) {
          // Distance to mouse
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 3.5;
            const angle = Math.atan2(dy, dx);
            // Repel away from pointer
            dot.vx -= Math.cos(angle) * force;
            dot.vy -= Math.sin(angle) * force;
          }

          // Spring back to origin
          const springK = 0.045;
          const damping = 0.84;

          const toOriginX = dot.originX - dot.x;
          const toOriginY = dot.originY - dot.y;

          dot.vx += toOriginX * springK;
          dot.vy += toOriginY * springK;

          dot.vx *= damping;
          dot.vy *= damping;

          dot.x += dot.vx;
          dot.y += dot.vy;
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] select-none opacity-90"
      aria-hidden="true"
    />
  );
}
