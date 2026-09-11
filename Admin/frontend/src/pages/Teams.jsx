import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import axios from 'axios';

import {
  Search,
  Users,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  X,
  Clock3,
  Trophy,
  User,
  Mail,
  Phone,
  GraduationCap,
  CheckCircle,
  CircleAlert
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


const TOTAL_LEVELS = 6;
const MAX_MARKS = 120;


const formatTime = (seconds) => {

  const value =
    Number(seconds || 0);

  if (!value) {
    return '—';
  }

  const hours =
    Math.floor(value / 3600);

  const minutes =
    Math.floor(
      (value % 3600) / 60
    );

  const secs =
    Math.floor(
      value % 60
    );


  if (hours > 0) {

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  }


  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

};


const formatDateTime = (value) => {

  if (!value) {
    return '—';
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return '—';
  }

  return date.toLocaleString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  );

};


const getLevelData = (
  team,
  levelNumber
) => {

  const progress =
    Array.isArray(team?.progress)
      ? team.progress
      : [];


  return (
    progress.find(
      (item) =>
        Number(item.level) ===
        levelNumber
    ) ||
    progress.find(
      (item) =>
        String(item.levelName || '')
          .toLowerCase() ===
        LEVELS[levelNumber].name.toLowerCase()
    ) ||
    null
  );

};


const getLevelMarks = (
  team,
  levelNumber
) => {

  const levelData =
    getLevelData(
      team,
      levelNumber
    );


  if (!levelData) {
    return 0;
  }


  return Number(
    levelData.marks || 0
  );

};


const getLevelStatus = (
  team,
  levelNumber
) => {

  const levelData =
    getLevelData(
      team,
      levelNumber
    );


  if (!levelData) {
    return 'PENDING';
  }


  if (
    levelData.marks !== undefined &&
    levelData.marks !== null
  ) {

    return 'COMPLETED';

  }


  return 'IN PROGRESS';

};


