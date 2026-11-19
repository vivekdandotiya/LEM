'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Link as LinkIcon, Check, Plus, Minus } from 'lucide-react';
import { ServiceFAQItem } from '@/data/content/faqs';

export interface ServiceFaqSectionProps {
  items: ServiceFAQItem[];
  serviceTitle?: string;
}

const INITIAL_VISIBLE_COUNT = 6;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/^\d+[\.\)]\s*/, '') // strip leading number prefixes like "1. "
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function ServiceFaqSection({ items, serviceTitle = 'Service' }: ServiceFaqSectionProps) {
  // If no items, do not render
  if (!items || items.length === 0) {
    return null;
  }

  // Categories
  const hasCategories = items.some((item) => Boolean(item.category));
  const categories = hasCategories
    ? ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[]))]
    : [];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([items[0]?.id || '']));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [srAnnouncement, setSrAnnouncement] = useState<string>('');

  const accordionRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // URL sync for category (?faq=category) & hash scroll on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check search params for category
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('faq');
    if (catParam && categories.includes(catParam)) {
      setSelectedCategory(catParam);
    }

    // Check hash for direct FAQ anchor (#faq-<slug>)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#faq-')) {
      const targetSlug = hash.replace('#faq-', '');
      const matched = items.find(
        (i) => i.id === targetSlug || slugify(i.question) === targetSlug
      );
      if (matched) {
        setOpenIds((prev) => new Set([...prev, matched.id]));
        // Make sure it is visible even if past initial count
        setIsExpanded(true);
        setTimeout(() => {
          const el = document.getElementById(`faq-${targetSlug}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }
  }, [items]);

  // Filter items by category
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  // Visible items based on isExpanded
  const visibleItems = isExpanded
    ? filteredItems
    : filteredItems.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMore = filteredItems.length > INITIAL_VISIBLE_COUNT;

  // Toggle single item in accordion (allows multiple open)
  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle expanded
  const toggleExpanded = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setSrAnnouncement(`Showing all ${filteredItems.length} questions`);
    } else {
      setIsExpanded(false);
      setSrAnnouncement(`Showing first ${INITIAL_VISIBLE_COUNT} questions`);
    }
  };

  // Change category & sync URL
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (cat === 'All') {
        url.searchParams.delete('faq');
      } else {
        url.searchParams.set('faq', cat);
      }
      window.history.replaceState({}, '', url.toString());
    }
    setSrAnnouncement(`Filtered FAQs by ${cat}. ${cat === 'All' ? items.length : items.filter((i) => i.category === cat).length} questions available.`);
  };

  // Copy link affordance
  const copyLink = (e: React.MouseEvent, item: ServiceFAQItem) => {
    e.stopPropagation();
    const itemSlug = item.id || slugify(item.question);
    const url = `${window.location.origin}${window.location.pathname}#faq-${itemSlug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Keyboard navigation across accordion items (ArrowUp / ArrowDown / Home / End)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const list = visibleItems;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % list.length;
      accordionRefs.current.get(list[nextIndex].id)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + list.length) % list.length;
      accordionRefs.current.get(list[prevIndex].id)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      accordionRefs.current.get(list[0].id)?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      accordionRefs.current.get(list[list.length - 1].id)?.focus();
    }
  };

  // JSON-LD Schema: Only from real visible items
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section
      id="faq-section"
      data-surface="light"
      className="py-20 sm:py-28 bg-[#EFEBE2] border-b border-ink/10 select-none"
    >
      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Screen Reader Live Region */}
      <div role="status" aria-live="polite" className="sr-only">
        {srAnnouncement}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center pb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-ink/15 text-xs font-mono uppercase tracking-widest text-[#0F1011] font-bold mb-3 shadow-2xs">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F1011] tracking-tight">
            Common questions, clear answers.
          </h2>
        </div>

        {/* Optional Category Filter Pills */}
        {hasCategories && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide transition-all border ${
                    isSelected
                      ? 'bg-ink text-white border-ink shadow-sm'
                      : 'bg-white text-ink border-ink/10 hover:border-ink/30'
                  }`}
                  aria-pressed={isSelected}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3" role="region" aria-label={`${serviceTitle} Frequently Asked Questions`}>
          {visibleItems.map((faq, idx) => {
            const isOpen = openIds.has(faq.id);
            const itemSlug = faq.id || slugify(faq.question);
            const isCopied = copiedId === faq.id;

            return (
              <div
                key={faq.id}
                id={`faq-${itemSlug}`}
                className={`rounded-[20px] bg-white border transition-all duration-300 overflow-hidden shadow-2xs ${
                  isOpen ? 'border-[#B08D57]/40 ring-1 ring-[#B08D57]/20' : 'border-ink/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    ref={(el) => {
                      if (el) accordionRefs.current.set(faq.id, el);
                    }}
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="flex-1 py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 font-display font-bold text-[17px] sm:text-lg text-[#0F1011] hover:text-[#5C4018] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-header-${faq.id}`}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-ink/10 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#B08D57] text-white border-[#B08D57]' : 'bg-[#F6F3EC] text-[#57534E]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Copy Link Affordance */}
                  <div className="pr-4 sm:pr-6 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => copyLink(e, faq)}
                      className="p-2 rounded-full text-[#78716C] hover:text-ink hover:bg-black/5 transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      aria-label={`Copy direct link to question "${faq.question}"`}
                      title="Copy link to this answer"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <LinkIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                      )}
                      {isCopied && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-ink text-white text-xs font-mono font-medium shadow-md pointer-events-none whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Answer with smooth height */}
                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-header-${faq.id}`}
                    className="px-6 sm:px-8 pb-6 pt-2 text-base font-sans text-[#3A3835] border-t border-ink/10 leading-relaxed animate-in fade-in-50 duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={toggleExpanded}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-ink/15 text-xs font-mono font-bold uppercase tracking-wider text-[#0F1011] hover:bg-[#F6F3EC] hover:border-ink/30 transition-all shadow-soft-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>
                  <Minus className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Show fewer questions</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>
                    Show more questions ({filteredItems.length - INITIAL_VISIBLE_COUNT} remaining)
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
