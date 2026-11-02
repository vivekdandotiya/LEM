"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Application Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen pt-36 pb-24 bg-surface-warm flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6 p-8 rounded-card bg-white border border-charcoal-900/10 shadow-soft-lg">
        <span className="text-xs font-mono tracking-widest uppercase text-red-600 font-semibold">
          System Notice
        </span>

        <h1 className="text-display-2 font-display font-medium text-charcoal-900 leading-none">
          Temporary Interruption
        </h1>

        <p className="text-sm text-warmgray-600 leading-relaxed">
          An unexpected interface exception occurred while rendering this view. Our engineering team has received the diagnostic trace.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <Button variant="primary" size="md" onClick={() => reset()}>
            Attempt Recovery
          </Button>
          <Button href="/" variant="secondary" size="md">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
