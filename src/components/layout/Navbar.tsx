'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { primaryNavItems } from '@/data/nav';
import { MobileMenu } from './MobileMenu';
import { DripLink } from '@/components/animorio/drip/DripLink';
import { Magnetic } from '@/motion/Magnetic';
import { InkDripAnchorChar } from '@/motion/InkDrip';

export function Navbar() {
  const pathname = usePathname();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const darkCountRef = useRef(0);

  const isHome = pathname === '/';

  useEffect(() => {
    let ticking = false;

    const evaluateBackground = () => {
      const navEl = navRef.current;
      if (!navEl) return;

      const rect = navEl.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const centerX = rect.left + rect.width / 2;

      // On homepage top, the hero section is prominently dark
      if (isHome && window.scrollY < window.innerHeight * 0.72) {
        darkCountRef.current = 5;
        setIsDarkTheme(true);
        return;
      }

      // Check element directly behind the navbar pill centre line
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
          // Check computed background color luminance
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

      // Small hysteresis counter to prevent flickering at boundaries
      if (foundDark) {
        darkCountRef.current = Math.min(5, darkCountRef.current + 1);
        if (darkCountRef.current >= 2) setIsDarkTheme(true);
      } else {
        darkCountRef.current = Math.max(0, darkCountRef.current - 1);
        if (darkCountRef.current <= 1) setIsDarkTheme(false);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          evaluateBackground();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    evaluateBackground();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome, pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
        <nav
          ref={navRef}
          aria-label="Main Navigation"
          className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 ease-editorial rounded-pill px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
            isDarkTheme
              ? 'glass-nav-dark'
              : 'glass-nav-light'
          }`}
          style={{
            backdropFilter: 'blur(18px) saturate(1.1)',
            WebkitBackdropFilter: 'blur(18px) saturate(1.1)',
          }}
        >
          {/* Logo with DripLink */}
          <DripLink
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-sm pr-2"
            aria-label="Lead Edge Marketing - Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/lead-edge-logo.png"
                alt="Lead Edge Emblem"
                fill
                priority
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="font-display font-bold tracking-tight text-current text-sm sm:text-base leading-none">
              LEAD EDGE
              <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest opacity-60 mt-0.5">
                STUDIO
              </span>
            </span>
          </DripLink>

          {/* Desktop 5 Primary Nav Links with DripLink & High-Contrast Typography */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryNavItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : item.href.startsWith('/#')
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <DripLink
                  key={item.title}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-1.5 text-xs xl:text-sm font-medium tracking-tight rounded-full transition-all duration-200 nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
                    isActive
                      ? isDarkTheme
                        ? 'text-white font-bold'
                        : 'text-ink font-bold'
                      : isDarkTheme
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-grey-3 hover:text-ink hover:bg-black/5'
                  }`}
                >
                  <span>{item.title}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-lime"
                    />
                  )}
                </DripLink>
              );
            })}
          </div>

          {/* Magnetic Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <DripLink
                href="/contact"
                className="btn-primary text-xs px-5 py-2 min-h-[38px] group"
              >
                Star<InkDripAnchorChar char="t" color="#080A0B" delay={1.2} /> a project →
              </DripLink>
            </Magnetic>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-current hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime min-h-[44px] min-w-[44px] flex items-center justify-center"
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
