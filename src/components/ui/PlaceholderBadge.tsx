import React from "react";
import { clientConfig } from "@/data/site";

interface PlaceholderBadgeProps {
  label?: string;
  className?: string;
}

export function PlaceholderBadge({
  label = "PLACEHOLDER — REPLACE",
  className = "",
}: PlaceholderBadgeProps) {
  if (!clientConfig.showPlaceholders) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-full bg-warmgray-200/90 text-warmgray-600 border border-warmgray-300/80 select-none ${className}`}
      title="This content is an unverified placeholder awaiting approved client assets (see /docs/CLIENT-INFO-REQUIRED.md)"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent/80 animate-pulse" />
      {label}
    </span>
  );
}
