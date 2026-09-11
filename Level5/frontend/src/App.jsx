import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import NexusHome from './pages/NexusHome';

function App() {
  return (
    <Router>

      <div className="min-h-screen bg-[#F7F8FA] text-[#111827] flex flex-col">

        {/* Header */}
        <header className="border-b border-[#E5E7EB] bg-white">

          <div className="max-w-6xl mx-auto w-full px-6 py-4 flex items-center justify-between">

            {/* Brand */}
            <div className="flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />

              <div>

                <div className="font-semibold text-sm tracking-tight text-[#111827]">
                  CYBER HUNT 2026
                </div>

                <div className="text-[9px] font-mono tracking-wider text-[#9CA3AF] mt-0.5">
                  SECURE CTF EVENT PLATFORM
                </div>

              </div>

            </div>


            {/* Status */}
            <div className="flex items-center gap-2">

              <span className="hidden sm:block text-[10px] font-mono text-[#9CA3AF]">
                SYSTEM STATUS:
              </span>

              <span className="text-[10px] font-mono font-semibold text-cyan-700">
                ONLINE
              </span>

              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />

            </div>

          </div>

        </header>


        {/* Main */}
        <main className="flex-grow">

          <Routes>

            {/* Final Nexus Destination */}
            <Route
              path="/"
              element={<NexusHome />}
            />

            {/* Fallback */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        </main>


        {/* Footer */}
        <footer className="border-t border-[#E5E7EB] bg-white">

          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">

            <div className="text-[9px] font-mono text-[#9CA3AF]">
              NEXUS NODE / NEX-01
            </div>

            <div className="text-[9px] font-mono text-[#9CA3AF]">
              FINAL DESTINATION
            </div>

            <div className="text-[9px] font-mono text-[#9CA3AF]">
              AUTHORIZED ACCESS ONLY
            </div>

          </div>

        </footer>

      </div>

    </Router>
  );
}

export default App;