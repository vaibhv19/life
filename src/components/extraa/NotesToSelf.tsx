'use client';

import React from 'react';

export const NotesToSelf: React.FC = () => {
  return (
    <div
      className="border border-[#226192]/20 bg-[#226192]/[0.02] p-8 sm:p-10 mb-8"
      style={{ borderRadius: '20px 6px 20px 6px' }}
    >
      <div className="flex items-center justify-between border-b border-[#EF8557]/20 pb-4 mb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#EF8557] mb-1">
            04 // INTERNAL
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#226192]">Notes To Myself</h3>
        </div>
        <span className="text-xs text-[#226192]/50 font-mono">0 ENTRIES</span>
      </div>
      <p className="text-xs sm:text-sm text-[#226192]/70 mb-6">
        Unfiltered reminders, operating principles & internal checkpoints.
      </p>
      <div className="border border-dashed border-[#226192]/20 p-8 text-center">
        <p className="text-xs sm:text-sm text-[#226192]/50 font-normal">
          Internal notes and principles will be logged here.
        </p>
      </div>
    </div>
  );
};
