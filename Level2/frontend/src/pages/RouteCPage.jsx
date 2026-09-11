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

            <div className="text-[10px] font-mono text-rose-700 mt-1">
              BREACH / NODE BRH-C
            </div>

          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            LEVEL 02
          </div>

        </div>

      </header>

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">

        <ChallengeCard
          routeCode="C"
          nodeId="BRH-C"
          challengeTitle="Header Manipulation"
          category="HTTP Security"
          difficulty="Medium"
          description="A server response changes when specific request metadata is modified. Determine which piece of information influences the application's security decision."
          hint="HTTP headers can carry more than content preferences. Some applications make security decisions based on them."
          nextNode="PHM-C"
        />

      </main>

    </div>
  );
}