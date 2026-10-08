'use client';

import React from 'react';

export type MainViewMode = 'all' | 'archive' | 'series' | 'chronology';

interface HeaderProps {
  activeView: MainViewMode;
  onSelectView: (view: MainViewMode) => void;
  onOpenSearch: () => void;
  activeFilterTitle?: string | null;
  onClearFilter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  onOpenSearch,
  activeFilterTitle,
  onClearFilter,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#1B1E4A]/95 backdrop-blur-md border-b border-[#AFAEA2]/20 select-none">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Identity & Volume Stamp */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => {
              if (onClearFilter) onClearFilter();
              onSelectView('all');
            }}
            className="group flex items-baseline gap-2.5 text-left cursor-pointer focus:outline-none"
          >
            <span className="font-editorial-display text-xl sm:text-2xl font-semibold tracking-tight text-[#E8E7E0] group-hover:text-[#D21319] transition-colors">
              LIFE
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest text-[#D21319] uppercase font-bold">
              vol. 01
            </span>
          </button>

          <span className="hidden md:inline-block text-xs font-mono text-[#AFAEA2]/40">/</span>

          <span className="hidden md:inline-block text-xs font-mono text-[#AFAEA2] tracking-wide">
            life.vaibhv19.dev
          </span>
        </div>

        {/* Center: Editorial View Switcher on Warm Stone Surface */}
        <nav aria-label="Archive view switcher" className="hidden lg:flex items-center gap-1 bg-[#AFAEA2]/12 border border-[#AFAEA2]/25 p-1 rounded-sm">
          {[
            { id: 'all', label: 'Index / All' },
            { id: 'archive', label: 'Visual Archive' },
            { id: 'series', label: 'Series Lenses' },
            { id: 'chronology', label: 'Chronology' },
          ].map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectView(tab.id as MainViewMode)}
                className={`px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#1B1E4A] bg-[#AFAEA2] font-semibold shadow-sm'
                    : 'text-[#AFAEA2] hover:text-[#E8E7E0] hover:bg-[#AFAEA2]/20'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Active Filter Indicator & Search Trigger */}
        <div className="flex items-center gap-3 sm:gap-5">
          {activeFilterTitle && (
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono bg-[#AFAEA2] text-[#1B1E4A] border border-[#D21319] px-2.5 py-1 rounded-sm font-medium">
              <span className="text-[#1B1E4A]/70">lens:</span>
              <span className="truncate max-w-[140px] text-[#D21319] font-bold">{activeFilterTitle}</span>
              {onClearFilter && (
                <button
                  onClick={onClearFilter}
                  className="hover:text-[#D21319] ml-1 text-xs font-bold"
                  title="Clear lens filter"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#AFAEA2]/30 bg-[#AFAEA2]/10 hover:border-[#D21319] text-xs font-mono text-[#AFAEA2] hover:text-[#D21319] transition-colors cursor-pointer"
            title="Search Archive (Press /)"
            aria-label="Search Archive"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D21319]">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="hidden sm:inline font-medium">Search</span>
            <kbd className="text-[10px] bg-[#1B1E4A] text-[#AFAEA2] px-1 rounded border border-[#AFAEA2]/30">
              /
            </kbd>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-between px-5 py-2 border-t border-[#AFAEA2]/15 bg-[#1B1E4A] overflow-x-auto gap-2">
        {[
          { id: 'all', label: 'Index' },
          { id: 'archive', label: 'Visual' },
          { id: 'series', label: 'Series' },
          { id: 'chronology', label: 'Chronology' },
        ].map((tab) => {
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectView(tab.id as MainViewMode)}
              className={`px-2.5 py-1 text-xs font-mono shrink-0 rounded-xs transition-colors cursor-pointer ${
                isActive
                  ? 'text-[#1B1E4A] bg-[#AFAEA2] font-semibold'
                  : 'text-[#AFAEA2] hover:text-[#E8E7E0]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
