'use client';

import React from 'react';
import Link from 'next/link';

interface UniversalBetweenUsProps {
  onTryAnother?: () => void;
}

export const UniversalBetweenUs: React.FC<UniversalBetweenUsProps> = ({ onTryAnother }) => {
  return (
    <div className="w-full max-w-2xl mx-auto py-16 sm:py-24 px-5 sm:px-8 select-none text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#226192] mb-8 sm:mb-10 leading-tight">
        This little corner is still waiting for its story.
      </h1>

      {/* Understated Nav Actions */}
      <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs sm:text-sm">
        {onTryAnother && (
          <button
            onClick={onTryAnother}
            className="btn-palette-b px-5 py-2.5 text-xs font-semibold uppercase tracking-wider active:scale-[0.98] cursor-pointer shadow-sm select-none"
            style={{ borderRadius: '14px 4px 16px 4px' }}
          >
            Enter another date
          </button>
        )}

        <Link
          href="/"
          className="text-[#226192]/70 hover:text-[#226192] transition-colors font-medium underline decoration-[#226192]/30 underline-offset-4"
        >
          Return to Life homepage →
        </Link>
      </div>
    </div>
  );
};
