'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ScrollMarquee({ children, speed = 28, className = '' }: ScrollMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const loop = gsap.to(track, { xPercent: -50, repeat: -1, duration: speed, ease: 'none' });

    const trigger = ScrollTrigger.create({
      onUpdate: (s) => {
        loop.timeScale(1 + Math.abs(s.getVelocity()) / 350);
        gsap.to(loop, { timeScale: 1, duration: 0.6, overwrite: true, delay: 0.1 });
      },
    });

    const onEnter = () => loop.pause();
    const onLeave = () => loop.play();
    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    return () => {
      trigger.kill();
      loop.kill();
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
    };
  }, [speed]);

  return (
    <div className={`overflow-hidden whitespace-nowrap w-full ${className}`}>
      <div ref={trackRef} className="inline-flex items-center">
        <div className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
