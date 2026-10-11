'use client';

import React from 'react';

export const BucketList: React.FC = () => {
  return (
    <div
      className="border border-[#1546D9]/20 bg-[#1546D9]/[0.02] p-8 sm:p-10 mb-8"
      style={{ borderRadius: '20px 6px 20px 6px' }}
    >
      <div className="flex items-center justify-between border-b border-[#1546D9]/15 pb-4 mb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#F9B318] mb-1">
            01 // PURSUITS
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1546D9]">Bucket List</h3>
        </div>
        <span className="text-xs text-[#1546D9]/50 font-mono">0 ENTRIES</span>
      </div>
      <p className="text-xs sm:text-sm text-[#1546D9]/70 mb-6">
        Lifelong pursuits, mountaineering objectives & personal milestones.
      </p>
      <div className="border border-dashed border-[#1546D9]/20 p-8 text-center">
        <p className="text-xs sm:text-sm text-[#1546D9]/50 font-normal">
          Milestones and pursuits will be listed here.
        </p>
      </div>
    </div>
  );
};
