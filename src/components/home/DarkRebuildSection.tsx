'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PhoneMockup } from '@/components/ui/PhoneMockup';

export function DarkRebuildSection() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full pt-20 sm:pt-28 pb-0 bg-[#161514] text-white overflow-hidden select-none border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Main Center Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.06] mb-4">
          See your homepage rebuilt, free.
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-lg sm:text-xl text-[#d9d6d1] max-w-xl mx-auto mb-8 font-normal">
          Send your web address. See it tomorrow.
        </p>

        {/* Input Pill Bar */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-5">
          <div className="relative flex items-center p-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40 focus-within:border-white transition-all">
            <input
              type="text"
              required
              placeholder="yourbusiness.com.au"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (submitted) setSubmitted(false);
              }}
              className="w-full px-5 py-3 bg-transparent text-sm sm:text-base font-sans text-white placeholder-white/50 focus:outline-none"
              aria-label="Your website address"
            />
            <button
              type="submit"
              className="shrink-0 px-6 py-3 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-150 active:scale-95 shadow-sm"
            >
              {submitted ? 'Submitted ✓' : 'Get a Free Rebuild'}
            </button>
          </div>
        </form>

        {/* Support Phone Call Prompt */}
        <p className="text-xs font-sans text-[#d1cec7]">
          Questions? Call{' '}
          <a href="tel:0452424845" className="text-[#f7ac4f] hover:underline font-bold">
            0452 424 845
          </a>
          .
        </p>
      </div>

      {/* Row of Mobile Mockups Peeking Up from Bottom (Matching Reference Images 4 & 5) */}
      <div aria-hidden="true" className="relative mt-14 pt-8 w-full overflow-hidden flex justify-center items-end">
        {/* Ambient Warm Glow behind Center Phone */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#f7ac4f]/20 blur-[90px] pointer-events-none" />

        <div className="flex items-end justify-center gap-3 sm:gap-5 translate-y-16 sm:translate-y-20 max-w-7xl mx-auto px-4">
          
          {/* Peeking Phone 1: Norton Street Foot Care */}
          <div className="hidden lg:block">
            <PhoneMockup
              appName="Norton Street"
              categoryBadge="Podiatry"
              headline="Experienced foot and heel pain care in Leichhardt"
              subheadline="Ingrown toenails, heel and foot pain, diabetes checks."
              ctaText="Book a free 15-minute call"
              ctaColor="#2563eb"
              theme="dark"
            />
          </div>

          {/* Peeking Phone 2: Marrickville Physio */}
          <div className="hidden md:block">
            <PhoneMockup
              appName="Marrickville Physio"
              categoryBadge="Sports Clinic"
              headline="Back, neck or sports pain? We can help."
              subheadline="A 4-minute walk from Marrickville station. No referral needed."
              ctaText="Book online"
              ctaColor="#1f7a37"
              theme="cream"
            />
          </div>

          {/* =========================================================================
              CENTER HIGHLIGHTED PHONE: "YOURS"
              ========================================================================= */}
          <div className="relative z-20 flex flex-col items-center">
            {/* The "Yours" Label in Orange */}
            <span className="text-xs sm:text-sm font-sans font-extrabold text-[#f7ac4f] tracking-wider uppercase mb-2 animate-bounce">
              Yours
            </span>

            <div className="w-[250px] sm:w-[280px] h-[490px] sm:h-[520px] rounded-[38px] p-3 border-4 border-[#f7ac4f] bg-[#161514] shadow-[0_0_40px_rgba(247,172,79,0.4)] flex flex-col justify-between">
              {/* Top Notch */}
              <div className="w-20 h-4 bg-[#0c0d0e] rounded-full mx-auto mb-3" />

              {/* Wireframe / Preview Ready Canvas */}
              <div className="w-full h-full rounded-[26px] bg-[#f4f3f1] p-5 flex flex-col justify-between text-[#161514]">
                <div>
                  <div className="h-5 w-24 bg-[#e8e6e2] rounded-full mb-4" />
                  <div className="h-8 w-full bg-[#161514] rounded-lg mb-2" />
                  <div className="h-4 w-3/4 bg-[#8f8a82]/40 rounded mb-6" />
                  <div className="h-10 w-full bg-[#f7ac4f] rounded-xl shadow-sm mb-3 flex items-center justify-center font-bold text-xs text-[#161514]">
                    Get Booked Online
                  </div>
                  <div className="h-8 w-full bg-white border border-[#e8e6e2] rounded-xl" />
                </div>
                <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[10px] text-[#5d5a55]">
                  <span>Custom rebuild ready</span>
                  <span className="font-bold text-[#b45309]">15-min call</span>
                </div>
              </div>
            </div>
          </div>

          {/* Peeking Phone 4: Copper Lane Dental */}
          <div className="hidden md:block">
            <PhoneMockup
              appName="Copper Lane Dental"
              categoryBadge="Newtown Clinic"
              headline="Dental care for the whole family in Newtown"
              subheadline="Check-ups, children's dentistry, emergencies, implants."
              ctaText="Book a check-up"
              ctaColor="#0369a1"
              theme="cream"
            />
          </div>

          {/* Peeking Phone 5: Willoughby Road Chiropractic */}
          <div className="hidden lg:block">
            <PhoneMockup
              appName="Willoughby Road"
              categoryBadge="Chiro & Spine"
              headline="Evidence-based chiropractic care in Crows Nest"
              subheadline="We assess first, explain your options, and only treat what helps."
              ctaText="Book an initial assessment"
              ctaColor="#991b1b"
              theme="cream"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
