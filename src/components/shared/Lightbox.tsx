'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export interface LightboxItem {
  id: string;
  title: string;
  brand: string;
  category: string;
  image: string;
  description?: string;
  year?: string;
}

export interface LightboxProps {
  item: LightboxItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ item, isOpen, onClose }: LightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} Preview`}
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-charcoal/95 backdrop-blur-2xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
    >
      {/* Close Button */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-gold hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold z-10"
        aria-label="Close image preview"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Lightbox Content Container */}
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-white rounded-[24px] overflow-hidden shadow-2xl border border-white/15">
        {/* Main Image */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[70vh] bg-charcoal">
          <Image
            src={item.image}
            alt={`${item.brand} — ${item.title}`}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
          />
        </div>

        {/* Metadata Bar */}
        <div className="w-full p-5 sm:p-6 bg-ivory border-t border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                {item.category}
              </span>
              {item.year && (
                <span className="text-[11px] font-mono text-stone">· {item.year}</span>
              )}
            </div>
            <h3 className="text-xl font-display font-bold text-ink">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-xs sm:text-sm font-sans text-stone mt-1 max-w-xl">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-stone uppercase tracking-wider">
              Client: <span className="text-ink font-bold">{item.brand}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
