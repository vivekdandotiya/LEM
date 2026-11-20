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
  { title: 'Data-Driven Digital Marketing', href: '/services', cue: 'Full-Funnel Growth' },
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
      data-surface="dark"
      ref={menuRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0B0C0E]/98 backdrop-blur-2xl px-6 py-6 overflow-y-auto text-white"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex flex-col">
          <span className="font-display font-extrabold text-lg tracking-tight text-white">
            LEAD EDGE
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D9C29A] font-semibold">
            MARKETERS
          </span>
        </div>
        <button
          ref={firstFocusableRef}
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-white" />
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
              <div key={item.title} className="flex flex-col border-b border-white/10 pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`text-2xl font-display font-bold tracking-tight transition-colors ${
                      isActive ? 'text-gold' : 'text-white hover:text-gold'
                    }`}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    className="p-2 text-[#D9C29A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
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
                        className="flex items-center justify-between py-1.5 text-sm font-sans font-medium text-white/80 hover:text-white"
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
            <div key={item.title} className="border-b border-white/10 pb-2">
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={`text-2xl font-display font-bold tracking-tight transition-colors flex items-center justify-between ${
                  isActive ? 'text-gold' : 'text-white hover:text-gold'
                }`}
              >
                <span>{item.title}</span>
                <span className="text-xs font-mono text-[#D9C29A] font-semibold">0{idx + 1}</span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-white/10 pt-5 flex flex-col gap-3">
        <Link
          href="/contact"
          onClick={onClose}
          className="w-full py-3.5 text-center font-bold text-sm rounded-full flex items-center justify-center gap-2 bg-[#B08D57] hover:bg-[#D9C29A] text-[#0F1011] transition-colors shadow-lg"
        >
          Book Strategy Call →
        </Link>
        <div className="flex items-center justify-between text-xs font-mono text-white/70 pt-1">
          <span className="hover:text-gold transition-colors">{siteConfig.contact.email}</span>
          <span className="hover:text-gold transition-colors">{siteConfig.contact.phone}</span>
        </div>
      </div>
    </div>
  );
}
