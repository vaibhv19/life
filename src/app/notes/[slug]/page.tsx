import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Note Content */}
      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-5 sm:px-8 py-12 sm:py-20 select-none">
        {/* Navigation Return */}
        <div className="mb-8">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D7A781] hover:text-[#FFFDF7] transition-colors"
          >
            <span>←</span>
            <span>Return to Notes</span>
          </Link>
        </div>

        {/* Note Article Header */}
        <header className="border-b border-[#F8F4E7]/20 pb-8 mb-10">
          {note.formattedDate && (
            <div className="text-xs font-mono text-[#D7A781] uppercase tracking-wider mb-3 font-semibold">
              {note.formattedDate}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F4E7] leading-tight">
            {note.title}
          </h1>

          {note.summary && (
            <p className="text-base sm:text-lg text-[#F8F4E7]/80 mt-4 font-normal italic leading-relaxed">
              {note.summary}
            </p>
          )}
        </header>

        {/* Note Article Body */}
        <article className="space-y-6 text-base sm:text-lg text-[#F8F4E7]/90 leading-relaxed font-normal">
          {paragraphs.map((p, idx) => {
            if (p.startsWith('>')) {
              return (
                <blockquote
                  key={idx}
                  className="border-l-2 border-[#D7A781] pl-4 sm:pl-6 my-6 italic text-[#F8F4E7] bg-[#F8F4E7]/[0.03] py-2"
                >
                  {p.replace(/^>\s*/, '')}
                </blockquote>
              );
            }
            if (p.startsWith('# ')) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-[#F8F4E7] pt-4">
                  {p.replace(/^#\s*/, '')}
                </h2>
              );
            }
            if (p.startsWith('## ')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-[#F8F4E7] pt-3">
                  {p.replace(/^##\s*/, '')}
                </h3>
              );
            }
            return <p key={idx}>{p}</p>;
          })}
        </article>

        {/* Note Footer Colophon */}
        <div className="pt-12 mt-16 border-t border-[#F8F4E7]/15 flex items-center justify-between text-xs text-[#F8F4E7]/50 font-mono">
          <span>END OF NOTE</span>
          <Link
            href="/notes"
            className="text-[#D7A781] hover:text-[#FFFDF7] transition-colors font-sans font-semibold"
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
