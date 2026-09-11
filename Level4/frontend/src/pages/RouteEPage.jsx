import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteEPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <div>
            <div className="font-semibold text-slate-900">
              CYBER HUNT 2026
            </div>

            <div className="text-[10px] font-mono text-violet-700 mt-1">
              ZERO DAY / NODE ZD-E
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            LEVEL 04
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">
        <ChallengeCard
          routeCode="E"
          nodeId="ZD-E"
          challengeTitle="Last Command"
          category="Linux Investigation"
          difficulty="Hard"
          description={
            <div className="space-y-5">
              <p>
                A security analyst recovered the last few commands executed
                before a suspicious machine was shut down.
              </p>

              <p>
                One of the commands reveals the attacker's final action.
                Analyse the terminal history carefully.
              </p>

              <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 overflow-x-auto">
                <div className="text-[11px] font-mono leading-6 text-slate-300 whitespace-pre">
{`$ history | tail -8

  91  cd /var/tmp
  92  ls -la
  93  cat .cache
  94  grep -R "zero" /tmp
  95  whoami
  96  cat /var/log/auth.log
  97  rm -rf /var/tmp/*
  98  history -c`}
                </div>
              </div>

              <div className="rounded-xl border border-violet-100 bg-violet-50 px-4 py-3">
                <div className="text-[10px] font-mono font-semibold text-violet-700 uppercase tracking-wider mb-1">
                  Analyst Note
                </div>

                <p className="text-sm text-slate-700">
                  The attacker tried to erase evidence immediately before
                  leaving the system.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Task
                </div>

                <p className="text-sm text-slate-700">
                  Identify the command that clears the shell history.
                  Submit the flag using the command's purpose as the keyword.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[10px] font-mono text-slate-500 mb-1">
                  TERMUX TIP
                </div>

                <p className="text-xs text-slate-600">
                  You can inspect and search command history using standard
                  Linux commands available in Termux.
                </p>
              </div>
            </div>
          }
          hint="Look closely at the final commands. Which command removes the shell's command history?"
          nextNode="NEXUS"
        />
      </main>
    </div>
  );
}