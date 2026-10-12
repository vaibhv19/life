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
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#226192] mb-3">
        Extraa
      </h1>

      <p className="text-xs sm:text-sm text-[#226192]/80 max-w-sm mb-8 leading-relaxed font-normal">
        An unlisted space for personal writings, unpublished manuscripts, bucket list objectives, and internal archives kept away from the public site.
      </p>

      {/* Understated Password Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5">
        <div className="w-full">
          <input
            type="password"
            placeholder="Enter access passphrase"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-center py-3 px-4 bg-[#226192]/[0.06] border border-[#226192]/30 text-[#226192] placeholder-[#226192]/30 text-sm sm:text-base font-medium focus:outline-none focus:border-[#EF8557] transition-colors rounded-sm tracking-widest"
            autoFocus
          />
        </div>

        {/* Access Denied Feedback */}
        {errorState && (
          <div className="text-xs text-[#EF8557] font-medium tracking-wide">
            {errorState}
          </div>
        )}

        {/* Unlock Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-palette-b mt-2 px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-widest active:scale-[0.98] cursor-pointer disabled:opacity-50 select-none shadow-sm"
          style={{ borderRadius: '16px 4px 18px 6px / 6px 16px 6px 14px' }}
        >
          {isLoading ? 'Verifying...' : 'Unlock Vault →'}
        </button>
      </form>
    </div>
  );
};
