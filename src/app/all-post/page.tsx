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
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Chronological Visual Archive Content */}
      <main className="flex-1 flex flex-col max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20">
        {/* Editorial Section Header */}
        <header className="mb-12 sm:mb-16 border-b border-[#F8F4E7]/20 pb-8">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-2">
            <span>VISUAL ARCHIVE</span>
            <span className="text-[#F8F4E7]/40">{'//'}</span>
            <span>CHRONOLOGICAL STREAM</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F4E7]">
                All Post
              </h1>
              <p className="text-xs sm:text-sm text-[#F8F4E7]/70 mt-2 max-w-xl font-normal leading-relaxed">
                The master chronological record of moments, dates, and unhurried frames.
              </p>
            </div>

            <div className="text-xs text-[#F8F4E7]/60 font-mono">
              TOTAL: <span className="text-[#D7A781] font-bold">{posts.length}</span> {posts.length === 1 ? 'PHOTOGRAPH' : 'PHOTOGRAPHS'}
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
