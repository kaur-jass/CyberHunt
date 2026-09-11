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

            <div className="text-[10px] font-mono text-violet-700 mt-1">
              PHANTOM / NODE PHM-D
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
          routeCode="D"
          nodeId="PHM-D"
          challengeTitle="The Token Knows"
          category="Web Security"
          difficulty="Hard"

          description={
            <>
              <div className="space-y-4">

                <div className="font-semibold text-slate-900">
                  NIT Jalandhar SOC — Authentication Investigation
                </div>

                <p>
                  The SOC recovered an authentication token from a
                  compromised workstation shortly after an unusual login
                  was detected.
                </p>

                <p>
                  The token appears to be a standard JSON Web Token (JWT),
                  but investigators suspect that the authentication service
                  may be relying on a weak validation mechanism.
                </p>

                <p>
                  A configuration snapshot from the affected service was
                  recovered along with the captured token.
                </p>

                <p className="font-semibold text-slate-900">
                  Investigate the JWT and uncover the weakness in the
                  authentication system.
                </p>


                <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Investigation Objective
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">
                    Analyze the captured JWT using Termux. Decode its header
                    and payload, identify the signing algorithm and inspect
                    the supplied service configuration. Use the evidence to
                    recover the hidden flag.
                  </div>

                </div>


                <div className="border border-violet-200 rounded-lg bg-violet-50/50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Evidence
                  </div>

                  <a
                    href="/phantom_routeD_evidence.zip"
                    download="phantom_routeD_evidence.zip"
                    className="inline-flex items-center mt-2 text-xs font-mono text-violet-700 hover:text-violet-900 underline underline-offset-2"
                  >
                    Download phantom_routeD_evidence.zip
                  </a>

                </div>


                <div className="border border-slate-200 rounded-lg bg-white p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Environment
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">

                    Termux is recommended for this investigation.
                    Standard command-line utilities can be used to inspect
                    the JWT and the supplied configuration files.

                  </div>

                </div>

              </div>
            </>
          }

          hint="Start by inspecting the structure of the JWT. Decode the header and payload, identify the signing algorithm, then examine the supplied configuration carefully. The evidence contains the clue needed to uncover the weakness."

          nextNode="PHM-E"
        />

      </main>

    </div>
  );
}