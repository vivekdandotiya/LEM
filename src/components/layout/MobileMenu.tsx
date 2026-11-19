'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NavItem } from '@/data/nav';
import { siteConfig } from '@/data/site';
import { X, ChevronDown, ArrowRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
}

const SERVICES_ITEMS = [
  { title: 'Search Engine Optimization', href: '/services/seo', cue: 'Discoverability' },
  { title: 'Pay-Per-Click Advertising', href: '/services/ppc', cue: 'Immediate Traction' },
  { title: 'Social Media Marketing', href: '/services/social-media', cue: 'Brand Gravity' },
  { title: 'Web Development', href: '/services/web-development', cue: 'Architectural Rigor' },
  { title: 'Video Editing & Photo Creation', href: '/services/video-photo', cue: 'Visual Cinematic' },
];

export function MobileMenu({ isOpen, onClose, navItems, currentPath }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    firstFocusableRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      ref={menuRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#F6F3EC]/98 backdrop-blur-2xl px-6 py-6 overflow-y-auto"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-ink/10 pb-4">
        <div className="flex flex-col">
          <span className="font-display font-extrabold text-lg tracking-tight text-ink">
            LEAD EDGE
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-stone">
            MARKETING
          </span>
        </div>
        <button
          ref={firstFocusableRef}
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full hover:bg-black/5 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-3 py-6 my-auto">
        {navItems.map((item, idx) => {
          const isServices = item.title === 'Services';
          const isActive =
            item.href === '/'
              ? currentPath === '/'
              : currentPath.startsWith(item.href);

          if (isServices) {
            return (
              <div key={item.title} className="flex flex-col border-b border-ink/5 pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`text-2xl font-display font-bold tracking-tight transition-colors ${
                      isActive ? 'text-gold' : 'text-ink'
                    }`}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    className="p-2 text-stone hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
                    aria-label={servicesExpanded ? 'Collapse services list' : 'Expand services list'}
                    aria-expanded={servicesExpanded}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        servicesExpanded ? 'rotate-180 text-gold' : ''
                      }`}
                    />
                  </button>
                </div>

                {servicesExpanded && (
                  <div className="flex flex-col gap-2 pl-3 pt-3 pb-1 border-l-2 border-gold/40 mt-2">
                    {SERVICES_ITEMS.map((srv) => (
                      <Link
                        key={srv.href}
                        href={srv.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-1 text-sm font-sans font-medium text-stone hover:text-ink"
                      >
                        <span>{srv.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={item.title} className="border-b border-ink/5 pb-2">
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={`text-2xl font-display font-bold tracking-tight transition-colors flex items-center justify-between ${
                  isActive ? 'text-gold' : 'text-ink hover:text-gold'
                }`}
              >
                <span>{item.title}</span>
                <span className="text-xs font-mono text-stone">0{idx + 1}</span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-ink/10 pt-5 flex flex-col gap-3">
        <Link
          href="/contact"
          onClick={onClose}
          className="btn-primary w-full py-3.5 text-center font-semibold text-sm rounded-full flex items-center justify-center gap-2"
        >
          Book Strategy Call →
        </Link>
        <div className="flex items-center justify-between text-xs font-mono text-stone pt-1">
          <span>{siteConfig.contact.email}</span>
          <span>{siteConfig.contact.phone}</span>
        </div>
      </div>
    </div>
  );
}
