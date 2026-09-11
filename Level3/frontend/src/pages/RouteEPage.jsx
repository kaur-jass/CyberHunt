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

            <div className="text-[10px] font-mono text-violet-700 mt-1">
              PHANTOM / NODE PHM-E
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
          routeCode="E"
          nodeId="PHM-E"
          challengeTitle="The Phantom Signature"
          category="Digital Analysis"
          difficulty="Hard"
          description="A digital artifact contains a signature that does not immediately belong to the visible data. Investigate the artifact and identify what the hidden signature points toward."
          hint="A digital artifact can reveal its history through information that was never meant to be part of the visible content."
          nextNode="ZDY-E"
        />

      </main>

    </div>
  );
}