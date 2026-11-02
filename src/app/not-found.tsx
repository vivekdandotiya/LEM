'use client';

import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import Magnetic from "@/motion/Magnetic";

const InkThatReveals = dynamic(
  () => import("@/components/animorio/ink/InkThatReveals"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[50vh] flex items-center justify-center bg-[#F5F3EE] text-charcoal-900 font-display text-5xl uppercase font-bold tracking-tight opacity-30">
        Lost
      </div>
    ),
  }
);

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-surface-warm flex flex-col justify-between">
      {/* Top 404 Interactive Fluid Canvas */}
      <div className="w-full relative border-b border-charcoal-900/10">
        <InkThatReveals
          word="Lost"
          height="52vh"
          hint="Move across the paper to find your way back."
        />
      </div>

      {/* Narrative & Navigation Actions */}
      <div className="max-w-xl mx-auto px-4 text-center py-12 flex flex-col items-center gap-6">
        <span className="text-xs font-mono tracking-widest uppercase text-accent font-semibold">
          Error 404 · Route Not Found
        </span>

        <h1 className="text-display-2 font-display font-medium text-charcoal-900 leading-none uppercase">
          Page Not Located.
        </h1>

        <p className="text-sm sm:text-base text-warmgray-600 leading-relaxed max-w-md">
          The requested route does not exist on this domain. You may return to the homepage or explore our core capabilities.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full justify-center">
          <Magnetic strength={0.25}>
            <Button href="/" variant="primary" size="lg" showArrow>
              Return to Homepage
            </Button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Button href="/services" variant="secondary" size="lg">
              View Capabilities
            </Button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
