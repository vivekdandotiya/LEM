'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useDrip } from './DripTransitionProvider';
import gsap from 'gsap';

export interface DripLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onPointerEnter?: (e: React.PointerEvent<HTMLAnchorElement>) => void;
  onPointerLeave?: (e: React.PointerEvent<HTMLAnchorElement>) => void;
  target?: string;
}

export function DripLink({
  href,
  onClick,
  onPointerEnter,
  onPointerLeave,
  className = '',
  children,
  target,
  ...props
}: DripLinkProps) {
  const { navigate, notifyHover } = useDrip();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const isInternal =
    typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('//') &&
    !target &&
    target !== '_blank';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If onClick provided, call it
    if (onClick) onClick(e);

    // Only intercept normal left clicks on internal paths without hashes
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      isInternal &&
      !href.includes('#')
    ) {
      e.preventDefault();

      // Animate arrow spin down if present
      const arrow = linkRef.current?.querySelector('.drip-arrow');
      if (arrow) {
        gsap.to(arrow, { rotation: 90, duration: 0.25, ease: 'power2.out' });
      }

      const rect = linkRef.current?.getBoundingClientRect();
      const originX = rect ? (rect.left + rect.width / 2) / window.innerWidth : e.clientX / window.innerWidth;
      navigate(href, originX);
    }
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (onPointerEnter) onPointerEnter(e);
    if (isInternal && !href.includes('#')) {
      const rect = linkRef.current?.getBoundingClientRect();
      if (rect) {
        notifyHover((rect.left + rect.width / 2) / window.innerWidth, true);
      }
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (onPointerLeave) onPointerLeave(e);
    if (isInternal && !href.includes('#')) {
      const rect = linkRef.current?.getBoundingClientRect();
      if (rect) {
        notifyHover((rect.left + rect.width / 2) / window.innerWidth, false);
      }
    }
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      target={target}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
