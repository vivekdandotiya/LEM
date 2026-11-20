'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { primaryNavItems } from '@/data/nav';
import { MobileMenu } from './MobileMenu';
import { DripLink } from '@/components/animorio/drip/DripLink';
import { Magnetic } from '@/motion/Magnetic';
import {
  ChevronDown,
  Search,
  Target,
  Share2,
  Code,
  Film,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface ServiceDropdownItem {
  title: string;
  cue: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES_MENU_ITEMS: ServiceDropdownItem[] = [
  {
    title: 'Data-Driven Digital Marketing',
    cue: 'Full-Funnel Growth',
    href: '/services',
    icon: TrendingUp,
  },
  {
    title: 'Search Engine Optimization',
    cue: 'Discoverability',
    href: '/services/seo',
    icon: Search,
  },
  {
    title: 'Pay-Per-Click Advertising',
    cue: 'Immediate Traction',
    href: '/services/ppc',
    icon: Target,
  },
  {
    title: 'Social Media Marketing',
    cue: 'Brand Gravity',
    href: '/services/social-media',
    icon: Share2,
  },
  {
    title: 'Web Development',
    cue: 'Architectural Rigor',
    href: '/services/web-development',
    icon: Code,
  },
  {
    title: 'Video Editing & Photo Creation',
    cue: 'Visual Cinematic',
    href: '/services/video-photo',
    icon: Film,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);
  const darkCountRef = useRef(0);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isHome = pathname === '/';

  // Scroll dynamics: Directional hide/reveal, progress line, and background detection
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (currentScrollY / docHeight) * 100)) : 0;
      setScrollProgress(progress);

      // Narrowing state (> 60px)
      setIsScrolled(currentScrollY > 60);

      // Directional hide / reveal logic:
      // Hide when scrolling down past 140px; reveal on scroll up
      if (currentScrollY > 140) {
        if (currentScrollY > lastScrollYRef.current + 8) {
          // Scrolling down
          setIsVisible(false);
          setIsServicesOpen(false);
        } else if (currentScrollY < lastScrollYRef.current - 8) {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;

      // Dark background detection underneath navbar pill
      const navEl = navRef.current;
      if (!navEl) return;

      const rect = navEl.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const centerX = rect.left + rect.width / 2;

      // On homepage top, the hero creative wall is dark
      if (isHome && currentScrollY < window.innerHeight * 0.72) {
        darkCountRef.current = 5;
        setIsDarkTheme(true);
        return;
      }

      const elements = document.elementsFromPoint(centerX, centerY);
      const behindEl = elements.find(
        (el) => !navEl.contains(el) && el !== document.documentElement && el !== document.body
      );

      let foundDark = false;
      if (behindEl) {
        const darkSection = behindEl.closest('[data-theme="dark"], .dark-section, [data-dark="true"]');
        if (darkSection) {
          foundDark = true;
        } else {
          const bg = window.getComputedStyle(behindEl).backgroundColor;
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            if (lum < 85) foundDark = true;
          }
        }
      }

      if (foundDark) {
        darkCountRef.current = Math.min(5, darkCountRef.current + 1);
        if (darkCountRef.current >= 2) setIsDarkTheme(true);
      } else {
        darkCountRef.current = Math.max(0, darkCountRef.current - 1);
        if (darkCountRef.current <= 1) setIsDarkTheme(false);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHome, pathname]);

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
    }, 180);
  };

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-transform duration-350 ease-editorial ${
          isVisible ? 'translate-y-0' : '-translate-y-24'
        }`}
      >
        <nav
          ref={navRef}
          aria-label="Main Navigation"
          className={`pointer-events-auto relative w-full transition-all duration-350 ease-editorial rounded-full h-16 px-4 sm:px-6 flex items-center justify-between shadow-soft-md ${
            isScrolled ? 'max-w-4xl' : 'max-w-6xl'
          } ${
            isDarkTheme
              ? 'glass-nav-dark'
              : isScrolled
              ? 'glass-nav-scrolled'
              : 'glass-nav-hero'
          }`}
        >
          {/* Logo with DripLink */}
          <DripLink
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full pr-2 select-none"
            aria-label="Lead Edge Marketers - Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/lead-edge-logo.png"
                alt="Lead Edge Marketers Logo"
                fill
                priority
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-tight text-sm sm:text-base leading-none">
                LEAD EDGE
              </span>
              <span className="text-xs font-mono uppercase tracking-widest opacity-70 mt-0.5 leading-none font-semibold">
                MARKETERS
              </span>
            </div>
          </DripLink>

          {/* Desktop 5 Primary Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {primaryNavItems.map((item) => {
              const isServices = item.title === 'Services';
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
                    <DripLink
                      href={item.href}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      className={`relative flex items-center gap-1 px-4 py-2 text-xs lg:text-sm font-medium tracking-tight rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        isActive
                          ? isDarkTheme
                            ? 'text-white font-bold'
                            : 'text-ink font-bold'
                          : isDarkTheme
                          ? 'text-white/80 hover:text-white hover:bg-white/10'
                          : 'text-stone hover:text-ink hover:bg-black/5'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-250 ${
                          isServicesOpen ? 'rotate-180 text-gold' : 'opacity-60'
                        }`}
                      />
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gold"
                        />
                      )}
                    </DripLink>

                    {/* Services Dropdown Card */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 sm:w-96 rounded-[22px] p-2.5 transition-all duration-250 ease-editorial shadow-soft-lg z-50 ${
                        isServicesOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 translate-y-2 pointer-events-none'
                      } ${
                        isDarkTheme
                          ? 'bg-[#1C1D1F]/95 border border-white/12 text-white backdrop-blur-2xl'
                          : 'bg-white/95 border border-ink/10 text-ink backdrop-blur-2xl'
                      }`}
                    >
                      <div className="px-3 pt-2 pb-1.5 border-b border-current/10 flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-widest text-stone font-semibold">
                          6 Core Disciplines
                        </span>
                        <DripLink
                          href="/services"
                          className="text-xs font-mono text-gold hover:underline flex items-center gap-1 font-semibold"
                        >
                          All Services →
                        </DripLink>
                      </div>

                      <div className="flex flex-col gap-1 pt-1.5">
                        {SERVICES_MENU_ITEMS.map((srv) => {
                          const Icon = srv.icon;
                          const isSrvActive = pathname === srv.href;
                          return (
                            <DripLink
                              key={srv.href}
                              href={srv.href}
                              onClick={() => setIsServicesOpen(false)}
                              className={`group flex items-center gap-3 p-2.5 rounded-[16px] transition-all duration-200 ${
                                isSrvActive
                                  ? isDarkTheme
                                    ? 'bg-white/12 text-white'
                                    : 'bg-ivory-2 text-ink'
                                  : isDarkTheme
                                  ? 'hover:bg-white/8 text-white/90'
                                  : 'hover:bg-ivory-2/70 text-ink'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold bg-gold/10 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold leading-tight truncate">
                                  {srv.title}
                                </div>
                                <div className="text-xs font-mono uppercase tracking-wider text-stone mt-0.5">
                                  {srv.cue}
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-stone transition-all duration-200 group-hover:text-gold group-hover:translate-x-0.5 opacity-0 group-hover:opacity-100" />
                            </DripLink>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <DripLink
                  key={item.title}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-2 text-xs lg:text-sm font-medium tracking-tight rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    isActive
                      ? isDarkTheme
                        ? 'text-white font-bold'
                        : 'text-ink font-bold'
                      : isDarkTheme
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-stone hover:text-ink hover:bg-black/5'
                  }`}
                >
                  <span>{item.title}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gold"
                    />
                  )}
                </DripLink>
              );
            })}
          </div>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.2} className="hidden sm:inline-block">
              <DripLink
                href="/contact"
                className="btn-primary text-xs px-5 py-2.5 min-h-[38px] rounded-full font-semibold select-none whitespace-nowrap"
              >
                Book Strategy Call
              </DripLink>
            </Magnetic>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isDarkTheme ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-ink'
              }`}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-overlay"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Gold Scroll Progress Line hugging bottom edge */}
          <div className="absolute bottom-0 left-6 right-6 h-[2px] overflow-hidden rounded-full pointer-events-none">
            <div
              className="h-full bg-gold transition-[width] duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
              aria-hidden="true"
            />
          </div>
        </nav>
      </header>

      {/* Accessible Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={primaryNavItems}
        currentPath={pathname}
      />
    </>
  );
}
