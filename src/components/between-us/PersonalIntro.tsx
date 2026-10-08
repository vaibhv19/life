'use client';

import React from 'react';
import { PersonalIntroBlock } from '@/lib/between-us/types';

interface PersonalIntroProps {
  block: PersonalIntroBlock;
}

export const PersonalIntro: React.FC<PersonalIntroProps> = ({ block }) => {
  return (
    <div
      className="w-full border border-[#F8F4E7]/20 bg-[#F8F4E7]/[0.03] p-8 sm:p-12 mb-10"
      style={{ borderRadius: '24px 6px 20px 8px / 12px 22px 9px 18px' }}
    >
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-3">
        <span>{block.greeting}</span>
        {block.dateStamp && <span>{block.dateStamp}</span>}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F8F4E7] mb-4">
        {block.title}
      </h2>
      <p className="text-sm sm:text-base text-[#F8F4E7]/80 font-normal leading-relaxed max-w-3xl">
        {block.message}
      </p>
    </div>
  );
};
