import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function TeamProgress({
  team
}) {
  if (!team) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400">
        Select a team to view progress.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

      <div className="px-5 py-4 border-b border-slate-200">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-semibold">
              {team.teamName}
            </h2>

            <div className="text-[10px] font-mono text-slate-400 mt-1">
              {team.teamId}
            </div>

          </div>

          <div className="text-right">

            <div className="text-xl font-bold text-cyan-700">
              {team.totalMarks || 0}
              <span className="text-xs text-slate-400">
                /100
              </span>
            </div>

            <div className="text-[10px] text-slate-400">
              TOTAL SCORE
            </div>

          </div>

        </div>

      </div>

      <div className="divide-y divide-slate-100">

        {[0, 1, 2, 3, 4].map((level) => {

          const progress =
            team.progress?.find(
              (item) => item.level === level
            );

          const names = [
            'Ignition',
            'Trace',
            'Breach',
            'Phantom',
            'ZeroDay'
          ];

          return (
            <div
              key={level}
              className="p-5"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-mono">

                    {level}

                  </div>

                  <div>

                    <div className="font-medium text-sm">
                      {names[level]}
                    </div>

                    <div className="text-[10px] font-mono text-slate-400">
                      LEVEL {level}
                    </div>

                  </div>

                </div>

                {progress ? (

                  <div className="flex items-center gap-2 text-emerald-600">

                    <CheckCircle2 className="w-4 h-4" />

                    <span className="text-xs font-medium">
                      COMPLETED
                    </span>

                  </div>

                ) : (

                  <div className="flex items-center gap-2 text-slate-400">

                    <AlertCircle className="w-4 h-4" />

                    <span className="text-xs">
                      PENDING
                    </span>

                  </div>

                )}

              </div>

              {progress && (

                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">

                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">
                      Route
                    </div>

                    <div className="text-xs font-mono mt-1">
                      {progress.route || '—'}
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">
                      Attempts
                    </div>

                    <div className="text-xs font-mono mt-1">
                      {progress.attempts}
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">
                      Time
                    </div>

                    <div className="text-xs font-mono mt-1 flex items-center gap-1">

                      <Clock className="w-3 h-3" />

                      {progress.timeTaken} min

                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">
                      Penalty
                    </div>

                    <div className="text-xs font-mono mt-1 text-red-500">

                      -{(
                        (progress.attemptPenalty || 0) +
                        (progress.timePenalty || 0)
                      )}

                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">
                      Marks
                    </div>

                    <div className="text-sm font-bold mt-1 text-emerald-600">
                      {progress.marks}/20
                    </div>
                  </div>

                </div>

              )}

            </div>
          );

        })}

      </div>

    </div>
  );
}