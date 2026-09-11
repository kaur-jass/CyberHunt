import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhantomHome from './pages/PhantomHome';
import RouteAPage from './pages/RouteAPage';
import RouteBPage from './pages/RouteBPage';
import RouteCPage from './pages/RouteCPage';
import RouteDPage from './pages/RouteDPage';
import RouteEPage from './pages/RouteEPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F7F8FA] text-[#111827] flex flex-col justify-between">
        <header className="border-b border-[#E5E7EB] bg-white py-4 px-6 flex justify-between items-center shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 rounded-full bg-emerald-600 animate-pulse"></div>
            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#6B7280]">
              SYSTEM STATUS: ONLINE
            </span>
          </div>
          <div className="text-sm font-semibold tracking-tight text-[#111827]">
            CYBER HUNT 2026 / <span className="text-emerald-700">LEVEL 0: IGNITION</span>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<PhantomHome />} />
            <Route path="/route-a" element={<RouteAPage />} />
            <Route path="/route-b" element={<RouteBPage />} />
            <Route path="/route-c" element={<RouteCPage />} />
            <Route path="/route-d" element={<RouteDPage />} />
            <Route path="/route-e" element={<RouteEPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="border-t border-[#E5E7EB] bg-white py-3 px-6 text-center text-xs text-[#6B7280]">
          Secure CTF Event Platform &bull; Authorized Access Only
        </footer>
      </div>
    </Router>
  );
}

export default App;