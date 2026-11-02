"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { NavItem } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
}

export function MobileMenu({ isOpen, onClose, navItems, currentPath }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab" && menuRef.current) {
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

    window.addEventListener("keydown", handleKeyDown);
    firstFocusableRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
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
      className="fixed inset-0 z-50 flex flex-col justify-between bg-surface-warm/95 backdrop-blur-xl px-6 py-8 animate-fadeIn"
    >
      {/* Top Bar with Close Button */}
      <div className="flex items-center justify-between border-b border-charcoal-900/10 pb-5">
        <span className="font-display font-semibold text-lg tracking-tight text-charcoal-900">
          Navigation
        </span>
        <button
          ref={firstFocusableRef}
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full hover:bg-warmgray-200 text-charcoal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-5 py-8 my-auto">
        {navItems.map((item, idx) => {
          const isActive =
            item.href === "/"
              ? currentPath === "/"
              : item.href.startsWith("/#")
              ? currentPath === "/"
              : currentPath.startsWith(item.href);

          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={`text-2xl sm:text-3xl font-display font-medium tracking-tight transition-colors duration-200 flex items-center justify-between ${
                isActive ? "text-accent font-semibold" : "text-charcoal-900 hover:text-accent"
              }`}
            >
              <span>{item.title}</span>
              <span className="text-xs font-mono text-warmgray-400">0{idx + 1}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom CTA & Contact info placeholder */}
      <div className="border-t border-charcoal-900/10 pt-6 flex flex-col gap-4">
        <Button
          href="/contact"
          variant="primary"
          size="lg"
          showArrow
          className="w-full text-center"
          onClick={onClose}
        >
          Start a project
        </Button>

        <div className="flex flex-col gap-1 text-xs text-warmgray-600 pt-2">
          <div className="flex items-center gap-2">
            <span>Direct Inquiries:</span>
            <span className="font-mono text-charcoal-900">{siteConfig.contact.email}</span>
            <PlaceholderBadge label="Sample" />
          </div>
          <span className="text-warmgray-500">{siteConfig.contact.hours}</span>
        </div>
      </div>
    </div>
  );
}
