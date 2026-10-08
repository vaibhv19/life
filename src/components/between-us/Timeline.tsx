'use client';

import React from 'react';
import { TimelineBlock } from '@/lib/between-us/types';

interface TimelineProps {
  block: TimelineBlock;
}

export const Timeline: React.FC<TimelineProps> = ({ block }) => {
  return (
    <div
      className="w-full border border-[#F8F4E7]/20 bg-[#F8F4E7]/[0.02] p-8 sm:p-12 mb-10"
      style={{ borderRadius: '22px 6px 20px 8px' }}
    >
      <div className="flex items-center justify-between border-b border-[#F8F4E7]/15 pb-4 mb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#D7A781] mb-1">
            CHRONOLOGY // SHARED TIMELINE
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F8F4E7]">
            {block.title}
          </h3>
        </div>
        <span className="text-xs text-[#F8F4E7]/50 font-mono">
          {block.events.length} MILESTONES
        </span>
      </div>

      {block.events.length === 0 ? (
        <div className="border border-dashed border-[#F8F4E7]/20 p-8 text-center">
          <p className="text-xs sm:text-sm text-[#F8F4E7]/50 font-normal">
            Milestones and shared timeline events will be charted here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {block.events.map((ev) => (
            <div key={ev.id} className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-l-2 border-[#D7A781] pl-4 py-1">
              <span className="text-xs font-mono text-[#D7A781] shrink-0 font-semibold">{ev.date}</span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#F8F4E7]">{ev.title}</h4>
                <p className="text-xs text-[#F8F4E7]/70 mt-1">{ev.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
