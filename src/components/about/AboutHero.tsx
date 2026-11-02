import React from "react";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { clientConfig } from "@/data/site";
import SplitHeading from "@/motion/SplitHeading";
import ImageReveal from "@/motion/ImageReveal";

export function AboutHero() {
  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 bg-surface-warm border-b border-charcoal-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-accent font-semibold">
              About / Purpose & Perspective
            </span>
            {clientConfig.experienceClaimApproved ? (
              <span className="px-2.5 py-0.5 rounded-full bg-accent/20 text-accent-shade text-xs font-mono font-medium">
                5+ Years of Operational Craft
              </span>
            ) : (
              <PlaceholderBadge label="CIR-02 Experience Claim Pending" />
            )}
          </div>

          <SplitHeading
            as="h1"
            className="text-display-1 font-display font-medium text-charcoal-900 tracking-tight leading-[1.04] uppercase mb-8"
          >
            We Build Digital Architecture That Outlasts The Hype Cycle.
          </SplitHeading>

          <p className="text-lg sm:text-xl text-warmgray-700 leading-relaxed max-w-3xl">
            Lead Edge Marketing was founded on a singular conviction: ambitious businesses do not need another bloated agency executing fragmented tactics. They need an integrated growth partner that unites architectural design craft with rigorous algorithmic discipline.
          </p>
        </div>

        {/* Real Editorial Studio Image Banner */}
        <div className="w-full h-72 sm:h-[460px] relative rounded-card overflow-hidden shadow-soft-lg border border-charcoal-900/10">
          <ImageReveal
            src="/images/about/about-hero.webp"
            alt="Lead Edge Marketing multidisciplinary studio workspace"
            fill
            priority
            rounded="rounded-card"
            className="h-full w-full"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-warmgray-200">
            <span>Studio Headquarters · Strategic Operations</span>
            <span className="text-accent-tint">Multidisciplinary Collaboration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
