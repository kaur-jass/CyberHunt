import React, { useState } from 'react';
import {
  Network,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Flag,
  Trophy,
  LockKeyhole,
  Target
} from 'lucide-react';

export default function ChallengeCard({
  routeCode = 'A',
  nodeId = 'NEX-01',
  challengeTitle,
  category,
  difficulty,
  description,
  hint,
  nextNode
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamId, setTeamId] = useState('');
  const [flag, setFlag] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const currentNode = nodeId || 'NEX-01';

  const currentRouteCode = 'A';

  const handleSubmitFlag = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setFeedback(null);

    const API_URL =
      import.meta.env.VITE_API_URL || 'http://localhost:5005';

    try {
      const response = await fetch(`${API_URL}/api/submit`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          teamId: teamId.trim(),
          flag: flag.trim(),
          routeCode: currentRouteCode,
          nodeId: currentNode
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Final flag verification failed.'
        );
      }

      setFeedback({
        success: true,
        message:
          data.message ||
          'NEXUS verified. Hunt completed successfully.',
        nextLocation:
          data.nextLocation || nextNode
      });

    } catch (error) {

      setFeedback({
        success: false,
        message:
          error.message ||
          'Unable to connect to the verification server.'
      });

    } finally {

      setSubmitting(false);

    }
  };

  return (
    <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

      {/* Final Level Accent */}
      <div className="h-1 bg-cyan-500" />

      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-4">

          <div className="space-y-2">

            <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs font-semibold">

              <Network className="w-4 h-4" />

              <span>
                NEXUS / FINAL LEVEL
              </span>

            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider">

              <span>
                NODE
              </span>

              <span className="text-slate-300">
                /
              </span>

              <span className="text-slate-600">
                {currentNode}
              </span>

            </div>

          </div>

          <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-cyan-50 border border-cyan-200 rounded-md text-cyan-700">

            {difficulty}

          </span>

        </div>

        {/* Final Status */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">

            <Flag className="w-3.5 h-3.5" />

            Final Challenge

          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-700">

            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />

            CONVERGED

          </div>

        </div>

        {/* Challenge */}
        <div className="space-y-3">

          <div className="text-xs font-mono uppercase tracking-wider text-cyan-700 font-medium">

            {category}

          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">

            {challengeTitle}

          </h1>

          <p className="text-sm text-slate-600 leading-7">

            {description}

          </p>

        </div>

        {/* Final Node Information */}
        <div className="grid grid-cols-2 gap-3">

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">

            <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-slate-400">

              <Target className="w-3.5 h-3.5" />

              Destination

            </div>

            <div className="mt-1 text-xs font-mono text-cyan-700">

              NEX-01

            </div>

          </div>

          <div className="border border-cyan-200 rounded-lg p-3 bg-cyan-50/50">

            <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-cyan-700">

              <Trophy className="w-3.5 h-3.5" />

              Completion

            </div>

            <div className="mt-1 text-xs font-mono text-cyan-800">

              FINAL FLAG

            </div>

          </div>

        </div>

        {/* Convergence Notice */}
        <div className="flex gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">

          <Network className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />

          <div>

            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">

              Route Converged

            </div>

            <p className="text-xs text-slate-500 mt-1 leading-5">

              All hunt paths terminate at this final Nexus node.

            </p>

          </div>

        </div>

        {/* Hint */}
        {hint && (
          <div className="border border-slate-200 rounded-lg overflow-hidden">

            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">

              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">

                Final Intelligence

              </span>

              <span className="text-[10px] font-mono text-cyan-700">

                CLASSIFIED

              </span>

            </div>

            <div className="p-3 text-xs text-slate-600 leading-relaxed">

              {hint}

            </div>

          </div>
        )}

        {/* Status */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">

          <div className="flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-cyan-500" />

            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">

              Nexus Online

            </span>

          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">

            <LockKeyhole className="w-3.5 h-3.5 text-cyan-600" />

            FINAL ACCESS

          </div>

        </div>

        {/* Submit */}
        <button
          onClick={() => {
            setFeedback(null);
            setIsModalOpen(true);
          }}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >

          <Trophy className="w-4 h-4" />

          <span>
            SUBMIT FINAL FLAG
          </span>

          <ArrowRight className="w-4 h-4" />

        </button>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">

          <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-md overflow-hidden">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">

              <div>

                <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs font-semibold">

                  <Network className="w-4 h-4" />

                  NEXUS / FINAL LEVEL

                </div>

                <div className="text-xs text-slate-400 mt-1 font-mono">

                  NODE {currentNode}

                </div>

              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-900 transition-colors"
              >
                ✕ Close
              </button>

            </div>

            <div className="p-6 space-y-5">

              {/* Feedback */}
              {feedback && (
                <div
                  className={`p-4 rounded-lg space-y-3 ${
                    feedback.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >

                  <div className="flex items-center gap-2 font-medium text-sm">

                    {feedback.success ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}

                    <span>
                      {feedback.message}
                    </span>

                  </div>

                  {feedback.success &&
                    feedback.nextLocation && (
                      <div className="pt-3 border-t border-emerald-200">

                        <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-700 mb-1">

                          Completion Status

                        </div>

                        <div className="text-sm font-mono bg-white/70 border border-emerald-200 p-3 rounded-md text-emerald-900">

                          {feedback.nextLocation === 'COMPLETE'
                            ? 'HUNT COMPLETED'
                            : feedback.nextLocation}

                        </div>

                      </div>
                    )}

                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmitFlag}
                className="space-y-4"
              >

                {/* Team ID */}
                <div>

                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">

                    Team ID{' '}

                    <span className="text-red-500">
                      *
                    </span>

                  </label>

                  <input
                    type="text"
                    required
                    value={teamId}
                    onChange={(e) =>
                      setTeamId(e.target.value)
                    }
                    placeholder="TEAM-001"
                    autoComplete="off"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition"
                  />

                </div>

                {/* Flag */}
                <div>

                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">

                    Final Flag{' '}

                    <span className="text-red-500">
                      *
                    </span>

                  </label>

                  <input
                    type="text"
                    required
                    value={flag}
                    onChange={(e) =>
                      setFlag(e.target.value)
                    }
                    placeholder="CYBER{final_flag_here}"
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition"
                  />

                </div>

                {/* Final Information */}
                <div className="border-t border-slate-100 pt-3 space-y-2">

                  <div className="flex justify-between text-[10px] font-mono text-slate-400">

                    <span>
                      NODE
                    </span>

                    <span className="text-slate-600">
                      {currentNode}
                    </span>

                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-400">

                    <span>
                      ROUTE
                    </span>

                    <span className="text-slate-600">
                      A
                    </span>

                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-400">

                    <span>
                      LEVEL
                    </span>

                    <span className="text-slate-600">
                      05
                    </span>

                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-400">

                    <span>
                      STATUS
                    </span>

                    <span className="text-cyan-700">
                      FINAL CHECKPOINT
                    </span>

                  </div>

                </div>

                {/* Buttons */}
                <div className="pt-1 flex gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setIsModalOpen(false)
                    }
                    className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-sm hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >

                    {submitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                        Verifying...

                      </>
                    ) : (
                      <>

                        Complete Hunt

                        <Trophy className="w-4 h-4" />

                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}