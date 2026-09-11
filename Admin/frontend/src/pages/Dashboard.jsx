import React, {
  useEffect,
  useMemo,
  useState
} from 'react';

import axios from 'axios';

import {
  Users,
  Trophy,
  Flag,
  Activity,
  RefreshCw,
  Clock,
  Target,
  ChevronDown
} from 'lucide-react';


const API_URL =
  import.meta.env.VITE_ADMIN_API_URL ||
  'http://localhost:5006';


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


const MAX_ATTEMPTS = 5;
const MAX_LEVEL_MARKS = 20;
const MAX_TOTAL_MARKS = 120;


/* -------------------------------- */
/* Helper Functions */
/* -------------------------------- */

function getLeaderName(team) {

  if (team?.leaderName) {
    return team.leaderName;
  }

  if (team?.teamLeader) {
    return team.teamLeader;
  }

  if (
    Array.isArray(team?.members) &&
    team.members.length > 0
  ) {
    return (
      team.members[0]?.name ||
      'N/A'
    );
  }

  return 'N/A';
}


/*
 * Get progress for a particular level.
 */
function getLevelProgress(
  team,
  level
) {

  if (
    !team ||
    !Array.isArray(team.progress)
  ) {
    return null;
  }

  return (
    team.progress.find(
      item =>
        Number(item.level) ===
        Number(level)
    ) || null
  );
}


/*
 * Get marks for a level.
 */
function getLevelMarks(
  team,
  level
) {

  const progress =
    getLevelProgress(
      team,
      level
    );

  if (!progress) {
    return 0;
  }

  return Number(
    progress.marks || 0
  );
}


/*
 * Get total marks directly from
 * leaderboard document.
 *
 * Fallback is calculated from progress
 * in case old leaderboard data does not
 * contain totalMarks.
 */
function getTotalMarks(team) {

  if (
    team?.totalMarks !==
      undefined &&
    team?.totalMarks !== null
  ) {
    return Number(
      team.totalMarks
    );
  }

  if (
    !Array.isArray(
      team?.progress
    )
  ) {
    return 0;
  }

  return team.progress.reduce(
    (
      total,
      item
    ) =>
      total +
      Number(
        item?.marks || 0
      ),
    0
  );
}


/*
 * Completed levels should come from
 * leaderboard.completedLevels.
 *
 * Fallback uses completedAt because a
 * level can theoretically have 0 marks
 * but still be completed.
 */
function getCompletedLevels(
  team
) {

  if (
    team?.completedLevels !==
      undefined &&
    team?.completedLevels !== null
  ) {
    return Number(
      team.completedLevels
    );
  }

  if (
    !Array.isArray(
      team?.progress
    )
  ) {
    return 0;
  }

  return team.progress.filter(
    item =>
      item?.completedAt
  ).length;
}


/*
 * Attempts stored by evaluator.
 */
function getAttempts(
  progress
) {

  if (!progress) {
    return 0;
  }

  return Number(
    progress.attempts || 0
  );
}


/*
 * Backend now stores wrongAttempts.
 *
 * Fallback:
 * wrongAttempts = attempts - 1
 */
function getWrongAttempts(
  progress
) {

  if (!progress) {
    return 0;
  }

  if (
    progress.wrongAttempts !==
      undefined &&
    progress.wrongAttempts !==
      null
  ) {
    return Number(
      progress.wrongAttempts
    );
  }

  const attempts =
    getAttempts(
      progress
    );

  return Math.max(
    0,
    attempts - 1
  );
}


/*
 * Backend now stores attemptsLeft.
 *
 * Fallback:
 * attemptsLeft = 5 - attempts
 */
function getAttemptsLeft(
  progress
) {

  if (!progress) {
    return MAX_ATTEMPTS;
  }

  if (
    progress.attemptsLeft !==
      undefined &&
    progress.attemptsLeft !==
      null
  ) {
    return Math.max(
      0,
      Number(
        progress.attemptsLeft
      )
    );
  }

  const attempts =
    getAttempts(
      progress
    );

  return Math.max(
    0,
    MAX_ATTEMPTS -
      attempts
  );
}


