'use client';

import React, { useSyncExternalStore } from 'react';

interface LikeButtonProps {
  itemId: string;
  itemType?: 'photo' | 'note' | 'entry';
  onLikeChange?: (itemId: string, liked: boolean) => void;
  className?: string;
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('life-like-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('life-like-change', callback);
  };
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  itemId,
  itemType = 'entry',
  onLikeChange,
  className = '',
}) => {
  const isLiked = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(`life_liked_${itemId}`) === 'true';
      } catch {
        return false;
      }
    },
    () => false // Server snapshot
  );

  const handleToggle = () => {
    const nextState = !isLiked;
    try {
      if (nextState) {
        localStorage.setItem(`life_liked_${itemId}`, 'true');
      } else {
        localStorage.removeItem(`life_liked_${itemId}`);
      }
      window.dispatchEvent(new Event('life-like-change'));
    } catch {
      // Ignore localStorage exceptions in private browsing
    }

    if (onLikeChange) {
      onLikeChange(itemId, nextState);
    }
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isLiked ? `Unlike this ${itemType}` : `Like this ${itemType}`}
        aria-pressed={isLiked}
        className={`group inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer select-none border focus:outline-none focus:ring-2 focus:ring-[#F9B318]/40 ${
          isLiked
            ? 'btn-palette-b border-[#F9B318] shadow-sm'
            : 'bg-transparent text-[#1546D9]/80 border-[#1546D9]/30 hover:border-[#F9B318] hover:text-[#1546D9]'
        }`}
        style={{ borderRadius: '14px 4px 16px 4px / 6px 14px 6px 12px' }}
      >
        {/* Heart Icon SVG */}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isLiked ? 'scale-110 text-[#1546D9]' : 'text-current group-hover:scale-105'
          }`}
          viewBox="0 0 24 24"
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>

        <span className="font-sans font-medium tracking-tight">
          {isLiked ? 'Appreciated' : 'Appreciate'}
        </span>
      </button>
    </div>
  );
};
