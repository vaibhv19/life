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
            Life is a little corner of the internet for the things that make me who I am beyond engineering.
          </p>

          {/* Explanatory Body */}
          <div className="space-y-4 text-sm sm:text-base text-[#226192]/80 leading-relaxed font-normal max-w-2xl">
            <p className="block">
              My professional portfolio is where I share my work. This space is for the other parts of me: the art I make, the things I enjoy, and a few moments worth keeping.
            </p>
            <p className="block">
              Not everything needs to be documented or shared. This page is simply a small glimpse into my life, without the pressure to keep adding to it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

