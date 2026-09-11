import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  QrCode,
  Settings
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const links = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard
    },
    {
      name: 'Teams',
      path: '/teams',
      icon: Users
    },
    {
      name: 'Level QRs',
      path: '/level-qrs',
      icon: QrCode
    },
    {
      name: 'Level Settings',
      path: '/level-settings',
      icon: Settings
    }
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 fixed left-0 top-0">

      {/* Logo */}
      <div className="h-20 border-b border-slate-200 px-5 flex items-center">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-cyan-700" />
          </div>

          <div>
            <div className="font-bold text-slate-900">
              CYBER HUNT
            </div>

            <div className="text-[10px] font-mono text-slate-400">
              ADMIN CONSOLE
            </div>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">

        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          Management
        </div>

        {links.map((link) => {

          const Icon = link.icon;

          const active =
            location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-cyan-50 text-cyan-700 border border-cyan-100'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >

              <Icon className="w-4 h-4" />

              <span>
                {link.name}
              </span>

            </Link>
          );
        })}

      </nav>

      {/* System Status */}
      <div className="absolute bottom-0 left-0 right-0 p-4">

        <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">

          <div className="flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-mono text-slate-600">
              SYSTEM ONLINE
            </span>

          </div>

          <div className="text-[10px] font-mono text-slate-400 mt-2">
            CYBER HUNT 2026
          </div>

        </div>

      </div>

    </aside>
  );
}