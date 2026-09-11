import React, {
  useEffect,
  useState
} from 'react';

import {
  Clock,
  Play,
  AlertTriangle
} from 'lucide-react';

const LEVEL_DURATION = 30 * 60 * 1000;

export default function LevelTimer({
  level,
  levelName,
  startTime
}) {
  const [remaining, setRemaining] =
    useState(null);

  useEffect(() => {

    if (!startTime) {
      setRemaining(null);
      return;
    }

    const calculate = () => {

      const start =
        new Date(
          startTime
        ).getTime();

      if (
        Number.isNaN(start)
      ) {
        setRemaining(null);
        return;
      }

      const end =
        start +
        LEVEL_DURATION;

      const now =
        Date.now();

      setRemaining(
        Math.max(
          0,
          end - now
        )
      );
    };

    calculate();

    const interval =
      setInterval(
        calculate,
        1000
      );

    return () =>
      clearInterval(
        interval
      );

  }, [startTime]);

  /* ================================= */
  /* No Start Time */
  /* ================================= */

  if (remaining === null) {

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">

        <div className="flex items-center gap-2 text-slate-400">

          <Clock className="w-4 h-4" />

          <span className="text-xs font-mono">
            LEVEL {level}
          </span>

        </div>

        <div className="mt-3 font-semibold text-slate-800">
          {levelName}
        </div>

        <div className="mt-2 text-xs text-slate-400">
          Start time not configured
        </div>

      </div>
    );
  }

  /* ================================= */
  /* Time Calculation */
  /* ================================= */

  const totalSeconds =
    Math.floor(
      remaining / 1000
    );

  const minutes =
    Math.floor(
      totalSeconds / 60
    );

  const seconds =
    totalSeconds % 60;

  const expired =
    remaining <= 0;

  /*
   * Elapsed time
   */

  const elapsedMs =
    LEVEL_DURATION -
    remaining;

  const elapsedSeconds =
    Math.max(
      0,
      Math.floor(
        elapsedMs / 1000
      )
    );

  const elapsedMinutes =
    elapsedSeconds / 60;

  /* ================================= */
  /* Scoring Windows */
  /* ================================= */

  const firstWindow =
    !expired &&
    elapsedMinutes <= 15;

  const secondWindow =
    !expired &&
    elapsedMinutes > 15 &&
    elapsedMinutes <= 25;

  const thirdWindow =
    !expired &&
    elapsedMinutes > 25 &&
    elapsedMinutes <= 30;

  /* ================================= */
  /* Progress */
  /* ================================= */

  const progress =
    Math.min(
      100,
      Math.max(
        0,
        (
          elapsedMs /
          LEVEL_DURATION
        ) * 100
      )
    );

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

      <div
        className={`h-1 ${
          expired
            ? 'bg-red-500'
            : 'bg-cyan-500'
        }`}
      />

      <div className="p-5">

        {/* ================================= */}
        {/* Header */}
        {/* ================================= */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">

              {expired ? (

                <AlertTriangle className="w-4 h-4 text-red-500" />

              ) : (

                <Play className="w-4 h-4 text-cyan-600" />

              )}

            </div>

            <div>

              <div className="text-[10px] font-mono text-slate-400 uppercase">
                LEVEL {level}
              </div>

              <div className="font-semibold text-sm text-slate-800">
                {levelName}
              </div>

            </div>

          </div>

          {!expired && (

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600">

              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

              ACTIVE

            </div>

          )}

          {expired && (

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-red-600">

              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />

              EXPIRED

            </div>

          )}

        </div>

        {/* ================================= */}
        {/* Timer */}
        {/* ================================= */}

        <div className="mt-5">

          <div
            className={`text-3xl font-mono font-bold ${
              expired
                ? 'text-red-500'
                : 'text-slate-900'
            }`}
          >

            {expired
              ? '00:00'
              : `${String(
                  minutes
                ).padStart(
                  2,
                  '0'
                )}:${String(
                  seconds
                ).padStart(
                  2,
                  '0'
                )}`}

          </div>

          <div className="text-[10px] font-mono text-slate-400 mt-1">

            {expired
              ? 'TIME WINDOW EXPIRED'
              : 'TIME REMAINING'}

          </div>

        </div>

        {/* ================================= */}
        {/* Progress Bar */}
        {/* ================================= */}

        <div className="mt-4">

          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">

            <div
              className={`h-full transition-all ${
                expired
                  ? 'bg-red-500'
                  : 'bg-cyan-500'
              }`}
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </div>

        {/* ================================= */}
        {/* Scoring Windows */}
        {/* ================================= */}

        <div className="mt-4 grid grid-cols-3 gap-2">

          {/* 0–15 */}

          <div
            className={`rounded-lg border p-2 ${
              firstWindow
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-slate-50 border-slate-100'
            }`}
          >

            <div
              className={`text-[9px] font-mono ${
                firstWindow
                  ? 'text-emerald-700'
                  : 'text-slate-400'
              }`}
            >
              0–15 MIN
            </div>

            <div
              className={`text-[10px] font-semibold mt-1 ${
                firstWindow
                  ? 'text-emerald-700'
                  : 'text-slate-500'
              }`}
            >
              NO PENALTY
            </div>

          </div>

          {/* 15–25 */}

          <div
            className={`rounded-lg border p-2 ${
              secondWindow
                ? 'bg-amber-50 border-amber-200'
                : 'bg-slate-50 border-slate-100'
            }`}
          >

            <div
              className={`text-[9px] font-mono ${
                secondWindow
                  ? 'text-amber-700'
                  : 'text-slate-400'
              }`}
            >
              15–25 MIN
            </div>

            <div
              className={`text-[10px] font-semibold mt-1 ${
                secondWindow
                  ? 'text-amber-700'
                  : 'text-slate-500'
              }`}
            >
              -2 MARKS
            </div>

          </div>

          {/* 25–30 */}

          <div
            className={`rounded-lg border p-2 ${
              thirdWindow
                ? 'bg-red-50 border-red-200'
                : 'bg-slate-50 border-slate-100'
            }`}
          >

            <div
              className={`text-[9px] font-mono ${
                thirdWindow
                  ? 'text-red-700'
                  : 'text-slate-400'
              }`}
            >
              25–30 MIN
            </div>

            <div
              className={`text-[10px] font-semibold mt-1 ${
                thirdWindow
                  ? 'text-red-700'
                  : 'text-slate-500'
              }`}
            >
              -5 MARKS
            </div>

          </div>

        </div>

        {/* ================================= */}
        {/* Expired */}
        {/* ================================= */}

        {expired && (

          <div className="mt-4 flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">

            <AlertTriangle className="w-3.5 h-3.5" />

            Level scoring window closed.

          </div>

        )}

      </div>

    </div>
  );
}