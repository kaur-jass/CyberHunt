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

            <div className="text-[10px] font-mono text-violet-700 mt-1">
              PHANTOM / NODE PHM-E
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
          routeCode="E"
          nodeId="PHM-E"
          challengeTitle="Memory Echo"
          category="Memory Forensics"
          difficulty="Hard"

          description={
            <>
              <div className="space-y-4">

                <div className="font-semibold text-slate-900">
                  NIT Jalandhar SOC — Process Memory Investigation
                </div>

                <p>
                  The final workstation image did not contain any obvious
                  malicious executable or suspicious document. However, a
                  forensic snapshot of a background process was recovered
                  during the investigation.
                </p>

                <p>
                  Most of the captured memory contains normal process strings,
                  library references and session information. Somewhere inside
                  the snapshot, however, a small encoded artifact has survived.
                </p>

                <p>
                  Your task is to identify the anomalous encoded value and
                  reconstruct the information hidden inside it.
                </p>

                <p className="font-semibold text-slate-900">
                  Investigate the memory snapshot and recover the final flag.
                </p>


                <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Investigation Objective
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">
                    Analyze the captured memory using Termux. Search for
                    unusual encoded data, identify the hexadecimal layer,
                    decode it and continue the encoding chain until the final
                    flag is recovered.
                  </div>

                </div>


                <div className="border border-violet-200 rounded-lg bg-violet-50/50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Evidence
                  </div>

                  <a
                    href="/routeE.zip"
                    download="phantom_routeE_evidence.zip"
                    className="inline-flex items-center mt-2 text-xs font-mono text-violet-700 hover:text-violet-900 underline underline-offset-2"
                  >
                    Download phantom_routeE_evidence.zip
                  </a>

                </div>


                <div className="border border-slate-200 rounded-lg bg-white p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Environment
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">

                    Termux is recommended for this investigation.
                    Standard command-line utilities such as grep, xxd and
                    base64 can be used to inspect and decode the evidence.

                  </div>

                </div>

              </div>
            </>
          }

          hint="Most of the snapshot is noise. Search for long hexadecimal-looking values, decode the suspicious bytes, then inspect the resulting text for another encoding layer."

          nextNode="ZERO-DAY"
        />

      </main>

    </div>
  );
}
