'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#722F37]/95 backdrop-blur-md border-t border-[#F8F4E7]/25 text-[#F8F4E7] select-none">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* 1. TOP ROW */}
        <div className="py-4 sm:py-5 flex items-center justify-between gap-6">
          {/* Left: Clean Email Address */}
          <div className="text-xs sm:text-sm font-medium">
            <a 
              href="mailto:contact@vaibhv19.dev" 
              className="text-[#F8F4E7] hover:text-[#D7A781] transition-colors tracking-normal"
            >
              contact@vaibhv19.dev
            </a>
          </div>

          {/* Right: Prominent Outline Social Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href="https://www.instagram.com/vaibhv_19"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F8F4E7] hover:text-[#D7A781] transition-colors p-1 inline-flex items-center justify-center"
              aria-label="Instagram profile @vaibhv_19"
              title="@vaibhv_19 on Instagram"
            >
              <svg 
                className="w-7 h-7 sm:w-8 sm:h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.75" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/vaibhv19"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F8F4E7] hover:text-[#D7A781] transition-colors p-1 inline-flex items-center justify-center"
              aria-label="LinkedIn profile Vaibhav Gupta"
              title="Vaibhav Gupta on LinkedIn"
            >
              <svg 
                className="w-7 h-7 sm:w-8 sm:h-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.75" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M7 11v5" />
                <circle cx="7" cy="8" r="0.75" fill="currentColor" />
                <path d="M11 16v-3a2 2 0 0 1 4 0v3" />
                <path d="M11 11v5" />
              </svg>
            </a>
          </div>
        </div>

        {/* 2. FIRST DIVIDER */}
        <div className="w-full h-[1px] bg-[#F8F4E7]/25" />

        {/* 3. MAIN CENTERPIECE: Editorial Quote */}
        <div className="py-7 sm:py-9 md:py-11 flex items-center justify-center text-center px-4">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-[#F8F4E7] max-w-4xl leading-tight sm:leading-snug md:leading-snug">
            everything is beautiful when you look at it with love
          </p>
        </div>

        {/* 4. SECOND DIVIDER */}
        <div className="w-full h-[1px] bg-[#F8F4E7]/25" />

        {/* 5. BOTTOM ROW */}
        <div className="py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm tracking-wider uppercase">
          {/* Left: Copyright & Built by */}
          <div className="space-y-0.5 text-[#F8F4E7]/80">
            <div>© 2026 VAIBHAV GUPTA. ALL RIGHTS RESERVED.</div>
            <div className="text-[11px] sm:text-xs text-[#F8F4E7]/60">
              BUILT BY{' '}
              <a 
                href="https://vaibhv19.dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#D7A781] transition-colors underline decoration-[#F8F4E7]/30 underline-offset-2"
              >
                VAIBHV19.DEV
              </a>
            </div>
          </div>

          {/* Right: Legal links */}
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-medium text-[#F8F4E7]/80">
            <button
              type="button"
              className="hover:text-[#D7A781] transition-colors cursor-pointer bg-transparent border-none p-0 tracking-wider"
              onClick={() => {}}
            >
              PRIVACY POLICY
            </button>
            <span className="text-[#F8F4E7]/40 text-[10px]">•</span>
            <button
              type="button"
              className="hover:text-[#D7A781] transition-colors cursor-pointer bg-transparent border-none p-0 tracking-wider"
              onClick={() => {}}
            >
              TERMS & CONDITIONS
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
