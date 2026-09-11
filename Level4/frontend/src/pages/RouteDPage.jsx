import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteDPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <header className="border-b border-slate-200 bg-white">

        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">

          <div>

            <div className="font-semibold text-slate-900">
              CYBER HUNT 2026
            </div>

            <div className="text-[10px] font-mono text-amber-700 mt-1">
              ZERO DAY / NODE ZDY-D
            </div>

          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">

            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />

            LEVEL 04

          </div>

        </div>

      </header>

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">

        <ChallengeCard
          routeCode="D"
          nodeId="ZDY-D"
          challengeTitle="Chain of Trust"
          category="Security Architecture"
          difficulty="Hard"
          description="A trusted component in a fictional infrastructure has started behaving unexpectedly. Analyze the trust relationships and identify where the chain breaks."
          hint="Trust is only as strong as the weakest component inside the chain."
          nextNode="NEX-01"
        />

      </main>

    </div>
  );
}