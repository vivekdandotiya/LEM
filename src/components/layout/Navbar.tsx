'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { primaryNavItems } from '@/data/nav';
import { MEGAMENU_TABS, MegamenuTab } from '@/data/megamenu';
import { ChevronDown, Phone, Menu, X, ArrowRight } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState<string>('seo');
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
    }, 200);
  };

  const activeTab = MEGAMENU_TABS.find((t) => t.id === activeTabId) || MEGAMENU_TABS[0];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-24'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto relative w-full transition-all duration-300 rounded-full h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between bg-white/95 backdrop-blur-md border border-[#e8e6e2] shadow-[0_2px_16px_rgba(22,21,20,0.08)] ${
            isScrolled ? 'max-w-5xl' : 'max-w-6xl'
          }`}
        >
          {/* 1. Left Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7ac4f] rounded-full select-none"
            aria-label="Lead Edge Marketers - Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f7ac4f] flex items-center justify-center text-[#161514] font-black font-sans text-xs sm:text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
              LE
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold tracking-tight text-sm sm:text-base leading-none text-[#161514]">
                LEAD EDGE
              </span>
              <span className="text-xs font-mono tracking-widest text-[#5d5a55] mt-0.5 leading-none font-semibold">
                MARKETERS
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
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
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 px-3.5 py-1.5 text-sm font-sans font-medium tracking-tight rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7ac4f] ${
                        isServicesOpen || isActive
                          ? 'text-[#161514] font-bold bg-[#f4f3f1]'
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

                    {/* BDOG Style Full Megamenu Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-[940px] max-w-[95vw] rounded-[28px] bg-white border border-[#e8e6e2] shadow-[0_24px_70px_-15px_rgba(22,21,20,0.22)] p-7 transition-all duration-200 z-50 ${
                        isServicesOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 translate-y-3 pointer-events-none'
                      }`}
                    >
                      {/* Top Header Row: Label & Category Pill Tabs */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#e8e6e2] gap-4">
                        <div>
                          <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#161514]">
                            Built for your growth & industry
                          </span>
                          <p className="text-xs text-[#5d5a55] mt-0.5 font-normal">
                            {activeTab.description}
                          </p>
                        </div>

                        {/* Segmented Tab Pills */}
                        <div className="inline-flex p-1 rounded-full bg-[#f4f3f1] border border-[#e8e6e2] gap-1 shrink-0">
                          {MEGAMENU_TABS.map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setActiveTabId(tab.id)}
                              className={`px-3 py-1 rounded-full text-xs font-sans font-semibold transition-all duration-150 ${
                                activeTabId === tab.id
                                  ? 'bg-white text-[#161514] shadow-sm'
                                  : 'text-[#5d5a55] hover:text-[#161514]'
                              }`}
                            >
                              {tab.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 4 Clean Columns of Categorized Sub-Topics */}
                      <div className="grid grid-cols-4 gap-6 pt-5 pb-5 border-b border-[#f4f3f1]">
                        {activeTab.groups.map((group) => (
                          <div key={group.category} className="flex flex-col gap-2.5">
                            <h4 className="text-xs font-sans font-bold text-[#161514] uppercase tracking-wide">
                              {group.category}
                            </h4>
                            <ul className="flex flex-col gap-2">
                              {group.items.map((subItem) => (
                                <li key={subItem.label}>
                                  <Link
                                    href={subItem.href}
                                    onClick={() => setIsServicesOpen(false)}
                                    className="group/item block p-2 -mx-2 rounded-xl hover:bg-[#f4f3f1] transition-colors"
                                  >
                                    <span className="text-xs font-bold text-[#161514] group-hover/item:text-[#b45309] block leading-tight">
                                      {subItem.label}
                                    </span>
                                    {subItem.description && (
                                      <span className="text-[11px] text-[#5d5a55] block mt-1 leading-snug">
                                        {subItem.description}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Footer Strip with Link & Clean Badge */}
                      <div className="flex items-center justify-between pt-4">
                        <Link
                          href={activeTab.footerLink.href}
                          onClick={() => setIsServicesOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#161514] hover:text-[#b45309] transition-colors"
                        >
                          <span>{activeTab.footerLink.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        {activeTab.countBadge && (
                          <span className="px-2.5 py-1 rounded-full bg-[#f4f3f1] border border-[#e8e6e2] text-[11px] font-mono font-medium text-[#5d5a55]">
                            {activeTab.countBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-sm font-sans font-medium tracking-tight rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7ac4f] ${
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

          {/* 3. Right CTA Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* BDOG Style Warm Apricot Pill Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-150 shadow-sm active:scale-95"
            >
              Get a Free Blueprint
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#161514] hover:bg-[#f4f3f1] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-12 overflow-y-auto lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-5 max-w-md mx-auto">
            <div className="flex flex-col gap-2 pb-6 border-b border-[#e8e6e2]">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-sans font-bold text-[#161514] hover:text-[#f7ac4f] py-2 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Rebuild CTA */}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-bold text-base shadow-sm active:scale-95 transition-all"
              >
                Get a Free Blueprint
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
