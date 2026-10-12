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
    <div className="content-container py-12 sm:py-16 select-none">
      {/* Top Banner & Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#226192]/20 pb-8 mb-12">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#226192]">
            Extraa
          </h1>
          <p className="text-xs sm:text-sm text-[#226192]/80 mt-2.5 max-w-2xl font-normal leading-relaxed">
            A private repository of personal material, unpublished manuscripts, bucket list objectives, and letters kept separate from the public pages.
          </p>
        </div>

        {/* Lock Vault Button */}
        <button
          onClick={handleLock}
          disabled={isLocking}
          className="btn-palette-b self-start md:self-auto px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-[#EF8557] cursor-pointer disabled:opacity-50 shadow-sm"
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
