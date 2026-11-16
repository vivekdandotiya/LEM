import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#F6F3EC] text-ink flex flex-col justify-center items-center px-4 select-none">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-ink/10 text-xs font-mono uppercase tracking-widest text-stone w-fit shadow-2xs mb-8">
          <Compass className="w-3.5 h-3.5 text-gold-deep" />
          <span>Error 404 · Route Not Found</span>
        </div>

        {/* Monumental Letterpress 404 */}
        <div
          className="text-8xl sm:text-9xl font-display font-extrabold tracking-tighter text-charcoal mb-4 leading-none select-none"
          style={{
            textShadow: '0 2px 0 #FFFFFF, 0 6px 14px rgba(0, 0, 0, 0.08)',
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink tracking-tight mb-4">
          Page Not Located.
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg font-sans text-stone max-w-md mx-auto mb-10 leading-relaxed">
          The requested route does not exist or has moved. Explore our core capabilities or return to the studio overview.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-ink text-ivory font-display font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-charcoal hover:shadow-soft-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-ink border border-ink/15 font-display font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-ivory hover:border-gold active:scale-95"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 text-stone" />
          </Link>
        </div>
      </div>
    </main>
  );
}
