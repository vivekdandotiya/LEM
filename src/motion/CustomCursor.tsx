'use client';

import React, { useEffect } from 'react';
import { initCursor } from './cursor';

export default function CustomCursor() {
  useEffect(() => {
    const cleanup = initCursor();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true" data-state="default">
      <span className="cursor__dot" />
      <span className="cursor__ring" />
      <span className="cursor__label" />
    </div>
  );
}
