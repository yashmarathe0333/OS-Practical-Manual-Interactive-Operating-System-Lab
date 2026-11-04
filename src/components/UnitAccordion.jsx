import React from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Terminal, Cpu, Clock, Lock, HardDrive, FolderGit2 } from 'lucide-react';

const UNIT_ICONS = {
  Cpu: Cpu,
  Clock: Clock,
  Lock: Lock,
  HardDrive: HardDrive,
  FolderGit2: FolderGit2,
};

export default function UnitAccordion({
  unit,
  practicals,
  isOpen,
  onToggle,
  activePracticalId,
  onSelectPractical,
  completedIds
}) {
  const IconComponent = UNIT_ICONS[unit.icon] || Cpu;
  const unitCompletedCount = practicals.filter(p => completedIds.includes(p.id)).length;
  const isUnitAllDone = unitCompletedCount === practicals.length && practicals.length > 0;

  return (
    <div className="border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 mb-3 transition-colors">
      {/* Unit Header Accordion Toggle */}
      <button
        onClick={onToggle}
        className="w-full px-3.5 py-3 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`p-1.5 rounded-lg ${
            isUnitAllDone
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
          }`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {unit.number}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                ({unitCompletedCount}/{practicals.length})
              </span>
            </div>
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white truncate">
              {unit.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {isUnitAllDone && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" title="Unit Complete" />
          )}
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-transform" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-transform" />
          )}
        </div>
      </button>

      {/* Accordion Content: Practicals List */}
      {isOpen && (
        <div className="border-t border-slate-200 dark:border-slate-800/70 p-1.5 space-y-1 bg-white/60 dark:bg-slate-950/40">
          {practicals.map((p) => {
            const isActive = p.id === activePracticalId;
            const isDone = completedIds.includes(p.id);

            return (
              <button
                key={p.id}
                onClick={() => onSelectPractical(p.id)}
                className={`w-full px-2.5 py-2 rounded-lg text-left flex items-center justify-between group transition-all relative ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 font-medium'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-500 rounded-r" />
                )}

                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                    isActive 
                      ? 'bg-blue-600 text-white font-bold' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                  }`}>
                    {p.id.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs truncate font-normal group-hover:text-slate-900 dark:group-hover:text-white">
                    {p.shortTitle}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {p.isLinuxOnly && (
                    <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono">
                      Linux
                    </span>
                  )}
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
