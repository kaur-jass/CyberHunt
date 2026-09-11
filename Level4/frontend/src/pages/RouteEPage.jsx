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

            <div className="text-[10px] font-mono text-amber-700 mt-1">
              ZERO DAY / NODE ZDY-E
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
          routeCode="E"
          nodeId="ZDY-E"
          challengeTitle="Critical Exposure"
          category="Incident Response"
          difficulty="Hard"
          description="A simulated incident has exposed a critical weakness in an internal system. Analyze the incident timeline and identify the event that allowed the compromise."
          hint="The first visible compromise is not always the beginning of the attack."
          nextNode="NEX-01"
        />

      </main>

    </div>
  );
}