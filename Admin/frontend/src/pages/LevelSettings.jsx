import React, {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  Save,
  Clock,
  CheckCircle2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';


const API_URL =
  import.meta.env.VITE_ADMIN_API_URL ||
  'http://localhost:5006';


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
  },
  {
    level: 5,
    name: 'Nexus'
  }
];


/*
 * Convert Date / ISO string from backend
 * into browser local datetime-local value.
 *
 * Example:
 * MongoDB:
 * 2026-09-12T17:00:00.000Z
 *
 * Browser in India:
 * 2026-09-12T22:30
 */
const toLocalDateTimeInput = (value) => {

  if (!value) {
    return '';
  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return '';
  }


  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, '0');


  const day =
    String(
      date.getDate()
    ).padStart(2, '0');


  const hours =
    String(
      date.getHours()
    ).padStart(2, '0');


  const minutes =
    String(
      date.getMinutes()
    ).padStart(2, '0');


  return `${year}-${month}-${day}T${hours}:${minutes}`;

};


/*
 * Convert datetime-local value to ISO.
 *
 * datetime-local has NO timezone.
 *
 * Browser interprets it as local time.
 * toISOString() converts it to UTC correctly.
 */
const toISOStringFromLocal = (
  value
) => {

  if (!value) {
    return null;
  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }


  return date.toISOString();

};


