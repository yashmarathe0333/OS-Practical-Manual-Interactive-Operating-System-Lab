import React, { useState } from 'react';
import { Terminal, CheckCircle2, AlertTriangle, XCircle, Clock, Cpu, Trash2, BookOpen, ShieldCheck } from 'lucide-react';

export default function OutputTerminal({
  outputResult,
  sampleOutput,
  isRunning,
  onClear
}) {
  const [activeTab, setActiveTab] = useState('live'); // 'live' or 'sample'

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 shadow-2xl flex flex-col mt-4">
      {/* Terminal Title Bar */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        {/* Terminal Window Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            Terminal Output
          </span>
        </div>

        {/* Output Selector Tabs & Clear Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-[11px]">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'live'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Execution
            </button>
            <button
              onClick={() => setActiveTab('sample')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'sample'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Verified Lab Sample
            </button>
          </div>

          {onClear && outputResult && (
            <button
              onClick={onClear}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Clear terminal output"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-xs text-slate-200 min-h-[160px] max-h-[380px] overflow-y-auto leading-relaxed bg-[#0b0f17]">
        {/* If live output is selected */}
        {activeTab === 'live' && (
          <div>
            {isRunning ? (
              <div className="flex items-center gap-3 text-blue-400 py-6 justify-center">
                <span className="terminal-cursor" />
                <span className="animate-pulse">Compiling & executing in remote Linux sandbox...</span>
              </div>
            ) : outputResult ? (
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    {outputResult.isRealExecution ? (
                      <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Real Linux Execution
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Network / Sandbox Notice
                      </span>
                    )}
                    <span className="text-slate-500">|</span>
                    <span>{outputResult.engine}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {outputResult.durationMs} ms
                    </span>
                    <span className={`px-2 py-0.5 rounded font-mono ${
                      outputResult.exitCode === 0
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      exit {outputResult.exitCode}
                    </span>
                  </div>
                </div>

                {/* Standard Output */}
                {outputResult.stdout && (
                  <pre className="text-emerald-300 whitespace-pre-wrap font-mono leading-5 mb-2">
                    {outputResult.stdout}
                  </pre>
                )}

                {/* Errors (Compilation or Runtime or Offline explanation) */}
                {outputResult.stderr && (
                  <div className="mt-2 p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-300 whitespace-pre-wrap leading-5">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400 mb-1">
                      <XCircle className="w-4 h-4" />
                      <span>{outputResult.hasCompileError ? 'Compilation Error' : outputResult.isOfflineOrNetworkError ? 'Execution Limit / Notice' : 'Runtime Error'}</span>
                    </div>
                    {outputResult.stderr}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-500 py-8 text-center flex flex-col items-center justify-center gap-2">
                <Terminal className="w-8 h-8 text-slate-700" />
                <p>Click <strong className="text-emerald-400 font-semibold">"Run Practical"</strong> above to compile and execute this program in the Linux sandbox.</p>
                <p className="text-[11px] text-slate-600">
                  Or switch to the <span className="text-blue-400">"Verified Lab Sample"</span> tab above to view the expected standard output.
                </p>
              </div>
            )}
          </div>
        )}

        {/* If Sample Output tab is selected */}
        {activeTab === 'sample' && (
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-blue-400">
                <BookOpen className="w-3.5 h-3.5" />
                Verified Laboratory Sample Output (OS Curriculum Standard)
              </span>
              <span className="text-slate-500">Exit Status: 0 (Normal)</span>
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap font-mono leading-5">
              {sampleOutput}
            </pre>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <span>Bash / g++ Linux Runtime</span>
        <span>Secure Sandbox Environment</span>
      </div>
    </div>
  );
}
