'use client';

import React from 'react';

/**
 * Editorial Continuous Marquee
 * Features "TO EXIST IS A FACT, TO LIVE IS AN ART"
 * Clipped strictly to the central content column, with a gentle counterclockwise tilt
 * (left side lower than right side) and edge opacity feathering.
 */
export interface EditorialMarqueeProps {
  phrase?: string;
  className?: string;
  ariaLabel?: string;
  repeatCount?: number;
}

/**
 * Editorial Continuous Marquee
 * Features customizable phrase (default "TO EXIST IS A FACT, TO LIVE IS AN ART")
 * Clipped strictly to the central content column, with a gentle counterclockwise tilt
 * (left side lower than right side) and edge opacity feathering.
 */
export const EditorialMarquee: React.FC<EditorialMarqueeProps> = ({
  phrase = 'TO EXIST IS A FACT, TO LIVE IS AN ART',
  className = 'w-full mt-3 sm:mt-4 md:mt-6 mb-5 sm:mb-6 md:mb-8 select-none',
  ariaLabel = 'Editorial Motto',
  repeatCount = 4,
}) => {
  const items = Array.from({ length: repeatCount });

  return (
    <section aria-label={ariaLabel} className={className}>
      <div className="content-container">
        {/* Straight Horizontal Top & Bottom Borders strictly within the central content column */}
        <div className="w-full border-y border-[#226192]/20 py-2 sm:py-2.5">
          {/* Central Column Clipped Boundary with Horizontal Opacity Gradient Mask */}
          <div
            className="relative w-full overflow-hidden py-1 sm:py-1.5 pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          >
          {/* Counterclockwise Tilt: Left side lower, right side higher */}
          <div className="w-[110%] -ml-[5%] transform -rotate-[1.5deg]">
            <div className="flex whitespace-nowrap overflow-hidden">
              {/* Primary scrolling track */}
              <div className="marquee-track flex items-center shrink-0">
                {items.map((_, i) => (
                  <span key={i} className="flex items-center">
                    <span className="text-[10px] sm:text-xs md:text-[13px] font-semibold tracking-[0.2em] uppercase text-[#226192]/70">
                      {phrase}
                    </span>
                    <span className="mx-4 sm:mx-6 text-[#EF8557]/60 text-xs font-mono select-none" aria-hidden="true">
                      *
                    </span>
                  </span>
                ))}
              </div>

              {/* Seamless duplicate track for infinite zero-gap loop */}
              <div className="marquee-track flex items-center shrink-0" aria-hidden="true">
                {items.map((_, i) => (
                  <span key={i} className="flex items-center">
                    <span className="text-[10px] sm:text-xs md:text-[13px] font-semibold tracking-[0.2em] uppercase text-[#226192]/70">
                      {phrase}
                    </span>
                    <span className="mx-4 sm:mx-6 text-[#EF8557]/60 text-xs font-mono select-none" aria-hidden="true">
                      *
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};
