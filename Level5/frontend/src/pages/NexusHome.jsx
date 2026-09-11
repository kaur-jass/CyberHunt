import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function NexusHome() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-2xl">

        {/* Final Destination Banner */}
        <div className="mb-4 bg-white border border-cyan-200 rounded-lg px-4 py-3">

          <div className="flex items-center gap-3">

            <div className="w-8 h-8 rounded-md bg-cyan-50 border border-cyan-200 flex items-center justify-center">
              <span className="text-cyan-700 font-mono text-xs font-bold">
                N
              </span>
            </div>

            <div>
              <div className="text-xs font-mono font-semibold text-cyan-700">
                FINAL DESTINATION REACHED
              </div>

              <div className="text-[10px] text-slate-400 mt-0.5">
                All routes converge at this node
              </div>
            </div>

          </div>

        </div>


        {/* Final Challenge */}
        <ChallengeCard
          routeCode="FINAL"
          nodeId="NEX-01"
          level="5"
          levelName="NEXUS"
          challengeTitle="Break the Chain"
          category="Cyber Investigation"
          difficulty="Expert"
          description={
            <div className="space-y-5">

              <p>
                The investigation is almost complete. The attacker did not
                leave the final answer in a single location.
              </p>

              <p>
                Evidence recovered from the previous five levels has been
                correlated into the following incident timeline.
              </p>


              {/* Incident Timeline */}
              <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 overflow-x-auto">

                <div className="text-[10px] font-mono text-slate-500 mb-3">
                  INCIDENT TIMELINE
                </div>

                <div className="text-[11px] font-mono leading-6 text-slate-300 whitespace-pre">
{`09:14:07  [IGNITION]   INITIAL ACCESS
09:16:42  [TRACE]      TRACE IDENTIFIED
09:21:31  [BREACH]     CREDENTIAL COMPROMISE
09:27:42  [PHANTOM]    PERSISTENCE
09:31:58  [ZERO DAY]   EVIDENCE DESTRUCTION`}
                </div>

              </div>


              {/* Event Records */}
              <div className="space-y-3">

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono font-semibold text-cyan-700">
                      EVENT 01
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      IGNITION
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-400">TIME</span>
                      <div className="text-slate-700 mt-1">09:14:07</div>
                    </div>

                    <div>
                      <span className="text-slate-400">EVENT ID</span>
                      <div className="text-slate-700 mt-1">17</div>
                    </div>

                    <div className="col-span-2">
                      <span className="text-slate-400">DATA</span>
                      <div className="text-slate-700 mt-1 break-all">
                        7F4C594245525F494E4954
                      </div>
                    </div>
                  </div>
                </div>


                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono font-semibold text-cyan-700">
                      EVENT 02
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      TRACE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-400">TIME</span>
                      <div className="text-slate-700 mt-1">09:16:42</div>
                    </div>

                    <div>
                      <span className="text-slate-400">EVENT ID</span>
                      <div className="text-slate-700 mt-1">04</div>
                    </div>

                    <div className="col-span-2">
                      <span className="text-slate-400">DATA</span>
                      <div className="text-slate-700 mt-1 break-all">
                        5A5942524F54415F4C4F47
                      </div>
                    </div>
                  </div>
                </div>


                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono font-semibold text-cyan-700">
                      EVENT 03
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      BREACH
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-400">TIME</span>
                      <div className="text-slate-700 mt-1">09:21:31</div>
                    </div>

                    <div>
                      <span className="text-slate-400">EVENT ID</span>
                      <div className="text-slate-700 mt-1">03</div>
                    </div>

                    <div className="col-span-2">
                      <span className="text-slate-400">DATA</span>
                      <div className="text-slate-700 mt-1 break-all">
                        4E59455855535F4241434B
                      </div>
                    </div>
                  </div>
                </div>


                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono font-semibold text-cyan-700">
                      EVENT 04
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      PHANTOM
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-400">TIME</span>
                      <div className="text-slate-700 mt-1">09:27:42</div>
                    </div>

                    <div>
                      <span className="text-slate-400">EVENT ID</span>
                      <div className="text-slate-700 mt-1">05</div>
                    </div>

                    <div className="col-span-2">
                      <span className="text-slate-400">DATA</span>
                      <div className="text-slate-700 mt-1 break-all">
                        50524553495354454E4345
                      </div>
                    </div>
                  </div>
                </div>


                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono font-semibold text-cyan-700">
                      EVENT 05
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ZERO DAY
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-400">TIME</span>
                      <div className="text-slate-700 mt-1">09:31:58</div>
                    </div>

                    <div>
                      <span className="text-slate-400">EVENT ID</span>
                      <div className="text-slate-700 mt-1">06</div>
                    </div>

                    <div className="col-span-2">
                      <span className="text-slate-400">DATA</span>
                      <div className="text-slate-700 mt-1 break-all">
                        42524F4B454E5F434841494E
                      </div>
                    </div>
                  </div>
                </div>

              </div>


              {/* Correlation Rules */}
              <div className="rounded-xl border border-cyan-100 bg-cyan-50 px-4 py-4">

                <div className="text-[10px] font-mono font-semibold text-cyan-700 uppercase tracking-wider mb-3">
                  NEXUS PROTOCOL
                </div>

                <div className="text-sm text-slate-700 space-y-2">
                  <p>1. Sort the events chronologically.</p>

                  <p>
                    2. For every event, use its Event ID as the character
                    position inside its DATA string.
                  </p>

                  <p>
                    3. Convert the selected hexadecimal pair into ASCII.
                  </p>

                  <p>
                    4. Concatenate the recovered characters in chronological
                    order.
                  </p>

                  <p>
                    5. The resulting phrase identifies what was broken in the
                    attack chain.
                  </p>

                  <p>
                    6. Submit that phrase as the flag keyword.
                  </p>
                </div>

              </div>


              {/* Important Note */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

                <div className="text-[10px] font-mono text-slate-500 mb-1">
                  FINAL NOTE
                </div>

                <p className="text-xs text-slate-600 leading-5">
                  Do not treat the five levels as independent incidents.
                  Their evidence forms one continuous attack chain.
                </p>

              </div>

            </div>
          }
          hint="Follow the timeline, use each Event ID for extraction, decode the selected hexadecimal byte, and read the final phrase."
          nextNode="COMPLETE"
        />

      </div>

    </main>
  );
}
