import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteBPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <header className="border-b border-slate-200 bg-white">

        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">

          <div>

            <div className="font-semibold text-slate-900">
              CYBER HUNT 2026
            </div>

            <div className="text-[10px] font-mono text-violet-700 mt-1">
              ZERO DAY / NODE ZD-B
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
          routeCode="B"
          nodeId="ZD-B"
          challengeTitle="Decode Me"
          category="Cryptography"
          difficulty="Medium"

          description={
            <>
              <div className="space-y-4">

                <div className="font-semibold text-slate-900">
                  NIT Jalandhar SOC — Encoded Communication
                </div>

                <p>
                  During a routine investigation, the SOC intercepted a
                  short message from an unknown source.
                </p>

                <p>
                  The message does not appear to contain readable text.
                  Investigators believe that the data was encoded before
                  being transmitted.
                </p>

                <p>
                  No encryption key has been provided. The objective is to
                  identify the encoding method and recover the original
                  message.
                </p>

                <p className="font-semibold text-slate-900">
                  Decode the intercepted message and recover the flag.
                </p>


                <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Intercepted Message
                  </div>

                  <div className="mt-3 rounded-lg border border-slate-200 bg-white px-4 py-3">

                    <code className="text-xs sm:text-sm font-mono text-slate-700 break-all">
                      Q1lCRVJ7WkVST19ERUNPREV9
                    </code>

                  </div>

                </div>


                <div className="border border-slate-200 rounded-lg bg-white p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Environment
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">

                    Termux is recommended for this challenge.
                    You may use basic command-line utilities to identify
                    the encoding and decode the intercepted message.

                  </div>

                </div>

              </div>
            </>
          }

          hint="The message uses a common text encoding rather than encryption. Look at the character pattern carefully and identify the encoding before decoding it."

          nextNode="ZD-C"
        />

      </main>

    </div>
  );
}