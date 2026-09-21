'use client';

import React, { useEffect } from 'react';
import { LightboxData } from '../types';

interface LightboxModalProps {
  data: LightboxData | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ data, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (data) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col"
      >
        {/* Top bar with metadata and close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              {data.label}
            </span>
            <span className="text-zinc-600 text-xs">•</span>
            <span className="text-xs font-mono text-zinc-400">
              {data.date}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-sm"
            title="Close (ESC)"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Large Placeholder Image Area */}
        <div className="p-6 sm:p-8 bg-zinc-950 flex flex-col items-center justify-center">
          <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col items-center justify-center p-8 relative overflow-hidden select-none">
            {/* Center crosshair */}
            <div className="w-16 h-16 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 font-mono text-lg mb-3">
              +
            </div>
            <div className="font-mono text-sm tracking-wider text-zinc-300 font-medium text-center">
              {data.title}
            </div>
            <div className="font-mono text-xs text-zinc-500 mt-1">
              [PLACEHOLDER FRAME // HIGH RESOLUTION PREVIEW]
            </div>

            {/* Corner marks */}
            <span className="absolute top-3 left-3 text-[10px] font-mono text-zinc-600">┌</span>
            <span className="absolute top-3 right-3 text-[10px] font-mono text-zinc-600">┐</span>
            <span className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-600">└</span>
            <span className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-600">┘</span>
          </div>
        </div>

        {/* Caption & Context Footer */}
        <div className="px-6 sm:px-8 py-5 border-t border-zinc-800/80 bg-zinc-900/40 space-y-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-mono text-zinc-400">
              Collection: <span className="text-zinc-200">{data.collectionTitle}</span>
            </span>
            {data.location && (
              <span className="text-xs font-mono text-zinc-400">{data.location}</span>
            )}
          </div>
          <p className="text-sm text-zinc-300 font-light leading-relaxed">
            {data.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
