'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonSpaceConfig } from '@/lib/between-us/types';
import { PersonSpaceRenderer } from './PersonSpaceRenderer';

interface BetweenUsSpaceProps {
  config: PersonSpaceConfig;
}

export const BetweenUsSpace: React.FC<BetweenUsSpaceProps> = ({ config }) => {
  const router = useRouter();
  const [isLocking, setIsLocking] = useState(false);

  const handleLock = async () => {
    setIsLocking(true);
    try {
      await fetch('/api/between-us/lock', { method: 'POST' });
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
            <span className="text-[#F8F4E7]">{config.displayName}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F4E7]">
            {config.spaceTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#F8F4E7]/70 mt-2 max-w-xl font-normal">
            {config.tagline}
          </p>
        </div>

        {/* Lock Space Button */}
        <button
          onClick={handleLock}
          disabled={isLocking}
          className="self-start md:self-auto px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-[#F8F4E7]/30 text-[#F8F4E7] hover:border-[#D7A781] hover:text-[#D7A781] transition-colors cursor-pointer disabled:opacity-50"
          style={{ borderRadius: '12px 4px 14px 4px' }}
          title="Lock and exit Between Us"
        >
          {isLocking ? 'Locking...' : 'Lock Space [ ⎋ ]'}
        </button>
      </header>

      {/* Person-Specific Composed Content Blocks */}
      <PersonSpaceRenderer config={config} />
    </div>
  );
};
