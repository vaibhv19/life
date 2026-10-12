'use client';

import React from 'react';
import Link from 'next/link';

export const EditorialPageNav: React.FC = () => {
  return (
    <section aria-label="Page Navigation" className="w-full pb-10 sm:pb-14 md:pb-16 select-none">
      <div className="content-container">
        <nav className="w-full">
          <Link
            href="/extraa"
            className="group block py-6 sm:py-8 md:py-9 transition-colors cursor-pointer focus:outline-none"
            title="Open Extraa"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-[#226192] group-hover:text-[#EF8557] transition-colors duration-200 leading-tight">
              There is more, somewhere.
            </h3>
          </Link>
        </nav>
      </div>
    </section>
  );
};
