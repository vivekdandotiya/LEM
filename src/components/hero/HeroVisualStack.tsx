"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { CardWebDev, CardSocial, CardMetaAds, CardSEO } from "./HeroVisualCards";

interface HeroVisualStackProps {
  className?: string;
}

export function HeroVisualStack({ className = "" }: HeroVisualStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cards = [
    { id: "web", component: <CardWebDev />, title: "Website Design & Development" },
    { id: "social", component: <CardSocial />, title: "Social Media Creative & Content" },
    { id: "meta", component: <CardMetaAds />, title: "Meta Advertising & Attribution" },
    { id: "seo", component: <CardSEO />, title: "Technical SEO & Search Visibility" },
  ];

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Next card cycle
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  // Auto-cycling timer
  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, prefersReducedMotion, nextSlide]);

  // Pause when document is hidden (visibilitychange) or when out of viewport
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    let observer: IntersectionObserver | null = null;
    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              setIsPaused(true);
            } else if (!document.hidden) {
              setIsPaused(false);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (observer) observer.disconnect();
    };
  }, []);

  // Subtle pointer parallax on desktop (max ±10px)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 16, y: y * 16 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsPaused(true)}
      className={`relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-xl mx-auto flex items-center justify-center ${className}`}
      aria-label="Interactive showcase of core digital marketing capabilities"
    >
      {/* Visual Stack Layers */}
      <div className="relative w-full h-full max-h-[460px]">
        {cards.map((card, idx) => {
          // Calculate stack position relative to activeIndex
          const offset = (idx - activeIndex + cards.length) % cards.length;
          const isFront = offset === 0;

          // Depth positions
          const zIndex = cards.length - offset;
          const scale = 1 - offset * 0.055;
          const translateY = offset * 14;
          const translateX = offset * 12;
          const opacity = offset > 2 ? 0 : 1 - offset * 0.22;

          return (
            <div
              key={card.id}
              style={{
                zIndex,
                transform: prefersReducedMotion
                  ? isFront
                    ? "none"
                    : "scale(0.95)"
                  : `translate3d(${translateX + (isFront ? mouseOffset.x : 0)}px, ${
                      translateY + (isFront ? mouseOffset.y : 0)
                    }px, 0px) scale(${scale})`,
                opacity: prefersReducedMotion ? (isFront ? 1 : 0) : opacity,
                transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s ease-out",
                pointerEvents: isFront ? "auto" : "none",
              }}
              className="absolute inset-0 w-full h-full will-change-transform"
              aria-hidden={!isFront}
            >
              {card.component}
            </div>
          );
        })}
      </div>

      {/* Unobtrusive Step Indicators & WCAG 2.2.2 Pause/Play Control */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-charcoal-900/10 shadow-soft-sm z-30">
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="text-warmgray-600 hover:text-charcoal-900 transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
          aria-label={isPaused ? "Play automated showcase animation" : "Pause automated showcase animation"}
          title={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
        </button>

        <div className="h-3 w-px bg-warmgray-300" />

        <div className="flex items-center gap-1.5" role="tablist" aria-label="Showcase steps">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Show ${card.title}`}
              onClick={() => {
                setActiveIndex(idx);
                setIsPaused(true);
              }}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                idx === activeIndex
                  ? "w-6 bg-accent"
                  : "w-2 bg-warmgray-300 hover:bg-warmgray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
