import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users,
  Trophy,
  Flag,
  Activity,
  RefreshCw
} from 'lucide-react';

import LeaderboardTable from '../components/LeaderboardTable';
import LevelTimer from '../components/LevelTimer';

const API_URL =
  import.meta.env.VITE_ADMIN_API_URL ||
  'http://localhost:6000';

export default function Dashboard() {

  const [leaderboard, setLeaderboard] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {

    try {

      const [
        leaderboardRes,
        levelsRes
      ] = await Promise.all([
        axios.get(
          `${API_URL}/api/leaderboard`
        ),
        axios.get(
          `${API_URL}/api/levels`
        )
      ]);

      setLeaderboard(
        leaderboardRes.data.leaderboard || []
      );

      setLevels(
        levelsRes.data || []
      );

    } catch (error) {

      console.error(
        'Dashboard fetch error:',
        error
      );

    } finally {

      setLoading(false);

    }
  };

  const refresh = async () => {

    setRefreshing(true);

    try {

      await axios.post(
        `${API_URL}/api/leaderboard/refresh`
      );

      await fetchData();

    } catch (error) {

      console.error(error);

    } finally {

      setRefreshing(false);

    }
  };

  useEffect(() => {

    fetchData();

    const interval =
      setInterval(fetchData, 30000);

    return () =>
      clearInterval(interval);

  }, []);

  const totalTeams =
    leaderboard.length;

  const completedTeams =
    leaderboard.filter(
      (team) =>
        team.completedLevels >= 5
    ).length;

  const highestScore =
    leaderboard.length
      ? Math.max(
          ...leaderboard.map(
            (team) =>
              team.totalMarks || 0
          )
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <div className="ml-64">

        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

          <div>

            <h1 className="text-xl font-semibold">
              Event Dashboard
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              CYBER HUNT 2026 / ADMIN CONTROL
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

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <div className="flex justify-between">

                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  Registered Teams
                </div>

                <Users className="w-4 h-4 text-slate-400" />

              </div>

              <div className="text-2xl font-bold mt-3">
                {totalTeams}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <div className="flex justify-between">

                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  Completed Teams
                </div>

                <Flag className="w-4 h-4 text-emerald-500" />

              </div>

              <div className="text-2xl font-bold mt-3">
                {completedTeams}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <div className="flex justify-between">

                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  Highest Score
                </div>

                <Trophy className="w-4 h-4 text-amber-500" />

              </div>

              <div className="text-2xl font-bold mt-3 text-cyan-700">
                {highestScore}
                <span className="text-sm text-slate-400">
                  /100
                </span>
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <div className="flex justify-between">

                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  System
                </div>

                <Activity className="w-4 h-4 text-emerald-500" />

              </div>

              <div className="text-lg font-bold mt-3 text-emerald-600">
                ONLINE
              </div>

            </div>

          </div>

          {/* Level Timers */}
          <div className="mb-8">

            <div className="mb-4">

              <h2 className="font-semibold">
                Level Control
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Current 30-minute windows
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

              {levels.map((level) => (

                <LevelTimer
                  key={level.level}
                  level={level.level}
                  levelName={level.levelName}
                  startTime={level.startTime}
                />

              ))}

            </div>

          </div>

          {/* Leaderboard */}
          <LeaderboardTable
            teams={leaderboard}
          />

        </main>

      </div>

    </div>
  );
}