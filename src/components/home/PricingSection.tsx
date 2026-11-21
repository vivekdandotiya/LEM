'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-32 bg-white text-[#161514] select-none border-t border-[#e8e6e2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs sm:text-sm font-sans font-bold text-[#161514] uppercase tracking-wider mb-2 block">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.08] mb-4">
            Simple, transparent monthly pricing.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed">
            No large upfront design bills. No lock-in contracts. Cancel on 14 days&apos; notice.
          </p>
        </div>

        {/* BDOG Style Main Subscription Plan Card */}
        <div className="rounded-[32px] bg-[#FAF8F5] border border-[#e8e6e2] p-8 sm:p-12 shadow-[0_12px_40px_rgba(22,21,20,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Pricing Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="px-3.5 py-1 rounded-full bg-[#161514] text-white text-xs font-mono font-bold uppercase tracking-wider inline-block mb-4">
                  All-Inclusive Service
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#161514] leading-tight mb-3">
                  Website Design, Hosting & Edits
                </h3>
                <p className="text-sm font-sans text-[#5d5a55] leading-relaxed mb-6">
                  About $8 a day. If your new website brings in just one extra client or customer a month, it has paid for itself.
                </p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-display font-black text-[#161514] tracking-tight">
                    $249
                  </span>
                  <span className="text-sm font-mono text-[#5d5a55]">
                    a month + GST
                  </span>
                </div>
                <span className="text-xs font-mono text-[#5d5a55] block mb-8">
                  No upfront cost · Review free before deciding
                </span>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="w-full text-center py-4 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-base tracking-tight transition-all duration-150 shadow-sm block active:scale-95"
                >
                  Get a Free Rebuild First
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-xs font-sans text-[#5d5a55] mt-3">
                  <ShieldCheck className="w-4 h-4 text-[#1f7a37]" />
                  <span>14-day live turnaround or your first month refunded</span>
                </div>
              </div>
            </div>

            {/* Right Features Breakdown: "When It Goes Live" vs "Every Month After" */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 rounded-[24px] bg-white border border-[#e8e6e2]">
              {/* Column 1: Included at Launch */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#161514] uppercase tracking-wider pb-3 border-b border-black/10 mb-4 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#f7ac4f]" />
                  <span>When it goes live</span>
                </h4>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm font-sans text-[#5d5a55]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>Free homepage rebuild mockup</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>Copywritten for your approval</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>Booking & CRM integration</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>Domain, SSL & DNS configuration</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>Live in 14 days guaranteed</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: Ongoing Every Month */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#161514] uppercase tracking-wider pb-3 border-b border-black/10 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1f7a37]" />
                  <span>Every month after</span>
                </h4>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm font-sans text-[#5d5a55]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>High-speed 0.4s cloud hosting</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>Unlimited text, photo & price edits</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>Security updates & uptime monitor</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>Google Search Console tracking</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <span>Leave anytime on 14 days&apos; notice</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
