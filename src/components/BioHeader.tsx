'use client';

import React from 'react';

interface BioHeaderProps {
  activeFilterTitle?: string | null;
  onClearFilter?: () => void;
}

export const BioHeader: React.FC<BioHeaderProps> = ({
  activeFilterTitle,
  onClearFilter,
}) => {
  return (
    <header className="w-full bg-[#722F37] border-b border-[#F8F4E7]/15 shrink-0 transition-colors">
      <div className="max-w-[1720px] mx-auto px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Left: Identity + Personal Belief */}
          <div className="max-w-3xl space-y-1.5">
            {/* Heading */}
            <h1 className="text-xl sm:text-2xl font-normal tracking-tight text-[#F8F4E7]">
              who is <span className="text-white font-medium">vaibhv19</span> apart from code?
            </h1>

            {/* Personal belief paragraph */}
            <p className="text-sm text-[#F8F4E7]/80 font-normal leading-relaxed max-w-2xl">
              I think if I do nothing on this planet that makes people feel a little more loved, then I have served my purpose well.
            </p>

            {/* Signature */}
            <div className="pt-0.5">
              <span className="text-xs text-[#F8F4E7]/60 font-mono">
                — Vaibhav Gupta
              </span>
            </div>
          </div>

          {/* Right: Active Filter Badge */}
          {activeFilterTitle && (
            <div className="flex items-center gap-2 text-xs text-[#F8F4E7] font-mono shrink-0 pt-1">
              <span className="text-[#F8F4E7]/60">collection:</span>
              <span className="text-[#D7A781] truncate max-w-[200px] font-medium">
                {activeFilterTitle}
              </span>
              <button
                onClick={onClearFilter}
                className="text-[#F8F4E7] hover:text-white transition-colors ml-1 underline underline-offset-2"
                title="Clear collection filter"
              >
                clear
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
