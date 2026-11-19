import React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: 'light' | 'dark' | 'media' | 'auto';
  children: React.ReactNode;
  className?: string;
  badge?: boolean;
}

export function Eyebrow({
  surface = 'auto',
  children,
  className = '',
  badge = false,
  ...props
}: EyebrowProps) {
  if (badge) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold shadow-2xs ${
          surface === 'dark' || surface === 'media'
            ? 'bg-[#101214]/90 border border-white/20 text-[#D9C29A]'
            : 'bg-white border border-ink/15 text-[#0F1011]'
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`text-xs font-mono uppercase tracking-widest font-bold ${
        surface === 'dark' || surface === 'media'
          ? 'text-[#D9C29A]'
          : 'text-[#57534E]'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
