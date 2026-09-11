import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteBPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">

          <div>
            <div className="font-semibold text-slate-900">
              CYBER HUNT 2026
            </div>

            <div className="text-[10px] font-mono text-teal-700 mt-1">
              TRACE / NODE TRC-B
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400">
            LEVEL 01
          </div>

        </div>
      </header>

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">

        <ChallengeCard
          routeCode="B"
          challengeTitle="Residual Evidence"
          category="Metadata Analysis"
          difficulty="Easy"
          description="A file recovered from a compromised workstation appears harmless at first glance. Inspect its available information and determine what it reveals."
          hint="Files can reveal more about their origin than their contents suggest."
          nextNode="TRC-B"
        />

      </main>

    </div>
  );
}