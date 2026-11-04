import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export default function ProgressBar({ completedCount, totalCount = 24 }) {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-300">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>
          <strong className="text-white font-semibold">{completedCount}</strong>/{totalCount} Done
        </span>
      </div>

      <div className="w-24 sm:w-32 h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="text-xs font-semibold text-blue-400 tabular-nums">
        {percentage}%
      </span>
    </div>
  );
}
