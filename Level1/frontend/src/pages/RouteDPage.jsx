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

            <div className="text-[10px] font-mono text-teal-700 mt-1">
              TRACE / NODE TRC-D
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400">
            LEVEL 01
          </div>

        </div>
      </header>

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">

        <ChallengeCard
          routeCode="D"
          challengeTitle="Packet 17"
          category="Network Analysis"
          difficulty="Medium"
          description="A short packet capture was recovered from a suspicious connection. Something within the communication does not belong."
          hint="Look beyond the obvious traffic. Timing and protocol behavior may tell you more."
          nextNode="TRC-D"
        />

      </main>

    </div>
  );
}