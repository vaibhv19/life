'use client';

import React from 'react';
import Link from 'next/link';

export const ExtraaDiscovery: React.FC = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12 select-none">
      <div className="border-t border-[#F8F4E7]/15 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#F8F4E7]/60">
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D7A781]/60" />
          <span className="text-[#D7A781] font-semibold tracking-widest uppercase">
            ARCHIVAL INDEX // 99
          </span>
          <span className="text-[#F8F4E7]/30">·</span>
          <span className="text-[#F8F4E7]/60">Unpublished materials & personal vault</span>
        </div>

        <Link
          href="/extraa"
          className="group inline-flex items-center gap-2 text-[#F8F4E7]/70 hover:text-[#F8F4E7] transition-colors cursor-pointer font-medium tracking-wide"
        >
          <span>Open Extraa</span>
          <span className="text-[#D7A781] group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
};
