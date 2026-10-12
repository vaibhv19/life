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
    <div className="content-container py-12 sm:py-16 select-none">
      {/* Top Banner & Context Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EF8557]/25 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#EF8557] mb-2">
            <span>AUTHENTICATED AS</span>
            <span className="text-[#226192]/40">{'//'}</span>
            <span className="text-[#226192]">{config.displayName}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#226192]">
            {config.spaceTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#226192]/70 mt-2 max-w-xl font-normal">
            {config.tagline}
          </p>
        </div>

        {/* Lock Space Button */}
        <button
          onClick={handleLock}
          disabled={isLocking}
          className="btn-palette-b self-start md:self-auto px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-[#EF8557] cursor-pointer disabled:opacity-50 shadow-sm"
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
