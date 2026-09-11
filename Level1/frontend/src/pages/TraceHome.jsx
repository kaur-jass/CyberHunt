import React from 'react';
import {
  ScanSearch,
  ShieldCheck,
  ArrowRight,
  Fingerprint,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TraceHome() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center">
              <ScanSearch className="w-5 h-5 text-teal-700" />
            </div>

            <div>
              <div className="font-semibold tracking-tight">
                CYBER HUNT 2026
              </div>

              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                TRACE / LEVEL 01
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            SYSTEM ONLINE
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-5 py-12">

        {/* Hero */}
        <section className="max-w-3xl">

          <div className="flex items-center gap-2 text-teal-700 font-mono text-xs font-semibold mb-4">
            <Fingerprint className="w-4 h-4" />
            DIGITAL INVESTIGATION UNIT
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            TRACE
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Follow the evidence. Identify the signal. Find what was left behind.
          </p>

          <p className="mt-5 text-sm text-slate-600 leading-7 max-w-2xl">
            You have entered Level 1 of the Cyber Hunt. Every checkpoint
            contains a cybersecurity challenge. Solve the challenge correctly
            to unlock the next location.
          </p>

        </section>

        {/* Status */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
              <Activity className="w-3.5 h-3.5" />
              Level
            </div>

            <div className="mt-2 text-lg font-semibold">
              01 / TRACE
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
              <ScanSearch className="w-3.5 h-3.5" />
              Checkpoints
            </div>

            <div className="mt-2 text-lg font-semibold">
              05 Nodes
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              Access
            </div>

            <div className="mt-2 text-lg font-semibold text-teal-700">
              Restricted
            </div>
          </div>

        </section>

        {/* Instructions */}
        <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">

          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="font-semibold">
                Investigation Protocol
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Follow the sequence carefully.
              </p>
            </div>

            <span className="text-[10px] font-mono text-teal-700 bg-teal-50 border border-teal-200 px-2 py-1 rounded">
              ACTIVE
            </span>
          </div>

          <div className="mt-5 space-y-4">

            <div className="flex gap-4">
              <span className="text-xs font-mono text-teal-700">
                01
              </span>

              <p className="text-sm text-slate-600">
                Scan the QR code assigned to your route.
              </p>
            </div>

            <div className="flex gap-4">
              <span className="text-xs font-mono text-teal-700">
                02
              </span>

              <p className="text-sm text-slate-600">
                Analyze the cybersecurity challenge presented on the node.
              </p>
            </div>

            <div className="flex gap-4">
              <span className="text-xs font-mono text-teal-700">
                03
              </span>

              <p className="text-sm text-slate-600">
                Submit the correct flag to verify the investigation.
              </p>
            </div>

            <div className="flex gap-4">
              <span className="text-xs font-mono text-teal-700">
                04
              </span>

              <p className="text-sm text-slate-600">
                The next physical location will be revealed after successful verification.
              </p>
            </div>

          </div>

        </section>

        {/* Warning */}
        <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Important:</span>{' '}
            Do not share your Team ID or challenge answers with other teams.
            Your progress is tracked against your team.
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-6xl mx-auto px-5 py-5 flex justify-between text-[10px] font-mono text-slate-400">
          <span>CYBER HUNT 2026</span>
          <span>TRACE / LEVEL 01</span>
        </div>
      </footer>

    </div>
  );
}