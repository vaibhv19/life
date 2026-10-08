'use client';

import React from 'react';
import { LetterBlock } from '@/lib/between-us/types';

interface LetterProps {
  block: LetterBlock;
}

export const Letter: React.FC<LetterProps> = ({ block }) => {
  return (
    <div
      className="w-full border border-[#F8F4E7]/25 bg-[#F8F4E7]/[0.04] p-8 sm:p-14 lg:p-16 mb-10"
      style={{ borderRadius: '26px 8px 24px 6px / 14px 24px 10px 20px' }}
    >
      <div className="flex items-center justify-between border-b border-[#F8F4E7]/15 pb-4 mb-8 text-xs text-[#F8F4E7]/60">
        <span className="text-[#D7A781] font-bold uppercase tracking-wider">
          PERSONAL CORRESPONDENCE // TO {block.recipient.toUpperCase()}
        </span>
        {block.dateWritten && <span>{block.dateWritten}</span>}
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8F4E7] mb-8">
        {block.title}
      </h3>

      {block.bodyParagraphs.length === 0 ? (
        <div className="border border-dashed border-[#F8F4E7]/20 p-8 sm:p-12 text-center">
          <p className="text-xs sm:text-sm text-[#F8F4E7]/50 font-normal">
            Personal letter and unhurried reflections will be composed here.
          </p>
        </div>
      ) : (
        <div className="space-y-6 text-sm sm:text-base text-[#F8F4E7]/85 leading-relaxed max-w-3xl">
          {block.bodyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
          {block.signoff && (
            <p className="pt-6 font-semibold text-[#D7A781]">{block.signoff}</p>
          )}
        </div>
      )}
    </div>
  );
};
