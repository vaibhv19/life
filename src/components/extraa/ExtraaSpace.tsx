'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BucketList } from './BucketList';
import { Places } from './Places';
import { UnpublishedBooks } from './UnpublishedBooks';
import { NotesToSelf } from './NotesToSelf';
import { PersonalArchive } from './PersonalArchive';
import { Letters } from './Letters';

export const ExtraaSpace: React.FC = () => {
  const router = useRouter();
  const [isLocking, setIsLocking] = useState(false);

  const handleLock = async () => {
    setIsLocking(true);
    try {
      await fetch('/api/extraa/lock', { method: 'POST' });
      router.refresh();
    } catch {
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20 select-none">
      {/* Top Banner & Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F8F4E7]/20 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-2">
            <span>VAULT ACCESS</span>
            <span className="text-[#F8F4E7]/40">//</span>
            <span className="text-[#F8F4E7]">VAIBHAV GUPTA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F4E7]">
            Extraa
          </h1>
          <p className="text-xs sm:text-sm text-[#F8F4E7]/70 mt-2 max-w-xl font-normal">
            Private personal material, unpublished manuscripts, bucket list objectives, and unposted letters.
          </p>
        </div>

        {/* Lock Vault Button */}
        <button
          onClick={handleLock}
          disabled={isLocking}
          className="self-start md:self-auto px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-[#F8F4E7]/30 text-[#F8F4E7] hover:border-[#D7A781] hover:text-[#D7A781] transition-colors cursor-pointer disabled:opacity-50"
          style={{ borderRadius: '12px 4px 14px 4px' }}
          title="Lock and exit Extraa vault"
        >
          {isLocking ? 'Locking...' : 'Lock Vault [ ⎋ ]'}
        </button>
      </header>

      {/* Modular Section Architecture */}
      <div className="space-y-4">
        <BucketList />
        <Places />
        <UnpublishedBooks />
        <NotesToSelf />
        <PersonalArchive />
        <Letters />
      </div>
    </div>
  );
};