/*
 * Format date/time.
 */
function formatTime(
  value
) {

  if (!value) {
    return '--';
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return '--';
  }

  return date.toLocaleTimeString(
    'en-IN',
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }
  );
}


/*
 * Format duration in seconds.
 */
function formatDuration(
  seconds
) {

  if (
    seconds ===
      null ||
    seconds ===
      undefined ||
    seconds === ''
  ) {
    return '--';
  }

  const numericSeconds =
    Number(seconds);

  if (
    Number.isNaN(
      numericSeconds
    )
  ) {
    return '--';
  }

  const totalSeconds =
    Math.max(
      0,
      Math.floor(
        numericSeconds
      )
    );

  const minutes =
    Math.floor(
      totalSeconds / 60
    );

  const remainingSeconds =
    totalSeconds % 60;

  return `${minutes}m ${String(
    remainingSeconds
  ).padStart(
    2,
    '0'
  )}s`;
}


/*
 * IMPORTANT:
 *
 * QR scan time must only be shown
 * if the backend actually stores it.
 *
 * New level collections currently
 * contain submittedAt but not scannedAt.
 *
 * Therefore:
 *
 * scannedAt / scanTime -> actual scan
 * otherwise -> null
 *
 * We do NOT create a fake scan time.
 */
function getScanTime(
  progress
) {

  if (!progress) {
    return null;
  }

  return (
    progress.scannedAt ||
    progress.scanTime ||
    null
  );
}


/* -------------------------------- */
/* Dashboard */
/* -------------------------------- */

