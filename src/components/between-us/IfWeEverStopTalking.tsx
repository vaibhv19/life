'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeadingBadge } from './SectionHeadingBadge';

interface PreservedMessage {
  id: string;
  author: string;
  message: string;
  timestamp: string;
}

const STORAGE_KEY = 'between_us_preserved_messages_zoya';

export const IfWeEverStopTalking: React.FC = () => {
  const [messages, setMessages] = useState<PreservedMessage[]>([]);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('Zoya');
  const [isSaved, setIsSaved] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage: PreservedMessage = {
      id: `msg-${Date.now()}`,
      author: author.trim() || 'Zoya',
      message: text.trim(),
      timestamp: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    setText('');
    setIsSaved(true);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Fallback in memory
    }

    setTimeout(() => {
      setIsSaved(false);
    }, 4500);
  };

  const handleDelete = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Handled
    }
  };

  return (
    <section className="w-full">
      <SectionHeadingBadge>If We Ever Stop Talking</SectionHeadingBadge>
      <p className="text-xs sm:text-sm text-[#226192]/70 font-normal -mt-3 mb-8 max-w-xl leading-relaxed">
        A quiet corner to leave words for down the road. If the silence ever stretches too long or life pulls us in different directions, whatever is written here stays preserved.
      </p>

      <div
        className="border border-[#226192]/20 bg-[#226192]/[0.02] p-6 sm:p-10 mb-8"
        style={{ borderRadius: '22px 6px 20px 8px / 12px 20px 8px 18px' }}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#226192]">
            <label htmlFor="preserved-author" className="font-semibold text-[#226192]">
              Leaving this as:
            </label>
            <input
              id="preserved-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="px-3 py-1.5 text-xs bg-[#FAF7F0] border border-[#226192]/25 rounded text-[#226192] font-medium focus:outline-none focus:border-[#EF8557]"
              placeholder="Your name"
            />
          </div>

          <div>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Leave whatever you'd want the other to know, remember, or read down the line..."
              className="w-full p-4 text-xs sm:text-sm text-[#226192] placeholder-[#226192]/40 bg-[#FAF7F0] border border-[#226192]/25 focus:border-[#EF8557] focus:outline-none rounded transition-colors resize-y leading-relaxed font-normal"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={!text.trim()}
              className="btn-palette-b px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider disabled:opacity-40 cursor-pointer shadow-sm select-none"
              style={{ borderRadius: '14px 4px 16px 4px' }}
            >
              Save note
            </button>

            {isSaved && (
              <span className="text-xs font-semibold text-[#EF8557] flex items-center gap-1.5 animate-fadeIn">
                <span>✓</span> Note saved to this corner. It will remain preserved right here.
              </span>
            )}
          </div>
        </form>

        {/* Clear limitation disclaimer note */}
        <div className="mt-6 pt-4 border-t border-[#226192]/10 text-[11px] text-[#226192]/50 font-normal leading-relaxed">
          <span>🔒 Note:</span> Messages are securely preserved in local storage on this browser and device. They are kept entirely private and are never sent over email or third-party servers.
        </div>
      </div>

      {/* List of Preserved Messages */}
      {isMounted && messages.length > 0 && (
        <div className="space-y-4 mt-8">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#EF8557] mb-2">
            PRESERVED WORDS ({messages.length})
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className="border border-[#226192]/15 bg-[#FAF7F0] p-5 flex flex-col justify-between shadow-xs"
                style={{ borderRadius: '16px 4px 14px 4px' }}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#EF8557] font-bold uppercase tracking-wider mb-2">
                    <span>FROM {m.author.toUpperCase()}</span>
                    <span className="text-[#226192]/40 font-normal">{m.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#226192]/85 whitespace-pre-wrap leading-relaxed font-normal">
                    {m.message}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#226192]/10 text-right">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-[10px] text-[#226192]/40 hover:text-red-500 uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Delete note
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
