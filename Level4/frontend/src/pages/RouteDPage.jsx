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
              ZERO DAY / NODE ZD-D
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
          routeCode="D"
          nodeId="ZD-D"
          challengeTitle="The Header"
          category="Web Recon"
          difficulty="Hard"

          description={
            <>
              <div className="space-y-4">

                <div className="font-semibold text-slate-900">
                  NIT Jalandhar SOC — HTTP Investigation
                </div>

                <p>
                  During a routine security investigation, the SOC recovered
                  an HTTP response from a suspicious internal service.
                </p>

                <p>
                  Most of the response headers appear completely normal.
                  However, one custom header looks different from the rest
                  and may contain information left behind by the system.
                </p>

                <p>
                  Your task is to inspect the response carefully, identify
                  the unusual header and determine what information it contains.
                </p>

                <p className="font-semibold text-slate-900">
                  Find the hidden message inside the HTTP headers.
                </p>


                <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold">
                    Recovered HTTP Response
                  </div>

                  <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">

                    <pre className="text-xs sm:text-sm font-mono text-slate-700 leading-6 whitespace-pre-wrap break-all">
{`HTTP/1.1 200 OK
Server: nginx
Content-Type: text/html
X-Request-ID: 7F23A91
X-Trace: 43 59 42 45 52 7B 5A 45 52 4F 5F 48 45 41 44 45 52 7D
Cache-Control: no-cache`}
                    </pre>

                  </div>

                </div>


                <div className="border border-slate-200 rounded-lg bg-white p-4">

                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Environment
                  </div>

                  <div className="mt-2 text-xs text-slate-600 leading-6">

                    Termux is recommended for this challenge.
                    Inspect the HTTP response and look carefully at the
                    custom headers. Basic command-line utilities can help
                    decode the suspicious value.

                  </div>

                </div>

              </div>
            </>
          }

          hint="Most headers are ordinary. Focus on the custom X-Trace header. Its value does not look like normal text. Identify the encoding and decode it."

          nextNode="ZD-E"
        />

      </main>

    </div>
  );
}