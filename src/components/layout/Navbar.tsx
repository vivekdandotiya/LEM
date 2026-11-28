'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { primaryNavItems } from '@/data/nav';
import { MEGAMENU_COLUMNS } from '@/data/megamenu';
import { ChevronDown, Menu, X, Search, Zap, Sparkles, ShoppingBag, ChevronRight } from 'lucide-react';

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

  // 4 Core Service Columns (team column removed per user request)
  const serviceColumns = MEGAMENU_COLUMNS.filter((col) => col.id !== 'team');

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
              1. Brand Logo (Amber LE Badge + Interactive Text Hover)
              ========================================================================= */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-full select-none"
            aria-label="Lead Edge Marketers - Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f7ac4f] flex items-center justify-center text-[#161514] font-black font-sans text-xs sm:text-sm shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0">
              LE
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans font-bold tracking-tight text-sm sm:text-base leading-none text-[#161514] transition-all duration-200 ease-out group-hover:text-red-600 group-hover:scale-105 origin-left">
                LEAD EDGE
              </span>
              <span className="text-xs font-mono tracking-widest text-[#5d5a55] mt-0.5 leading-none font-semibold transition-all duration-200 ease-out group-hover:text-red-500">
                MARKETERS
              </span>
            </div>
          </Link>

          {/* =========================================================================
              2. Desktop Navigation Links (Red + Slightly Bigger on Hover)
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
                    {/* Services Pill Button: Turns Red & Scales on Hover */}
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      className={`group/btn flex items-center gap-1.5 px-4 sm:px-5 py-2 text-sm font-sans font-bold tracking-tight rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 hover:bg-[#f4f3f1] ${
                        isServicesOpen || isActive
                          ? 'bg-[#f4f3f1] text-[#161514] shadow-xs'
                          : 'text-[#5d5a55]'
                      }`}
                    >
                      <span className="inline-block transition-all duration-200 ease-out origin-center group-hover/btn:text-red-600 group-hover/btn:scale-110">
                        {item.title}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-all duration-200 origin-center ${
                          isServicesOpen
                            ? 'rotate-180 text-red-600'
                            : 'text-[#8f8a82] group-hover/btn:text-red-600 group-hover/btn:scale-110'
                        }`}
                      />
                    </button>

                    {/* Elevated 4-Column Megamenu (Squad & Advisory Strip Removed) */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[920px] max-w-[95vw] rounded-[28px] bg-white border border-[#e8e6e2] shadow-[0_28px_80px_-15px_rgba(22,21,20,0.18)] p-6 sm:p-8 transition-all duration-200 z-50 ${
                        isServicesOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 translate-y-3 pointer-events-none'
                      }`}
                    >
                      {/* Clean 4-Column Grid */}
                      <div className="grid grid-cols-4 gap-6 xl:gap-7">
                        {serviceColumns.map((col) => (
                          <div key={col.id} className="flex flex-col">
                            {/* Column Header */}
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#f0eee9]">
                              <span className="w-6 h-6 rounded-md bg-[#161514] text-[#f7ac4f] flex items-center justify-center shrink-0 shadow-xs">
                                {col.id === 'seo' && <Search className="w-3 h-3" />}
                                {col.id === 'ppc' && <Zap className="w-3 h-3" />}
                                {col.id === 'social' && <Sparkles className="w-3 h-3" />}
                                {col.id === 'ecommerce' && <ShoppingBag className="w-3 h-3" />}
                              </span>

                              <h3 className="font-sans font-bold text-[#161514] text-[13px] sm:text-sm tracking-tight transition-all duration-200 hover:text-red-600">
                                {col.title}
                              </h3>
                            </div>

                            {/* Column Links List: Turns Red & Scales on Hover */}
                            <ul className="flex flex-col gap-1">
                              {col.items.map((subItem) => (
                                <li key={subItem.label}>
                                  <Link
                                    href={subItem.href}
                                    onClick={() => setIsServicesOpen(false)}
                                    className="group/sub flex items-center justify-between text-xs sm:text-[13px] font-sans font-medium text-[#55524d] hover:bg-red-50/60 px-2.5 py-1.5 -mx-2.5 rounded-lg transition-all duration-200"
                                  >
                                    <span className="inline-block transition-all duration-200 ease-out origin-left group-hover/sub:text-red-600 group-hover/sub:scale-105 group-hover/sub:font-bold">
                                      {subItem.label}
                                    </span>
                                    {subItem.isNew ? (
                                      <span className="px-1.5 py-0.2 rounded-full bg-red-100 text-red-700 text-[9px] font-bold tracking-tight">
                                        New
                                      </span>
                                    ) : (
                                      <ChevronRight className="w-3 h-3 text-red-500 opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 transition-all" />
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group/navlink px-3.5 sm:px-4 py-2 text-sm font-sans tracking-tight rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 hover:bg-[#f4f3f1] ${
                    isActive ? 'font-bold bg-[#f4f3f1]' : ''
                  }`}
                >
                  <span
                    className={`inline-block transition-all duration-200 ease-out origin-center font-medium group-hover/navlink:text-red-600 group-hover/navlink:scale-110 group-hover/navlink:font-bold ${
                      isActive ? 'text-[#161514]' : 'text-[#5d5a55]'
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* =========================================================================
              3. Right Action: "Get in touch" Button
              ========================================================================= */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="group/cta inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-sm active:scale-95"
            >
              <span className="inline-block transition-all duration-200 ease-out group-hover/cta:scale-105">
                Get in touch
              </span>
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
    </>
  );
}
