import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteCPage() {
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
          routeCode="C"
          nodeId="NEX-01"
          challengeTitle="The Missing Link"
          category="Incident Correlation"
          difficulty="Expert"
          description="The investigation is almost complete. One connection remains hidden between the evidence collected throughout the hunt. Identify that connection and recover the final flag."
          hint="When independent clues point to the same destination, the relationship between them becomes the evidence."
          nextNode="COMPLETE"
        />

      </main>

    </div>
  );
}