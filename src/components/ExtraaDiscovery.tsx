'use client';

import React from 'react';
import Link from 'next/link';

export const ExtraaDiscovery: React.FC = () => {
  return (
    <section className="w-full select-none">
      <div className="content-container py-8 sm:py-12">
        <div className="border-t border-[#1546D9]/15 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#1546D9]/60">
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F9B318]/60" />
          <span className="text-[#F9B318] font-semibold tracking-widest uppercase">
            ARCHIVAL INDEX // 99
          </span>
          <span className="text-[#1546D9]/30">·</span>
          <span className="text-[#1546D9]/60">Unpublished materials & personal vault</span>
        </div>

        <Link
          href="/extraa"
          className="group inline-flex items-center gap-2 text-[#1546D9]/70 hover:text-[#1546D9] transition-colors cursor-pointer font-medium tracking-wide"
        >
          <span>Open Extraa</span>
          <span className="text-[#F9B318] group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
        </div>
      </div>
    </section>
  );
};
