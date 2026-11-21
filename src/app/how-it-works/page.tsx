import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ShieldCheck, ArrowRight, Zap, Clock, ThumbsUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works — Lead Edge Marketers',
  description:
    'Send your web address. We rebuild your homepage from scratch and walk you through it on a 15-minute call. Free, zero obligation.',
  alternates: {
    canonical: '/how-it-works',
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      tag: 'Day 0 · Free',
      title: 'Send your web address',
      description:
        'Tell us your website link or your Google Business Profile name. No passwords needed, no credit card, no sales rep calling you.',
    },
    {
      num: '02',
      tag: 'Day 1–2 · Free',
      title: 'We rebuild your homepage',
      description:
        'We design and write a brand-new custom homepage mockup tailored for your specific industry, built specifically to convert traffic into booked calls.',
    },
    {
      num: '03',
      tag: 'Day 2 · 15-Minute Call',
      title: 'Walkthrough walkthrough call',
      description:
        'We open the live draft together on a quick 15-minute video call. You see exactly how it looks on mobile and desktop. You give honest feedback.',
    },
    {
      num: '04',
      tag: 'Day 3–14 · Live',
      title: 'Decide with zero pressure',
      description:
        'If you love it and want to go ahead, we finish building the full website and launch within 14 days for $249/mo + GST. If not, you keep all our ideas for free.',
    },
  ];

  return (
    <main className="pt-32 pb-24 bg-white text-[#161514] select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider bg-[#f7ac4f]/15 px-3 py-1 rounded-full inline-block mb-3">
            The Free Rebuild Process
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.05] mb-6">
            How it works. Step by step.
          </h1>
          <p className="font-sans text-lg sm:text-xl text-[#5d5a55] leading-relaxed">
            We do the work first so you can judge with your own eyes before spending a single dollar.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-8 rounded-[28px] bg-[#FAF8F5] border border-[#e8e6e2] flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-display font-black text-[#161514]">
                    {s.num}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#b45309] bg-[#f7ac4f]/20 px-2.5 py-0.5 rounded-full">
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#161514] mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#5d5a55] leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Callout Box */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#161514] text-white flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-2">
              Ready to see your new homepage?
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#d9d6d1] max-w-lg">
              Send your current web address. We will start rebuilding it today and share the preview tomorrow.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-8 py-4 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-base transition-transform active:scale-95 shadow-md"
          >
            Get a Free Rebuild
          </Link>
        </div>

      </div>
    </main>
  );
}
