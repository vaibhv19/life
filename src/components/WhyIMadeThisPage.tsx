'use client';

import React from 'react';
import { useTypewriterSection, TypewriterSpan } from '@/components/TypewriterText';

const ITEMS = [
  'Why I made this page.',
  'Making room for parts of myself that do not belong on a professional website.',
  'Most places on the internet ask us to present only what is finished, useful, or career-oriented. For a long time, my online footprint was defined almost entirely by software and clean summaries.',
  'I wanted a dedicated space to preserve moments as they happen, collect things that genuinely matter to me, and make room for parts of myself that simply do not belong on a resume.',
  'Some memories deserve more than getting lost in a camera roll. This page is a quiet reminder to slow down, notice things, and document living as it happens.',
];

export const WhyIMadeThisPage: React.FC = () => {
  const { sectionRef, isComplete, getItemState } = useTypewriterSection(ITEMS, {
    headingSpeed: 24,
    speed: 8,
    pauseBetween: 130,
    threshold: 0.15,
  });

  return (
    <section ref={sectionRef} aria-label="Why I made this page" className="w-full select-none">
      <div className="content-container">
        {/* Middle-column border strictly within container */}
        <div className="content-divider" />

        <div className="py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
            {/* Left Column: Heading & Anchor */}
            <div className="md:col-span-5 space-y-2">
              {/* Heading (Types First) */}
              <TypewriterSpan
                as="h2"
                text={ITEMS[0]}
                state={getItemState(0)}
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#226192] leading-tight block"
              />

              {/* Anchor Subtitle (Types Second) */}
              <TypewriterSpan
                as="p"
                text={ITEMS[1]}
                state={getItemState(1)}
                className="text-xs sm:text-sm text-[#226192]/60 pt-1 font-normal leading-relaxed block"
              />
            </div>

            {/* Right Column: Reflective Narrative */}
            <div className="md:col-span-7">
              <div className="border-l-2 border-[#226192]/20 pl-5 sm:pl-6 space-y-4 text-sm sm:text-base text-[#226192]/80 leading-relaxed font-normal">
                <TypewriterSpan
                  as="p"
                  text={ITEMS[2]}
                  state={getItemState(2)}
                  className="block"
                />
                <TypewriterSpan
                  as="p"
                  text={ITEMS[3]}
                  state={getItemState(3)}
                  className="block"
                />
                <TypewriterSpan
                  as="p"
                  text={ITEMS[4]}
                  state={getItemState(4)}
                  className="block"
                />
              </div>

              {/* Quiet Sign-off */}
              <div
                className={`pt-4 pl-5 sm:pl-6 text-xs font-mono text-[#226192]/50 transition-opacity duration-700 ${
                  isComplete ? 'opacity-100' : 'opacity-0'
                }`}
              >
                — Vaibhav
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
