'use client';

import React from 'react';
import { CustomSectionBlock } from '@/lib/between-us/types';

interface CustomSectionProps {
  block: CustomSectionBlock;
}

export const CustomSection: React.FC<CustomSectionProps> = ({ block }) => {
  return (
    <div
      className="w-full border border-[#1546D9]/20 bg-[#1546D9]/[0.02] p-8 sm:p-12 mb-10"
      style={{ borderRadius: '18px 5px 22px 7px' }}
    >
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#F9B318] mb-2">
        <span>{block.tag || 'CUSTOM SECTION'}</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-[#1546D9] mb-4">
        {block.heading || block.title}
      </h3>
      {block.content ? (
        <p className="text-sm sm:text-base text-[#1546D9]/80 leading-relaxed max-w-3xl">
          {block.content}
        </p>
      ) : (
        <div className="border border-dashed border-[#1546D9]/20 p-8 text-center">
          <p className="text-xs sm:text-sm text-[#1546D9]/50 font-normal">
            Custom archival segment to be populated.
          </p>
        </div>
      )}
    </div>
  );
};
