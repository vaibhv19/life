'use client';

import React from 'react';
import { PersonId } from '@/lib/hiddenspace/access';
import { getPersonalSpaceMeta } from '@/lib/hiddenspace/content';

interface PersonalSpaceProps {
  person: PersonId;
}

export const PersonalSpace: React.FC<PersonalSpaceProps> = ({ person }) => {
  const meta = getPersonalSpaceMeta(person);

  return (
    <div className="w-full border border-[#F8F4E7]/25 bg-[#F8F4E7]/[0.03] p-6 sm:p-10 lg:p-12 mb-12" style={{ borderRadius: '24px 6px 20px 8px / 12px 22px 9px 18px' }}>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#F8F4E7]/15 pb-6 mb-8">
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-1">
            DEDICATED SECTION // {person.toUpperCase()}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#F8F4E7]">
            {meta.sectionTitle}
          </h2>
        </div>
        <div className="text-xs text-[#F8F4E7]/50 font-medium tracking-wide">
          Private Vault
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#F8F4E7]/70 font-normal leading-relaxed mb-8 max-w-2xl">
        {meta.description}
      </p>

      {/* Structural Placeholder for Future Personal Content */}
      <div className="border border-dashed border-[#F8F4E7]/20 p-8 sm:p-12 text-center">
        <p className="text-xs sm:text-sm text-[#F8F4E7]/50 font-normal">
          Personal entries and notes will be authored here.
        </p>
      </div>
    </div>
  );
};
