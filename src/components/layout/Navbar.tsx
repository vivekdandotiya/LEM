'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { primaryNavItems } from '@/data/nav';
import { MEGAMENU_COLUMNS } from '@/data/megamenu';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lastScrollYRef = useRef(0);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll dynamics: Directional hide/reveal & scrolled compression
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollYRef.current + 10) {
          setIsVisible(false);
          setIsServicesOpen(false);
        } else if (currentScrollY < lastScrollYRef.current - 10) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const handleServicesMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 220);
  };

  return (
    <>
      <header
        className={`fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-28'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto relative w-full transition-all duration-300 rounded-full h-16 sm:h-20 px-5 sm:px-8 flex items-center justify-between bg-white/95 backdrop-blur-md border border-[#e8e6e2] shadow-[0_4px_24px_rgba(22,21,20,0.06)] ${
            isScrolled ? 'max-w-5xl' : 'max-w-6xl'
          }`}
        >
          {/* =========================================================================
              1. Brand Logo (Original Logo as Before: Amber LE Badge + Original Colors)
              ========================================================================= */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7ac4f] rounded-full select-none"
            aria-label="Lead Edge Marketers - Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f7ac4f] flex items-center justify-center text-[#161514] font-black font-sans text-xs sm:text-sm shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0">
              LE
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans font-bold tracking-tight text-sm sm:text-base leading-none text-[#161514]">
                LEAD EDGE
              </span>
              <span className="text-xs font-mono tracking-widest text-[#5d5a55] mt-0.5 leading-none font-semibold">
                MARKETERS
              </span>
            </div>
          </Link>

          {/* =========================================================================
              2. Desktop Navigation Links & 5-Column Megamenu
              ========================================================================= */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {primaryNavItems.map((item) => {
              const isServices = item.hasDropdown;
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              if (isServices) {
                return (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                  >
                    {/* Services Pill Button (Design from reference, original brand colors) */}
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 text-sm font-sans font-bold tracking-tight rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7ac4f] ${
                        isServicesOpen || isActive
                          ? 'bg-[#f4f3f1] text-[#161514] shadow-xs'
                          : 'text-[#5d5a55] hover:text-[#161514] hover:bg-[#f4f3f1]'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isServicesOpen ? 'rotate-180 text-[#f7ac4f]' : 'text-[#8f8a82]'
                        }`}
                      />
                    </button>

                    {/* Exact 5-Column Megamenu (Structure from reference, original colors) */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[1140px] max-w-[94vw] rounded-[32px] bg-white border border-[#e8e6e2] shadow-[0_24px_70px_-15px_rgba(22,21,20,0.20)] p-8 sm:p-10 transition-all duration-200 z-50 ${
                        isServicesOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 translate-y-3 pointer-events-none'
                      }`}
                    >
                      {/* 5 Distinct Columns Grid */}
                      <div className="grid grid-cols-5 gap-6 xl:gap-8 pb-8">
                        {MEGAMENU_COLUMNS.map((col) => (
                          <div key={col.id} className="flex flex-col">
                            {/* Column Header */}
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#f4f3f1]">
                              {col.id === 'seo' && (
                                <span className="w-6 h-6 rounded-md bg-[#fef3c7] text-[#b45309] flex items-center justify-center text-xs font-bold">
                                  📊
                                </span>
                              )}
                              {col.id === 'ppc' && (
                                <span className="w-6 h-6 rounded-md bg-[#fee2e2] text-[#b91c1c] flex items-center justify-center text-xs font-bold">
                                  🎯
                                </span>
                              )}
                              {col.id === 'social' && (
                                <span className="w-6 h-6 rounded-md bg-[#fce7f3] text-[#be185d] flex items-center justify-center text-xs font-bold">
                                  📷
                                </span>
                              )}
                              {col.id === 'ecommerce' && (
                                <span className="w-6 h-6 rounded-md bg-[#ecfdf5] text-[#047857] flex items-center justify-center text-xs font-bold">
                                  🛍️
                                </span>
                              )}
                              {col.id === 'team' && (
                                <div className="flex -space-x-1.5 overflow-hidden">
                                  <div className="relative h-5 w-5 rounded-full ring-1 ring-white overflow-hidden bg-slate-200 shrink-0">
                                    <Image
                                      src="/images/about/team-1.webp"
                                      alt="Team member"
                                      fill
                                      className="object-cover"
                                      sizes="20px"
                                    />
                                  </div>
                                  <div className="relative h-5 w-5 rounded-full ring-1 ring-white overflow-hidden bg-slate-200 shrink-0">
                                    <Image
                                      src="/images/about/about-team-creative.webp"
                                      alt="Team member"
                                      fill
                                      className="object-cover"
                                      sizes="20px"
                                    />
                                  </div>
                                  <div className="relative h-5 w-5 rounded-full ring-1 ring-white overflow-hidden bg-slate-200 shrink-0">
                                    <Image
                                      src="/images/about/about-hero.webp"
                                      alt="Team member"
                                      fill
                                      className="object-cover"
                                      sizes="20px"
                                    />
                                  </div>
                                </div>
                              )}

                              <h3 className="font-sans font-bold text-[#161514] text-sm tracking-tight">
                                {col.title}
                              </h3>
                            </div>

                            {/* Column Links List */}
                            <ul className="flex flex-col gap-2.5">
                              {col.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsServicesOpen(false)}
                                    className="group/sub flex items-center justify-between text-xs sm:text-[13px] font-sans font-medium text-[#5d5a55] hover:text-[#b45309] transition-colors py-1"
                                  >
                                    <span className="group-hover/sub:translate-x-0.5 transition-transform">
                                      {item.label}
                                    </span>
                                    {item.isNew && (
                                      <span className="px-2 py-0.5 rounded-full bg-[#f7ac4f] text-[#161514] text-[10px] font-bold tracking-tight">
                                        New
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Strip: "Not sure where to start?" + Links + Call Button */}
                      <div className="bg-[#fbfaf8] border-t border-[#e8e6e2] -mx-8 sm:-mx-10 -mb-8 sm:-mb-10 px-8 sm:px-10 py-4 sm:py-5 rounded-b-[32px] flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-xs sm:text-sm text-[#5d5a55] text-center md:text-left">
                          <strong className="text-[#161514] font-bold">Not sure where to start?</strong>{' '}
                          Tell us your goal and we will suggest the right service.
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                          <Link
                            href="/services"
                            onClick={() => setIsServicesOpen(false)}
                            className="text-xs sm:text-sm font-semibold text-[#161514] hover:text-[#b45309] transition-colors"
                          >
                            All Digital Marketing Services
                          </Link>
                          <Link
                            href="/services"
                            onClick={() => setIsServicesOpen(false)}
                            className="text-xs sm:text-sm font-semibold text-[#161514] hover:text-[#b45309] transition-colors"
                          >
                            Pricing
                          </Link>
                          <Link
                            href="/contact"
                            onClick={() => setIsServicesOpen(false)}
                            className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#161514] hover:bg-[#2c2b29] text-white font-bold text-xs sm:text-sm tracking-tight shadow-sm transition-all duration-150 active:scale-95"
                          >
                            <span>Book a Free Call</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#f7ac4f]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`px-3.5 sm:px-4 py-2 text-sm font-sans font-medium tracking-tight rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7ac4f] ${
                    isActive
                      ? 'text-[#161514] font-bold bg-[#f4f3f1]'
                      : 'text-[#5d5a55] hover:text-[#161514] hover:bg-[#f4f3f1]'
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* =========================================================================
              3. Right Action: "Get in touch" (Warm Apricot Button with Brand Colors)
              ========================================================================= */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-150 shadow-sm active:scale-95"
            >
              Get in touch
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-[#161514] hover:bg-[#f4f3f1] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-28 px-6 pb-12 overflow-y-auto lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            <div className="flex flex-col gap-3 pb-6 border-b border-[#e8e6e2]">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-sans font-bold text-[#161514] hover:text-[#f7ac4f] py-2 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Core Services Quick Links in Mobile */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#5d5a55] tracking-wider">
                Services Directory
              </span>
              <div className="grid grid-cols-1 gap-2 pt-1">
                <Link
                  href="/services/seo"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-[#161514] hover:text-[#b45309] py-1"
                >
                  📊 SEO Services
                </Link>
                <Link
                  href="/services/ppc"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-[#161514] hover:text-[#b45309] py-1"
                >
                  🎯 PPC and Paid Ads
                </Link>
                <Link
                  href="/services/social-media"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-[#161514] hover:text-[#b45309] py-1"
                >
                  📷 Social Media Management
                </Link>
                <Link
                  href="/services/web-development"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-[#161514] hover:text-[#b45309] py-1"
                >
                  🛍️ E-Commerce & Websites
                </Link>
              </div>
            </div>

            {/* Rebuild CTA Button */}
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-bold text-base shadow-sm active:scale-95 transition-all"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
