import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LikeButton } from '@/components/LikeButton';
import { getNoteBySlug, getAllNotes } from '@/lib/notes';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((n) => ({
    slug: n.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    return { title: 'Note Not Found — life.vaibhv19.dev' };
  }

  return {
    title: `${note.title} — Notes — life.vaibhv19.dev`,
    description: note.summary || `A note written on ${note.formattedDate || 'archive'}.`,
  };
}

export default async function IndividualNotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  // Format paragraphs from markdown content
  const paragraphs = note.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#1546D9] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Note Content */}
      <main className="flex-1 flex flex-col content-container py-12 sm:py-16 select-none">
        {/* Navigation Return */}
        <div className="mb-8">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#F9B318] hover:text-[#2E5DE8] transition-colors"
          >
            <span>←</span>
            <span>Return to Notes</span>
          </Link>
        </div>

        {/* Note Article Header */}
        <header className="border-b border-[#1546D9]/20 pb-8 mb-10">
          {note.formattedDate && (
            <div className="text-xs font-mono text-[#F9B318] uppercase tracking-wider mb-3 font-semibold">
              {note.formattedDate}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1546D9] leading-tight">
            {note.title}
          </h1>

          {note.summary && (
            <p className="text-base sm:text-lg text-[#1546D9]/80 mt-4 font-normal italic leading-relaxed">
              {note.summary}
            </p>
          )}
        </header>

        {/* Note Article Body */}
        <article className="space-y-6 text-base sm:text-lg text-[#1546D9]/90 leading-relaxed font-normal">
          {paragraphs.map((p, idx) => {
            if (p.startsWith('>')) {
              return (
                <blockquote
                  key={idx}
                  className="border-l-2 border-[#F9B318] pl-4 sm:pl-6 my-6 italic text-[#1546D9] bg-[#1546D9]/[0.03] py-2"
                >
                  {p.replace(/^>\s*/, '')}
                </blockquote>
              );
            }
            if (p.startsWith('# ')) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-[#1546D9] pt-4">
                  {p.replace(/^#\s*/, '')}
                </h2>
              );
            }
            if (p.startsWith('## ')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-[#1546D9] pt-3">
                  {p.replace(/^##\s*/, '')}
                </h3>
              );
            }
            return <p key={idx}>{p}</p>;
          })}
        </article>

        {/* Understated Like Component */}
        <div className="pt-10">
          <LikeButton itemId={`note_${slug}`} itemType="note" />
        </div>

        {/* Note Footer Colophon */}
        <div className="pt-8 mt-12 border-t border-[#1546D9]/15 flex items-center justify-between text-xs text-[#1546D9]/50 font-mono">
          <span>END OF NOTE</span>
          <Link
            href="/notes"
            className="text-[#F9B318] hover:text-[#2E5DE8] transition-colors font-sans font-semibold"
          >
            ← Back to Notes index
          </Link>
        </div>
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
