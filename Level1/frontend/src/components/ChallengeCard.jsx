import React, { useState } from 'react';
import {
  ScanSearch,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Fingerprint
} from 'lucide-react';

export default function ChallengeCard({
  routeCode,
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
          routeCode: routeCode.toUpperCase()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Incorrect flag submission.'
        );
      }

      setFeedback({
        success: true,
        message:
          data.message ||
          'Trace verified. Next checkpoint unlocked.',
        nextLocation: data.nextLocation || nextNode
      });

    } catch (err) {
      setFeedback({
        success: false,
        message: err.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

      {/* Top Trace Bar */}
      <div className="h-1 bg-teal-600" />

      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-4">

          <div className="space-y-2">

            <div className="flex items-center gap-2 text-teal-700 font-mono text-xs font-semibold">
              <ScanSearch className="w-4 h-4" />
              <span>TRACE / LEVEL 1</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              <span>NODE</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-600">
                TRC-{routeCode}
              </span>
            </div>

          </div>

          <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-slate-50 border border-slate-200 rounded-md text-slate-600">
            {difficulty}
          </span>

        </div>

        {/* Investigation Label */}
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <Fingerprint className="w-3.5 h-3.5" />
          <span>Digital Investigation</span>
        </div>

        {/* Challenge */}
        <div className="space-y-3">

          <div className="text-xs font-mono uppercase tracking-wider text-teal-700 font-medium">
            {category}
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {challengeTitle}
          </h1>

          <p className="text-sm text-slate-600 leading-7">
            {description}
          </p>

        </div>

        {/* Evidence / Hint */}
        {hint && (
          <div className="border border-slate-200 rounded-lg overflow-hidden">

            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                Investigation Note
              </span>

              <span className="text-[10px] font-mono text-teal-700">
                EVIDENCE
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
            <span className="w-2 h-2 rounded-full bg-teal-500" />

            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Trace Node Online
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            VERIFIED ACCESS
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
          <span>SUBMIT TRACE FLAG</span>
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
                <div className="flex items-center gap-2 text-teal-700 font-mono text-xs font-semibold">
                  <ScanSearch className="w-4 h-4" />
                  TRACE / LEVEL 1
                </div>

                <div className="text-xs text-slate-400 mt-1">
                  Node TRC-{routeCode}
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
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >

                  <div className="flex items-center gap-2 font-medium text-sm">

                    {feedback.success ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}

                    <span>{feedback.message}</span>

                  </div>

                  {feedback.success && feedback.nextLocation && (
                    <div className="pt-3 border-t border-teal-200">

                      <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-teal-700 mb-1">
                        Next Location
                      </div>

                      <div className="text-sm font-mono bg-white/70 border border-teal-200 p-3 rounded-md text-teal-900">
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
                    Team ID <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                    placeholder="TEAM-001"
                    autoComplete="off"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                  />

                </div>

                {/* Flag */}
                <div>

                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Flag <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="CYBER{flag_string_here}"
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                  />

                </div>

                {/* Node Info */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-3">

                  <span>
                    TARGET: TRC-{routeCode}
                  </span>

                  <span>
                    LEVEL: 01
                  </span>

                </div>

                {/* Buttons */}
                <div className="pt-1 flex gap-2">

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
                        Verify Flag
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