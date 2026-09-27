'use client';

import React, { useState, useEffect, useRef } from 'react';

export type ActiveNavView = 'home' | 'collections' | 'timeline';

interface SidebarNavProps {
  activeView: ActiveNavView;
  onSelectView: (view: ActiveNavView) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearchOpen: boolean;
  onToggleSearch: (open: boolean) => void;
  filteredCount: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeView,
  onSelectView,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onToggleSearch,
  filteredCount,
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch {}
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Global shortcut '/' to open search and 'Escape' to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        onToggleSearch(true);
      } else if (e.key === 'Escape' && isSearchOpen) {
        onToggleSearch(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, onToggleSearch]);

  const handleSelectHome = () => {
    onSelectView('home');
    if (isSearchOpen) onToggleSearch(false);
  };

  const handleSelectCollections = () => {
    onSelectView('collections');
    if (isSearchOpen) onToggleSearch(false);
  };

  const handleSelectTimeline = () => {
    onSelectView('timeline');
    if (isSearchOpen) onToggleSearch(false);
  };

  return (
    <div className="relative flex shrink-0 h-full z-30">
      {/* Persistent Vertical Navigation Rail */}
      <nav
        aria-label="Sidebar navigation"
        className="w-14 sm:w-16 h-full shrink-0 border-r border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-between py-5 select-none transition-colors"
      >
        {/* Top: Monogram / Home Anchor */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleSelectHome}
            className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
              activeView === 'home' && !isSearchOpen
                ? 'text-zinc-950 dark:text-zinc-100 bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-900'
            }`}
            title="Home — Personal Post"
            aria-label="Home — Personal Post"
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 6.5 9.5 L 13.5 22.5 L 20.5 10 A 6 6 0 1 1 14.5 16 H 19" />
            </svg>
          </button>

          {/* Primary View Navigation */}
          <div className="flex flex-col items-center gap-2.5">
            {/* Timeline View */}
            <button
              onClick={handleSelectTimeline}
              className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
                activeView === 'timeline' && !isSearchOpen
                  ? 'text-zinc-950 dark:text-zinc-100 bg-zinc-200/70 dark:bg-zinc-900 font-medium'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-900'
              }`}
              title="Timeline (Chronological Archive)"
              aria-label="Timeline (Chronological Archive)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="15" y2="18" />
              </svg>
            </button>

            {/* Collections View */}
            <button
              onClick={handleSelectCollections}
              className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
                activeView === 'collections' && !isSearchOpen
                  ? 'text-zinc-950 dark:text-zinc-100 bg-zinc-200/70 dark:bg-zinc-900 font-medium'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-900'
              }`}
              title="Collections (Series & Lenses)"
              aria-label="Collections (Series & Lenses)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>

            {/* Search */}
            <button
              onClick={() => onToggleSearch(!isSearchOpen)}
              className={`w-9 h-9 rounded flex items-center justify-center transition-colors relative ${
                isSearchOpen || searchQuery
                  ? 'text-zinc-950 dark:text-zinc-100 bg-zinc-200/70 dark:bg-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-900'
              }`}
              title="Search archive (/)"
              aria-label="Search archive"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {searchQuery && !isSearchOpen && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-800 dark:bg-zinc-200" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom: Theme Toggle */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-900 transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Flyout Search Drawer */}
      {isSearchOpen && (
        <aside
          aria-label="Search panel"
          className="w-72 sm:w-80 h-full border-r border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 flex flex-col z-20 shadow-xl transition-colors"
        >
          {/* Search Header */}
          <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              search archive
            </h3>
            <button
              onClick={() => onToggleSearch(false)}
              className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 text-xs font-mono p-1"
              title="Close search (ESC)"
              aria-label="Close search"
            >
              ✕
            </button>
          </div>

          {/* Search Input Box */}
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded px-3 py-2">
              <span className="text-zinc-400 dark:text-zinc-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search entries, collections..."
                className="bg-transparent border-none outline-none text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 w-full font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 text-xs font-mono p-0.5"
                  title="Clear query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Status */}
            <div className="space-y-3 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-1">
              {searchQuery ? (
                <div className="space-y-2">
                  <div className="text-zinc-800 dark:text-zinc-200 font-medium">
                    {filteredCount} matching {filteredCount === 1 ? 'entry' : 'entries'}
                  </div>
                  <button
                    onClick={() => {
                      onSelectView('timeline');
                      onToggleSearch(false);
                    }}
                    className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 underline underline-offset-2 block"
                  >
                    view results in timeline →
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 block">
                    suggestions
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['35mm', 'espresso', 'alpine', 'monochrome', 'notebooks', 'brutalist'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          onSearchChange(tag);
                          onSelectView('timeline');
                        }}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
