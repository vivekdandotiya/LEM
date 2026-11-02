"use client";

import React, { useState, useEffect, useRef } from "react";
import { PhoneFallback } from "./PhoneFallback";

export function PhoneScene() {
  const [rotation, setRotation] = useState({ yaw: 0, pitch: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Subtle interactive parallax tied to pointer movement (max ±8° yaw, ±4° pitch)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isVisible) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({
      yaw: x * 14,
      pitch: -y * 8,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ yaw: 0, pitch: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto flex items-center justify-center py-6 sm:py-12 perspective-[1200px]"
      aria-label="Interactive 3D flagship device displaying social campaign craft"
    >
      <div
        style={{
          transform: prefersReducedMotion || !isVisible
            ? "none"
            : `rotateY(${rotation.yaw}deg) rotateX(${rotation.pitch}deg)`,
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
        }}
        className="w-full flex justify-center will-change-transform"
      >
        <PhoneFallback isVisible={isVisible} />
      </div>
    </div>
  );
}
