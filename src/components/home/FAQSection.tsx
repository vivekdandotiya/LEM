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
    <section className="py-24 sm:py-32 bg-[#F6F3EC] select-none border-b border-ink/10" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center pb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
              05 / FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink tracking-tight leading-tight">
            Answers before you ask.
          </h2>
          <p className="text-xs sm:text-sm font-sans text-stone max-w-sm mx-auto mt-3">
            Clear, candid details about our commercial agreements, delivery timelines, and performance focus.
          </p>
        </div>

        {/* Client FAQs Accordion */}
        <div className="flex flex-col gap-3">
          {homepageFAQs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-[20px] bg-white border border-ink/10 overflow-hidden shadow-soft-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-gold text-white rotate-45'
                        : 'bg-ivory-2 text-stone hover:text-ink'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-xs sm:text-sm font-sans text-stone leading-relaxed border-t border-ink/8">
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
