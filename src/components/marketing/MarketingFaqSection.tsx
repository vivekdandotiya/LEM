'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Why do you charge a flat monthly fee instead of a percentage of ad spend?',
    answer:
      'When agencies charge 15–20% of your ad spend, their incentive is to encourage you to spend more money, regardless of whether it increases your profitability. With Lead Edge, you pay Google and Meta directly from your own credit card at cost. Our flat management fee aligns our incentives with yours: driving the maximum number of booked customers at the lowest possible acquisition cost.',
  },
  {
    question: 'How quickly will our Google Ads and Meta Ads start generating customer inquiries?',
    answer:
      'Google Search campaigns often produce inbound inquiries within the first 48 to 72 hours of going live, because they target active buyers searching right now. Meta Paid Social reels typically require 5 to 7 days of algorithmic learning to optimize audience delivery and test the winning creative hooks. In our 14-day sprint, all tracking and campaigns are fully firing by Day 14.',
  },
  {
    question: 'Do I own my Google Ads account, Meta Business Manager, and creative assets?',
    answer:
      'Yes, 100%. Many agencies build campaigns inside proprietary master accounts, effectively holding your data hostage if you ever leave. With Lead Edge, everything is set up inside your own business accounts. You retain full administrative access, conversion pixels, domain verification, and copyright over all video and design assets unconditionally.',
  },
  {
    question: 'How do you accurately track return on ad spend after Apple’s iOS 14+ privacy updates?',
    answer:
      'Browser cookies now lose up to 35% of conversion events due to mobile ad-blockers and Safari ITP. We solve this by engineering server-to-server Conversions API (CAPI) pipelines on Cloudflare and AWS. Customer actions are encrypted and sent directly from our cloud server to Meta and Google, delivering a 9.8/10 Event Match Quality score and pristine attribution in Looker Studio.',
  },
  {
    question: 'What is the minimum recommended monthly ad budget for an Australian small business?',
    answer:
      'For local Australian businesses (such as trades, clinics, and professional services), we typically recommend starting with $1,000 to $2,500 per month in direct Google & Meta spend. This provides enough daily click volume for the algorithms to optimize bidding and deliver steady customer inquiries without overextending capital.',
  },
  {
    question: 'Is there a long-term contract lock-in?',
    answer:
      'Never. All Lead Edge marketing retainers operate on month-to-month terms. We earn your business every 30 days through verified conversion data and booked revenue. If you ever need to pause or cancel, you can do so with zero exit penalties.',
  },
];

export function MarketingFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-32 bg-[#FAF8F5] text-[#161514] select-none border-b border-[#e8e6e2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
              Straight Answers
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.06] mb-4">
            Frequently asked questions about small business marketing.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed">
            Everything you need to know about our flat retainers, tracking, and campaign ownership.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-[24px] bg-white border border-[#e8e6e2] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 font-display font-extrabold text-base sm:text-lg text-[#161514] hover:text-[#b45309] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#f7ac4f] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-xs sm:text-sm font-sans text-[#5d5a55] leading-relaxed border-t border-[#FAF8F5] pt-4 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Help Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm font-sans text-[#5d5a55]">
            Have a specific scenario or multi-location requirement?{' '}
            <Link href="/contact" className="text-[#b45309] font-bold underline hover:text-[#161514]">
              Ask us on a 15-minute call
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
