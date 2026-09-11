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
              PHANTOM / NODE PHM-B
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
          routeCode="B"
          nodeId="PHM-B"
          challengeTitle="Phantom File"
          category="File Forensics"
          difficulty="Hard"

          description={
            <>
              <div className="space-y-4">

                <div className="font-semibold text-slate-900">
                  NIT Jalandhar SOC — Digital Evidence Investigation
                </div>

                <p>
                  Investigators recovered an incident report from a
                  compromised workstation. At first glance, the document
                  appears completely normal.
                </p>

                <p>
                  The SOC believes that additional evidence may have been
                  concealed inside the file without changing what is visible
                  to a normal reader.
                </p>

                <p>
                  Your task is to investigate the file and recover the
                  information hidden beyond its visible contents.
                </p>

                <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Investigation Objective
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">
                    Analyze the downloaded file using Termux forensic tools.
                    Look beyond the document's visible content and follow
                    any concealed evidence you discover.
                  </div>

                </div>

                <div className="border border-violet-200 rounded-lg bg-violet-50/50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Evidence
                  </div>

                  <a
                    href="/incident_report.pdf"
                    download="incident_report.pdf"
                    className="inline-flex items-center mt-2 text-xs font-mono text-violet-700 hover:text-violet-900 underline underline-offset-2"
                  >
                    Download incident_report.pdf
                  </a>

                </div>

              </div>
            </>
          }

          hint="A PDF can contain more than what your PDF reader displays. Use Termux tools such as file, strings, xxd, unzip or binwalk to investigate the file structure."

          nextNode="PHM-C"
        />

      </main>

    </div>
  );
}