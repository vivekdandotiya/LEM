'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How quickly can we launch?',
    answer: 'Most engagements launch within two to three weeks following initial audit, creative planning, and technical calibration.',
  },
  {
    id: 'faq-2',
    question: 'Do you require long-term contracts?',
    answer: 'No. We work on flexible monthly retainers. Continued collaboration is earned through steady, trackable performance.',
  },
  {
    id: 'faq-3',
    question: 'Who manages our accounts directly?',
    answer: 'Senior specialists handle every deployment. You collaborate directly with growth architects, never junior middlemen.',
  },
  {
    id: 'faq-4',
    question: 'What makes your creative perform?',
    answer: 'We test diverse visual hooks and editorial layouts engineered specifically to halt scrolling and trigger genuine inquiries.',
  },
  {
    id: 'faq-5',
    question: 'How do you report campaign outcomes?',
    answer: 'Plain-English weekly dashboards detailing cost per inquiry, qualified lead volume, and pipeline movement without vanity jargon.',
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section className="py-24 sm:py-32 bg-transparent" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center pb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
              07 / FAQ
            </span>
          </div>
          {/* H2 max 7 words with Serif Swap */}
          <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
            Answers before you <span className="serif-swap text-ink">ask.</span>
          </h2>
          <p className="text-sm font-sans text-grey-3 max-w-sm mx-auto mt-3">
            Clear, honest details about how we partner with ambitious brands.
          </p>
        </div>

        {/* 5 Questions Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="card-glass-elevated rounded-[18px] bg-paper-2 border border-ink/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 font-display font-bold text-lg sm:text-xl text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-lime text-ink rotate-45'
                        : 'bg-paper text-grey-3 group-hover:text-ink'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base font-sans text-grey-3 leading-relaxed border-t border-ink/8">
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
