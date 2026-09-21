'use client';

import React from 'react';
import { Post, LightboxData } from '../types';

interface TimelinePanelProps {
  posts: Post[];
  activeCollectionTitle?: string | null;
  onClearFilter: () => void;
  onOpenLightbox: (data: LightboxData) => void;
  isCollectionsCollapsed: boolean;
  onExpandCollections: () => void;
}

export const TimelinePanel: React.FC<TimelinePanelProps> = ({
  posts,
  activeCollectionTitle,
  onClearFilter,
  onOpenLightbox,
  isCollectionsCollapsed,
  onExpandCollections,
}) => {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950/20 transition-all duration-300">
      {/* Top Header of Timeline */}
      <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold">
              timeline
            </h2>
            <span className="text-zinc-500 font-mono text-xs">•</span>
            <span className="text-xs text-zinc-400 font-light">
              {activeCollectionTitle ? `filtered posts (${posts.length})` : 'with all the posts'}
            </span>
          </div>
          {activeCollectionTitle && (
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-mono">collection:</span>
              <span className="text-xs font-mono text-amber-300/90 font-medium">
                "{activeCollectionTitle}"
              </span>
              <button
                onClick={onClearFilter}
                className="text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-2 ml-2 transition-colors cursor-pointer"
              >
                show all posts
              </button>
            </div>
          )}
        </div>

        {/* Status / view meta */}
        <div className="flex items-center gap-3">
          {isCollectionsCollapsed && (
            <button
              onClick={onExpandCollections}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1 rounded-full transition-colors flex items-center gap-1.5"
            >
              <span>← expand collections</span>
            </button>
          )}
          <span className="text-xs font-mono text-zinc-400">
            {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
      </div>

      {/* Independently scrolling post feed */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="max-w-2xl mx-auto space-y-12">
          {posts.length === 0 ? (
            <div className="text-center py-24 space-y-3">
              <p className="font-mono text-sm text-zinc-400">No posts found in this collection.</p>
              <button
                onClick={onClearFilter}
                className="text-xs font-mono text-zinc-300 hover:text-white underline underline-offset-4"
              >
                Reset to see all posts →
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="group bg-zinc-900/40 border border-zinc-800/90 hover:border-zinc-700/80 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-sm"
              >
                {/* Header: Date + Location + Series Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-850">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-zinc-200 tracking-wider font-semibold">
                      {post.date}
                    </span>
                    <span className="text-zinc-600 text-xs">•</span>
                    <span className="text-xs font-mono text-zinc-400">{post.location}</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/80">
                    {post.collectionTitle}
                  </span>
                </div>

                {/* Placeholder Image Area */}
                <div
                  onClick={() =>
                    onOpenLightbox({
                      id: post.id,
                      title: post.collectionTitle,
                      label: post.imageLabel,
                      caption: post.caption,
                      date: post.date,
                      collectionTitle: post.collectionTitle,
                      location: post.location,
                      aspectRatio: post.aspectRatio,
                    })
                  }
                  className={`mt-4 w-full ${post.aspectRatio} max-h-[520px] rounded-xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800/80 group-hover:border-zinc-700 cursor-pointer overflow-hidden relative flex flex-col justify-between p-4 select-none transition-all duration-200`}
                >
                  {/* Image Placeholder Overlay Metadata */}
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>{post.imageLabel}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300">
                      open preview ↗
                    </span>
                  </div>

                  {/* Aesthetic placeholder center visual */}
                  <div className="my-auto flex flex-col items-center justify-center gap-2 opacity-40 group-hover:opacity-75 transition-opacity">
                    <div className="w-12 h-12 rounded-lg border border-dashed border-zinc-600 flex items-center justify-center text-zinc-400 font-mono text-sm">
                      ▣
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 tracking-wider">
                      PLACEHOLDER VISUAL
                    </span>
                  </div>

                  {/* Bottom visual specs */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>{post.location}</span>
                    <span>Click to inspect</span>
                  </div>

                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Post Caption Area */}
                <div className="mt-4 space-y-3">
                  <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                    {post.caption}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-zinc-400 hover:text-zinc-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
};
