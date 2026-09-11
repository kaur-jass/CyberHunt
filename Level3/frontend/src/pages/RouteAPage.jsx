import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteAPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <header className="border-b border-slate-200 bg-white">

        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">

          <div>

            <div className="font-semibold text-slate-900">
              CYBER HUNT 2026
            </div>

            <div className="text-[10px] font-mono text-violet-700 mt-1">
              PHANTOM / NODE PHM-A
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
          routeCode="A"
          nodeId="PHM-A"
          challengeTitle="The Invisible Layer"
          category="Steganography"
          difficulty="Medium"
          description="An ordinary-looking piece of digital evidence was recovered during the investigation. Something appears to be missing from plain sight. Recover the concealed information."
          hint="What you see is only one layer of the evidence."
          nextNode="ZDY-A"
        />

      </main>

    </div>
  );
}