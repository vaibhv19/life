import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getArchivePosts } from '@/lib/posts';
import { AllPostClient } from '@/components/AllPostClient';

export const metadata: Metadata = {
  title: 'All Post — life.vaibhv19.dev',
  description: 'The master chronological archive of photographs and visual memories.',
};

export const dynamic = 'force-dynamic';

export default function AllPostPage() {
  const posts = getArchivePosts();

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#226192] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Chronological Visual Archive Content */}
      <main className="flex-1 flex flex-col content-container py-12 sm:py-16">
        {/* Editorial Section Header */}
        <header className="mb-10 sm:mb-12 border-b border-[#EF8557]/25 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#226192]">
                All Post
              </h1>
              <p className="text-xs sm:text-sm text-[#226192]/80 mt-2.5 max-w-2xl font-normal leading-relaxed">
                The complete chronological archive of personal entries, moments, and longer-form records gathered over time. Kept in continuous order, this stream brings together everyday frames, milestone dates, and personal entries as an unbroken record of living.
              </p>
            </div>

            <div className="text-xs text-[#226192]/60 font-mono shrink-0">
              {posts.length} {posts.length === 1 ? 'entry recorded' : 'entries recorded'}
            </div>
          </div>
        </header>

        {/* Chronological Grid Stream */}
        <AllPostClient posts={posts} />
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