export default function Dashboard() {

  const [
    registeredTeams,
    setRegisteredTeams
  ] = useState([]);


  const [
    leaderboard,
    setLeaderboard
  ] = useState([]);


  const [
    levels,
    setLevels
  ] = useState([]);


  const [
    activeTab,
    setActiveTab
  ] = useState(
    'overall'
  );


  const [
    selectedLevel,
    setSelectedLevel
  ] = useState(0);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    refreshing,
    setRefreshing
  ] = useState(false);


  const [
    error,
    setError
  ] = useState('');


  const [
    successMessage,
    setSuccessMessage
  ] = useState('');


  /* -------------------------------- */
  /* Fetch Registered Teams */
  /* -------------------------------- */

  const fetchTeams =
    async () => {

      const response =
        await axios.get(
          `${API_URL}/api/teams/all`
        );

      const data =
        response.data;

      /*
       * Current backend:
       * {
       *   success: true,
       *   teams: [...]
       * }
       *
       * Fallbacks are kept so old data
       * does not break the dashboard.
       */

      const teams =
        Array.isArray(data)
          ? data
          : Array.isArray(
              data?.teams
            )
          ? data.teams
          : Array.isArray(
              data?.data
            )
          ? data.data
          : [];

      setRegisteredTeams(
        teams
      );
    };


  /* -------------------------------- */
  /* Fetch Leaderboard */
  /* -------------------------------- */

  const fetchLeaderboard =
    async () => {

      const response =
        await axios.get(
          `${API_URL}/api/leaderboard`
        );

      const data =
        response.data;

      const leaderboardData =
        Array.isArray(data)
          ? data
          : Array.isArray(
              data?.leaderboard
            )
          ? data.leaderboard
          : Array.isArray(
              data?.data
            )
          ? data.data
          : [];

      setLeaderboard(
        leaderboardData
      );
    };


  /* -------------------------------- */
  /* Fetch Level Config */
  /* -------------------------------- */

  const fetchLevels =
    async () => {

      const response =
        await axios.get(
          `${API_URL}/api/levels`
        );

      const data =
        response.data;

      /*
       * Supports both:
       *
       * [...]
       *
       * and:
       *
       * {
       *   levels: [...]
       * }
       */

      const levelData =
        Array.isArray(data)
          ? data
          : Array.isArray(
              data?.levels
            )
          ? data.levels
          : [];

      setLevels(
        levelData
      );
    };


  /* -------------------------------- */
  /* Fetch Everything */
  /* -------------------------------- */

  const fetchData =
    async () => {

      try {

        setError('');

        await Promise.all([
          fetchTeams(),
          fetchLeaderboard(),
          fetchLevels()
        ]);

      } catch (error) {

        console.error(
          '[Dashboard Fetch Error]:',
          error
        );

        setError(
          error.response?.data
            ?.error ||
          error.message ||
          'Unable to fetch dashboard data.'
        );

      } finally {

        setLoading(false);
      }
    };


  /* -------------------------------- */
  /* Manual Refresh */
  /* -------------------------------- */

  const refresh =
    async () => {

      try {

        setRefreshing(true);

        setError('');

        setSuccessMessage('');

        /*
         * IMPORTANT:
         *
         * Dashboard DOES NOT call
         * Level APIs.
         *
         * Admin backend handles:
         *
         * Level APIs
         *       ↓
         * Level0-Level5 collections
         *       ↓
         * evaluateTeam()
         *       ↓
         * Leaderboard
         */

        const response =
          await axios.post(
            `${API_URL}/api/leaderboard/refresh`
          );

        if (
          response.data?.success ===
          false
        ) {
          throw new Error(
            response.data?.error ||
            'Unable to refresh leaderboard.'
          );
        }

        /*
         * Fetch freshly saved
         * leaderboard data.
         */

        await fetchData();

        setSuccessMessage(
          `Leaderboard refreshed successfully. ${
            response.data?.successful ??
            0
          } team(s) evaluated.`
        );

      } catch (error) {

        console.error(
          '[Refresh Error]:',
          error
        );

        setError(
          error.response?.data
            ?.error ||
          error.message ||
          'Unable to refresh leaderboard.'
        );

      } finally {

        setRefreshing(false);
      }
    };


  /* -------------------------------- */
  /* Initial Load + Auto Refresh */
  /* -------------------------------- */

  useEffect(() => {

    fetchData();

    const interval =
      setInterval(
        fetchData,
        30000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);


  /* -------------------------------- */
  /* Overall Leaderboard */
  /* -------------------------------- */

  const overallTeams =
  useMemo(() => {

    const leaderboardMap =
      new Map(
        leaderboard.map(
          team => [
            team.teamId,
            team
          ]
        )
      );

    const mergedTeams =
      registeredTeams.map(
        team => {

          const leaderboardData =
            leaderboardMap.get(
              team.teamId
            );

          return {
            ...team,

            totalMarks:
              leaderboardData?.totalMarks ??
              0,

            completedLevels:
              leaderboardData?.completedLevels ??
              0,

            totalTime:
              leaderboardData?.totalTime ??
              0,

            progress:
              leaderboardData?.progress ??
              [],

            updatedAt:
              leaderboardData?.updatedAt ??
              null
          };
        }
      );

    return mergedTeams.sort(
      (a, b) => {

        const scoreA =
          getTotalMarks(a);

        const scoreB =
          getTotalMarks(b);

        /*
         * Higher score first
         */
        if (
          scoreA !== scoreB
        ) {
          return (
            scoreB -
            scoreA
          );
        }

        const completedA =
          getCompletedLevels(a);

        const completedB =
          getCompletedLevels(b);

        /*
         * More completed levels first
         */
        if (
          completedA !==
          completedB
        ) {
          return (
            completedB -
            completedA
          );
        }

        const timeA =
          Number(
            a.totalTime || 0
          );

        const timeB =
          Number(
            b.totalTime || 0
          );

        /*
         * Teams with no activity
         * go below active teams.
         */
        if (
          timeA === 0 &&
          timeB !== 0
        ) {
          return 1;
        }

        if (
          timeB === 0 &&
          timeA !== 0
        ) {
          return -1;
        }

        return (
          timeA -
          timeB
        );
      }
    );

  }, [
    registeredTeams,
    leaderboard
  ]);


  /* -------------------------------- */
  /* Level-wise Leaderboard */
  /* -------------------------------- */

  const levelTeams =
    useMemo(() => {

      return leaderboard

        .map(
          team => {

            const progress =
              getLevelProgress(
                team,
                selectedLevel
              );

            return {
              ...team,
              selectedProgress:
                progress
            };
          }
        )

        .filter(
          team =>
            team.selectedProgress
        )

        .sort(
          (a, b) => {

            const progressA =
              a.selectedProgress;

            const progressB =
              b.selectedProgress;

            const marksA =
              Number(
                progressA?.marks ||
                0
              );

            const marksB =
              Number(
                progressB?.marks ||
                0
              );

            /*
             * Higher marks first.
             */

            if (
              marksA !==
              marksB
            ) {
              return (
                marksB -
                marksA
              );
            }

            /*
             * Lower time first.
             */

            const timeA =
              progressA?.completedAt
                ? Number(
                    progressA.timeTaken ||
                    999999
                  )
                : 999999;

            const timeB =
              progressB?.completedAt
                ? Number(
                    progressB.timeTaken ||
                    999999
                  )
                : 999999;

            return (
              timeA -
              timeB
            );
          }
        );

    }, [
      leaderboard,
      selectedLevel
    ]);


  /* -------------------------------- */
  /* Statistics */
  /* -------------------------------- */

  const totalTeams =
    registeredTeams.length;


  const completedTeams =
    leaderboard.filter(
      team =>
        getCompletedLevels(
          team
        ) >= 6
    ).length;


  const highestScore =
    overallTeams.length > 0
      ? Math.max(
          ...overallTeams.map(
            team =>
              getTotalMarks(
                team
              )
          )
        )
      : 0;


  const currentLevel =
    LEVELS.find(
      level =>
        level.level ===
        selectedLevel
    );


  /* -------------------------------- */
  /* Render */
  /* -------------------------------- */

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <div className="ml-64">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

          <div>

            <h1 className="text-xl font-semibold text-slate-900">
              Event Dashboard
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              CYBER HUNT 2026 / LIVE EVALUATION
            </p>

          </div>


          <button
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm hover:bg-slate-800 disabled:opacity-50"
          >

            <RefreshCw
              className={`w-4 h-4 ${
                refreshing
                  ? 'animate-spin'
                  : ''
              }`}
            />

            {refreshing
              ? 'Updating...'
              : 'Refresh Data'}

          </button>

        </header>


        <main className="p-8">

          {/* ================================= */}
          {/* ERROR */}
          {/* ================================= */}

          {error && (

            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-5 py-4">

              <div className="flex items-center gap-2 text-sm font-semibold text-red-700">

                <Activity className="w-4 h-4" />

                Unable to load dashboard data

              </div>

              <div className="text-xs text-red-500 mt-1">
                {error}
              </div>

            </div>

          )}


          {/* ================================= */}
          {/* SUCCESS */}
          {/* ================================= */}

          {successMessage && (

            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">

              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">

                <Activity className="w-4 h-4" />

                {successMessage}

              </div>

            </div>

          )}


          {/* ================================= */}
          {/* STATISTICS */}
          {/* ================================= */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

            {/* Registered Teams */}

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  Registered Teams
                </div>

                <Users className="w-4 h-4 text-slate-400" />

              </div>

              <div className="text-2xl font-bold text-slate-900 mt-3">

                {totalTeams}

              </div>

            </div>


            {/* Completed Teams */}

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  Completed Teams
                </div>

                <Flag className="w-4 h-4 text-emerald-500" />

              </div>

              <div className="text-2xl font-bold text-slate-900 mt-3">

                {completedTeams}

              </div>

            </div>


            {/* Highest Score */}

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  Highest Score
                </div>

                <Trophy className="w-4 h-4 text-amber-500" />

              </div>

              <div className="text-2xl font-bold text-cyan-700 mt-3">

                {highestScore}

                <span className="text-sm text-slate-400 ml-1">
                  /120
                </span>

              </div>

            </div>


            {/* System */}

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  System
                </div>

                <Activity className="w-4 h-4 text-emerald-500" />

              </div>

              <div className="text-lg font-bold text-emerald-600 mt-3">
                ONLINE
              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* LEADERBOARD */}
          {/* ================================= */}

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">


            {/* ================================= */}
            {/* TABS */}
            {/* ================================= */}

            <div className="border-b border-slate-200 px-6 pt-5">

              <div className="flex gap-1">

                <button
                  onClick={() =>
                    setActiveTab(
                      'overall'
                    )
                  }
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition ${
                    activeTab === 'overall'
                      ? 'text-cyan-700 border-cyan-600'
                      : 'text-slate-400 border-transparent hover:text-slate-700'
                  }`}
                >

                  <Trophy className="w-4 h-4" />

                  Overall Leaderboard

                </button>


                <button
                  onClick={() =>
                    setActiveTab(
                      'level'
                    )
                  }
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition ${
                    activeTab === 'level'
                      ? 'text-cyan-700 border-cyan-600'
                      : 'text-slate-400 border-transparent hover:text-slate-700'
                  }`}
                >

                  <Target className="w-4 h-4" />

                  Level-wise Leaderboard

                </button>

              </div>

            </div>


            {/* ================================= */}
            {/* OVERALL */}
            {/* ================================= */}

            {activeTab === 'overall' && (

              <div>

                <div className="px-6 py-5 flex items-center justify-between">

                  <div>

                    <h2 className="font-semibold text-slate-900">
                      Overall Standings
                    </h2>

                    <p className="text-xs text-slate-400 mt-1">
                      Ranked by total marks and total completion time
                    </p>

                  </div>


                  <div className="text-[10px] font-mono text-slate-400">
                    6 LEVELS / 120 MAX MARKS
                  </div>

                </div>


                <div className="overflow-x-auto">

                  <table className="w-full text-sm">

                    <thead>

                      <tr className="bg-slate-50 border-y border-slate-200">

                        <th className="px-5 py-3 text-left text-[10px] font-mono text-slate-400 uppercase">
                          Rank
                        </th>

                        <th className="px-5 py-3 text-left text-[10px] font-mono text-slate-400 uppercase">
                          Team Name
                        </th>

                        <th className="px-5 py-3 text-left text-[10px] font-mono text-slate-400 uppercase">
                          Team Leader
                        </th>

                        <th className="px-5 py-3 text-left text-[10px] font-mono text-slate-400 uppercase">
                          Team ID
                        </th>

                        {LEVELS.map(
                          level => (

                            <th
                              key={
                                level.level
                              }
                              className="px-5 py-3 text-center text-[10px] font-mono text-slate-400 uppercase"
                            >
                              L{
                                level.level
                              }
                            </th>

                          )
                        )}

                        <th className="px-5 py-3 text-center text-[10px] font-mono text-slate-900 uppercase whitespace-nowrap">
                          Total Score
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {loading ? (

                        <tr>

                          <td
                            colSpan="11"
                            className="py-16 text-center text-sm text-slate-400"
                          >
                            Loading leaderboard...
                          </td>

                        </tr>

                      ) : overallTeams.length === 0 ? (

                        <tr>

                          <td
                            colSpan="11"
                            className="py-16 text-center text-sm text-slate-400"
                          >
                            No leaderboard data available.
                          </td>

                        </tr>

                      ) : (

                        overallTeams.map(
                          (
                            team,
                            index
                          ) => (

                            <tr
                              key={
                                team.teamId
                              }
                              className="border-b border-slate-100 hover:bg-slate-50 transition"
                            >

                              {/* Rank */}

                              <td className="px-5 py-4">

                                <span
                                  className={`font-mono text-xs font-semibold ${
                                    index === 0
                                      ? 'text-amber-500'
                                      : index === 1
                                      ? 'text-slate-500'
                                      : index === 2
                                      ? 'text-orange-600'
                                      : 'text-slate-400'
                                  }`}
                                >

                                  #{
                                    index +
                                    1
                                  }

                                </span>

                              </td>


                              {/* Team */}

                              <td className="px-5 py-4">

                                <div className="font-medium text-slate-900">

                                  {
                                    team.teamName
                                  }

                                </div>

                              </td>


                              {/* Leader */}

                              <td className="px-5 py-4 text-slate-600">

                                {
                                  getLeaderName(
                                    team
                                  )
                                }

                              </td>


                              {/* ID */}

                              <td className="px-5 py-4">

                                <span className="font-mono text-xs text-slate-500">

                                  {
                                    team.teamId
                                  }

                                </span>

                              </td>


                              {/* Level Scores */}

                              {LEVELS.map(
                                level => {

                                  const marks =
                                    getLevelMarks(
                                      team,
                                      level.level
                                    );

                                  return (

                                    <td
                                      key={
                                        level.level
                                      }
                                      className="px-5 py-4 text-center"
                                    >

                                      {marks >
                                      0 ? (

                                        <span className="inline-flex min-w-[32px] justify-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-mono text-xs font-semibold">

                                          {
                                            marks
                                          }

                                        </span>

                                      ) : (

                                        <span className="text-slate-300">
                                          —
                                        </span>

                                      )}

                                    </td>

                                  );

                                }
                              )}


                              {/* Total */}

                              <td className="px-5 py-4 text-center">

                                <span className="inline-flex px-3 py-1.5 rounded-md bg-slate-900 text-white font-mono text-xs font-semibold">

                                  {
                                    getTotalMarks(
                                      team
                                    )
                                  }

                                </span>

                              </td>

                            </tr>

                          )
                        )

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            )}


            {/* ================================= */}
            {/* LEVEL-WISE */}
            {/* ================================= */}

            {activeTab === 'level' && (

              <div>

                {/* Level Header */}

                <div className="px-6 py-5 flex items-center justify-between">

                  <div>

                    <h2 className="font-semibold text-slate-900">
                      Level-wise Performance
                    </h2>

                    <p className="text-xs text-slate-400 mt-1">
                      Scan time, answer time, attempts and scoring
                    </p>

                  </div>


                  {/* Dropdown */}

                  <div className="relative">

                    <select
                      value={
                        selectedLevel
                      }
                      onChange={e =>
                        setSelectedLevel(
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-cyan-500"
                    >

                      {LEVELS.map(
                        level => (

                          <option
                            key={
                              level.level
                            }
                            value={
                              level.level
                            }
                          >
                            Level{' '}
                            {
                              level.level
                            }{' '}
                            —{' '}
                            {
                              level.name
                            }
                          </option>

                        )
                      )}

                    </select>

                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                  </div>

                </div>


                {/* Selected Level Info */}

                <div className="px-6 pb-5">

                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-md bg-cyan-50 border border-cyan-100 flex items-center justify-center">

                        <Target className="w-4 h-4 text-cyan-600" />

                      </div>

                      <div>

                        <div className="text-[10px] font-mono text-cyan-700">

                          LEVEL{' '}
                          {
                            selectedLevel
                          }

                        </div>

                        <div className="font-semibold text-sm text-slate-800">

                          {
                            currentLevel?.name
                          }

                        </div>

                      </div>

                    </div>


                    <div className="flex items-center gap-6">

                      <div className="text-right">

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Max Marks
                        </div>

                        <div className="text-sm font-semibold text-slate-700">

                          {
                            levels.find(
                              level =>
                                Number(
                                  level.level
                                ) ===
                                selectedLevel
                            )?.maxMarks ??
                            MAX_LEVEL_MARKS
                          }

                        </div>

                      </div>


                      <div className="text-right">

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Duration
                        </div>

                        <div className="text-sm font-semibold text-slate-700">

                          {
                            levels.find(
                              level =>
                                Number(
                                  level.level
                                ) ===
                                selectedLevel
                            )?.duration ??
                            30
                          }{' '}
                          min

                        </div>

                      </div>


                      <div className="text-right">

                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Max Attempts
                        </div>

                        <div className="text-sm font-semibold text-slate-700">

                          {
                            MAX_ATTEMPTS
                          }

                        </div>

                      </div>

                    </div>

                  </div>

                </div>


                {/* Level Table */}

                <div className="overflow-x-auto">

                  <table className="w-full text-sm">

                    <thead>

                      <tr className="bg-slate-50 border-y border-slate-200">

                        <th className="px-5 py-3 text-left text-[10px] font-mono text-slate-400 uppercase">
                          Rank
                        </th>

                        <th className="px-5 py-3 text-left text-[10px] font-mono text-slate-400 uppercase">
                          Team Name
                        </th>

                        <th className="px-5 py-3 text-left text-[10px] font-mono text-slate-400 uppercase">
                          Team Leader
                        </th>

                        <th className="px-5 py-3 text-left text-[10px] font-mono text-slate-400 uppercase">
                          Team ID
                        </th>

                        <th className="px-5 py-3 text-center text-[10px] font-mono text-slate-400 uppercase whitespace-nowrap">
                          QR Scan
                        </th>

                        <th className="px-5 py-3 text-center text-[10px] font-mono text-slate-400 uppercase whitespace-nowrap">
                          Answer
                        </th>

                        <th className="px-5 py-3 text-center text-[10px] font-mono text-slate-400 uppercase whitespace-nowrap">
                          Time Taken
                        </th>

                        <th className="px-5 py-3 text-center text-[10px] font-mono text-slate-400 uppercase">
                          Wrong
                        </th>

                        <th className="px-5 py-3 text-center text-[10px] font-mono text-slate-400 uppercase whitespace-nowrap">
                          Attempts Left
                        </th>

                        <th className="px-5 py-3 text-center text-[10px] font-mono text-slate-400 uppercase">
                          Time Penalty
                        </th>

                        <th className="px-5 py-3 text-center text-[10px] font-mono text-slate-400 uppercase">
                          Attempt Penalty
                        </th>

                        <th className="px-5 py-3 text-center text-[10px] font-mono text-slate-900 uppercase">
                          Marks
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {loading ? (

                        <tr>

                          <td
                            colSpan="12"
                            className="py-16 text-center text-sm text-slate-400"
                          >
                            Loading level data...
                          </td>

                        </tr>

                      ) : levelTeams.length === 0 ? (

                        <tr>

                          <td
                            colSpan="12"
                            className="py-16 text-center text-sm text-slate-400"
                          >
                            No activity recorded for this level.
                          </td>

                        </tr>

                      ) : (

                        levelTeams.map(
                          (
                            team,
                            index
                          ) => {

                            const progress =
                              team.selectedProgress;

                            const wrongAttempts =
                              getWrongAttempts(
                                progress
                              );

                            const attemptsLeft =
                              getAttemptsLeft(
                                progress
                              );

                            const scanTime =
                              getScanTime(
                                progress
                              );

                            const answerTime =
                              progress?.completedAt;

                            const timeTaken =
                              Number(
                                progress?.timeTaken ||
                                0
                              );

                            const timePenalty =
                              Number(
                                progress?.timePenalty ||
                                0
                              );

                            const attemptPenalty =
                              Number(
                                progress?.attemptPenalty ||
                                0
                              );

                            const marks =
                              Number(
                                progress?.marks ||
                                0
                              );

                            const attempts =
                              getAttempts(
                                progress
                              );


                            return (

                              <tr
                                key={
                                  team.teamId
                                }
                                className="border-b border-slate-100 hover:bg-slate-50 transition"
                              >

                                {/* Rank */}

                                <td className="px-5 py-4">

                                  <span className="font-mono text-xs font-semibold text-slate-400">

                                    #{
                                      index +
                                      1
                                    }

                                  </span>

                                </td>


                                {/* Team */}

                                <td className="px-5 py-4">

                                  <span className="font-medium text-slate-900">

                                    {
                                      team.teamName
                                    }

                                  </span>

                                </td>


                                {/* Leader */}

                                <td className="px-5 py-4 text-slate-600">

                                  {
                                    getLeaderName(
                                      team
                                    )
                                  }

                                </td>


                                {/* Team ID */}

                                <td className="px-5 py-4">

                                  <span className="font-mono text-xs text-slate-500">

                                    {
                                      team.teamId
                                    }

                                  </span>

                                </td>


                                {/* QR Scan */}

                                <td className="px-5 py-4 text-center">

                                  <span className="text-xs font-mono text-slate-600">

                                    {
                                      formatTime(
                                        scanTime
                                      )
                                    }

                                  </span>

                                </td>


                                {/* Answer */}

                                <td className="px-5 py-4 text-center">

                                  <span className="text-xs font-mono text-slate-600">

                                    {
                                      formatTime(
                                        answerTime
                                      )
                                    }

                                  </span>

                                </td>


                                {/* Time */}

                                <td className="px-5 py-4 text-center">

                                  <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-600">

                                    <Clock className="w-3.5 h-3.5 text-slate-400" />

                                    {
                                      formatDuration(
                                        timeTaken
                                      )
                                    }

                                  </span>

                                </td>


                                {/* Wrong Attempts */}

                                <td className="px-5 py-4 text-center">

                                  <span
                                    className={
                                      wrongAttempts >
                                      0
                                        ? 'inline-flex min-w-[28px] justify-center px-2 py-1 rounded-md bg-red-50 text-red-600 font-mono text-xs font-semibold'
                                        : 'inline-flex min-w-[28px] justify-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-mono text-xs font-semibold'
                                    }
                                  >

                                    {
                                      attempts >
                                      0
                                        ? wrongAttempts
                                        : '--'
                                    }

                                  </span>

                                </td>


                                {/* Attempts Left */}

                                <td className="px-5 py-4 text-center">

                                  <span
                                    className={
                                      attemptsLeft ===
                                      0
                                        ? 'inline-flex min-w-[28px] justify-center px-2 py-1 rounded-md bg-red-50 text-red-600 font-mono text-xs font-semibold'
                                        : 'inline-flex min-w-[28px] justify-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-mono text-xs font-semibold'
                                    }
                                  >

                                    {
                                      attempts >
                                      0
                                        ? attemptsLeft
                                        : '--'
                                    }

                                  </span>

                                </td>


                                {/* Time Penalty */}

                                <td className="px-5 py-4 text-center">

                                  <span className="text-xs font-mono text-orange-600">

                                    {
                                      progress?.completedAt
                                        ? timePenalty
                                        : '--'
                                    }

                                  </span>

                                </td>


                                {/* Attempt Penalty */}

                                <td className="px-5 py-4 text-center">

                                  <span className="text-xs font-mono text-orange-600">

                                    {
                                      progress?.completedAt
                                        ? attemptPenalty
                                        : '--'
                                    }

                                  </span>

                                </td>


                                {/* Marks */}

                                <td className="px-5 py-4 text-center">

                                  <span
                                    className={
                                      marks >
                                      0
                                        ? 'inline-flex px-3 py-1.5 rounded-md bg-cyan-50 text-cyan-700 font-mono text-xs font-bold'
                                        : 'text-slate-300'
                                    }
                                  >

                                    {
                                      marks
                                    }

                                  </span>

                                </td>

                              </tr>

                            );

                          }
                        )

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

          </div>

        </main>

      </div>

    </div>
  );
}