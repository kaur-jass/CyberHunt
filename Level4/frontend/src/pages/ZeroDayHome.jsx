import React from 'react';
import {
  ShieldX,
  Bug,
  AlertTriangle,
  Activity,
  Server,
  LockKeyhole,
  Target
} from 'lucide-react';

export default function ZeroDayHome() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <ShieldX className="w-5 h-5 text-amber-700" />
            </div>

            <div>
              <div className="font-semibold tracking-tight">
                CYBER HUNT 2026
              </div>

              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                ZERO DAY / LEVEL 04
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">

            <span className="w-2 h-2 rounded-full bg-amber-500" />

            CRITICAL EVENT ACTIVE

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-5 py-12">

        {/* Hero */}
        <section className="max-w-3xl">

          <div className="flex items-center gap-2 text-amber-700 font-mono text-xs font-semibold mb-4">

            <AlertTriangle className="w-4 h-4" />

            THREAT INTELLIGENCE UNIT

          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            ZERO DAY
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            The vulnerability has no patch. You have one chance to find it.
          </p>

          <p className="mt-5 text-sm text-slate-600 leading-7 max-w-2xl">
            Level 4 is the final technical checkpoint before the Nexus.
            Investigate complex attack scenarios, correlate evidence and
            identify weaknesses before the trail disappears.
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
              04 / ZERO DAY
            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">

            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
              <Server className="w-3.5 h-3.5" />
              Attack Surface
            </div>

            <div className="mt-2 text-lg font-semibold">
              05 Nodes
            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">

            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
              <Target className="w-3.5 h-3.5" />
              Threat Level
            </div>

            <div className="mt-2 text-lg font-semibold text-amber-700">
              CRITICAL
            </div>

          </div>

        </section>

        {/* Mission Brief */}
        <section className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">

            <div>

              <h2 className="font-semibold">
                Zero Day Protocol
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Analyze. Correlate. Identify.
              </p>

            </div>

            <span className="text-[10px] font-mono text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded">
              CVE STATUS: UNPATCHED
            </span>

          </div>

          <div className="p-6 space-y-5">

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-amber-700">
                01
              </div>

              <div>

                <div className="text-sm font-medium">
                  Analyze the attack surface
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Examine the information available at your assigned node.
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-amber-700">
                02
              </div>

              <div>

                <div className="text-sm font-medium">
                  Correlate the evidence
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Connect the technical clues and identify the underlying weakness.
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-amber-700">
                03
              </div>

              <div>

                <div className="text-sm font-medium">
                  Recover the final route key
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  A correct flag unlocks the final physical checkpoint.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Warning */}
        <div className="mt-5 flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">

          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />

          <p className="text-xs text-amber-800 leading-relaxed">

            <span className="font-semibold">
              Critical Notice:
            </span>{' '}
            This level contains advanced but controlled cybersecurity
            challenges. All systems and scenarios are fictional and isolated
            for the competition.

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
            ZERO DAY / LEVEL 04
          </span>

        </div>

      </footer>

    </div>
  );
}