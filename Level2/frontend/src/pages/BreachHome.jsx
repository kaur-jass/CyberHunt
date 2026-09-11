import React from 'react';
import {
  ShieldAlert,
  Bug,
  LockKeyhole,
  Activity,
  ArrowRight,
  Server
} from 'lucide-react';

export default function BreachHome() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-700" />
            </div>

            <div>
              <div className="font-semibold tracking-tight">
                CYBER HUNT 2026
              </div>

              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                BREACH / LEVEL 02
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            THREAT MONITORING ACTIVE
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-5 py-12">

        {/* Hero */}
        <section className="max-w-3xl">

          <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-semibold mb-4">
            <Bug className="w-4 h-4" />
            VULNERABILITY ASSESSMENT UNIT
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            BREACH
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Find the weakness. Understand the breach. Take control.
          </p>

          <p className="mt-5 text-sm text-slate-600 leading-7 max-w-2xl">
            Level 2 moves deeper into the attack surface. Analyze vulnerable
            systems, inspect suspicious behavior and identify the weakness
            hidden inside each challenge.
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
              02 / BREACH
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
              <LockKeyhole className="w-3.5 h-3.5" />
              Security
            </div>

            <div className="mt-2 text-lg font-semibold text-rose-700">
              Compromised
            </div>

          </div>

        </section>

        {/* Mission Brief */}
        <section className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden">

          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">

            <div>
              <h2 className="font-semibold">
                Breach Protocol
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Identify the weakness before moving forward.
              </p>
            </div>

            <span className="text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded">
              THREAT LEVEL: ACTIVE
            </span>

          </div>

          <div className="p-6 space-y-5">

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-rose-700">
                01
              </div>

              <div>
                <div className="text-sm font-medium">
                  Locate the vulnerability
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Analyze the evidence presented at the current node.
                </p>
              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-rose-700">
                02
              </div>

              <div>
                <div className="text-sm font-medium">
                  Exploit the weakness
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  Use your cybersecurity knowledge to determine the required answer.
                </p>
              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-7 h-7 shrink-0 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono text-rose-700">
                03
              </div>

              <div>
                <div className="text-sm font-medium">
                  Submit the flag
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-5">
                  A correct flag unlocks the next physical checkpoint.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Warning */}
        <div className="mt-5 flex gap-3 p-4 bg-rose-50 border border-rose-200 rounded-lg">

          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />

          <p className="text-xs text-rose-800 leading-relaxed">
            <span className="font-semibold">
              Security Notice:
            </span>{' '}
            This level contains controlled cybersecurity challenges.
            Do not attempt to interact with real-world systems or services.
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
            BREACH / LEVEL 02
          </span>

        </div>

      </footer>

    </div>
  );
}