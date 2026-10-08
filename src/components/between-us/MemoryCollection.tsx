'use client';

import React from 'react';
import { MemoryCollectionBlock } from '@/lib/between-us/types';

interface MemoryCollectionProps {
  block: MemoryCollectionBlock;
}

export const MemoryCollection: React.FC<MemoryCollectionProps> = ({ block }) => {
  return (
    <div
      className="w-full border border-[#F8F4E7]/20 bg-[#F8F4E7]/[0.02] p-8 sm:p-12 mb-10"
      style={{ borderRadius: '20px 6px 22px 8px / 10px 20px 8px 18px' }}
    >
      <div className="flex items-center justify-between border-b border-[#F8F4E7]/15 pb-4 mb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#D7A781] mb-1">
            ARCHIVE // MEMORIES
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F8F4E7]">
            {block.title}
          </h3>
        </div>
        <span className="text-xs text-[#F8F4E7]/50 font-mono">
          {block.memories.length} ENTRIES
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#F8F4E7]/70 font-normal leading-relaxed mb-8">
        {block.description}
      </p>

      {block.memories.length === 0 ? (
        <div className="border border-dashed border-[#F8F4E7]/20 p-8 text-center">
          <p className="text-xs sm:text-sm text-[#F8F4E7]/50 font-normal">
            Memories and snapshots will be curated here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {block.memories.map((m) => (
            <div
              key={m.id}
              className="border border-[#F8F4E7]/15 p-6 bg-[#F8F4E7]/[0.02]"
              style={{ borderRadius: '14px 4px 16px 4px' }}
            >
              <div className="text-[10px] text-[#D7A781] font-bold mb-2 uppercase">{m.date}</div>
              <h4 className="text-base font-bold text-[#F8F4E7] mb-2">{m.title}</h4>
              {m.note && <p className="text-xs text-[#F8F4E7]/70 leading-relaxed">{m.note}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
