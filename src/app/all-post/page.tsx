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

      {/* 02. Visual Archive Content */}
      <main className="flex-1 flex flex-col content-container pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16 select-none">
        {/* Editorial Section Header */}
        <header className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#226192]">
            All Post
          </h1>
        </header>

        {/* Visual Archive Image Grid */}
        <AllPostClient posts={posts} />
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
