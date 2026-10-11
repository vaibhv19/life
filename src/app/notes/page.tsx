import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllNotes } from '@/lib/notes';

export const metadata: Metadata = {
  title: 'Notes — life.vaibhv19.dev',
  description: 'A repository for written thoughts, observations, reflections, and fragments.',
};

export const dynamic = 'force-dynamic';

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#1546D9] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Notes Index Content */}
      <main className="flex-1 flex flex-col content-container py-12 sm:py-16 select-none">
        {/* Editorial Section Header */}
        <header className="mb-10 sm:mb-12 border-b border-[#1546D9]/20 pb-6 sm:pb-8">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#F9B318] mb-2 font-mono">
            <span>WRITTEN ARCHIVE</span>
            <span className="text-[#1546D9]/40">{'//'}</span>
            <span>THOUGHTS & OBSERVATIONS</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1546D9]">
                Notes
              </h1>
              <p className="text-xs sm:text-sm text-[#1546D9]/70 mt-2 max-w-xl font-normal leading-relaxed">
                A quiet place for written thoughts, short reflections, longer writing, and things to remember.
              </p>
            </div>

            <div className="text-xs text-[#1546D9]/60 font-mono">
              {notes.length} {notes.length === 1 ? 'NOTE RECORDED' : 'NOTES RECORDED'}
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        {notes.length === 0 ? (
          <div className="w-full py-20 px-4 text-center">
            <div
              className="max-w-md mx-auto border border-dashed border-[#1546D9]/25 p-10 sm:p-14"
              style={{ borderRadius: '18px 4px 18px 4px' }}
            >
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#F9B318] mb-3 font-mono">
                EMPTY NOTEBOOK
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1546D9] mb-3">
                No entries published yet.
              </h2>
              <p className="text-xs sm:text-sm text-[#1546D9]/70 leading-relaxed font-normal">
                This space is reserved for quiet thoughts, observations, and fragments.
                Notes placed in <code className="text-[#F9B318] font-mono">content/notes/*.md</code> will appear here automatically.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[#1546D9]/15 w-full">
            {notes.map((note) => (
              <article key={note.slug} className="py-8 first:pt-0 last:pb-0">
                <Link
                  href={`/notes/${note.slug}`}
                  className="group block space-y-2.5 transition-colors"
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-[#F9B318]">
                    {note.formattedDate && <span>{note.formattedDate}</span>}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1546D9] group-hover:text-[#2E5DE8] tracking-tight transition-colors">
                    {note.title}
                  </h2>

                  {note.summary && (
                    <p className="text-sm text-[#1546D9]/75 font-normal leading-relaxed line-clamp-2">
                      {note.summary}
                    </p>
                  )}

                  <div className="pt-2 text-xs font-semibold text-[#F9B318] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read entry →
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* 03. Global Footer */}
      <Footer />
    </div>
  );
}
