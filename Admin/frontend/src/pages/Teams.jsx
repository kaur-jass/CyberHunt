import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Search,
  Users,
  ChevronRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

import TeamProgress from '../components/TeamProgress';

const API_URL =
  import.meta.env.VITE_ADMIN_API_URL ||
  'http://localhost:6000';

export default function Teams() {

  const [teams, setTeams] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchTeams = async () => {

    try {

      setError('');

      /*
       * Fetch actual registered teams
       * from Team collection.
       */
      const teamsResponse = await axios.get(
        `${API_URL}/api/teams`
      );

      /*
       * Fetch evaluated leaderboard data.
       */
      const leaderboardResponse = await axios.get(
        `${API_URL}/api/leaderboard`
      );

      const registeredTeams =
        teamsResponse.data.teams || [];

      const leaderboard =
        leaderboardResponse.data.leaderboard || [];

      /*
       * Merge Team data with leaderboard data
       * using teamId.
       */
      const mergedTeams =
        registeredTeams.map((team) => {

          const leaderboardData =
            leaderboard.find(
              (item) =>
                item.teamId === team.teamId
            );

          return {
            ...team,

            /*
             * Evaluation data
             */
            completedLevels:
              leaderboardData?.completedLevels || 0,

            totalMarks:
              leaderboardData?.totalMarks || 0,

            totalTime:
              leaderboardData?.totalTime || 0,

            progress:
              leaderboardData?.progress || [],

            rank:
              leaderboardData?.rank || null,

            status:
              leaderboardData?.status || 'NOT STARTED'
          };

        });

      setTeams(mergedTeams);

      /*
       * Keep selected team updated after refresh.
       */
      if (selected) {

        const updatedSelected =
          mergedTeams.find(
            (team) =>
              team.teamId ===
              selected.teamId
          );

        if (updatedSelected) {
          setSelected(updatedSelected);
        }

      }

    } catch (error) {

      console.error(
        '[Teams Fetch Error]:',
        error
      );

      setError(
        error.response?.data?.error ||
        'Unable to fetch team data.'
      );

    } finally {

      setLoading(false);
      setRefreshing(false);

    }
  };


  useEffect(() => {

    fetchTeams();

    /*
     * Automatically refresh during event.
     * This keeps progress and scores live.
     */
    const interval =
      setInterval(
        fetchTeams,
        15000
      );

    return () =>
      clearInterval(interval);

  }, []);


  const handleRefresh = async () => {

    setRefreshing(true);

    await fetchTeams();

  };


  const filteredTeams =
    teams.filter((team) => {

      const leaderName =
        team.leaderName ||
        (
          team.members &&
          team.members.length > 0
            ? team.members[0].name
            : ''
        );

      const value =
        `${team.teamName || ''}
         ${team.teamId || ''}
         ${leaderName || ''}`
          .toLowerCase();

      return value.includes(
        search.toLowerCase()
      );

    });


  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      <div className="ml-64">

        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

          <div>

            <h1 className="text-xl font-semibold text-slate-900">
              Teams
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              Registered participants and live evaluation progress
            </p>

          </div>

          <button
            onClick={handleRefresh}
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
              ? 'Refreshing...'
              : 'Refresh'}

          </button>

        </header>


        <main className="p-8">

          {/* Error */}
          {error && (

            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">

              <AlertCircle className="w-5 h-5 text-red-500" />

              <div>

                <div className="text-sm font-medium text-red-700">
                  Unable to load team data
                </div>

                <div className="text-xs text-red-500 mt-1">
                  {error}
                </div>

              </div>

            </div>

          )}


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


            {/* ================================================= */}
            {/* TEAM LIST */}
            {/* ================================================= */}

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

              {/* Search */}
              <div className="p-4 border-b border-slate-200">

                <div className="relative">

                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search team, ID or leader..."
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-cyan-500"
                  />

                </div>

              </div>


              {/* Team count */}
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">

                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Registered Teams
                </span>

                <span className="text-xs font-mono font-semibold text-cyan-700">
                  {filteredTeams.length}
                </span>

              </div>


              {/* Team List */}
              <div className="max-h-[650px] overflow-y-auto">

                {loading ? (

                  <div className="p-10 text-center">

                    <RefreshCw className="w-5 h-5 mx-auto text-slate-300 animate-spin" />

                    <p className="text-xs text-slate-400 mt-3">
                      Loading teams...
                    </p>

                  </div>

                ) : filteredTeams.length === 0 ? (

                  <div className="p-10 text-center">

                    <Users className="w-7 h-7 mx-auto text-slate-300" />

                    <p className="text-xs text-slate-400 mt-2">
                      No teams found
                    </p>

                  </div>

                ) : (

                  filteredTeams.map((team) => {

                    const leaderName =
                      team.leaderName ||
                      (
                        team.members &&
                        team.members.length > 0
                          ? team.members[0].name
                          : 'N/A'
                      );

                    const isSelected =
                      selected?.teamId ===
                      team.teamId;

                    return (

                      <button
                        key={team.teamId}
                        onClick={() =>
                          setSelected(team)
                        }
                        className={`w-full text-left px-4 py-4 border-b border-slate-100 hover:bg-slate-50 transition ${
                          isSelected
                            ? 'bg-cyan-50 border-l-2 border-l-cyan-600'
                            : ''
                        }`}
                      >

                        {/* Team Header */}
                        <div className="flex justify-between items-center">

                          <div className="min-w-0">

                            <div className="font-medium text-sm text-slate-900 truncate">
                              {team.teamName}
                            </div>

                            <div className="text-[10px] font-mono text-slate-400 mt-1">
                              {team.teamId}
                            </div>

                          </div>

                          <ChevronRight
                            className={`w-4 h-4 shrink-0 ${
                              isSelected
                                ? 'text-cyan-600'
                                : 'text-slate-300'
                            }`}
                          />

                        </div>


                        {/* Leader */}
                        <div className="mt-3">

                          <div className="text-[9px] font-mono uppercase text-slate-400">
                            Team Leader
                          </div>

                          <div className="text-xs text-slate-600 mt-1 truncate">
                            {leaderName}
                          </div>

                        </div>


                        {/* Progress */}
                        <div className="flex items-center justify-between mt-3">

                          <span className="text-[10px] font-mono text-slate-400">
                            LEVELS{' '}
                            {team.completedLevels || 0}
                            /5
                          </span>

                          <span className="text-xs font-bold text-cyan-700">
                            {team.totalMarks || 0}
                            <span className="text-slate-400 font-normal">
                              {' '}/ 100
                            </span>
                          </span>

                        </div>


                        {/* Progress Bar */}
                        <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-cyan-500 transition-all"
                            style={{
                              width: `${Math.min(
                                100,
                                (
                                  (team.totalMarks || 0) /
                                  100
                                ) * 100
                              )}%`
                            }}
                          />

                        </div>

                      </button>

                    );

                  })

                )}

              </div>

            </div>


            {/* ================================================= */}
            {/* TEAM DETAILS */}
            {/* ================================================= */}

            <div className="lg:col-span-2">

              <TeamProgress
                team={selected}
              />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}