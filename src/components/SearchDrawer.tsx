'use client';

import React, { useEffect, useRef } from 'react';
import { ArchiveItem } from '../types';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredItems: ArchiveItem[];
  onSelectItem: (item: ArchiveItem) => void;
  onSelectTag: (tag: string) => void;
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  filteredItems,
  onSelectItem,
  onSelectTag,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularTags = ['35mm', 'alpine', 'notebooks', 'night', 'architecture', 'monochrome', 'shadows', 'typography'];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1B1E4A]/90 backdrop-blur-sm select-none">
      {/* Backdrop click dismiss */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Body on Warm Stone Grey Physical Surface */}
      <aside
        aria-label="Archive search drawer"
        className="w-full max-w-md h-full bg-[#AFAEA2] text-[#1B1E4A] border-l-2 border-[#AFAEA2] flex flex-col shadow-2xl p-6 sm:p-8"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1B1E4A]/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D21319]" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#1B1E4A] font-bold">
              SEARCH ARCHIVE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono text-[#1B1E4A] hover:text-[#D21319] px-2 py-1 border border-[#1B1E4A]/30 hover:border-[#D21319] cursor-pointer transition-colors font-bold"
            title="Close (ESC)"
          >
            ESC ✕
          </button>
        </div>

        {/* Input Bar */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center gap-2.5 bg-[#1B1E4A] border-2 border-[#1B1E4A] focus-within:border-[#D21319] px-3.5 py-2.5 rounded-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D21319]">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by keyword, location, series, or gear..."
              className="bg-transparent text-xs font-mono text-[#E8E7E0] placeholder:text-[#AFAEA2]/70 outline-none w-full font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-[#AFAEA2] hover:text-[#D21319] text-xs font-mono font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tag Suggestions */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#1B1E4A] block font-bold">
              SUGGESTED TAGS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSelectTag(tag)}
                  className="text-[10px] font-mono px-2 py-0.5 border border-[#1B1E4A]/25 bg-[#1B1E4A]/10 text-[#1B1E4A] hover:bg-[#D21319] hover:text-white hover:border-[#D21319] transition-colors cursor-pointer font-semibold rounded-xs"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto mt-6 divide-y divide-[#1B1E4A]/15">
          <div className="pb-2 text-[11px] font-mono text-[#1B1E4A] flex items-center justify-between font-semibold">
            <span>RESULTS</span>
            <span className="text-[#D21319]">{filteredItems.length} MATCHES</span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#1B1E4A]/70">
              No entries found matching "{searchQuery}"
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="py-3.5 group cursor-pointer hover:bg-[#1B1E4A]/10 px-2 -mx-2 transition-colors rounded-xs"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-[#1B1E4A]/80 font-medium">
                  <span>{item.date}</span>
                  <span className="text-[#D21319] font-bold uppercase">{item.medium}</span>
                </div>
                <h4 className="font-editorial-display text-base text-[#1B1E4A] group-hover:text-[#D21319] font-semibold mt-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#1B1E4A]/80 font-sans truncate mt-0.5">
                  {item.caption}
                </p>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
};
