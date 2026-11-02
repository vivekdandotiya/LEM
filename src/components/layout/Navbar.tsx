'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { primaryNavItems } from '@/data/nav';
import { MobileMenu } from './MobileMenu';
import { DripLink } from '@/components/animorio/drip/DripLink';
import { Magnetic } from '@/motion/Magnetic';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const isDarkOverHero = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 ease-editorial rounded-pill px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
            isDarkOverHero
              ? 'bg-ink/80 text-white backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/15 ring-1 ring-white/10'
              : 'bg-paper-2/90 text-ink backdrop-blur-xl shadow-[0_16px_40px_rgba(8,10,11,0.15),_inset_0_1px_1px_rgba(255,255,255,0.9)] border border-ink/10 ring-1 ring-ink/5'
          }`}
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

          {/* Desktop 5 Primary Nav Links with DripLink & Variable Font Hover */}
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
                  className={`relative px-4 py-1.5 text-xs xl:text-sm font-medium tracking-tight rounded-full transition-all duration-300 nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
                    isActive
                      ? isDarkOverHero
                        ? 'text-white font-bold'
                        : 'text-ink font-bold'
                      : isDarkOverHero
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-grey-3 hover:text-ink hover:bg-paper'
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
                Start a project →
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
