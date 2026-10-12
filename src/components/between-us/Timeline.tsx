'use client';

import React from 'react';
import { TimelineBlock } from '@/lib/between-us/types';

interface TimelineProps {
  block: TimelineBlock;
}

export const Timeline: React.FC<TimelineProps> = ({ block }) => {
  return (
    <div
      className="w-full border border-[#226192]/20 bg-[#226192]/[0.02] p-8 sm:p-12 mb-10"
      style={{ borderRadius: '22px 6px 20px 8px' }}
    >
      <div className="flex items-center justify-between border-b border-[#226192]/15 pb-4 mb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#EF8557] mb-1">
            CHRONOLOGY // SHARED TIMELINE
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#226192]">
            {block.title}
          </h3>
        </div>
        <span className="text-xs text-[#226192]/50 font-mono">
          {block.events.length} MILESTONES
        </span>
      </div>

      {block.events.length === 0 ? (
        <div className="border border-dashed border-[#226192]/20 p-8 text-center">
          <p className="text-xs sm:text-sm text-[#226192]/50 font-normal">
            Milestones and shared timeline events will be charted here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {block.events.map((ev) => (
            <div key={ev.id} className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-l-2 border-[#EF8557] pl-4 py-1">
              <span className="text-xs font-mono text-[#EF8557] shrink-0 font-semibold">{ev.date}</span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#226192]">{ev.title}</h4>
                <p className="text-xs text-[#226192]/70 mt-1">{ev.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