export default function LevelSettings() {

  const [configs, setConfigs] =
    useState({});


  const [saving, setSaving] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState('');


  const [success, setSuccess] =
    useState('');


  /*
   * ================================
   * FETCH LEVEL CONFIGURATION
   * ================================
   */

  const fetchConfigs =
    async () => {

      try {

        setLoading(true);

        setError('');


        const res =
          await axios.get(
            `${API_URL}/api/levels`,
            {
              timeout: 10000
            }
          );


        /*
         * Backend may return either:
         *
         * [
         *   {...},
         *   {...}
         * ]
         *
         * OR:
         *
         * {
         *   levels: [...]
         * }
         */

        const levelData =
          Array.isArray(
            res.data
          )
            ? res.data
            : Array.isArray(
                res.data?.levels
              )
            ? res.data.levels
            : [];


        const map = {};


        levelData.forEach(
          (item) => {

            /*
             * Store backend Date as-is.
             *
             * Input conversion will happen
             * using toLocalDateTimeInput().
             */

            map[item.level] = {
              ...item,
              startTime:
                item.startTime || ''
            };

          }
        );


        setConfigs(map);


      } catch (fetchError) {

        console.error(
          '[Level Config Fetch Error]:',
          fetchError
        );


        setError(
          fetchError.response?.data?.error ||
          fetchError.message ||
          'Unable to fetch level settings.'
        );


      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchConfigs();

  }, []);


  /*
   * ================================
   * UPDATE INPUT VALUE
   * ================================
   */

  const updateValue = (
    level,
    value
  ) => {

    setSuccess('');

    setError('');


    setConfigs(
      (previous) => ({

        ...previous,

        [level]: {

          ...(previous[level] || {}),

          /*
           * IMPORTANT:
           *
           * Keep datetime-local value exactly
           * as entered by the user.
           *
           * Example:
           * 2026-09-15T22:30
           */

          startTime: value

        }

      })
    );

  };


  /*
   * ================================
   * SAVE LEVEL
   * ================================
   */

  const saveLevel =
    async (
      level,
      name
    ) => {

      setSaving(level);

      setError('');

      setSuccess('');


      try {

        const config =
          configs[level];


        if (
          !config?.startTime
        ) {

          setError(
            `Please select a start time for ${name}.`
          );

          return;

        }


        /*
         * Validate entered date.
         */

        const isoStartTime =
          toISOStringFromLocal(
            config.startTime
          );


        if (!isoStartTime) {

          setError(
            `Invalid start time selected for ${name}.`
          );

          return;

        }


        console.log(
          `[Level ${level}] Local time:`,
          config.startTime
        );


        console.log(
          `[Level ${level}] Sending UTC:`,
          isoStartTime
        );


        /*
         * Send ISO UTC to backend.
         *
         * MongoDB will store the correct
         * absolute point in time.
         */

        const response =
          await axios.post(
            `${API_URL}/api/levels/set-time`,
            {
              level,
              levelName: name,

              startTime:
                isoStartTime,

              duration: 30,

              maxMarks: 20
            },
            {
              timeout: 10000
            }
          );


        console.log(
          `[Level ${level}] Save response:`,
          response.data
        );


        setSuccess(
          `${name} start time saved successfully.`
        );


        /*
         * Re-fetch from backend.
         *
         * This verifies that the exact saved
         * value is being displayed correctly.
         */

        await fetchConfigs();


      } catch (saveError) {

        console.error(
          `[Level ${level} Save Error]:`,
          saveError
        );


        setError(
          saveError.response?.data?.error ||
          saveError.message ||
          `Unable to save ${name} start time.`
        );

      } finally {

        setSaving(null);

      }

    };


  return (

    <div className="min-h-screen bg-[#F7F8FA]">

      <div className="ml-64">


        {/* ================================ */}
        {/* HEADER */}
        {/* ================================ */}

        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

          <div>

            <h1 className="text-xl font-semibold text-slate-900">
              Level Settings
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              Configure level start times and scoring windows
            </p>

          </div>


          <button
            onClick={fetchConfigs}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 disabled:opacity-50"
          >

            <RefreshCw
              className={`w-4 h-4 ${
                loading
                  ? 'animate-spin'
                  : ''
              }`}
            />

            Refresh

          </button>

        </header>


        <main className="p-8">

          <div className="max-w-4xl">


            {/* ================================ */}
            {/* ERROR */}
            {/* ================================ */}

            {error && (

              <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">

                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />

                <div>

                  <div className="text-sm font-medium text-red-700">
                    Error
                  </div>

                  <div className="text-xs text-red-600 mt-1">
                    {error}
                  </div>

                </div>

              </div>

            )}


            {/* ================================ */}
            {/* SUCCESS */}
            {/* ================================ */}

            {success && (

              <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">

                <CheckCircle2 className="w-5 h-5 text-emerald-600" />

                <div className="text-sm text-emerald-700">
                  {success}
                </div>

              </div>

            )}


            {/* ================================ */}
            {/* RULES */}
            {/* ================================ */}

            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">

              <div className="flex items-center gap-2">

                <Clock className="w-4 h-4 text-cyan-600" />

                <h2 className="font-semibold text-slate-900">
                  Scoring Rules
                </h2>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">


                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">

                  <div className="text-[10px] font-mono text-emerald-600">
                    0–15 MIN
                  </div>

                  <div className="text-sm font-semibold mt-1 text-slate-800">
                    No deduction
                  </div>

                </div>


                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">

                  <div className="text-[10px] font-mono text-amber-600">
                    15–25 MIN
                  </div>

                  <div className="text-sm font-semibold mt-1 text-slate-800">
                    −2 marks
                  </div>

                </div>


                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">

                  <div className="text-[10px] font-mono text-red-600">
                    25–30 MIN
                  </div>

                  <div className="text-sm font-semibold mt-1 text-slate-800">
                    −5 marks
                  </div>

                </div>


              </div>


              <p className="text-xs text-slate-400 mt-4">
                Every level has a maximum duration of 30 minutes.
                After 30 minutes, the level awards 0 marks.
              </p>


              <div className="mt-3 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg">

                <p className="text-[10px] font-mono text-slate-500">
                  TIMEZONE: LOCAL BROWSER TIME
                </p>

                <p className="text-[10px] text-slate-400 mt-1">
                  The selected local time is converted to UTC before being stored in MongoDB and converted back to local time when displayed.
                </p>

              </div>

            </div>


            {/* ================================ */}
            {/* LEVELS */}
            {/* ================================ */}

            <div className="space-y-4">


              {LEVELS.map(
                (level) => {

                  const config =
                    configs[
                      level.level
                    ];


                  /*
                   * IMPORTANT:
                   *
                   * Convert backend ISO Date
                   * into local datetime-local.
                   */

                  const inputValue =
                    config?.startTime
                      ? toLocalDateTimeInput(
                          config.startTime
                        )
                      : '';


                  return (

                    <div
                      key={
                        level.level
                      }
                      className="bg-white border border-slate-200 rounded-xl p-5"
                    >


                      {/* LEVEL HEADER */}

                      <div className="flex items-center justify-between">


                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center font-mono text-xs text-cyan-700">

                            {level.level}

                          </div>


                          <div>

                            <div className="font-semibold text-slate-900">

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


                      {/* INPUT */}

                      <div className="mt-5 flex flex-col md:flex-row gap-3">


                        <input
                          type="datetime-local"
                          value={
                            inputValue
                          }
                          onChange={
                            (e) =>
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
                            saving ===
                            level.level
                          }
                          className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50"
                        >

                          {saving ===
                          level.level ? (

                            <RefreshCw className="w-4 h-4 animate-spin" />

                          ) : (

                            <Save className="w-4 h-4" />

                          )}


                          {saving ===
                          level.level
                            ? 'Saving...'
                            : 'Save Start Time'}

                        </button>


                      </div>


                      {/* STORED TIME PREVIEW */}

                      {config?.startTime && (

                        <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">

                          <div className="text-[9px] font-mono uppercase text-slate-400">
                            Saved Local Time
                          </div>

                          <div className="text-xs font-medium text-slate-700 mt-1">
                            {toLocalDateTimeInput(
                              config.startTime
                            ).replace(
                              'T',
                              ' '
                            )}
                          </div>

                          <div className="text-[9px] font-mono text-slate-400 mt-2">
                            Server UTC: {new Date(
                              config.startTime
                            ).toISOString()}
                          </div>

                        </div>

                      )}


                      <div className="mt-3 text-[10px] font-mono text-slate-400">
                        DURATION: 30 MINUTES
                      </div>

                    </div>

                  );

                }
              )}

            </div>

          </div>

        </main>

      </div>

    </div>

  );

}