import React from 'react';
import {
  Cpu, Clock, Lock, HardDrive, FolderGit2, CheckCircle2, Circle, ArrowRight,
  BookOpen, Terminal, Sparkles, Award, Shield, FileCode2, Play
} from 'lucide-react';
import { UNITS } from '../data/units';
import { allPracticals } from '../data/practicals';

const UNIT_ICONS = {
  Cpu: Cpu,
  Clock: Clock,
  Lock: Lock,
  HardDrive: HardDrive,
  FolderGit2: FolderGit2,
};

export default function Dashboard({
  completedIds,
  onSelectPractical,
  onGoToManual
}) {
  const totalCount = 24;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Find next uncompleted practical to continue
  const nextPendingPractical = allPracticals.find(p => !completedIds.includes(p.id)) || allPracticals[0];

  return (
    <div className="max-w-6xl mx-auto pb-16 space-y-8">
      
      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950/60 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Computer Engineering • Operating System Lab Curriculum</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Interactive OS Practical Manual
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              A comprehensive laboratory dashboard covering all 24 Operating System practicals. 
              Equipped with deep theoretical explanations, step-by-step algorithms, visual flowcharts, 
              complete C++ / Bash source codes, and an integrated remote Linux compiler execution environment.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onSelectPractical(nextPendingPractical.id);
                  onGoToManual();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continue: Practical #{nextPendingPractical.id.toString().padStart(2, '0')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onSelectPractical(1);
                  onGoToManual();
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse All 24 Practicals</span>
              </button>
            </div>
          </div>

          {/* Progress Circular Badge Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-xl flex flex-col items-center justify-center min-w-[200px] text-center">
            <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-extrabold text-white font-mono">
                  {progressPercent}%
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Progress</span>
              </div>
            </div>

            <div className="text-xs text-slate-300">
              <strong className="text-emerald-400 font-bold">{completedCount}</strong> of 24 Practicals Done
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {completedCount === 24 ? '🎉 All practicals completed!' : `${24 - completedCount} pending for examination`}
            </p>
          </div>
        </div>
      </div>

      {/* 5 Units Grid Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              Syllabus Units (5 Units • 24 Practicals)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Structured according to the standard University Computer Engineering syllabus.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {UNITS.map((unit) => {
            const Icon = UNIT_ICONS[unit.icon] || Cpu;
            const unitPracticals = allPracticals.filter(p => p.unit === unit.id);
            const unitDoneCount = unitPracticals.filter(p => completedIds.includes(p.id)).length;
            const unitPercent = Math.round((unitDoneCount / unitPracticals.length) * 100);

            return (
              <div
                key={unit.id}
                className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg dark:hover:bg-slate-900/90 transition-all group"
              >
                <div>
                  {/* Unit Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {unit.number}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {unitDoneCount}/{unitPracticals.length}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {unit.description}
                  </p>

                  {/* Progress Bar for Unit */}
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${unitPercent}%` }}
                    />
                  </div>

                  {/* Practicals Quick List */}
                  <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {unitPracticals.map((p) => {
                      const isDone = completedIds.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            onSelectPractical(p.id);
                            onGoToManual();
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center justify-between group/item transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400">
                              #{p.id.toString().padStart(2, '0')}
                            </span>
                            <span className="text-xs text-slate-700 dark:text-slate-300 truncate group-hover/item:text-slate-900 dark:group-hover/item:text-white font-medium">
                              {p.shortTitle}
                            </span>
                          </div>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <button
                    onClick={() => {
                      onSelectPractical(unitPracticals[0].id);
                      onGoToManual();
                    }}
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800/70 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Open {unit.number} Practicals</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Essential OS Exam & Lab Highlights */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Terminal className="w-4 h-4" />
            <span>Real Linux System Calls</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Practicals 1–5 and 14 implement native POSIX kernel calls (<code className="text-slate-800 dark:text-slate-200">fork</code>, <code className="text-slate-800 dark:text-slate-200">exec</code>, <code className="text-slate-800 dark:text-slate-200">wait</code>, <code className="text-slate-800 dark:text-slate-200">pipe</code>). You can edit and run them in real Linux sandboxes.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>Scheduling & Memory Lab</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            CPU algorithms (FCFS, Round Robin with variable quantum) and Memory allocation (First Fit vs Best Fit) compute exact waiting times, turnaround times, and internal fragmentation.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>Viva Voce Ready</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every practical includes common college exam Viva questions with concise second-year answers to ensure you are thoroughly prepared for OS laboratory oral exams.
          </p>
        </div>
      </div>

    </div>
  );
}
