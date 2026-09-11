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
              ZERO DAY / NODE ZD-A
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
          routeCode="A"
          nodeId="ZD-A"
          challengeTitle="Hidden Message"
          category="Web Recon"
          difficulty="Medium"

          description={
            <>
              <div className="space-y-4">

                <div className="font-semibold text-slate-900">
                  NIT Jalandhar SOC — System Investigation
                </div>

                <p>
                  The security team discovered a suspicious internal webpage
                  during a routine investigation.
                </p>

                <p>
                  The page appears completely normal and does not display
                  anything unusual to visitors. However, the developers left
                  behind some information that was never meant to be visible.
                </p>

                <p>
                  Your task is to investigate the webpage and find the hidden
                  message.
                </p>

                <p className="font-semibold text-slate-900">
                  Look beyond what the page normally displays.
                </p>


                <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Investigation Objective
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">
                    Use Termux to investigate the webpage and inspect the
                    information returned by the server. Search carefully for
                    unusual or hidden text and recover the flag.
                  </div>

                </div>


                <div className="border border-slate-200 rounded-lg bg-white p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Environment
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">

                    Termux is recommended for this challenge.
                    Basic command-line tools such as curl and grep may be
                    useful during the investigation.

                  </div>

                </div>

              </div>
            </>
          }

          hint="The visible webpage may not contain everything the server sends. Inspect the complete response and search through it carefully for a hidden message."

          nextNode="ZD-B"
        />

      </main>

    </div>
  );
}