import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteEPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <header className="border-b border-slate-200 bg-white">

        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">

          <div>

            <div className="font-semibold text-slate-900">
              CYBER HUNT 2026
            </div>

            <div className="text-[10px] font-mono text-cyan-700 mt-1">
              NEXUS / FINAL NODE NEX-01
            </div>

          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">

            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />

            FINAL LEVEL

          </div>

        </div>

      </header>

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">

        <ChallengeCard
          routeCode="E"
          nodeId="NEX-01"
          challengeTitle="End of the Trail"
          category="Cyber Investigation"
          difficulty="Expert"
          description="The final checkpoint contains one last piece of evidence. Everything you have discovered has led here. Solve the final investigation and recover the flag."
          hint="The journey itself was part of the puzzle. Revisit what you already know."
          nextNode="COMPLETE"
        />

      </main>

    </div>
  );
}