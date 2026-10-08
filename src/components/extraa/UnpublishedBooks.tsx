'use client';

import React from 'react';

export const UnpublishedBooks: React.FC = () => {
  return (
    <div
      className="border border-[#F8F4E7]/20 bg-[#F8F4E7]/[0.02] p-8 sm:p-10 mb-8"
      style={{ borderRadius: '20px 6px 20px 6px' }}
    >
      <div className="flex items-center justify-between border-b border-[#F8F4E7]/15 pb-4 mb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#D7A781] mb-1">
            03 // MANUSCRIPTS
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F8F4E7]">Unpublished Books</h3>
        </div>
        <span className="text-xs text-[#F8F4E7]/50 font-mono">0 ENTRIES</span>
      </div>
      <p className="text-xs sm:text-sm text-[#F8F4E7]/70 mb-6">
        Draft manuscripts, essay fragments & unedited volumes.
      </p>
      <div className="border border-dashed border-[#F8F4E7]/20 p-8 text-center">
        <p className="text-xs sm:text-sm text-[#F8F4E7]/50 font-normal">
          Unpublished book manuscripts and drafts will be archived here.
        </p>
      </div>
    </div>
  );
};
