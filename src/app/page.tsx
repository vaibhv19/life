import React from 'react';

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-between p-6 sm:p-12 relative overflow-hidden font-sans select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Domain Pill */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span>life.vaibhv19.dev</span>
        </div>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
          coming soon
        </span>
      </header>

      {/* Center Hero Block */}
      <section className="my-auto text-center space-y-6 max-w-xl z-10 px-4">
        <div className="inline-block px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono tracking-widest uppercase text-zinc-400">
          [ IN DEVELOPMENT ]
        </div>

        <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
          Life is coming soon.
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
          A personal space for the things that exist outside the code.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 bg-zinc-800" />
          <span className="text-sm font-mono text-zinc-300 tracking-wider">
            — Vaibhav Gupta
          </span>
          <span className="h-[1px] w-8 bg-zinc-800" />
        </div>
      </section>

      {/* Bottom Minimal Footer */}
      <footer className="w-full max-w-4xl text-center text-xs font-mono text-zinc-400 z-10 pt-8">
        <span>© 2025 vaibhv19.dev • All rights reserved.</span>
      </footer>
    </main>
  );
}
