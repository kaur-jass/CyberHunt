import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Save,
  Clock,
  CheckCircle2
} from 'lucide-react';

const API_URL =
  import.meta.env.VITE_ADMIN_API_URL ||
  'http://localhost:6000';

const LEVELS = [
  {
    level: 0,
    name: 'Ignition'
  },
  {
    level: 1,
    name: 'Trace'
  },
  {
    level: 2,
    name: 'Breach'
  },
  {
    level: 3,
    name: 'Phantom'
  },
  {
    level: 4,
    name: 'ZeroDay'
  }
];

export default function LevelSettings() {

  const [configs, setConfigs] = useState({});
  const [saving, setSaving] = useState(null);

  const fetchConfigs = async () => {

    try {

      const res =
        await axios.get(
          `${API_URL}/api/levels`
        );

      const map = {};

      res.data.forEach((item) => {
        map[item.level] = item;
      });

      setConfigs(map);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const updateValue = (
    level,
    value
  ) => {

    setConfigs((previous) => ({
      ...previous,

      [level]: {
        ...(previous[level] || {}),
        startTime: value
      }

    }));

  };

  const saveLevel = async (
    level,
    name
  ) => {

    setSaving(level);

    try {

      const config =
        configs[level];

      if (!config?.startTime) {
        alert(
          'Please select a start time.'
        );
        return;
      }

      await axios.post(
        `${API_URL}/api/levels/set-time`,
        {
          level,
          levelName: name,
          startTime: config.startTime,
          duration: 30,
          maxMarks: 20
        }
      );

      await fetchConfigs();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        'Unable to save level.'
      );

    } finally {

      setSaving(null);

    }

  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <div className="ml-64">

        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center">

          <div>

            <h1 className="text-xl font-semibold">
              Level Settings
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              Configure level start times and scoring windows
            </p>

          </div>

        </header>

        <main className="p-8">

          <div className="max-w-4xl">

            {/* Rules */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">

              <div className="flex items-center gap-2">

                <Clock className="w-4 h-4 text-cyan-600" />

                <h2 className="font-semibold">
                  Scoring Rules
                </h2>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">

                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">

                  <div className="text-[10px] font-mono text-emerald-600">
                    0–15 MIN
                  </div>

                  <div className="text-sm font-semibold mt-1">
                    No deduction
                  </div>

                </div>

                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">

                  <div className="text-[10px] font-mono text-amber-600">
                    15–25 MIN
                  </div>

                  <div className="text-sm font-semibold mt-1">
                    −2 marks
                  </div>

                </div>

                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">

                  <div className="text-[10px] font-mono text-red-600">
                    25–30 MIN
                  </div>

                  <div className="text-sm font-semibold mt-1">
                    −5 marks
                  </div>

                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Every level has a maximum duration of 30 minutes.
                After 30 minutes, the level awards 0 marks.
              </p>

            </div>

            {/* Levels */}
            <div className="space-y-4">

              {LEVELS.map((level) => {

                const config =
                  configs[level.level];

                return (
                  <div
                    key={level.level}
                    className="bg-white border border-slate-200 rounded-xl p-5"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center font-mono text-xs text-cyan-700">
                          {level.level}
                        </div>

                        <div>

                          <div className="font-semibold">
                            {level.name}
                          </div>

                          <div className="text-[10px] font-mono text-slate-400">
                            LEVEL {level.level} / 20 MARKS
                          </div>

                        </div>

                      </div>

                      {config?.startTime && (

                        <div className="flex items-center gap-1.5 text-xs text-emerald-600">

                          <CheckCircle2 className="w-4 h-4" />

                          Configured

                        </div>

                      )}

                    </div>

                    <div className="mt-5 flex flex-col md:flex-row gap-3">

                      <input
                        type="datetime-local"
                        value={
                          config?.startTime
                            ? config.startTime.slice(
                                0,
                                16
                              )
                            : ''
                        }
                        onChange={(e) =>
                          updateValue(
                            level.level,
                            e.target.value
                          )
                        }
                        className="flex-1 border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-slate-50 focus:outline-none focus:border-cyan-500"
                      />

                      <button
                        onClick={() =>
                          saveLevel(
                            level.level,
                            level.name
                          )
                        }
                        disabled={
                          saving === level.level
                        }
                        className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50"
                      >

                        <Save className="w-4 h-4" />

                        {saving === level.level
                          ? 'Saving...'
                          : 'Save Start Time'}

                      </button>

                    </div>

                    <div className="mt-3 text-[10px] font-mono text-slate-400">
                      DURATION: 30 MINUTES
                    </div>

                  </div>
                );

              })}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}