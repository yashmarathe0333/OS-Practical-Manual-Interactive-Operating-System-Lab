import React from 'react';
import { GitBranch, ArrowDown, CheckCircle2, AlertCircle, PlayCircle } from 'lucide-react';

export default function FlowchartViewer({ flowchartText, algorithm }) {
  // Parse algorithm steps into a structured flowchart visual list
  const cleanSteps = (algorithm || []).map((step, index) => {
    const isStart = index === 0;
    const isEnd = index === algorithm.length - 1;
    const isCondition = step.toLowerCase().includes('if') || step.toLowerCase().includes('check');
    return {
      text: step,
      isStart,
      isEnd,
      isCondition,
      stepNum: index + 1
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-blue-400" />
            Visual Process Flowchart
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Step-by-step logic and decision path for this practical.
          </p>
        </div>
      </div>

      {/* Visual Step-by-Step Flow Nodes */}
      <div className="max-w-xl mx-auto py-4 flex flex-col items-center">
        {cleanSteps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div
              className={`w-full p-4 rounded-xl border transition-all relative ${
                step.isStart
                  ? 'bg-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : step.isEnd
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : step.isCondition
                  ? 'bg-amber-950/30 border-amber-500/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                    step.isStart
                      ? 'bg-blue-500 text-white'
                      : step.isEnd
                      ? 'bg-emerald-500 text-white'
                      : step.isCondition
                      ? 'bg-amber-500 text-black'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {step.stepNum}
                </span>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 font-mono text-slate-400">
                    {step.isStart ? 'Entry Point' : step.isEnd ? 'Exit / Completion' : step.isCondition ? 'Decision Block' : 'Process Block'}
                  </span>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Connecting Arrow */}
            {!step.isEnd && (
              <div className="py-2 text-slate-500 flex flex-col items-center">
                <div className="w-0.5 h-3 bg-slate-700" />
                <ArrowDown className="w-4 h-4 text-blue-400 -mt-1" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Raw Mermaid Architecture Code toggle */}
      {flowchartText && (
        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
            Mermaid Diagram Definition
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/80 p-3 rounded-lg overflow-x-auto">
            {flowchartText}
          </pre>
        </div>
      )}
    </div>
  );
}
