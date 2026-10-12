'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PersonSpaceConfig } from '@/lib/between-us/types';
import { SharedMemoriesGallery } from './SharedMemoriesGallery';
import { YouInMyGallery } from './YouInMyGallery';
import { MemoryNotesFlashcards } from './MemoryNotesFlashcards';
import { LettersSection } from './LettersSection';
import { IfWeEverStopTalking } from './IfWeEverStopTalking';

interface BetweenUsSpaceProps {
  config: PersonSpaceConfig;
}

const WELCOME_LINES = [
  'HII, ZOYA ♡',
  'This is your corner here.',
  'A little space for the stories, memories, and things we keep between us.',
];

export const BetweenUsSpace: React.FC<BetweenUsSpaceProps> = ({ config }) => {
  const router = useRouter();
  const [isLocking, setIsLocking] = useState(false);

  // Entrance typing and reveal states
  const [displayedLines, setDisplayedLines] = useState<string[]>(['', '', '']);
  const [activeTypingLine, setActiveTypingLine] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Respect prefers-reduced-motion: reveal immediately
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsReducedMotion(true);
      setDisplayedLines(WELCOME_LINES);
      setActiveTypingLine(3);
      setIsTypingComplete(true);
      return;
    }

    let currentLine = 0;
    let currentChar = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentLine >= WELCOME_LINES.length) {
        setIsTypingComplete(true);
        setActiveTypingLine(3);
        return;
      }

      const targetText = WELCOME_LINES[currentLine];

      if (currentChar < targetText.length) {
        currentChar++;
        const currentSubstring = targetText.slice(0, currentChar);
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLine] = currentSubstring;
          return next;
        });

        // Natural, comfortable typing speed per character
        timeoutId = setTimeout(typeNextChar, 28);
      } else {
        // Line finished: pause naturally before advancing to next line
        currentLine++;
        currentChar = 0;
        setActiveTypingLine(currentLine);

        // Pause duration before starting next line or completing
        const pause =
          currentLine === WELCOME_LINES.length
            ? 350
            : currentLine === 1
            ? 250
            : 300;

        timeoutId = setTimeout(typeNextChar, pause);
      }
    };

    // Initial slight pause before typing begins
    timeoutId = setTimeout(typeNextChar, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleLock = async () => {
    setIsLocking(true);
    try {
      await fetch('/api/between-us/lock', { method: 'POST' });
      router.refresh();
    } catch {
      router.refresh();
    }
  };

  return (
    <div className="content-container py-12 sm:py-16 select-none">
      {/* Dynamic Keyframes for Crisp Cursor Blinking */}
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-cursor-blink {
          animation: cursorBlink 0.8s steps(2, start) infinite;
        }
      `}</style>

      {/* Personal Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 sm:mb-9">
        {/* CSS Grid Overlay: reserves full space upfront to ensure ZERO layout shift */}
        <div className="grid max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed">
          {/* 1. Invisible Layout Skeleton (Guarantees identical height & wrapping at all screen sizes) */}
          <div
            className="invisible pointer-events-none col-start-1 row-start-1 flex flex-col gap-1.5 sm:gap-2 select-none"
            aria-hidden="true"
          >
            <p className="font-semibold tracking-wide">{WELCOME_LINES[0]}</p>
            <p className="font-medium">{WELCOME_LINES[1]}</p>
            <p className="font-normal">{WELCOME_LINES[2]}</p>
          </div>

          {/* 2. Visible Live-Typed Layer */}
          <div className="col-start-1 row-start-1 flex flex-col gap-1.5 sm:gap-2 select-text">
            {/* Line 1 */}
            <p className="font-semibold text-[#21679A] tracking-wide">
              {displayedLines[0]}
              {!isTypingComplete && activeTypingLine === 0 && (
                <span
                  className="inline-block w-[2px] h-[0.9em] bg-[#21679A] ml-1 align-middle animate-cursor-blink"
                  aria-hidden="true"
                />
              )}
            </p>

            {/* Line 2 */}
            <p className="font-medium text-[#21679A]">
              {displayedLines[1]}
              {!isTypingComplete && activeTypingLine === 1 && (
                <span
                  className="inline-block w-[2px] h-[0.9em] bg-[#21679A] ml-1 align-middle animate-cursor-blink"
                  aria-hidden="true"
                />
              )}
            </p>

            {/* Line 3 */}
            <p className="font-normal text-[#21679A]">
              {displayedLines[2]}
              {!isTypingComplete && activeTypingLine === 2 && (
                <span
                  className="inline-block w-[2px] h-[0.9em] bg-[#21679A] ml-1 align-middle animate-cursor-blink"
                  aria-hidden="true"
                />
              )}
            </p>
          </div>
        </div>

        {/* Lock Space Action - gently reveals once welcome text finishes */}
        <button
          onClick={handleLock}
          disabled={isLocking}
          className={`self-start md:self-end px-3 py-1.5 text-xs text-[#226192]/60 hover:text-[#226192] border border-[#226192]/20 hover:border-[#226192]/40 bg-[#226192]/[0.02] hover:bg-[#226192]/[0.05] transition-all duration-500 rounded-sm cursor-pointer disabled:opacity-50 font-medium tracking-wide ${
            isTypingComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ borderRadius: '10px 3px 12px 3px' }}
          title="Lock and exit"
        >
          {isLocking ? 'Locking...' : 'Lock'}
        </button>
      </header>

      {/* Five Distinct Sections: Staggered Bottom-to-Top Floating Entrance */}
      <div className="space-y-16 sm:space-y-24">
        {/* 1. Shared Memories */}
        <div
          className={`transition-all duration-700 ease-out ${
            isTypingComplete || isReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-7 pointer-events-none'
          }`}
          style={{ transitionDelay: isReducedMotion ? '0ms' : '0ms' }}
        >
          <SharedMemoriesGallery />
        </div>

        {/* 2. Memory Notes */}
        <div
          className={`transition-all duration-700 ease-out ${
            isTypingComplete || isReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-7 pointer-events-none'
          }`}
          style={{ transitionDelay: isReducedMotion ? '0ms' : '150ms' }}
        >
          <MemoryNotesFlashcards />
        </div>

        {/* 3. You in My Gallery */}
        <div
          className={`transition-all duration-700 ease-out ${
            isTypingComplete || isReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-7 pointer-events-none'
          }`}
          style={{ transitionDelay: isReducedMotion ? '0ms' : '300ms' }}
        >
          <YouInMyGallery />
        </div>

        {/* 4. Letters */}
        <div
          className={`transition-all duration-700 ease-out ${
            isTypingComplete || isReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-7 pointer-events-none'
          }`}
          style={{ transitionDelay: isReducedMotion ? '0ms' : '450ms' }}
        >
          <LettersSection />
        </div>

        {/* 5. If We Ever Stop Talking */}
        <div
          className={`transition-all duration-700 ease-out ${
            isTypingComplete || isReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-7 pointer-events-none'
          }`}
          style={{ transitionDelay: isReducedMotion ? '0ms' : '600ms' }}
        >
          <IfWeEverStopTalking />
        </div>
      </div>
    </div>
  );
};
