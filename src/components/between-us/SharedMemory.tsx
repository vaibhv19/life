'use client';

import React from 'react';
import { SharedMemoryBlock } from '@/lib/between-us/types';

interface SharedMemoryProps {
  block: SharedMemoryBlock;
}

export const SharedMemory: React.FC<SharedMemoryProps> = ({ block }) => {
  return (
    <div
      className="w-full border border-[#F8F4E7]/20 bg-[#F8F4E7]/[0.03] p-8 sm:p-12 mb-10"
      style={{ borderRadius: '20px 6px 20px 6px' }}
    >
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-3">
        <span>SHARED MEMORY</span>
        {block.coordinates && <span>{block.coordinates}</span>}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-[#F8F4E7] mb-4">
        {block.momentTitle}
      </h3>
      {block.narrative ? (
        <p className="text-sm sm:text-base text-[#F8F4E7]/80 leading-relaxed max-w-3xl">
          {block.narrative}
        </p>
      ) : (
        <div className="border border-dashed border-[#F8F4E7]/20 p-8 text-center">
          <p className="text-xs sm:text-sm text-[#F8F4E7]/50 font-normal">
            Shared memory narrative to be authored.
          </p>
        </div>
      )}
    </div>
  );
};
