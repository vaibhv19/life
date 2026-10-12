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
    <div className="flex flex-col min-h-screen w-full bg-transparent text-[#226192] antialiased">
      {/* 01. Global Editorial Header */}
      <Header />

      {/* 02. Notes Index Content */}
      <main className="flex-1 flex flex-col content-container py-12 sm:py-16 select-none">
        {/* Editorial Section Header */}
        <header className="mb-10 sm:mb-12 border-b border-[#EF8557]/25 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#226192]">
                Notes
              </h1>
              <p className="text-xs sm:text-sm text-[#226192]/80 mt-2.5 max-w-2xl font-normal leading-relaxed">
                A quiet place for written thoughts, short observations, and personal reflections. Unlike structured projects or technical documentation, this notebook collects passing impressions, personal notes to self, and fragments worth writing down as they occur.
              </p>
            </div>

            <div className="text-xs text-[#226192]/60 font-mono shrink-0">
              {notes.length} {notes.length === 1 ? 'note recorded' : 'notes recorded'}
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        {notes.length === 0 ? (
          <div className="w-full py-16 sm:py-20 text-center">
            <div
              className="max-w-md mx-auto border border-dashed border-[#226192]/25 p-8 sm:p-12"
              style={{ borderRadius: '18px 4px 18px 4px' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#226192] mb-2.5">
                No notes published yet
              </h2>
              <p className="text-xs sm:text-sm text-[#226192]/70 leading-relaxed font-normal">
                This space is reserved for short written thoughts, observations, and reflections. Entries will appear here as they are written down.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[#226192]/15 w-full">
            {notes.map((note) => (
              <article key={note.slug} className="py-8 first:pt-0 last:pb-0">
                <Link
                  href={`/notes/${note.slug}`}
                  className="group block space-y-2.5 transition-colors"
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-[#EF8557]">
                    {note.formattedDate && <span>{note.formattedDate}</span>}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#226192] group-hover:text-[#2C7BB8] tracking-tight transition-colors">
                    {note.title}
                  </h2>

                  {note.summary && (
                    <p className="text-sm text-[#226192]/75 font-normal leading-relaxed line-clamp-2">
                      {note.summary}
                    </p>
                  )}

                  <div className="pt-2 text-xs font-semibold text-[#EF8557] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
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
