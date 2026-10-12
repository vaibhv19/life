'use client';

import React, { useState } from 'react';
import { SectionHeadingBadge } from './SectionHeadingBadge';

interface LetterItem {
  id: string;
  title: string;
  date: string;
  preview: string;
  paragraphs: string[];
  signoff: string;
}

const LETTERS: LetterItem[] = [
  {
    id: 'letter-1',
    title: 'On turning twenty and staying exactly who you are',
    date: '12 August 2024',
    preview: 'Every year brings this strange feeling that we are supposed to become someone completely new, but the best part about growing up is realizing you don’t need to shed what makes you genuine...',
    paragraphs: [
      'Every year brings this strange feeling that we are supposed to become someone completely new, but the best part about growing up is realizing you don’t need to shed what makes you genuine.',
      'Watching you navigate everything over the last few years has been a quiet masterclass in resilience. You have this stubborn loyalty to your own values, even when it would be ten times easier to just agree with whatever is around you.',
      'Never let the world talk you out of your natural kindness, your absurd sense of humor, or that instinct you have to stand up for people who haven’t found their voice yet. This space is proof that the things that matter most never get lost.',
    ],
    signoff: 'Always in your corner,\nVaibhav',
  },
  {
    id: 'letter-2',
    title: 'A letter for when everything feels too fast',
    date: 'Autumn 2025',
    preview: 'If you’re opening this because life feels loud and overwhelming right now, take a deep breath. You don’t have to figure out the next five years before breakfast tomorrow...',
    paragraphs: [
      'If you’re opening this because life feels loud and overwhelming right now, take a deep breath. You don’t have to figure out the next five years before breakfast tomorrow.',
      'We spend so much time running toward milestones that we forget the days in between are where the actual life happens. The messy conversations, the tea that went cold while we were talking, the random walks where nothing in particular happened.',
      'Give yourself credit for how far you’ve come without a script. You are doing much better than your late-night anxiety tells you you are.',
    ],
    signoff: 'Take your time,\nVaibhav',
  },
  {
    id: 'letter-3',
    title: 'The quiet spaces between conversations',
    date: 'October 2026',
    preview: 'Some friendships require constant noise to feel real, but what I’ve always cherished about us is that the silence is never uncomfortable. We can go weeks without talking and pick up without missing a beat...',
    paragraphs: [
      'Some friendships require constant noise to feel real, but what I’ve always cherished about us is that the silence is never uncomfortable. We can go weeks without talking and pick up mid-sentence without missing a beat.',
      'That kind of ease is rare. In a world obsessed with broadcasting every second, having a private corner where nothing needs to be performed is something I will always be grateful for.',
      'Wherever life takes both of us, know that this door is always unlocked.',
    ],
    signoff: 'With all my fondness,\nVaibhav',
  },
];

export const LettersSection: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<LetterItem | null>(null);

  return (
    <section className="w-full">
      <SectionHeadingBadge>Letters</SectionHeadingBadge>
      <p className="text-xs sm:text-sm text-[#226192]/70 font-normal -mt-3 mb-8 max-w-xl leading-relaxed">
        Longer letters, unhurried reflections, and messages written for different seasons.
      </p>

      {/* Letter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LETTERS.map((letter) => (
          <div
            key={letter.id}
            onClick={() => setActiveLetter(letter)}
            className="group cursor-pointer border border-[#226192]/20 hover:border-[#EF8557] bg-[#226192]/[0.02] hover:bg-[#226192]/[0.04] transition-all p-6 sm:p-7 flex flex-col justify-between"
            style={{ borderRadius: '18px 6px 20px 8px / 12px 20px 8px 18px' }}
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-[#EF8557] uppercase tracking-wider mb-3">
                <span>FOR ZOYA</span>
                <span className="text-[#226192]/50 font-normal">{letter.date}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#226192] group-hover:text-[#EF8557] transition-colors mb-3 leading-snug">
                {letter.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#226192]/70 leading-relaxed font-normal line-clamp-3 mb-6">
                {letter.preview}
              </p>
            </div>

            <div className="pt-4 border-t border-[#226192]/15 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#226192] group-hover:text-[#EF8557] transition-colors flex items-center gap-1">
                Read letter <span>→</span>
              </span>
              <span className="text-[10px] uppercase font-mono text-[#226192]/40 tracking-widest">
                Full Text
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Letter Modal Reader */}
      {activeLetter && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLetter(null)}
        >
          <div
            className="relative bg-[#FAF7F0] border border-[#EF8557] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-7 sm:p-12 text-[#226192] shadow-2xl"
            style={{ borderRadius: '24px 8px 22px 8px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-[#EF8557]/25 pb-4 mb-6">
              <div className="text-[11px] font-bold text-[#EF8557] uppercase tracking-widest">
                PERSONAL LETTER // {activeLetter.date}
              </div>
              <button
                onClick={() => setActiveLetter(null)}
                className="text-xs font-semibold uppercase tracking-wider text-[#226192]/70 hover:text-[#EF8557] transition-colors cursor-pointer"
              >
                Close [ ⎋ ]
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#226192] mb-6 tracking-tight leading-snug">
              {activeLetter.title}
            </h2>

            <div className="space-y-5 text-sm sm:text-base text-[#226192]/85 leading-relaxed font-normal">
              {activeLetter.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#226192]/15 text-right font-medium text-[#EF8557] whitespace-pre-line text-sm sm:text-base">
              {activeLetter.signoff}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
