'use client';

import React from 'react';
import Link from 'next/link';

interface NavItem {
  title: string;
  subtitle: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    title: 'CATALOG',
    subtitle: 'A collection of things worth keeping.',
    href: '/catalog',
  },
  {
    title: 'NOTES',
    subtitle: "Small thoughts, observations, and things I don't want to forget.",
    href: '/notes',
  },
  {
    title: 'ALL POST',
    subtitle: 'Longer thoughts, stories, and pieces collected along the way.',
    href: '/all-post',
  },
  {
    title: 'EXTRAA',
    subtitle: 'Private writings, unpublished work, and personal archives.',
    href: '/extraa',
  },
];

export const EditorialPageNav: React.FC = () => {
  return (
    <section aria-label="Page Navigation" className="w-full pb-14 sm:pb-20 md:pb-24 select-none">
      <div className="content-container">
        <nav className="border-y border-[#226192]/20 divide-y divide-[#226192]/20">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block py-6 sm:py-8 md:py-9 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold uppercase tracking-tight text-[#226192] group-hover:text-[#EF8557] transition-colors duration-200 leading-none">
                  {item.title}
                </h3>

                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[1.75] text-[#226192]/60 group-hover:text-[#EF8557] group-hover:translate-x-2 transition-all duration-200 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>

              <p className="text-xs sm:text-sm md:text-[15px] text-[#226192]/70 group-hover:text-[#226192]/90 mt-2.5 sm:mt-3 font-normal leading-relaxed max-w-xl transition-colors duration-200">
                {item.subtitle}
              </p>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};
