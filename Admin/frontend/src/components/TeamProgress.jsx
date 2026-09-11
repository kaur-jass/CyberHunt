import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Target
} from 'lucide-react';

const LEVELS = [
  {
    level: 0,
    name: 'IGNITION'
  },
  {
    level: 1,
    name: 'TRACE'
  },
  {
    level: 2,
    name: 'BREACH'
  },
  {
    level: 3,
    name: 'PHANTOM'
  },
  {
    level: 4,
    name: 'ZERO DAY'
  },
  {
    level: 5,
    name: 'NEXUS'
  }
];

const MAX_MARKS = 20;
const TOTAL_MAX_MARKS = 120;
const MAX_ATTEMPTS = 5;

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

  const progress = Array.isArray(
    team.progress
  )
    ? team.progress
    : [];

  const getProgress = (level) => {
    return (
      progress.find(
        (item) =>
          Number(item?.level) ===
          Number(level)
      ) || null
    );
  };

  const totalMarks = Number(
    team.totalMarks || 0
  );

  const completedLevels = progress.filter(
    (item) =>
      item &&
      item.completedAt
  ).length;

  const leaderName =
    team.leaderName ||
    (
      Array.isArray(team.members) &&
      team.members.length > 0
        ? team.members[0]?.name
        : 'N/A'
    );

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="px-5 py-4 border-b border-slate-200">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-semibold text-slate-900">
              {team.teamName || 'Unknown Team'}
            </h2>

            <div className="text-[10px] font-mono text-slate-400 mt-1">
              {team.teamId || 'N/A'}
            </div>

            <div className="text-[10px] text-slate-400 mt-1">
              LEADER: {leaderName || 'N/A'}
            </div>

          </div>

          <div className="text-right">

            <div className="text-2xl font-bold text-cyan-700">

              {totalMarks}

              <span className="text-xs text-slate-400 ml-1">
                /{TOTAL_MAX_MARKS}
              </span>

            </div>

            <div className="text-[10px] text-slate-400">
              TOTAL SCORE
            </div>

          </div>

        </div>

        {/* Progress Summary */}

        <div className="mt-4 grid grid-cols-3 gap-3">

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">

            <div className="text-[9px] font-mono text-slate-400 uppercase">
              Levels
            </div>

            <div className="text-sm font-semibold text-slate-700 mt-1">
              {completedLevels}/6
            </div>

          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">

            <div className="text-[9px] font-mono text-slate-400 uppercase">
              Score
            </div>

            <div className="text-sm font-semibold text-cyan-700 mt-1">
              {totalMarks}/{TOTAL_MAX_MARKS}
            </div>

          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">

            <div className="text-[9px] font-mono text-slate-400 uppercase">
              Status
            </div>

            <div className="text-sm font-semibold text-slate-700 mt-1">
              {completedLevels === 6
                ? 'COMPLETED'
                : completedLevels > 0
                ? 'IN PROGRESS'
                : 'NOT STARTED'}
            </div>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* LEVELS */}
      {/* ================================= */}

      <div className="divide-y divide-slate-100">

        {LEVELS.map(
          ({
            level,
            name
          }) => {

            const item =
              getProgress(level);

            const marks = Number(
              item?.marks || 0
            );

            const attempts = Number(
              item?.attempts || 0
            );

            const wrongAttempts =
              Math.max(
                0,
                attempts - 1
              );

            const attemptsLeft =
              Math.max(
                0,
                MAX_ATTEMPTS - attempts
              );

            const attemptPenalty =
              Number(
                item?.attemptPenalty || 0
              );

            const timePenalty =
              Number(
                item?.timePenalty || 0
              );

            const totalPenalty =
              attemptPenalty +
              timePenalty;

            const timeTaken =
              item?.timeTaken !==
              undefined &&
              item?.timeTaken !== null
                ? Number(
                    item.timeTaken
                  )
                : null;

            const completedAt =
              item?.completedAt;

            return (
              <div
                key={level}
                className="p-5"
              >

                {/* Level Header */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center text-[10px] font-mono font-semibold ${
                        item
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      L{level}
                    </div>

                    <div>

                      <div className="font-medium text-sm text-slate-800">
                        {name}
                      </div>

                      <div className="text-[10px] font-mono text-slate-400">
                        LEVEL {level}
                      </div>

                    </div>

                  </div>

                  {/* Status */}

                  {item ? (

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

                {/* Level Details */}

                {item ? (

                  <div className="mt-4">

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">

                      {/* Route */}

                      <div>

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Route
                        </div>

                        <div className="text-xs font-mono mt-1 text-slate-700">
                          {item.route || '—'}
                        </div>

                      </div>

                      {/* Attempts */}

                      <div>

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Attempts
                        </div>

                        <div className="text-xs font-mono mt-1 text-slate-700">
                          {attempts}/{MAX_ATTEMPTS}
                        </div>

                      </div>

                      {/* Wrong */}

                      <div>

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Wrong
                        </div>

                        <div
                          className={`text-xs font-mono mt-1 ${
                            wrongAttempts > 0
                              ? 'text-red-500'
                              : 'text-emerald-600'
                          }`}
                        >
                          {wrongAttempts}
                        </div>

                      </div>

                      {/* Attempts Left */}

                      <div>

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Attempts Left
                        </div>

                        <div
                          className={`text-xs font-mono mt-1 ${
                            attemptsLeft === 0
                              ? 'text-red-500'
                              : 'text-emerald-600'
                          }`}
                        >
                          {attemptsLeft}
                        </div>

                      </div>

                      {/* Time */}

                      <div>

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Time
                        </div>

                        <div className="text-xs font-mono mt-1 flex items-center gap-1 text-slate-700">

                          <Clock className="w-3 h-3" />

                          {Number.isFinite(
                            timeTaken
                          )
                            ? `${timeTaken.toFixed(
                                2
                              )} min`
                            : '—'}

                        </div>

                      </div>

                      {/* Penalty */}

                      <div>

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Penalty
                        </div>

                        <div className="text-xs font-mono mt-1 text-red-500">

                          {totalPenalty > 0
                            ? `-${totalPenalty}`
                            : '0'}

                        </div>

                      </div>

                      {/* Marks */}

                      <div>

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Marks
                        </div>

                        <div
                          className={`text-sm font-bold mt-1 ${
                            marks > 0
                              ? 'text-emerald-600'
                              : 'text-red-500'
                          }`}
                        >
                          {marks}/{MAX_MARKS}
                        </div>

                      </div>

                    </div>

                    {/* Completion Time */}

                    {completedAt && (

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">

                        <Clock className="w-3.5 h-3.5 text-slate-400" />

                        <span className="text-[9px] font-mono text-slate-400 uppercase">
                          Answer Time
                        </span>

                        <span className="text-xs font-mono text-slate-600">

                          {new Date(
                            completedAt
                          ).toLocaleString(
                            'en-IN',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              hour12: true
                            }
                          )}

                        </span>

                      </div>

                    )}

                  </div>

                ) : (

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">

                    <Target className="w-3.5 h-3.5" />

                    No successful submission recorded for this level.

                  </div>

                )}

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}