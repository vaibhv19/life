'use client';

import React, { useState } from 'react';
import { SectionHeadingBadge } from './SectionHeadingBadge';

interface FlashcardNote {
  id: string;
  note: string;
  author: string;
  tag: string;
  date?: string;
}

const MEMORY_NOTES: FlashcardNote[] = [
  {
    id: 'note-1',
    note: 'Working with you has always been effortless because you approach every challenge with the most genuine attitude. Even on chaotic days, your discipline and humor keep everything on track.',
    author: 'Vaibhav Gupta',
    tag: 'Midnight Observation',
    date: 'Autumn 2026',
  },
  {
    id: 'note-2',
    note: 'Remember when we spent two whole hours arguing whether soup is technically a drink or a food, and both of us ended up googling dictionary definitions at 2 AM with complete seriousness?',
    author: 'Vaibhav Gupta',
    tag: 'Late Night Debates',
    date: 'Winter 2025',
  },
  {
    id: 'note-3',
    note: 'You have this exact squint whenever you’re trying to decipher if someone is telling a genuine story or completely pulling your leg. It cracks me up every single time.',
    author: 'Vaibhav Gupta',
    tag: 'Telling Expressions',
    date: 'Spring 2026',
  },
  {
    id: 'note-4',
    note: 'You always pretend you don’t care about the tiny details, but you’re consistently the first person to remember how someone takes their tea or what song was playing three months ago.',
    author: 'Vaibhav Gupta',
    tag: 'Things I Notice',
    date: 'Summer 2026',
  },
  {
    id: 'note-5',
    note: 'I still have that playlist you made. Even the four songs you swore you only put on there as an ironic joke and then proceeded to sing along to with your whole chest.',
    author: 'Vaibhav Gupta',
    tag: 'Curated Tapes',
    date: 'July 2026',
  },
  {
    id: 'note-6',
    note: 'No matter how noisy the rest of the world gets, talking to you has this rare quality of resetting everything back to quiet clarity within five minutes.',
    author: 'Vaibhav Gupta',
    tag: 'Quiet Constant',
    date: 'October 2026',
  },
];

export const MemoryNotesFlashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? MEMORY_NOTES.length - 1 : prev - 1));
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev === MEMORY_NOTES.length - 1 ? 0 : prev + 1));
  };

  const current = MEMORY_NOTES[currentIndex];

  return (
    <section className="w-full">
      <SectionHeadingBadge>Memory Notes</SectionHeadingBadge>
      <p className="text-xs sm:text-sm text-[#226192]/70 font-normal -mt-3 mb-10 max-w-xl leading-relaxed">
        Short personal thoughts, observations, and little reminders preserved in a flashcard deck.
      </p>

      {/* Flashcard Slider Container */}
      <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center py-6 sm:py-10 px-2 sm:px-6">
        {/* Left Arrow Button */}
        <button
          onClick={prevCard}
          aria-label="Previous note"
          className="absolute -left-1 sm:left-0 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#226192]/30 bg-[#FAF7F0] text-[#226192] hover:text-[#EF8557] hover:border-[#EF8557] shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Stacked Flashcard Deck (Inspired by the reference image) */}
        <div className="relative w-full max-w-md sm:max-w-lg min-h-[300px] sm:min-h-[340px] flex items-center justify-center">
          {/* Back Stack Layer 2 (Rotated left) */}
          <div
            className="absolute inset-0 border border-[#226192]/25 bg-[#226192]/[0.02] shadow-sm transform -rotate-3 scale-[0.98] pointer-events-none transition-transform duration-300"
            style={{ borderRadius: '18px 6px 20px 7px' }}
          />

          {/* Back Stack Layer 1 (Rotated right) */}
          <div
            className="absolute inset-0 border border-[#EF8557]/30 bg-[#FAF7F0]/60 shadow-sm transform rotate-2 scale-[0.99] pointer-events-none transition-transform duration-300"
            style={{ borderRadius: '20px 8px 18px 6px' }}
          />

          {/* Main Active Flashcard (Foreground) */}
          <div
            className="relative z-10 w-full bg-[#FAF7F0] border-2 border-[#226192]/35 shadow-xl p-7 sm:p-10 flex flex-col justify-between transition-all duration-300"
            style={{ borderRadius: '20px 6px 22px 8px / 12px 22px 9px 18px' }}
          >
            {/* Top Index Marker */}
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#EF8557] mb-6 border-b border-[#EF8557]/20 pb-3">
              <span>{current.tag}</span>
              <span className="font-mono text-[#226192]/50">
                {String(currentIndex + 1).padStart(2, '0')} / {String(MEMORY_NOTES.length).padStart(2, '0')}
              </span>
            </div>

            {/* Note Quote Body */}
            <p className="text-sm sm:text-base md:text-lg text-[#226192] leading-relaxed font-normal mb-8 select-text">
              &ldquo;{current.note}&rdquo;
            </p>

            {/* Author / Date Signature Footer */}
            <div className="pt-4 border-t border-[#226192]/15 flex items-center justify-between text-xs text-[#226192]">
              <div>
                <span className="font-semibold text-[#226192] block sm:inline">{current.author}</span>
                {current.date && <span className="text-[#226192]/60 text-[11px] sm:ml-2">({current.date})</span>}
              </div>
              <span className="text-[10px] text-[#EF8557] font-semibold uppercase tracking-wider">
                Note #{currentIndex + 1}
              </span>
            </div>
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={nextCard}
          aria-label="Next note"
          className="absolute -right-1 sm:right-0 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#226192]/30 bg-[#FAF7F0] text-[#226192] hover:text-[#EF8557] hover:border-[#EF8557] shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Deck Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {MEMORY_NOTES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Jump to note ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              idx === currentIndex
                ? 'w-6 bg-[#EF8557]'
                : 'w-1.5 bg-[#226192]/25 hover:bg-[#226192]/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
