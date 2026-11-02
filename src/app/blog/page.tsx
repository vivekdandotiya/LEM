import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { BlogListingView } from '@/components/blog/BlogListingView';

export const metadata: Metadata = {
  title: 'Perspective & Publications — Growth Field Notes',
  description:
    'Technical breakdowns, algorithmic shifts, and creative frameworks distilled from active deployments.',
};

export default function BlogPage() {
  return (
    <>
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-ink/10 bg-transparent select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
                PERSPECTIVE & FIELD NOTES
              </span>
            </div>

            {/* H1 max 8 words with Serif Swap */}
            <h1 className="text-fs-xl font-display font-extrabold text-ink tracking-tight leading-[0.92] mb-5">
              Field notes on high-performance{' '}
              <span className="serif-swap text-ink">growth.</span>
            </h1>

            <p className="text-base sm:text-lg font-sans text-grey-3 leading-relaxed">
              Technical breakdowns, algorithmic shifts, and creative frameworks.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-24 text-center font-mono text-xs text-grey-2">Loading publications...</div>}>
        <BlogListingView />
      </Suspense>
    </>
  );
}
