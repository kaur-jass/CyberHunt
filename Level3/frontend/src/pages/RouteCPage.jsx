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

            <div className="text-[10px] font-mono text-violet-700 mt-1">
              PHANTOM / NODE PHM-C
            </div>

          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            LEVEL 03
          </div>

        </div>

      </header>

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">

        <ChallengeCard
          routeCode="C"
          nodeId="PHM-C"
          challengeTitle="Fragments of Silence"
          category="Data Recovery"
          difficulty="Hard"
          description="Several fragments of information were recovered from a damaged digital record. Reconstruct the original sequence and determine what the fragments reveal."
          hint="Individual fragments may appear meaningless until they are placed in the correct order."
          nextNode="ZDY-C"
        />

      </main>

    </div>
  );
}