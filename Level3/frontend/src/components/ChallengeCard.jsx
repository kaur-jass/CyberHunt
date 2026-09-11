import React, { useState } from 'react';
import {
  Ghost,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Fingerprint,
  FileSearch,
  EyeOff,
  ShieldCheck
} from 'lucide-react';

export default function ChallengeCard({
  routeCode,
  nodeId,
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

  const currentNode =
    nodeId || `PHM-${routeCode?.toUpperCase() || 'A'}`;

  const handleSubmitFlag = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setFeedback(null);

    const API_URL =
      import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          teamId: teamId.trim(),
          flag: flag.trim(),
          routeCode: routeCode?.toUpperCase(),
          nodeId: currentNode
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Flag verification failed.'
        );
      }

      setFeedback({
        success: true,
        message:
          data.message ||
          'Phantom node verified. Next checkpoint unlocked.',
        nextLocation: data.nextLocation || nextNode
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

      {/* PHANTOM accent */}
      <div className="h-1 bg-violet-600" />

      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-4">

          <div className="space-y-2">

            <div className="flex items-center gap-2 text-violet-700 font-mono text-xs font-semibold">
              <Ghost className="w-4 h-4" />
              <span>PHANTOM / LEVEL 3</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider">

              <span>NODE</span>

              <span className="text-slate-300">
                /
              </span>

              <span className="text-slate-600">
                {currentNode}
              </span>

            </div>

          </div>

          <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-slate-50 border border-slate-200 rounded-md text-slate-600">
            {difficulty}
          </span>

        </div>

        {/* Classification */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">

            <Fingerprint className="w-3.5 h-3.5" />

            Digital Forensics

          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-violet-600">

            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />

            HIDDEN DATA

          </div>

        </div>

        {/* Challenge */}
        <div className="space-y-3">

          <div className="text-xs font-mono uppercase tracking-wider text-violet-700 font-medium">
            {category}
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {challengeTitle}
          </h1>

          <p className="text-sm text-slate-600 leading-7">
            {description}
          </p>

        </div>

        {/* Evidence Information */}
        <div className="grid grid-cols-2 gap-3">

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">

            <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-slate-400">

              <FileSearch className="w-3.5 h-3.5" />

              Evidence

            </div>

            <div className="mt-1 text-xs font-mono text-slate-700">
              DIGITAL ARTIFACT
            </div>

          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">

            <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-slate-400">

              <EyeOff className="w-3.5 h-3.5" />

              Visibility

            </div>

            <div className="mt-1 text-xs font-mono text-violet-700">
              PARTIALLY HIDDEN
            </div>

          </div>

        </div>

        {/* Hint */}
        {hint && (
          <div className="border border-slate-200 rounded-lg overflow-hidden">

            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">

              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                Forensic Note
              </span>

              <span className="text-[10px] font-mono text-violet-700">
                EVIDENCE
              </span>

            </div>

            <div className="p-3 text-xs text-slate-600 leading-relaxed">
              {hint}
            </div>

          </div>
        )}

        {/* Node Status */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">

          <div className="flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-violet-500" />

            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Phantom Node Active
            </span>

          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">

            <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />

            VERIFIED ACCESS

          </div>

        </div>

        {/* Submit Button */}
        <button
          onClick={() => {
            setFeedback(null);
            setIsModalOpen(true);
          }}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >

          <span>
            SUBMIT PHANTOM FLAG
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

                <div className="flex items-center gap-2 text-violet-700 font-mono text-xs font-semibold">

                  <Ghost className="w-4 h-4" />

                  PHANTOM / LEVEL 3

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
                          Next Location
                        </div>

                        <div className="text-sm font-mono bg-white/70 border border-emerald-200 p-3 rounded-md text-emerald-900">
                          {feedback.nextLocation}
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
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                  />

                </div>

                {/* Flag */}
                <div>

                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Flag{' '}
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
                    placeholder="CYBER{flag_string_here}"
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                  />

                </div>

                {/* Node Information */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-3">

                  <span>
                    TARGET: {currentNode}
                  </span>

                  <span>
                    LEVEL: 03
                  </span>

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
                        Recover Flag
                        <ArrowRight className="w-4 h-4" />
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