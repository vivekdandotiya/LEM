import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { VideoHero } from '@/components/shared/VideoHero';
import { BlogListingView } from '@/components/blog/BlogListingView';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Perspective & Publications — Growth Field Notes',
  description:
    'Technical breakdowns, algorithmic shifts, and creative frameworks distilled from active deployments.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <main className="overflow-hidden bg-[#F6F3EC] text-ink select-none">
      {/* 1. Blog Photo Hero (Rock-Solid Stable) */}
      <VideoHero
        posterSrc="/videos/blog/blog-hero-poster.webp"
        posterAlt="Lead Edge perspective and publications editorial workspace"
        heightClass="min-h-[55svh] sm:min-h-[65svh]"
        overlayClass="bg-charcoal/60"
        staticOnly={true}
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-gold-soft mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Perspective & Field Notes</span>
          </div>

          {/* H1 <= 8 words */}
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[0.96] mb-6">
            Field notes on modern digital{' '}
            <span className="font-serif italic font-normal text-gold-soft">growth.</span>
          </h1>

          {/* Tagline <= 14 words */}
          <p className="text-base sm:text-lg font-sans text-stone max-w-xl leading-relaxed">
            Technical breakdowns, algorithmic shifts, and creative frameworks distilled from active deployments.
          </p>
        </div>
      </VideoHero>

      {/* 2. Blog Listing & Featured Analysis */}
      <Suspense
        fallback={
          <div className="py-24 text-center font-mono text-xs text-stone">
            Loading publications...
          </div>
        }
      >
        <BlogListingView />
      </Suspense>
    </main>
  );
}
