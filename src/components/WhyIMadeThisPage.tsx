import React from 'react';

export const WhyIMadeThisPage: React.FC = () => {
  return (
    <section aria-label="Why I made this page" className="w-full select-none">
      <div className="content-container">
        {/* Middle-column border strictly within container */}
        <div className="content-divider" />

        <div className="pt-5 sm:pt-6 md:pt-8 pb-5 sm:pb-6 md:pb-7">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
            {/* Left Column: Heading & Anchor */}
            <div className="md:col-span-5 space-y-2">
              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#226192] leading-tight block">
                Why I made this page.
              </h2>

              {/* Anchor Subtitle */}
              <p className="text-xs sm:text-sm text-[#226192]/60 pt-1 font-normal leading-relaxed block">
                Making room for the parts of life that don&apos;t fit on a résumé.
              </p>
            </div>

            {/* Right Column: Reflective Narrative */}
            <div className="md:col-span-7">
              <div className="border-l-2 border-[#EF8557]/25 pl-5 sm:pl-6 space-y-4 text-sm sm:text-base text-[#226192]/80 leading-relaxed font-normal">
                <p className="block">
                  The internet often shows us carefully presented versions of people: their work, achievements, and finished projects. I wanted a small space that felt a little more personal.
                </p>
                <p className="block">
                  A place for a few things I enjoy, things I&apos;ve made, and moments I choose to share. Nothing exhaustive, and nothing that needs to be constantly updated.
                </p>
                <p className="block">
                  Some things can stay private. Others are worth sharing simply because they matter to me, not because they serve a purpose.
                </p>
              </div>

              {/* Quiet Sign-off */}
              <div className="pt-4 pl-5 sm:pl-6 text-xs font-mono text-[#226192]/50">
                — Vaibhav
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

