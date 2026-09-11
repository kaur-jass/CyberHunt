import React, { useEffect, useState } from 'react';
import {
  Clock,
  Play,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function LevelTimer({
  level,
  levelName,
  startTime
}) {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {

    if (!startTime) {
      setRemaining(null);
      return;
    }

    const calculate = () => {

      const start = new Date(startTime).getTime();

      const end =
        start + 30 * 60 * 1000;

      const now = Date.now();

      setRemaining(
        Math.max(0, end - now)
      );
    };

    calculate();

    const interval = setInterval(
      calculate,
      1000
    );

    return () => clearInterval(interval);

  }, [startTime]);

  if (!startTime) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">

        <div className="flex items-center gap-2 text-slate-400">

          <Clock className="w-4 h-4" />

          <span className="text-xs font-mono">
            LEVEL {level}
          </span>

        </div>

        <div className="mt-3 font-semibold">
          {levelName}
        </div>

        <div className="mt-2 text-xs text-slate-400">
          Start time not configured
        </div>

      </div>
    );
  }

  const totalSeconds =
    Math.floor(remaining / 1000);

  const minutes =
    Math.floor(totalSeconds / 60);

  const seconds =
    totalSeconds % 60;

  const expired =
    remaining <= 0;

  const firstWindow =
    totalSeconds > 15 * 60;

  const secondWindow =
    totalSeconds > 5 * 60 &&
    totalSeconds <= 15 * 60;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

      <div className="h-1 bg-cyan-500" />

      <div className="p-5">

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

              <div className="font-semibold text-sm">
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

        </div>

        <div className="mt-5">

          <div className="text-3xl font-mono font-bold text-slate-900">

            {expired
              ? '00:00'
              : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}

          </div>

          <div className="text-[10px] font-mono text-slate-400 mt-1">
            {expired
              ? 'TIME WINDOW EXPIRED'
              : '30 MINUTE WINDOW'}
          </div>

        </div>

        <div className="mt-4">

          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">

            <div
              className={`h-full transition-all ${
                expired
                  ? 'bg-red-500'
                  : 'bg-cyan-500'
              }`}
              style={{
                width: `${Math.min(
                  100,
                  ((30 * 60 * 1000 - remaining) /
                    (30 * 60 * 1000)) *
                    100
                )}%`
              }}
            />

          </div>

        </div>

        <div className="mt-4 flex items-center justify-between text-[10px] font-mono">

          <span
            className={
              firstWindow
                ? 'text-emerald-600'
                : 'text-slate-400'
            }
          >
            0–15 MIN
          </span>

          <span
            className={
              secondWindow
                ? 'text-amber-600'
                : 'text-slate-400'
            }
          >
            15–25 MIN
          </span>

          <span
            className={
              !firstWindow &&
              !secondWindow &&
              !expired
                ? 'text-red-600'
                : 'text-slate-400'
            }
          >
            25–30 MIN
          </span>

        </div>

        {expired && (
          <div className="mt-4 flex items-center gap-2 text-xs text-red-600">

            <AlertTriangle className="w-3.5 h-3.5" />

            Level scoring window closed.

          </div>
        )}

      </div>

    </div>
  );
}