function LevelCard({
  team,
  level
}) {

  const data =
    getLevelData(
      team,
      level.level
    );


  const marks =
    getLevelMarks(
      team,
      level.level
    );


  const status =
    getLevelStatus(
      team,
      level.level
    );


  const completed =
    status === 'COMPLETED';


  return (

    <div
      className={`border rounded-xl overflow-hidden ${
        completed
          ? 'border-emerald-200'
          : status === 'IN PROGRESS'
          ? 'border-cyan-200'
          : 'border-slate-200'
      }`}
    >

      <div
        className={`px-4 py-3 flex items-center justify-between ${
          completed
            ? 'bg-emerald-50'
            : status === 'IN PROGRESS'
            ? 'bg-cyan-50'
            : 'bg-slate-50'
        }`}
      >

        <div className="flex items-center gap-3">

          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-semibold ${
              completed
                ? 'bg-emerald-100 text-emerald-700'
                : status === 'IN PROGRESS'
                ? 'bg-cyan-100 text-cyan-700'
                : 'bg-white text-slate-500 border border-slate-200'
            }`}
          >
            {level.level}
          </div>


          <div>

            <div className="text-sm font-semibold text-slate-900">
              {level.name}
            </div>

            <div className="text-[9px] font-mono uppercase text-slate-400 mt-0.5">
              Level {level.level}
            </div>

          </div>

        </div>


        <div className="flex items-center gap-2">

          {completed ? (

            <CheckCircle2 className="w-4 h-4 text-emerald-600" />

          ) : status === 'IN PROGRESS' ? (

            <Clock3 className="w-4 h-4 text-cyan-600" />

          ) : (

            <CircleAlert className="w-4 h-4 text-slate-400" />

          )}


          <span
            className={`text-[10px] font-mono ${
              completed
                ? 'text-emerald-600'
                : status === 'IN PROGRESS'
                ? 'text-cyan-600'
                : 'text-slate-400'
            }`}
          >
            {status}
          </span>

        </div>

      </div>


      <div className="bg-white p-4">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div>

            <div className="text-[9px] font-mono uppercase text-slate-400">
              Route
            </div>

            <div className="text-xs font-medium text-slate-700 mt-1">
              {data?.route || '—'}
            </div>

          </div>


          <div>

            <div className="text-[9px] font-mono uppercase text-slate-400">
              Marks
            </div>

            <div className="text-xs font-bold text-cyan-700 mt-1">
              {marks} / 20
            </div>

          </div>


          <div>

            <div className="text-[9px] font-mono uppercase text-slate-400">
              Time Taken
            </div>

            <div className="text-xs font-medium text-slate-700 mt-1">
              {formatTime(data?.timeTaken)}
            </div>

          </div>


          <div>

            <div className="text-[9px] font-mono uppercase text-slate-400">
              Attempts
            </div>

            <div className="text-xs font-medium text-slate-700 mt-1">
              {data
                ? Number(data.attempts || 0)
                : '—'}
            </div>

          </div>

        </div>


        {data && (

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">

            <div>

              <div className="text-[9px] font-mono uppercase text-slate-400">
                QR Scan
              </div>

              <div className="text-[10px] text-slate-600 mt-1">
                {data.scanTime
                  ? formatDateTime(
                      data.scanTime
                    )
                  : data.completedAt &&
                    data.timeTaken
                  ? formatDateTime(
                      new Date(
                        new Date(
                          data.completedAt
                        ).getTime() -
                        Number(
                          data.timeTaken
                        ) *
                          1000
                      )
                    )
                  : '—'}
              </div>

            </div>


            <div>

              <div className="text-[9px] font-mono uppercase text-slate-400">
                Answer
              </div>

              <div className="text-[10px] text-slate-600 mt-1">
                {formatDateTime(
                  data.completedAt
                )}
              </div>

            </div>


            <div>

              <div className="text-[9px] font-mono uppercase text-slate-400">
                Wrong Attempts
              </div>

              <div className="text-xs font-medium text-slate-700 mt-1">
                {Math.max(
                  0,
                  Number(
                    data.attempts || 0
                  ) - 1
                )}
              </div>

            </div>


            <div>

              <div className="text-[9px] font-mono uppercase text-slate-400">
                Penalty
              </div>

              <div className="text-xs font-medium text-red-500 mt-1">
                -
                {Number(
                  data.attemptPenalty || 0
                ) +
                  Number(
                    data.timePenalty || 0
                  )}
              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}


function TeamDetails({
  team
}) {

  if (!team) {

    return (

      <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] flex items-center justify-center">

        <div className="text-center">

          <Users className="w-9 h-9 mx-auto text-slate-300" />

          <p className="text-sm text-slate-400 mt-3">
            Select a team to view progress.
          </p>

        </div>

      </div>

    );

  }


  const leaderName =
    team.leaderName ||
    (
      team.members?.length
        ? team.members[0].name
        : 'N/A'
    );


  const totalMarks =
    Number(
      team.totalMarks || 0
    );


  const completedLevels =
    Number(
      team.completedLevels || 0
    );


  return (

    <div className="space-y-5">


      {/* TEAM HEADER */}

      <div className="bg-white border border-slate-200 rounded-xl p-5">

        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">

                <Users className="w-5 h-5 text-cyan-600" />

              </div>


              <div className="min-w-0">

                <h2 className="text-lg font-semibold text-slate-900 truncate">
                  {team.teamName}
                </h2>

                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  {team.teamId}
                </div>

              </div>

            </div>

          </div>


          <div className="text-right shrink-0">

            <div className="text-2xl font-bold text-cyan-700">
              {totalMarks}
            </div>

            <div className="text-[9px] font-mono text-slate-400">
              / {MAX_MARKS} MARKS
            </div>

          </div>

        </div>


        {/* SUMMARY */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">

            <div className="text-[9px] font-mono uppercase text-slate-400">
              Team Leader
            </div>

            <div className="text-xs font-medium text-slate-700 mt-1 truncate">
              {leaderName}
            </div>

          </div>


          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">

            <div className="text-[9px] font-mono uppercase text-slate-400">
              Team Size
            </div>

            <div className="text-xs font-semibold text-slate-700 mt-1">
              {team.teamSize || team.members?.length || 0}
            </div>

          </div>


          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">

            <div className="text-[9px] font-mono uppercase text-slate-400">
              Levels
            </div>

            <div className="text-xs font-semibold text-slate-700 mt-1">
              {completedLevels} / {TOTAL_LEVELS}
            </div>

          </div>


          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">

            <div className="text-[9px] font-mono uppercase text-slate-400">
              Status
            </div>

            <div
              className={`text-xs font-semibold mt-1 ${
                team.status === 'COMPLETED'
                  ? 'text-emerald-600'
                  : team.status === 'IN PROGRESS'
                  ? 'text-cyan-600'
                  : 'text-slate-500'
              }`}
            >
              {team.status}
            </div>

          </div>

        </div>

      </div>


      {/* LEVEL PROGRESS */}

      <div className="bg-white border border-slate-200 rounded-xl p-5">

        <div className="flex items-center justify-between mb-4">

          <div>

            <h3 className="text-sm font-semibold text-slate-900">
              Level Progress
            </h3>

            <p className="text-[10px] text-slate-400 mt-1">
              Complete progress and scoring details
            </p>

          </div>


          <div className="flex items-center gap-2">

            <Trophy className="w-4 h-4 text-cyan-600" />

            <span className="text-xs font-semibold text-cyan-700">
              {totalMarks} / {MAX_MARKS}
            </span>

          </div>

        </div>


        <div className="space-y-3">

          {LEVELS.map(
            (level) => (

              <LevelCard
                key={level.level}
                team={team}
                level={level}
              />

            )
          )}

        </div>

      </div>


      {/* MEMBERS */}

      <div className="bg-white border border-slate-200 rounded-xl p-5">

        <div className="flex items-center justify-between mb-4">

          <div>

            <h3 className="text-sm font-semibold text-slate-900">
              Team Members
            </h3>

            <p className="text-[10px] text-slate-400 mt-1">
              Registered participant details
            </p>

          </div>


          <span className="text-[10px] font-mono text-slate-400">
            {team.members?.length || 0} MEMBERS
          </span>

        </div>


        <div className="space-y-2">

          {team.members?.length ? (

            team.members.map(
              (member, index) => (

                <div
                  key={`${team.teamId}-${index}`}
                  className="border border-slate-100 rounded-lg p-3 bg-slate-50"
                >

                  <div className="flex items-start gap-3">

                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">

                      <User className="w-4 h-4 text-slate-400" />

                    </div>


                    <div className="min-w-0 flex-1">

                      <div className="flex items-center justify-between gap-3">

                        <div className="text-xs font-semibold text-slate-800 truncate">
                          {member.name}
                        </div>

                        {index === 0 && (

                          <span className="text-[8px] font-mono uppercase text-cyan-600 bg-cyan-50 border border-cyan-100 px-2 py-1 rounded">
                            Leader
                          </span>

                        )}

                      </div>


                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1 mt-2">

                        <div className="flex items-center gap-2 text-[10px] text-slate-500">

                          <Mail className="w-3 h-3 text-slate-400" />

                          <span className="truncate">
                            {member.email || '—'}
                          </span>

                        </div>


                        <div className="flex items-center gap-2 text-[10px] text-slate-500">

                          <Phone className="w-3 h-3 text-slate-400" />

                          <span>
                            {member.mobileNo || '—'}
                          </span>

                        </div>


                        <div className="flex items-center gap-2 text-[10px] text-slate-500">

                          <GraduationCap className="w-3 h-3 text-slate-400" />

                          <span>
                            {member.course || '—'}
                          </span>

                        </div>


                        <div className="flex items-center gap-2 text-[10px] text-slate-500">

                          <span className="font-mono text-slate-400">
                            ROLL
                          </span>

                          <span>
                            {member.rollNo || '—'}
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              )

            )

          ) : (

            <div className="text-xs text-slate-400 text-center py-5">
              No member information available.
            </div>

          )}

        </div>

      </div>

    </div>

  );

}


export default function Teams() {

  const [teams, setTeams] =
    useState([]);

  const [selected, setSelected] =
    useState(null);

  const [search, setSearch] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState('');

  const [uploadMessage, setUploadMessage] =
    useState('');

  const [uploadError, setUploadError] =
    useState('');

  const [selectedFile, setSelectedFile] =
    useState(null);

  const fileInputRef =
    useRef(null);


  /*
   * Fetch registered teams independently.
   *
   * Leaderboard failure must NOT prevent
   * registered teams from appearing.
   */
  const fetchTeams = useCallback(
    async () => {

      try {

        setError('');


        let registeredTeams = [];


        /*
         * ==============================
         * FETCH TEAMS
         * ==============================
         */

        try {

          const response =
            await axios.get(
              `${API_URL}/api/teams/all`,
              {
                timeout: 10000
              }
            );


          registeredTeams =
            Array.isArray(
              response.data?.teams
            )
              ? response.data.teams
              : [];


        } catch (teamsError) {

          console.error(
            '[Teams Fetch Error]:',
            teamsError
          );


          setError(
            teamsError.response?.data?.error ||
            teamsError.message ||
            'Unable to fetch registered teams.'
          );


          setTeams([]);

          return;

        }


        /*
         * ==============================
         * FETCH LEADERBOARD
         * ==============================
         */

        let leaderboard = [];


        try {

          const response =
            await axios.get(
              `${API_URL}/api/leaderboard`,
              {
                timeout: 10000
              }
            );


          leaderboard =
            Array.isArray(
              response.data?.leaderboard
            )
              ? response.data.leaderboard
              : [];


        } catch (leaderboardError) {

          console.warn(
            '[Leaderboard Fetch Warning]:',
            leaderboardError
          );

          leaderboard = [];

        }


        /*
         * ==============================
         * MERGE
         * ==============================
         */

        const mergedTeams =
          registeredTeams.map(
            (team) => {

              const teamId =
                String(
                  team.teamId || ''
                ).trim();


              const leaderboardData =
                leaderboard.find(
                  (item) =>
                    String(
                      item.teamId || ''
                    ).trim() ===
                    teamId
                );


              const progress =
                Array.isArray(
                  leaderboardData?.progress
                )
                  ? leaderboardData.progress
                  : [];


              const completedLevels =
                Number(
                  leaderboardData?.completedLevels ||
                  progress.length ||
                  0
                );


              const totalMarks =
                Number(
                  leaderboardData?.totalMarks ||
                  progress.reduce(
                    (sum, item) =>
                      sum +
                      Number(
                        item.marks || 0
                      ),
                    0
                  )
                );


              const totalTime =
                Number(
                  leaderboardData?.totalTime ||
                  progress.reduce(
                    (sum, item) =>
                      sum +
                      Number(
                        item.timeTaken || 0
                      ),
                    0
                  )
                );


              let status =
                leaderboardData?.status;


              if (!status) {

                if (
                  completedLevels >=
                  TOTAL_LEVELS
                ) {

                  status =
                    'COMPLETED';

                } else if (
                  completedLevels > 0
                ) {

                  status =
                    'IN PROGRESS';

                } else {

                  status =
                    'NOT STARTED';

                }

              }


              return {

                ...team,

                teamId,

                teamName:
                  team.teamName || 'Unnamed Team',

                teamSize:
                  Number(
                    team.teamSize ||
                    team.members?.length ||
                    0
                  ),

                members:
                  Array.isArray(
                    team.members
                  )
                    ? team.members
                    : [],

                completedLevels,

                totalMarks,

                totalTime,

                progress,

                rank:
                  leaderboardData?.rank ??
                  null,

                status

              };

            }
          );


        setTeams(
          mergedTeams
        );


        /*
         * Update selected team without
         * causing fetchTeams dependency loop.
         */
        setSelected(
          (currentSelected) => {

            if (!currentSelected) {
              return null;
            }


            const updated =
              mergedTeams.find(
                (team) =>
                  String(team.teamId) ===
                  String(
                    currentSelected.teamId
                  )
              );


            return updated || null;

          }
        );


      } catch (fetchError) {

        console.error(
          '[Teams Page Error]:',
          fetchError
        );


        setError(
          fetchError.response?.data?.error ||
          fetchError.message ||
          'Unable to fetch team data.'
        );


      } finally {

        setLoading(false);

      }

    },
    []
  );


  /*
   * Initial fetch + 15 sec refresh.
   */
  useEffect(() => {

    fetchTeams();


    const interval =
      setInterval(
        fetchTeams,
        15000
      );


    return () =>
      clearInterval(interval);

  }, [fetchTeams]);


  /*
   * Manual refresh.
   */
  const handleRefresh =
    async () => {

      setRefreshing(true);

      await fetchTeams();

      setRefreshing(false);

    };


  /*
   * Excel file selection.
   */
  const handleFileChange =
    (event) => {

      const file =
        event.target.files?.[0];


      setUploadMessage('');
      setUploadError('');


      if (!file) {

        setSelectedFile(null);

        return;

      }


      const fileName =
        file.name.toLowerCase();


      if (
        !fileName.endsWith('.xlsx') &&
        !fileName.endsWith('.xls')
      ) {

        setSelectedFile(null);

        setUploadError(
          'Only .xlsx and .xls Excel files are allowed.'
        );

        event.target.value = '';

        return;

      }


      if (
        file.size >
        10 * 1024 * 1024
      ) {

        setSelectedFile(null);

        setUploadError(
          'File size cannot exceed 10 MB.'
        );

        event.target.value = '';

        return;

      }


      setSelectedFile(
        file
      );

    };


  /*
   * Excel upload.
   */
  const handleExcelUpload =
    async () => {

      if (!selectedFile) {

        setUploadError(
          'Please select an Excel file first.'
        );

        return;

      }


      try {

        setUploading(true);

        setUploadError('');

        setUploadMessage('');


        const formData =
          new FormData();


        formData.append(
          'file',
          selectedFile
        );


        const response =
          await axios.post(
            `${API_URL}/api/teams/upload-excel`,
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data'
              },

              timeout: 120000
            }
          );


        const data =
          response.data;


        setUploadMessage(
          data.message ||
          'Teams imported successfully.'
        );


        setSelectedFile(null);


        if (
          fileInputRef.current
        ) {

          fileInputRef.current.value =
            '';

        }


        await fetchTeams();


      } catch (uploadErrorResponse) {

        console.error(
          '[Excel Upload Error]:',
          uploadErrorResponse
        );


        const responseData =
          uploadErrorResponse.response?.data;


        /*
         * Existing Team IDs
         */
        if (
          Array.isArray(
            responseData?.existingTeams
          )
        ) {

          const duplicateIds =
            responseData.existingTeams
              .map(
                (team) =>
                  `${team.teamId}${
                    team.teamName
                      ? ` (${team.teamName})`
                      : ''
                  }`
              )
              .join(', ');


          setUploadError(
            `${responseData.error || 'Some team IDs already exist.'} Existing: ${duplicateIds}`
          );

        }


        /*
         * Duplicate IDs inside Excel
         */
        else if (
          responseData?.error &&
          responseData.error
            .toLowerCase()
            .includes('duplicate teamid')
        ) {

          setUploadError(
            responseData.error
          );

        }


        /*
         * Row errors
         */
        else if (
          Array.isArray(
            responseData?.rowErrors
          )
        ) {

          const messages =
            responseData.rowErrors
              .slice(0, 8)
              .join(' | ');


          const extra =
            responseData.rowErrors.length > 8
              ? ` +${responseData.rowErrors.length - 8} more`
              : '';


          setUploadError(
            `${responseData.error || 'Excel validation failed.'} ${messages}${extra}`
          );

        }


        /*
         * Team size mismatch
         */
        else if (
          Array.isArray(
            responseData?.memberCountErrors
          )
        ) {

          const messages =
            responseData.memberCountErrors
              .slice(0, 8)
              .join(' | ');


          const extra =
            responseData.memberCountErrors.length > 8
              ? ` +${responseData.memberCountErrors.length - 8} more`
              : '';


          setUploadError(
            `${responseData.error || 'Team size does not match the number of members.'} ${messages}${extra}`
          );

        }


        else {

          setUploadError(
            responseData?.error ||
            uploadErrorResponse.message ||
            'Unable to upload Excel file.'
          );

        }

      } finally {

        setUploading(false);

      }

    };


  /*
   * Clear selected Excel.
   */
  const clearSelectedFile =
    () => {

      setSelectedFile(null);

      setUploadError('');

      setUploadMessage('');


      if (
        fileInputRef.current
      ) {

        fileInputRef.current.value =
          '';

      }

    };


  /*
   * Search.
   */
  const filteredTeams =
    teams.filter(
      (team) => {

        const leaderName =
          team.leaderName ||
          (
            team.members?.length
              ? team.members[0].name
              : ''
          );


        const searchValue =
          `${team.teamName || ''}
           ${team.teamId || ''}
           ${leaderName || ''}`
            .toLowerCase();


        return searchValue.includes(
          search.toLowerCase()
        );

      }
    );


  return (

    <div className="min-h-screen bg-[#F7F8FA]">

      <div className="ml-64">


        {/* HEADER */}

        <header className="min-h-20 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">

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
            disabled={
              refreshing ||
              uploading
            }
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


          {/* EXCEL IMPORT */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">


              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">

                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />

                </div>


                <div>

                  <h2 className="text-sm font-semibold text-slate-900">
                    Import Teams from Excel
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    Upload one Excel file containing all teams and participants.
                  </p>

                  <p className="text-[10px] font-mono text-slate-400 mt-2">
                    teamId • teamName • teamSize • name • email • rollNo • mobileNo • course • year • branch
                  </p>

                </div>

              </div>


              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={
                    handleFileChange
                  }
                  className="hidden"
                />


                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={uploading}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                >

                  <Upload className="w-4 h-4" />

                  Choose Excel

                </button>


                <button
                  type="button"
                  onClick={
                    handleExcelUpload
                  }
                  disabled={
                    !selectedFile ||
                    uploading
                  }
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >

                  {uploading ? (

                    <RefreshCw className="w-4 h-4 animate-spin" />

                  ) : (

                    <Upload className="w-4 h-4" />

                  )}

                  {uploading
                    ? 'Importing...'
                    : 'Import Teams'}

                </button>

              </div>

            </div>


            {selectedFile && (

              <div className="mt-4 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">

                <div className="flex items-center gap-3 min-w-0">

                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />

                  <div className="min-w-0">

                    <div className="text-xs font-medium text-slate-700 truncate">
                      {selectedFile.name}
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {(
                        selectedFile.size /
                        1024
                      ).toFixed(1)} KB
                    </div>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={
                    clearSelectedFile
                  }
                  className="p-1.5 text-slate-400 hover:text-red-500"
                >

                  <X className="w-4 h-4" />

                </button>

              </div>

            )}


            {uploadMessage && (

              <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-start gap-2">

                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />

                <div className="text-xs text-emerald-700">

                  <div className="font-medium">
                    Import Successful
                  </div>

                  <div className="mt-0.5">
                    {uploadMessage}
                  </div>

                </div>

              </div>

            )}


            {uploadError && (

              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-2">

                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />

                <div className="text-xs text-red-700">

                  <div className="font-medium">
                    Import Failed
                  </div>

                  <div className="mt-0.5">
                    {uploadError}
                  </div>

                </div>

              </div>

            )}

          </div>


          {/* GENERAL ERROR */}

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


          {/* MAIN CONTENT */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


            {/* TEAM LIST */}

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

              {/* SEARCH */}

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


              {/* COUNT */}

              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">

                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Registered Teams
                </span>

                <span className="text-xs font-mono font-semibold text-cyan-700">
                  {filteredTeams.length}
                </span>

              </div>


              {/* LIST */}

              <div className="max-h-[760px] overflow-y-auto">

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

                  filteredTeams.map(
                    (team) => {

                      const leaderName =
                        team.leaderName ||
                        (
                          team.members?.length
                            ? team.members[0].name
                            : 'N/A'
                        );


                      const isSelected =
                        String(
                          selected?.teamId
                        ) ===
                        String(
                          team.teamId
                        );


                      const completedLevels =
                        Number(
                          team.completedLevels ||
                          0
                        );


                      const totalMarks =
                        Number(
                          team.totalMarks ||
                          0
                        );


                      const teamSize =
                        Number(
                          team.teamSize ||
                          team.members?.length ||
                          0
                        );


                      return (

                        <button
                          key={
                            team.teamId
                          }
                          type="button"
                          onClick={() =>
                            setSelected(
                              team
                            )
                          }
                          className={`w-full text-left px-4 py-4 border-b border-slate-100 hover:bg-slate-50 transition ${
                            isSelected
                              ? 'bg-cyan-50 border-l-2 border-l-cyan-600'
                              : ''
                          }`}
                        >

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


                          <div className="mt-3">

                            <div className="text-[9px] font-mono uppercase text-slate-400">
                              Team Leader
                            </div>

                            <div className="text-xs text-slate-600 mt-1 truncate">
                              {leaderName}
                            </div>

                          </div>


                          <div className="mt-3 flex items-center justify-between">

                            <span className="text-[9px] font-mono uppercase text-slate-400">
                              Team Size
                            </span>

                            <span className="text-xs font-semibold text-slate-600">
                              {teamSize}
                            </span>

                          </div>


                          <div className="flex items-center justify-between mt-3">

                            <span className="text-[10px] font-mono text-slate-400">

                              LEVELS{' '}

                              {completedLevels}

                              /{TOTAL_LEVELS}

                            </span>


                            <span className="text-xs font-bold text-cyan-700">

                              {totalMarks}

                              <span className="text-slate-400 font-normal">
                                {' '}/ {MAX_MARKS}
                              </span>

                            </span>

                          </div>


                          <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">

                            <div
                              className="h-full bg-cyan-500 transition-all"
                              style={{
                                width:
                                  `${Math.min(
                                    100,
                                    (
                                      totalMarks /
                                      MAX_MARKS
                                    ) *
                                      100
                                  )}%`
                              }}
                            />

                          </div>


                          <div className="mt-2 flex justify-between items-center">

                            <span
                              className={`text-[9px] font-mono ${
                                team.status ===
                                'COMPLETED'
                                  ? 'text-emerald-600'
                                  : team.status ===
                                    'IN PROGRESS'
                                  ? 'text-cyan-600'
                                  : 'text-slate-400'
                              }`}
                            >
                              {team.status}
                            </span>


                            <span className="text-[9px] font-mono text-slate-400">
                              {teamSize} MEMBERS
                            </span>

                          </div>

                        </button>

                      );

                    }

                  )

                )}

              </div>

            </div>


            {/* TEAM DETAILS */}

            <div className="lg:col-span-2">

              <TeamDetails
                team={selected}
              />

            </div>


          </div>

        </main>

      </div>

    </div>

  );

}