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

            <div className="text-[10px] font-mono text-rose-700 mt-1">
              BREACH / NODE BRH-E
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
          routeCode="E"
          nodeId="BRH-E"
          challengeTitle="Injection Point"
          category="Application Security"
          difficulty="Hard"
          description="A controlled application processes user-supplied input in an unexpected way. Study the application's behavior and identify the vulnerable input path."
          hint="Whenever external input reaches an interpreter, ask exactly how that input is being handled."
          nextNode="PHM-E"
        />

      </main>

    </div>
  );
}