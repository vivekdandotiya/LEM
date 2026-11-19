import React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  surface?: 'light' | 'dark' | 'media' | 'auto';
  children: React.ReactNode;
  className?: string;
}

export function Heading({
  level = 2,
  surface = 'auto',
  children,
  className = '',
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  const colorClass =
    surface === 'dark' || surface === 'media'
      ? 'text-[#F6F3EC]'
      : surface === 'light'
      ? 'text-[#0F1011]'
      : 'text-[var(--fg,#0F1011)]';

  return (
    <Tag
      className={`font-display font-extrabold tracking-tight ${colorClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
