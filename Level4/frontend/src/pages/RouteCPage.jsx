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

            <div className="text-[10px] font-mono text-violet-700 mt-1">
              ZERO DAY / NODE ZD-C
            </div>

          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">

            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />

            LEVEL 04

          </div>

        </div>

      </header>


      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">

        <ChallengeCard
          routeCode="C"
          nodeId="ZD-C"
          challengeTitle="Find the Key"
          category="Encoding"
          difficulty="Medium-Hard"

          description={
            <>
              <div className="space-y-4">

                <div className="font-semibold text-slate-900">
                  NIT Jalandhar SOC — Message Investigation
                </div>

                <p>
                  During the investigation, analysts recovered a short
                  message left behind by an unknown operator.
                </p>

                <p>
                  The message contains several values that look similar,
                  but only one of them contains the information required
                  to continue the investigation.
                </p>

                <p>
                  Nothing needs to be downloaded. The recovered data is
                  available below.
                </p>

                <p className="font-semibold text-slate-900">
                  Identify the correct value and decode it to recover the
                  flag.
                </p>


                <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Recovered Data
                  </div>

                  <div className="mt-3 space-y-2 font-mono text-xs text-slate-600">

                    <div>
                      KEY-01 : 4E4F524D414C
                    </div>

                    <div>
                      KEY-02 : 53595354454D
                    </div>

                    <div>
                      KEY-03 : 5A45524F
                    </div>

                    <div>
                      KEY-04 : 43594245527B5A45524F5F4B45597D
                    </div>

                    <div>
                      KEY-05 : 44415441
                    </div>

                  </div>

                </div>


                <div className="border border-slate-200 rounded-lg bg-white p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Environment
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">

                    Termux is recommended for this challenge.
                    You can use simple command-line utilities such as
                    echo and xxd to identify and decode the hexadecimal
                    value.

                  </div>

                </div>

              </div>
            </>
          }

          hint="The values are written in hexadecimal. Decode them and look for the one that produces a flag rather than an ordinary word."

          nextNode="ZD-D"
        />

      </main>

    </div>
  );
}