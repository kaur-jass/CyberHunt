import React from 'react';
import {
  Trophy,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function LeaderboardTable({
  teams = []
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

      <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

        <div>

          <h2 className="font-semibold text-slate-900">
            Live Leaderboard
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Rankings based on score and completion time
          </p>

        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-600">

          <span className="w-2 h-2 rounded-full bg-emerald-500" />

          LIVE

        </div>

      </div>

      {teams.length === 0 ? (

        <div className="p-10 text-center">

          <Trophy className="w-8 h-8 mx-auto text-slate-300" />

          <p className="text-sm text-slate-500 mt-3">
            No leaderboard data available.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 border-b border-slate-200">

              <tr>

                <th className="px-5 py-3 text-left text-[10px] font-mono uppercase text-slate-400">
                  Rank
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-mono uppercase text-slate-400">
                  Team
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-mono uppercase text-slate-400">
                  Leader
                </th>

                <th className="px-5 py-3 text-center text-[10px] font-mono uppercase text-slate-400">
                  Progress
                </th>

                <th className="px-5 py-3 text-center text-[10px] font-mono uppercase text-slate-400">
                  Score
                </th>

                <th className="px-5 py-3 text-center text-[10px] font-mono uppercase text-slate-400">
                  Time
                </th>

              </tr>

            </thead>

            <tbody>

              {teams.map((team, index) => {

                const rank = index + 1;

                return (
                  <tr
                    key={team.teamId}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        {rank === 1 ? (
                          <Trophy className="w-4 h-4 text-amber-500" />
                        ) : (
                          <span className="text-xs font-mono text-slate-400">
                            #{rank}
                          </span>
                        )}

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <div className="font-medium text-slate-900">
                        {team.teamName}
                      </div>

                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        {team.teamId}
                      </div>

                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {team.leaderName || '—'}
                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center justify-center gap-1">

                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />

                        <span className="font-mono text-xs">
                          {team.completedLevels || 0}/5
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-4 text-center">

                      <span className="font-bold text-cyan-700">
                        {team.totalMarks || 0}
                      </span>

                      <span className="text-slate-400 text-xs">
                        /100
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-center items-center gap-1.5 text-xs font-mono text-slate-500">

                        <Clock className="w-3.5 h-3.5" />

                        {Number(team.totalTime || 0).toFixed(1)}
                        {' '}min

                      </div>

                    </td>

                  </tr>
                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}