import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import LevelQRs from './pages/LevelQRs';
import LevelSettings from './pages/LevelSettings';

export default function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/teams"
          element={<Teams />}
        />

        <Route
          path="/level-qrs"
          element={<LevelQRs />}
        />

        <Route
          path="/level-settings"
          element={<LevelSettings />}
        />

      </Routes>

    </BrowserRouter>
  );
}