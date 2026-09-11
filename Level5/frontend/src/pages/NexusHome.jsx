import React from 'react';
import {
  Network,
  ShieldCheck,
  Flag,
  Trophy,
  Activity,
  Target,
  LockKeyhole,
  CheckCircle2
} from 'lucide-react';

export default function NexusHome() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">

        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center">
              <Network className="w-5 h-5 text-cyan-700" />
            </div>

            <div>

              <div className="font-semibold tracking-tight">
                CYBER HUNT 2026
              </div>

              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                NEXUS / FINAL LEVEL
              </div>

            </div>

          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">

            <span className="w-2 h-2 rounded-full bg-cyan-500" />

            FINAL NODE ONLINE

          </div>

        </div>

      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-5 py-12">

        {/* Hero */}
        <section className="max-w-3xl">

          <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs font-semibold mb-4">

            <Target className="w-4 h-4" />

            FINAL DESTINATION

          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            NEXUS
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Every path ends here.
          </p>

          <p className="mt-5 text-sm text-slate-600 leading-7 max-w-2xl">
            You have followed the trail through multiple layers of the hunt.
            The routes have converged at the Nexus. One final challenge remains
            between your team and completion.
          </p>

        </section>

        {/* Status Cards */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white border border-slate-200 rounded-lg p-4">

            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">

              <Activity className="w-3.5 h-3.5" />

              Level

            </div>

            <div className="mt-2 text-lg font-semibold">
              05 / NEXUS
            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">

            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">

              <Network className="w-3.5 h-3.5" />

              Convergence

            </div>

            <div className="mt-2 text-lg font-semibold">
              05 → 01
            </div>

          </div>

          <div className="bg-white border border-cyan-200 rounded-lg p-4 bg-cyan-50/40">

            <div className="flex items-center gap-2 text-cyan-700 text-[10px] font-mono uppercase">

              <Flag className="w-3.5 h-3.5" />

              Final Status

            </div>

            <div className="mt-2 text-lg font-semibold text-cyan-700">
              UNRESOLVED
            </div>

          </div>

        </section>

        {/* Convergence Diagram */}
        <section className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">

            <div>

              <h2 className="font-semibold">
                Route Convergence
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                All discovered paths terminate at the same final node.
              </p>

            </div>

            <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-1 rounded">
              NEX-01

            </span>

          </div>

          <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

              {['A', 'B', 'C', 'D', 'E'].map((route) => (

                <div
                  key={route}
                  className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-center"
                >

                  <div className="text-[10px] font-mono text-slate-400">
                    ROUTE
                  </div>

                  <div className="mt-1 font-semibold text-slate-700">
                    {route}
                  </div>

                  <div className="mt-2 text-[10px] font-mono text-cyan-700">
                    ↓
                  </div>

                  <div className="text-[10px] font-mono text-cyan-700">
                    NEX-01
                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Final Mission */}
        <section className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="px-6 py-4 border-b border-slate-200">

            <div className="flex items-center gap-2">

              <ShieldCheck className="w-4 h-4 text-cyan-700" />

              <h2 className="font-semibold">
                Final Protocol
              </h2>

            </div>

            <p className="text-xs text-slate-400 mt-1">
              The final verification sequence.
            </p>

          </div>

          <div className="p-6 space-y-5">

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-cyan-700">
                01
              </div>

              <div>

                <div className="text-sm font-medium">
                  Identify the final vulnerability
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Analyze the final challenge presented by the Nexus.
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-cyan-700">
                02
              </div>

              <div>

                <div className="text-sm font-medium">
                  Recover the final flag
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Submit the correct flag using your registered Team ID.
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-cyan-700">
                03
              </div>

              <div>

                <div className="text-sm font-medium">
                  Complete the hunt
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  A successful submission marks your team's final completion time.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Completion Notice */}
        <div className="mt-5 flex gap-3 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">

          <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />

          <p className="text-xs text-cyan-800 leading-relaxed">

            <span className="font-semibold">
              Final Checkpoint:
            </span>{' '}
            Once the final flag is verified, your completion timestamp will
            be recorded for leaderboard ranking.

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
            NEXUS / FINAL LEVEL
          </span>

        </div>

      </footer>

    </div>
  );
}