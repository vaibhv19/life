'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonProfile } from '@/lib/hiddenspace/access';
import { SHARED_CONTENT_SECTIONS } from '@/lib/hiddenspace/content';
import { PersonalSpace } from './PersonalSpace';

interface HiddenSpaceProps {
  person: PersonProfile;
}

export const HiddenSpace: React.FC<HiddenSpaceProps> = ({ person }) => {
  const router = useRouter();
  const [isLocking, setIsLocking] = useState(false);

  const handleLock = async () => {
    setIsLocking(true);
    try {
      await fetch('/api/hiddenspace/lock', { method: 'POST' });
      router.refresh();
    } catch {
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20 select-none">
      {/* Top Banner & Context Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F8F4E7]/20 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-2">
            <span>AUTHENTICATED AS</span>
            <span className="text-[#F8F4E7]/40">//</span>
            <span className="text-[#F8F4E7]">{person.displayName}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F4E7]">
            Hidden Space
          </h1>
          <p className="text-xs sm:text-sm text-[#F8F4E7]/70 mt-2 max-w-xl font-normal">
            Private journals, unfinished pursuits, unshared books, and quiet correspondence.
          </p>
        </div>

        {/* Lock Space Button */}
        <button
          onClick={handleLock}
          disabled={isLocking}
          className="self-start md:self-auto px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-[#F8F4E7]/30 text-[#F8F4E7] hover:border-[#D7A781] hover:text-[#D7A781] transition-colors cursor-pointer disabled:opacity-50"
          style={{ borderRadius: '12px 4px 14px 4px' }}
          title="Lock and exit Hidden Space"
        >
          {isLocking ? 'Locking...' : 'Lock Space [ ⎋ ]'}
        </button>
      </header>

      {/* 1. Person-Specific Space Section */}
      <PersonalSpace person={person.id} />

      {/* 2. Shared Archive Sections (Structural Placeholders) */}
      <section className="mb-16">
        <div className="text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-6">
          SHARED ARCHIVES // PLACEHOLDERS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SHARED_CONTENT_SECTIONS.map((section) => (
            <div
              key={section.id}
              className="border border-[#F8F4E7]/20 bg-[#F8F4E7]/[0.02] p-6 sm:p-8 flex flex-col justify-between"
              style={{ borderRadius: '16px 4px 18px 6px' }}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#F8F4E7]/50 font-mono mb-3">
                  <span className="text-[#D7A781] font-semibold">{section.title.toUpperCase()}</span>
                  <span>{section.entriesCount} ITEMS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F8F4E7] mb-2">
                  {section.title}
                </h3>
                <p className="text-xs text-[#F8F4E7]/70 leading-relaxed font-normal">
                  {section.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F8F4E7]/10 flex items-center justify-between text-[11px] text-[#F8F4E7]/40">
                <span>STATUS: ARCHIVING IN PROGRESS</span>
                <span>00 // SKELETON</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
