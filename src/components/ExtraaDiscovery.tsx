'use client';

import React from 'react';
import Link from 'next/link';

export const ExtraaDiscovery: React.FC = () => {
  return (
    <section className="w-full select-none">
      <div className="content-container py-8 sm:py-12">
        <div className="border-t border-[#226192]/15 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#226192]/60">
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF8557]/60" />
          <span className="text-[#EF8557] font-semibold tracking-widest uppercase">
            ARCHIVAL INDEX // 99
          </span>
          <span className="text-[#226192]/30">·</span>
          <span className="text-[#226192]/60">Unpublished materials & personal vault</span>
        </div>

        <Link
          href="/extraa"
          className="group inline-flex items-center gap-2 text-[#226192]/70 hover:text-[#226192] transition-colors cursor-pointer font-medium tracking-wide"
        >
          <span>Open Extraa</span>
          <span className="text-[#EF8557] group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
        </div>
      </div>
    </section>
  );
};
