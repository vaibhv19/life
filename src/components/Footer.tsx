'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent border-t border-[#AFAEA2]/20 py-12 sm:py-16 text-xs font-mono text-[#AFAEA2] select-none">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Left: Colophon & Philosophy */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D21319]" />
              <span className="font-editorial-display text-xl text-[#E8E7E0] font-semibold">LIFE</span>
              <span className="text-[#AFAEA2]/40">/</span>
              <span className="text-[11px] text-[#D21319] font-bold uppercase tracking-wider">PERSONAL ARCHIVE</span>
            </div>
            <p className="text-xs text-[#AFAEA2] font-sans leading-relaxed">
              An authored repository of 35mm film, notebooks, mountaineering logs, and quiet observations. Not a portfolio; a scrapbook of life apart from software.
            </p>
          </div>

          {/* Right: Technical stamp & copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 text-[11px] text-[#AFAEA2]">
            <div>
              <span className="block text-[#D21319] font-bold">LOCATION</span>
              <span className="text-[#E8E7E0]">28°38'N 77°13'E · NEW DELHI</span>
            </div>
            <div>
              <span className="block text-[#D21319] font-bold">ARCHIVE EDITION</span>
              <span className="text-[#E8E7E0]">VOL. 01 // 2025</span>
            </div>
            <div>
              <span className="block text-[#D21319] font-bold">CURATION</span>
              <span className="text-[#E8E7E0]">VAIBHAV GUPTA</span>
            </div>
          </div>
        </div>

        {/* Bottom fine line */}
        <div className="mt-10 pt-6 border-t border-[#AFAEA2]/15 flex flex-wrap items-center justify-between gap-4 text-[10px] text-[#AFAEA2]">
          <span>© 2025 VAIBHAV GUPTA — ALL RIGHTS RESERVED</span>
          <span className="text-[#D21319] font-semibold">BUILT WITH RESTRAINT OVER DECORATION</span>
        </div>
      </div>
    </footer>
  );
};
