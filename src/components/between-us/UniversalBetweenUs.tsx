'use client';

import React from 'react';
import Link from 'next/link';

interface UniversalBetweenUsProps {
  onTryAnother?: () => void;
}

export const UniversalBetweenUs: React.FC<UniversalBetweenUsProps> = ({ onTryAnother }) => {
  return (
    <div className="w-full max-w-2xl mx-auto py-16 sm:py-24 px-5 sm:px-8 select-none text-center">
      {/* Editorial Marker */}
      <div className="text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-3">
        BETWEEN US // AN OPEN CORNER
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F4E7] mb-6 leading-tight">
        This little corner is still waiting for its story.
      </h1>

      <p className="text-sm sm:text-base text-[#F8F4E7]/80 max-w-xl mx-auto mb-6 leading-relaxed font-normal">
        Not every page in this archive has been authored yet. Some spaces are left open for unhurried conversations, quiet memories, and whatever comes next.
      </p>

      <p className="text-xs sm:text-sm text-[#D7A781] font-medium tracking-wide mb-10">
        Maybe there&apos;s something here for you someday.
      </p>

      {/* Understated Nav Actions */}
      <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs sm:text-sm">
        {onTryAnother && (
          <button
            onClick={onTryAnother}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#F8F4E7] text-[#722F37] hover:bg-[#FFFDF7] active:scale-[0.98] transition-all cursor-pointer shadow-sm select-none"
            style={{ borderRadius: '14px 4px 16px 4px' }}
          >
            Enter another date
          </button>
        )}

        <Link
          href="/"
          className="text-[#F8F4E7]/70 hover:text-[#F8F4E7] transition-colors font-medium underline decoration-[#F8F4E7]/30 underline-offset-4"
        >
          Return to Life homepage →
        </Link>
      </div>
    </div>
  );
};
