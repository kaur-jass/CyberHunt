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
          challengeTitle="The False Trail"
          category="Log Analysis"
          difficulty="Hard"

          description={
            <>
              <div className="space-y-4">

                <div className="font-semibold text-slate-900">
                  NIT Jalandhar SOC — Authentication Investigation
                </div>

                <p>
                  The SOC detected suspicious activity on the student
                  portal during the early hours of the morning.
                </p>

                <p>
                  Investigators recovered an authentication log containing
                  hundreds of normal login events. Somewhere inside the
                  noise is the trail left by the intruder.
                </p>

                <p>
                  The attacker successfully established a session after
                  multiple failed authentication attempts.
                </p>

                <p className="font-semibold text-slate-900">
                  Identify the suspicious session and recover its session ID.
                </p>

                <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Investigation Objective
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">
                    Find the unusual external source, trace its
                    authentication activity, and identify the session
                    associated with the intrusion.
                  </div>

                </div>

                <div className="border border-violet-200 rounded-lg bg-violet-50/50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Evidence
                  </div>

                  <a
                    href="/auth.log"
                    download="auth.log"
                    className="inline-flex items-center mt-2 text-xs font-mono text-violet-700 hover:text-violet-900 underline underline-offset-2"
                  >
                    Download auth.log
                  </a>

                </div>

              </div>
            </>
          }

          hint="Do not inspect the file manually line by line. Use Termux tools such as grep, sort and uniq to filter the authentication events and trace the suspicious source."

          nextNode="PHM-B"
        />

      </main>

    </div>
  );
}