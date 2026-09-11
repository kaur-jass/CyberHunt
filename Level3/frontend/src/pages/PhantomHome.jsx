import React from 'react';
import {
  Ghost,
  ScanSearch,
  Fingerprint,
  EyeOff,
  FileSearch,
  Activity,
  ShieldCheck
} from 'lucide-react';

export default function PhantomHome() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center">
              <Ghost className="w-5 h-5 text-violet-700" />
            </div>

            <div>
              <div className="font-semibold tracking-tight">
                CYBER HUNT 2026
              </div>

              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                PHANTOM / LEVEL 03
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            HIDDEN DATA SCAN ACTIVE
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-5 py-12">

        {/* Hero */}
        <section className="max-w-3xl">

          <div className="flex items-center gap-2 text-violet-700 font-mono text-xs font-semibold mb-4">
            <EyeOff className="w-4 h-4" />
            DIGITAL FORENSICS UNIT
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            PHANTOM
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Not everything hidden is invisible.
          </p>

          <p className="mt-5 text-sm text-slate-600 leading-7 max-w-2xl">
            Level 3 takes you beyond the obvious. Investigate files, identify
            concealed information, decode hidden patterns and uncover evidence
            that was never meant to be seen.
          </p>

        </section>

        {/* Stats */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white border border-slate-200 rounded-lg p-4">

            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
              <Activity className="w-3.5 h-3.5" />
              Level
            </div>

            <div className="mt-2 text-lg font-semibold">
              03 / PHANTOM
            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">

            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
              <FileSearch className="w-3.5 h-3.5" />
              Evidence Nodes
            </div>

            <div className="mt-2 text-lg font-semibold">
              05 Nodes
            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">

            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              Visibility
            </div>

            <div className="mt-2 text-lg font-semibold text-violet-700">
              Restricted
            </div>

          </div>

        </section>

        {/* Investigation Brief */}
        <section className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">

            <div>
              <h2 className="font-semibold">
                Phantom Protocol
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Search where others stop looking.
              </p>
            </div>

            <span className="text-[10px] font-mono text-violet-700 bg-violet-50 border border-violet-200 px-2 py-1 rounded">
              FORENSICS ACTIVE
            </span>

          </div>

          <div className="p-6 space-y-5">

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-violet-700">
                01
              </div>

              <div>
                <div className="text-sm font-medium">
                  Inspect the evidence
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Examine every piece of information available at the node.
                </p>
              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-violet-700">
                02
              </div>

              <div>
                <div className="text-sm font-medium">
                  Find what is hidden
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Look for concealed data, unusual patterns or overlooked clues.
                </p>
              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-violet-700">
                03
              </div>

              <div>
                <div className="text-sm font-medium">
                  Recover the flag
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Submit the recovered flag to unlock the next checkpoint.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Warning */}
        <div className="mt-5 flex gap-3 p-4 bg-violet-50 border border-violet-200 rounded-lg">

          <Fingerprint className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />

          <p className="text-xs text-violet-800 leading-relaxed">
            <span className="font-semibold">
              Forensic Notice:
            </span>{' '}
            Some evidence may contain information that is intentionally
            concealed. Examine the available material carefully before
            submitting your answer.
          </p>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-10">

        <div className="max-w-6xl mx-auto px-5 py-5 flex justify-between text-[10px] font-mono text-slate-400">

          <span>
            CYBER HUNT 2026
          </span>

          <span>
            PHANTOM / LEVEL 03
          </span>

        </div>

      </footer>

    </div>
  );
}