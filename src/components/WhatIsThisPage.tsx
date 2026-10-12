import React from 'react';

export const WhatIsThisPage: React.FC = () => {
  return (
    <section aria-label="What is this page" className="w-full select-none">
      <div className="content-container">
        <div className="pt-0 sm:pt-1 md:pt-2 pb-5 sm:pb-6 md:pb-8">
          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#226192] mb-6 block">
            What is this page?
          </h2>

          {/* Prominent Lead Statement */}
          <p className="font-editorial-italic text-lg sm:text-xl md:text-2xl text-[#226192] leading-relaxed mb-6 font-normal block">
            Life is a personal digital space, scrapbook, and visual journal—kept for the things that make up a life beyond engineering.
          </p>

          {/* Explanatory Body */}
          <div className="space-y-4 text-sm sm:text-base text-[#226192]/80 leading-relaxed font-normal max-w-2xl">
            <p className="block">
              My professional portfolio holds the code, technical experiments, and the side of my work that fits on a screen. But this space is dedicated to everything else: personal moments, photographs, art, the books I read, music I return to, quiet experiences, thoughts, and memories.
            </p>
            <p className="block">
              It is a living archive rather than a showcase or a polished pitch—just an honest collection of things gathered along the way, preserved as they are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

