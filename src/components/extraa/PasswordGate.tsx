'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const PasswordGate: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorState(null);

    if (!password) {
      setErrorState('Please enter access key.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/extraa/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.refresh();
      } else {
        setErrorState('Access denied.');
      }
    } catch {
      setErrorState('Access denied.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-16 sm:py-24 px-4 flex flex-col items-center select-none text-center">
      {/* Editorial Marker */}
      <div className="text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-3">
        VAULT KEY // LEVEL 02
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F8F4E7] mb-3">
        Extraa
      </h1>

      <p className="text-xs sm:text-sm text-[#F8F4E7]/70 max-w-sm mb-10 leading-relaxed font-normal">
        Private personal material, unpublished books, and internal archives.
      </p>

      {/* Understated Password Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5">
        <div className="w-full">
          <input
            type="password"
            placeholder="Enter access passphrase"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-center py-3 px-4 bg-[#F8F4E7]/[0.06] border border-[#F8F4E7]/30 text-[#F8F4E7] placeholder-[#F8F4E7]/30 text-sm sm:text-base font-medium focus:outline-none focus:border-[#D7A781] transition-colors rounded-sm tracking-widest"
            autoFocus
          />
        </div>

        {/* Access Denied Feedback */}
        {errorState && (
          <div className="text-xs text-[#D7A781] font-medium tracking-wide">
            {errorState}
          </div>
        )}

        {/* Unlock Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-[#F8F4E7] text-[#722F37] hover:bg-[#FFFDF7] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 select-none shadow-sm"
          style={{ borderRadius: '16px 4px 18px 6px / 6px 16px 6px 14px' }}
        >
          {isLoading ? 'Verifying...' : 'Unlock Vault →'}
        </button>
      </form>
    </div>
  );
};
