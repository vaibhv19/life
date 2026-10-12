'use client';

import React from 'react';

/**
 * Editorial Page Transition Template
 * Next.js App Router remounts template instances on route changes,
 * creating a clean, unhurried fade & subtle vertical entrance across pages.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
}
