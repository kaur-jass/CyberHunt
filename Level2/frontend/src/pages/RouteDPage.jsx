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

            <div className="text-[10px] font-mono text-rose-700 mt-1">
              BREACH / NODE BRH-D
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
          routeCode="D"
          nodeId="BRH-D"
          challengeTitle="The Weak Credential"
          category="Authentication"
          difficulty="Hard"
          description="An isolated training system contains an authentication weakness. Analyze the provided information and determine the credential-related flaw."
          hint="Strong passwords cannot compensate for a fundamentally weak authentication design."
          nextNode="PHM-D"
        />

      </main>

    </div>
  );
}