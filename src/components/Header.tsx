'use client';

import React from 'react';

export const Header: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#EAE6DE]/95 backdrop-blur-md select-none">
      <div className="content-container">
        <div className="h-14 sm:h-16 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6 border-b border-[#EF8557]/25">
          <button
            onClick={scrollToTop}
            className="text-base sm:text-lg font-bold tracking-tight text-[#2C7BB8] hover:text-[#EF8557] transition-colors duration-200 cursor-pointer py-1 focus:outline-none bg-transparent border-none p-0 appearance-none"
            title="Scroll to top"
          >
            Home
          </button>
        </div>
      </div>
    </header>
  );
};

