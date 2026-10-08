'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UniversalBetweenUs } from './UniversalBetweenUs';

export const BirthdayGate: React.FC = () => {
  const router = useRouter();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [showUniversal, setShowUniversal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    const formattedDay = day.padStart(2, '0');
    const formattedMonth = month.padStart(2, '0');
    const formattedYear = year.trim();

    if (!day || !month || formattedYear.length !== 4) {
      setNotice('Please enter your full date of birth.');
      return;
    }

    const birthdayString = `${formattedDay}-${formattedMonth}-${formattedYear}`;
    setIsLoading(true);

    try {
      const res = await fetch('/api/between-us/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthday: birthdayString }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.status === 'configured') {
          // 1. Configured Person -> Refresh server component to render their private space
          router.refresh();
        } else {
          // 2. Unconfigured Birthday -> Show gentle universal fallback
          setShowUniversal(true);
        }
      } else {
        setShowUniversal(true);
      }
    } catch {
      setShowUniversal(true);
    } finally {
      setIsLoading(false);
    }
  };

  // If unconfigured birthday was submitted, show the warm universal Between Us page
  if (showUniversal) {
    return (
      <UniversalBetweenUs
        onTryAnother={() => {
          setShowUniversal(false);
          setDay('');
          setMonth('');
          setYear('');
          setNotice(null);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto py-16 sm:py-24 px-4 flex flex-col items-center select-none text-center">
      {/* Editorial Marker */}
      <div className="text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-3">
        BETWEEN US // PERSONAL REPOSITORY
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F8F4E7] mb-3">
        Between Us
      </h1>

      <p className="text-xs sm:text-sm text-[#F8F4E7]/70 max-w-sm mb-10 leading-relaxed font-normal">
        A quiet collection of personal spaces. Enter your birth date to open your corner.
      </p>

      {/* Understated Date Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
          {/* Day */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              placeholder="DD"
              value={day}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setDay(val);
                if (val.length === 2 && document.getElementById('bu-month')) {
                  document.getElementById('bu-month')?.focus();
                }
              }}
              className="w-16 sm:w-20 text-center py-2.5 sm:py-3 bg-[#F8F4E7]/[0.06] border border-[#F8F4E7]/30 text-[#F8F4E7] placeholder-[#F8F4E7]/30 text-base sm:text-lg font-semibold tracking-wider focus:outline-none focus:border-[#D7A781] transition-colors rounded-sm"
              autoFocus
            />
            <span className="text-[10px] uppercase tracking-widest text-[#F8F4E7]/50 mt-1">Day</span>
          </div>

          <span className="text-[#F8F4E7]/40 text-lg font-light pb-4">/</span>

          {/* Month */}
          <div className="flex flex-col items-center">
            <input
              id="bu-month"
              type="text"
              inputMode="numeric"
              maxLength={2}
              placeholder="MM"
              value={month}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setMonth(val);
                if (val.length === 2 && document.getElementById('bu-year')) {
                  document.getElementById('bu-year')?.focus();
                }
              }}
              className="w-16 sm:w-20 text-center py-2.5 sm:py-3 bg-[#F8F4E7]/[0.06] border border-[#F8F4E7]/30 text-[#F8F4E7] placeholder-[#F8F4E7]/30 text-base sm:text-lg font-semibold tracking-wider focus:outline-none focus:border-[#D7A781] transition-colors rounded-sm"
            />
            <span className="text-[10px] uppercase tracking-widest text-[#F8F4E7]/50 mt-1">Month</span>
          </div>

          <span className="text-[#F8F4E7]/40 text-lg font-light pb-4">/</span>

          {/* Year */}
          <div className="flex flex-col items-center">
            <input
              id="bu-year"
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="YYYY"
              value={year}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setYear(val);
              }}
              className="w-20 sm:w-24 text-center py-2.5 sm:py-3 bg-[#F8F4E7]/[0.06] border border-[#F8F4E7]/30 text-[#F8F4E7] placeholder-[#F8F4E7]/30 text-base sm:text-lg font-semibold tracking-wider focus:outline-none focus:border-[#D7A781] transition-colors rounded-sm"
            />
            <span className="text-[10px] uppercase tracking-widest text-[#F8F4E7]/50 mt-1">Year</span>
          </div>
        </div>

        {/* Gentle Notice */}
        {notice && (
          <div className="text-xs text-[#D7A781] font-medium tracking-wide">
            {notice}
          </div>
        )}

        {/* Subtle Unlock Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-[#F8F4E7] text-[#722F37] hover:bg-[#FFFDF7] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 select-none shadow-sm"
          style={{ borderRadius: '16px 4px 18px 6px / 6px 16px 6px 14px' }}
        >
          {isLoading ? 'Opening...' : 'Open Space →'}
        </button>
      </form>
    </div>
  );
};
