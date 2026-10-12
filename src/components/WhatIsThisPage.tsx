'use client';

import React from 'react';
import { useTypewriterSection, TypewriterSpan } from '@/components/TypewriterText';

const ITEMS = [
  'What is this page?',
  'Life is a personal digital space, scrapbook, and visual journal—kept for the things that make up a life beyond engineering.',
  'My professional portfolio holds the code, technical experiments, and the side of my work that fits on a screen. But this space is dedicated to everything else: personal moments, photographs, art, the books I read, music I return to, quiet experiences, thoughts, and memories.',
  'It is a living archive rather than a showcase or a polished pitch—just an honest collection of things gathered along the way, preserved as they are.',
];

export const WhatIsThisPage: React.FC = () => {
  const { sectionRef, getItemState } = useTypewriterSection(ITEMS, {
    headingSpeed: 24,
    speed: 8,
    pauseBetween: 130,
    threshold: 0.15,
  });

  return (
    <section ref={sectionRef} aria-label="What is this page" className="w-full select-none">
      <div className="content-container">
        <div className="pt-0 sm:pt-1 md:pt-2 pb-5 sm:pb-6 md:pb-8">
          {/* Section Title (Types First) */}
          <TypewriterSpan
            as="h2"
            text={ITEMS[0]}
            state={getItemState(0)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#226192] mb-6 block"
          />

          {/* Prominent Lead Statement (Types Second) */}
          <TypewriterSpan
            as="p"
            text={ITEMS[1]}
            state={getItemState(1)}
            className="font-editorial-italic text-lg sm:text-xl md:text-2xl text-[#226192] leading-relaxed mb-6 font-normal block"
          />

          {/* Explanatory Body (Types Sequentially) */}
          <div className="space-y-4 text-sm sm:text-base text-[#226192]/80 leading-relaxed font-normal max-w-2xl">
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
          </div>
        </div>
      </div>
    </section>
  );
};
