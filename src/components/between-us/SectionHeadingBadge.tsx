import React from 'react';

interface SectionHeadingBadgeProps {
  children: React.ReactNode;
}

/**
 * Decorative heading label visually matching the "Between Us" button:
 * - Coral orange background (#EF8557)
 * - Deep editorial blue text (#226192)
 * - Hand-cut organic corner radius
 * - Syne typography and comfortable proportions
 * - Decorative heading (not an interactive button)
 */
export const SectionHeadingBadge: React.FC<SectionHeadingBadgeProps> = ({ children }) => {
  return (
    <div className="mb-6 sm:mb-8 flex items-center">
      <h2
        className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-tight text-[#226192] bg-[#EF8557] select-none shadow-sm uppercase"
        style={{
          borderRadius: '18px 5px 22px 7px / 8px 20px 7px 16px',
        }}
      >
        {children}
      </h2>
    </div>
  );
};
