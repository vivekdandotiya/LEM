'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { homepageFAQs } from '@/data/faqs';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(homepageFAQs[0]?.id || 'faq-01');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFAQs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] select-none border-t border-[#e8e6e2]" id="faq" data-surface="light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center pb-12">
          <span className="text-xs sm:text-sm font-sans font-bold text-[#161514] uppercase tracking-wider mb-2 block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#161514] tracking-tight leading-tight">
            Answers before you ask.
          </h2>
          <p className="text-sm font-sans text-[#5d5a55] max-w-md mx-auto mt-3">
            Clear, plain-English details about how our digital marketing partnerships, pricing, and campaign delivery work.
          </p>
        </div>

        {/* Client FAQs Accordion */}
        <div className="flex flex-col gap-3">
          {homepageFAQs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-[20px] bg-white border border-[#e8e6e2] overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 font-display font-bold text-[17px] sm:text-lg text-[#161514] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7ac4f]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#f7ac4f] text-[#161514] rotate-45'
                        : 'bg-[#f4f3f1] text-[#5d5a55] hover:text-[#161514]'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-2 text-base font-sans text-[#5d5a55] leading-relaxed border-t border-[#f4f3f1]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
