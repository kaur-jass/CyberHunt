import React, { useState } from 'react';
import {
  Terminal,
  ArrowRight,
  CheckCircle2,
  AlertCircle
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
          routeCode: routeCode
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
          'Access Granted! Next clue unlocked.',
        nextLocation: data.nextLocation
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
    <div className="w-full max-w-xl bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
        <div className="flex items-center space-x-2 text-emerald-700 font-mono text-xs font-semibold">
          <Terminal className="w-4 h-4" />
          <span>
            LEVEL 0 / ROUTE {routeCode}
          </span>
        </div>

        <span className="px-2 py-0.5 text-xs font-mono bg-[#F7F8FA] border border-[#E5E7EB] rounded text-[#6B7280]">
          {difficulty}
        </span>
      </div>

      {/* Challenge Info */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
          {category}
        </div>

        <h1 className="text-xl font-bold tracking-tight text-[#111827]">
          {challengeTitle}
        </h1>

        <p className="text-sm text-[#6B7280] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Hint */}
      {hint && (
        <div className="p-3 bg-[#F7F8FA] border border-[#E5E7EB] rounded text-xs text-[#6B7280]">
          <span className="font-semibold text-[#111827]">
            Hint:
          </span>{' '}
          {hint}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-[#111827] hover:bg-black text-white font-medium py-2.5 px-4 rounded text-sm transition-colors flex items-center justify-center space-x-2"
      >
        <span>SUBMIT FLAG</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">

            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-sm text-[#111827]">
                Submit Challenge Flag (Route {routeCode})
              </h3>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-[#6B7280] hover:text-[#111827]"
              >
                ✕ Close
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`p-3 text-xs rounded space-y-2 ${
                  feedback.success
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <div className="flex items-center space-x-2 font-medium">
                  {feedback.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}

                  <span>{feedback.message}</span>
                </div>

                {feedback.success && feedback.nextLocation && (
                  <div className="mt-2 pt-2 border-t border-emerald-200 font-mono bg-emerald-100/50 p-2 rounded">

                    <span className="font-bold block text-emerald-900">
                      NEXT LOCATION HINT:
                    </span>

                    <span className="text-emerald-800">
                      {feedback.nextLocation}
                    </span>

                  </div>
                )}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmitFlag}
              className="space-y-3"
            >

              {/* Team ID */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#6B7280] mb-1">
                  Team ID <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  placeholder="TEAM-001"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm font-mono bg-[#F7F8FA] focus:outline-none focus:border-[#111827]"
                />
              </div>

              {/* Flag */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#6B7280] mb-1">
                  Flag <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  placeholder="CYBER{flag_string_here}"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm font-mono bg-[#F7F8FA] focus:outline-none focus:border-[#111827]"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex space-x-2">

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white border border-[#E5E7EB] text-[#111827] py-2 rounded text-sm hover:bg-[#F7F8FA]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#111827] text-white py-2 rounded text-sm hover:bg-black disabled:opacity-50"
                >
                  {submitting
                    ? 'Verifying...'
                    : 'Confirm Submit'}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}