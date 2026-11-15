'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './stack.css';

gsap.registerPlugin(ScrollTrigger);

export type StackLayout = 'list' | 'grid2x2' | 'row';

export interface StackSeparateProps<T> {
  items: T[];
  layout: StackLayout;
  renderCard: (item: T, index: number, isPeeled: boolean, isActive: boolean) => React.ReactNode;
  className?: string;
  onStepChange?: (step: number) => void;
  id?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
  pinRef?: React.RefObject<HTMLElement | null>;
  end?: string;
}

export function StackSeparate<T>({
  items,
  layout,
  renderCard,
  className = '',
  onStepChange,
  id: customId,
  triggerRef: externalTriggerRef,
  pinRef: externalPinRef,
  end: customEnd,
}: StackSeparateProps<T>) {
  const generatedId = useId().replace(/:/g, '');
  const sectionId = customId || `stack-${generatedId}`;
  const skipId = `skip-${sectionId}`;

  const defaultContainerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastStepRef = useRef<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = externalTriggerRef ? externalTriggerRef.current : defaultContainerRef.current;
    const pinTarget = externalPinRef ? externalPinRef.current : defaultContainerRef.current;
    const list = listRef.current;

    if (!container || !pinTarget || !list) return;

    let tl: gsap.core.Timeline | null = null;
    let st: ScrollTrigger | null = null;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const cardEls = cardRefs.current.filter(Boolean) as HTMLLIElement[];
      if (cardEls.length < 2) return;

      const totalCards = cardEls.length;

      // Precompute slots once relative to list
      const computeSlots = () => {
        const listRect = list.getBoundingClientRect();
        return cardEls.map((card) => {
          const r = card.getBoundingClientRect();
          return {
            x: r.left - listRect.left,
            y: r.top - listRect.top,
          };
        });
      };

      const slots = computeSlots();
      const anchor = slots[0];

      // Set initial stacked state
      cardEls.forEach((card, idx) => {
        if (idx === 0) {
          gsap.set(card, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            zIndex: totalCards + 5,
            opacity: 1,
          });
        } else {
          const deltaX = anchor.x - slots[idx].x;
          const deltaY = (anchor.y - slots[idx].y) + idx * 14;
          const scale = Math.pow(0.97, idx);
          const rotation = idx % 2 === 1 ? -1.5 : 1.5;

          gsap.set(card, {
            x: deltaX,
            y: deltaY,
            scale: scale,
            rotation: rotation,
            zIndex: totalCards - idx + 1,
            opacity: Math.max(0.7, 1 - idx * 0.08),
          });
        }
      });

      // Pin duration: capped at 2.0 viewports (<= 200%)
      const pinDistancePercent = customEnd || `+=${Math.min(totalCards * 45, 190)}%`;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: pinTarget,
          start: 'top top+=96px',
          end: pinDistancePercent,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const stepIndex = Math.min(
              totalCards - 1,
              Math.floor(self.progress * totalCards)
            );
            if (stepIndex !== lastStepRef.current) {
              lastStepRef.current = stepIndex;
              setActiveStep(stepIndex);
              container.dispatchEvent(
                new CustomEvent('stack:step', {
                  detail: { step: stepIndex },
                  bubbles: true,
                })
              );
              onStepChange?.(stepIndex);
            }
          },
        },
      });

      st = tl.scrollTrigger || null;

      // Animate each card peeling in sequence
      const steps = totalCards - 1;
      for (let i = 1; i < totalCards; i++) {
        const card = cardEls[i];
        const stepStart = (i - 1) / steps;
        const stepDuration = 1 / steps;

        // Curved flight path with gentle overshoot (power3.out)
        tl.to(
          card,
          {
            scale: 1.03,
            zIndex: totalCards + 10 + i,
            duration: stepDuration * 0.4,
            ease: 'power2.out',
          },
          stepStart
        );

        tl.to(
          card,
          {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: stepDuration * 0.6,
            ease: 'power3.out',
          },
          stepStart + stepDuration * 0.4
        );
      }
    });

    return () => {
      mm.revert();
      if (tl) tl.kill();
      if (st) st.kill();
    };
  }, [items, isClient, onStepChange, externalTriggerRef, externalPinRef, customEnd]);

  const handleCardFocus = (index: number) => {
    // If keyboard focused, snap card and all preceding cards to settled position immediately
    cardRefs.current.forEach((card, idx) => {
      if (card && idx <= index) {
        gsap.to(card, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    });
    setActiveStep(index);
    const container = externalTriggerRef ? externalTriggerRef.current : defaultContainerRef.current;
    container?.dispatchEvent(
      new CustomEvent('stack:step', {
        detail: { step: index },
        bubbles: true,
      })
    );
    onStepChange?.(index);
  };

  const layoutClass =
    layout === 'list'
      ? 'stack-layout-list'
      : layout === 'grid2x2'
      ? 'stack-layout-grid2x2'
      : 'stack-layout-row';

  const totalStepsStr = String(items.length).padStart(2, '0');
  const activeStepStr = String(activeStep + 1).padStart(2, '0');

  return (
    <section id={sectionId} className={`stack-section ${className}`}>
      {/* Accessibility Skip Link */}
      <a
        href={`#${skipId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-24 focus:left-6 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-white focus:rounded-md focus:border focus:border-lime focus:shadow-xl font-mono text-xs"
      >
        Skip interactive card stack
      </a>

      {/* Floating Step Indicator (Desktop) */}
      <div className="hidden lg:flex items-center gap-2 mb-4 font-mono text-xs text-grey-3">
        <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
        <span className="font-bold text-ink">{activeStepStr}</span>
        <span>/</span>
        <span>{totalStepsStr}</span>
      </div>

      <div ref={defaultContainerRef} className="stack-container">
        <ol
          ref={listRef}
          aria-label="Sequential Process Cards"
          className={`stack-list stack-mobile-cover ${layoutClass}`}
        >
          {items.map((item, index) => {
            const isPeeled = index <= activeStep;
            const isActive = index === activeStep;

            return (
              <li
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onFocus={() => handleCardFocus(index)}
                style={{ ['--i' as any]: index }}
                className="stack-card-item"
              >
                {renderCard(item, index, isPeeled, isActive)}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Skip Anchor */}
      <div id={skipId} tabIndex={-1} className="sr-only" />
    </section>
  );
}
