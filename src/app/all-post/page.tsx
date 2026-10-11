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
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#1546D9] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Chronological Visual Archive Content */}
      <main className="flex-1 flex flex-col content-container py-12 sm:py-16">
        {/* Editorial Section Header */}
        <header className="mb-10 sm:mb-12 border-b border-[#1546D9]/20 pb-6 sm:pb-8">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#F9B318] mb-2 font-mono">
            <span>VISUAL ARCHIVE</span>
            <span className="text-[#1546D9]/40">{'//'}</span>
            <span>CHRONOLOGICAL STREAM</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1546D9]">
                All Post
              </h1>
              <p className="text-xs sm:text-sm text-[#1546D9]/70 mt-2 max-w-xl font-normal leading-relaxed">
                The master chronological record of moments, dates, and unhurried frames.
              </p>
            </div>

            <div className="text-xs text-[#1546D9]/60 font-mono">
              TOTAL: <span className="text-[#F9B318] font-bold">{posts.length}</span> {posts.length === 1 ? 'PHOTOGRAPH' : 'PHOTOGRAPHS'}
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
