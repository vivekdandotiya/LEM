'use client';

import React from "react";
import { PhoneScene } from "@/components/three/PhoneScene";
import SplitHeading from "@/motion/SplitHeading";

export function AboutApproach() {
  return (
    <section className="py-24 sm:py-32 bg-surface-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text narrative */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-mono tracking-widest uppercase text-accent font-semibold">
              02 / Execution Craft
            </span>
            <SplitHeading
              as="h2"
              className="text-display-2 font-display font-medium text-charcoal-900 tracking-tight leading-tight uppercase"
            >
              Mobile-First Immersion. Zero Friction.
            </SplitHeading>
            <p className="text-base sm:text-lg text-warmgray-700 leading-relaxed">
              Modern buyer decisions happen in vertical feeds and on mobile screens. Whether designing short-form video creative or responsive web applications, we engineer experiences that capture attention within the first two seconds and sustain interest through cinematic pacing.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-sm text-warmgray-600 leading-relaxed">
                  <strong className="text-charcoal-900 font-semibold">High-Retain Storytelling:</strong> Every vertical creative is architected with clear visual hooks, structured pacing, and non-generic art direction.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-sm text-warmgray-600 leading-relaxed">
                  <strong className="text-charcoal-900 font-semibold">Native Touch Feel:</strong> Sub-second responsive UI components designed specifically around mobile ergonomics and tactile gestures.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Flagship 3D Smartphone Showcase */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <PhoneScene />
          </div>
        </div>
      </div>
    </section>
  );
}
