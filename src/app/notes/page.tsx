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
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#F8F4E7] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Notes Index Content */}
      <main className="flex-1 flex flex-col max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20 select-none">
        {/* Editorial Section Header */}
        <header className="mb-12 sm:mb-16 border-b border-[#F8F4E7]/20 pb-8">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-2 font-mono">
            <span>WRITTEN ARCHIVE</span>
            <span className="text-[#F8F4E7]/40">{'//'}</span>
            <span>THOUGHTS & OBSERVATIONS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F4E7]">
                Notes
              </h1>
              <p className="text-xs sm:text-sm text-[#F8F4E7]/70 mt-2 max-w-xl font-normal leading-relaxed">
                A quiet place for written thoughts, short reflections, longer writing, and things to remember.
              </p>
            </div>

            <div className="text-xs text-[#F8F4E7]/60 font-mono">
              {notes.length} {notes.length === 1 ? 'NOTE RECORDED' : 'NOTES RECORDED'}
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        {notes.length === 0 ? (
          <div className="w-full py-20 px-4 text-center">
            <div
              className="max-w-md mx-auto border border-dashed border-[#F8F4E7]/25 p-10 sm:p-14"
              style={{ borderRadius: '18px 4px 18px 4px' }}
            >
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#D7A781] mb-3 font-mono">
                EMPTY NOTEBOOK
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8F4E7] mb-3">
                No entries published yet.
              </h2>
              <p className="text-xs sm:text-sm text-[#F8F4E7]/70 leading-relaxed font-normal">
                This space is reserved for quiet thoughts, observations, and fragments.
                Notes placed in <code className="text-[#D7A781] font-mono">content/notes/*.md</code> will appear here automatically.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[#F8F4E7]/15 max-w-4xl">
            {notes.map((note) => (
              <article key={note.slug} className="py-8 first:pt-0 last:pb-0">
                <Link
                  href={`/notes/${note.slug}`}
                  className="group block space-y-2.5 transition-colors"
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-[#D7A781]">
                    {note.formattedDate && <span>{note.formattedDate}</span>}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#F8F4E7] group-hover:text-[#FFFDF7] tracking-tight transition-colors">
                    {note.title}
                  </h2>

                  {note.summary && (
                    <p className="text-sm text-[#F8F4E7]/75 font-normal leading-relaxed line-clamp-2">
                      {note.summary}
                    </p>
                  )}

                  <div className="pt-2 text-xs font-semibold text-[#D7A781] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
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
