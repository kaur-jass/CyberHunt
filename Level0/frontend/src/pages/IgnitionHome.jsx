import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IgnitionHome() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [members, setMembers] = useState('');
  const [chosenRoute, setChosenRoute] = useState('A');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  const routes = [
    { id: 'A', label: 'Route A', desc: 'Protocol Analysis & Reconnaissance path', path: '/route-a' },
    { id: 'B', label: 'Route B', desc: 'Digital Footprint & OSINT investigative path', path: '/route-b' },
    { id: 'C', label: 'Route C', desc: 'Network Traffic & Packet anomaly path', path: '/route-c' },
    { id: 'D', label: 'Route D', desc: 'Cryptographic Decryption & Encoding path', path: '/route-d' },
    { id: 'E', label: 'Route E', desc: 'Metadata Forensics & Log analysis path', path: '/route-e' },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const memberArray = members
        ? members.split(',').map((m) => m.trim()).filter(Boolean)
        : [];
      if (leaderName) memberArray.unshift(leaderName);

      const response = await fetch('http://localhost:5000/api/ignition/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName,
          members: memberArray,
          chosenRoute,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register team.');
      }

      // Store session token securely
      localStorage.setItem('cyberhunt_token', data.token);
      setSuccessData({ ...data.team, routePath: routes.find(r => r.id === data.team.currentRoute)?.path || '/route-a' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-8 text-center space-y-6">
        <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-full">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-[#111827]">Ignition Successful</h2>
          <p className="text-sm text-[#6B7280]">
            Team <span className="font-semibold text-[#111827]">{successData.teamName}</span> is initialized on{' '}
            <span className="font-mono text-emerald-700 font-bold">ROUTE {successData.currentRoute}</span>.
          </p>
        </div>

        <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded p-4 text-left font-mono text-xs space-y-1">
          <div><span className="text-[#6B7280]">TEAM CODE:</span> {successData.teamCode}</div>
          <div><span className="text-[#6B7280]">INITIAL NODE:</span> {successData.currentNode}</div>
          <div><span className="text-[#6B7280]">STATUS:</span> ACTIVE</div>
        </div>

        <button
          onClick={() => navigate(successData.routePath)}
          className="w-full bg-[#111827] hover:bg-black text-white font-medium py-2.5 px-4 rounded text-sm transition-colors flex items-center justify-center space-x-2"
        >
          <span>PROCEED TO ROUTE {successData.currentRoute} CHALLENGE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-8 space-y-6">
      <div className="space-y-1 border-b border-[#E5E7EB] pb-4">
        <div className="flex items-center space-x-2 text-emerald-700 font-mono text-xs font-semibold">
          <Terminal className="w-4 h-4" />
          <span>LEVEL 0 INITIALIZATION</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Choose Your Starting Path</h1>
        <p className="text-sm text-[#6B7280]">
          Register your team credentials and select an entry route to begin the physical cybersecurity hunt.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-[#6B7280] mb-1">
            Team Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. ShadowRow"
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:border-[#111827] bg-[#F7F8FA]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-[#6B7280] mb-1">
            Team Leader Name
          </label>
          <input
            type="text"
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
            placeholder="e.g. Alex Vance"
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:border-[#111827] bg-[#F7F8FA]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-[#6B7280] mb-1">
            Additional Team Members (Comma-separated)
          </label>
          <input
            type="text"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            placeholder="e.g. Gordon F., Barney C."
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm focus:outline-none focus:border-[#111827] bg-[#F7F8FA]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-[#6B7280] mb-2">
            Select Initial Route Path
          </label>
          <div className="grid grid-cols-1 gap-2">
            {routes.map((r) => (
              <label
                key={r.id}
                className={`flex items-start p-3 border rounded cursor-pointer transition-colors ${
                  chosenRoute === r.id
                    ? 'border-[#111827] bg-[#F7F8FA]'
                    : 'border-[#E5E7EB] hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="chosenRoute"
                  value={r.id}
                  checked={chosenRoute === r.id}
                  onChange={(e) => setChosenRoute(e.target.value)}
                  className="mt-0.5 mr-3 accent-[#111827]"
                />
                <div>
                  <div className="text-xs font-mono font-bold text-[#111827]">{r.label}</div>
                  <div className="text-xs text-[#6B7280]">{r.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#111827] hover:bg-black text-white font-medium py-2.5 px-4 rounded text-sm transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <span>{loading ? 'INITIALIZING...' : 'START HUNT & INITIALIZE'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}