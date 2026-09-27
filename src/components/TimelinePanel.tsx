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
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950">
      {/* Timeline Header */}
      <div className="sticky top-0 z-10 bg-zinc-950 px-6 sm:px-8 py-4 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            timeline
          </h2>
          <span className="text-zinc-700 text-xs">/</span>
          <span className="text-xs text-zinc-500 font-mono">
            {activeCollectionTitle ? `filtered (${posts.length})` : `all posts (${posts.length})`}
          </span>
          {activeCollectionTitle && (
            <button
              onClick={onClearFilter}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-200 underline underline-offset-2 ml-2 transition-colors"
            >
              show all
            </button>
          )}
        </div>

        {/* View meta */}
        <div className="flex items-center gap-3">
          {isCollectionsCollapsed && (
            <button
              onClick={onExpandCollections}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              ← collections
            </button>
          )}
        </div>
      </div>

      {/* Independently scrolling timeline feed */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="max-w-xl mx-auto space-y-16">
          {posts.length === 0 ? (
            <div className="py-20 space-y-2">
              <p className="font-mono text-xs text-zinc-500">no posts in this collection.</p>
              <button
                onClick={onClearFilter}
                className="text-xs font-mono text-zinc-400 hover:text-zinc-200 underline underline-offset-4"
              >
                reset filter →
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="space-y-4 pb-12 border-b border-zinc-900 last:border-b-0"
              >
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-300">{post.date}</span>
                    <span className="text-zinc-700">•</span>
                    <span>{post.location}</span>
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    {post.collectionTitle}
                  </span>
                </div>

                {/* Media frame */}
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
                  className={`w-full ${post.aspectRatio} rounded bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer overflow-hidden p-4 flex flex-col justify-between transition-colors`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600">
                    <span>{post.collectionTitle}</span>
                    <span>{post.location}</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono">
                    {post.date}
                  </div>
                </div>

                {/* Caption */}
                <div className="space-y-2">
                  <p className="text-sm text-zinc-300 font-normal leading-relaxed">
                    {post.caption}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-zinc-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
};
