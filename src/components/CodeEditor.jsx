import React, { useState } from 'react';
import { Copy, Check, Download, RotateCcw, Play, Loader2, Code2, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

export default function CodeEditor({
  practical,
  code,
  onChangeCode,
  onResetCode,
  onRunCode,
  isRunning,
  stdin,
  onChangeStdin
}) {
  const [copied, setCopied] = useState(false);
  const [showStdin, setShowStdin] = useState(false);

  // Handle Copy to Clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy code:', e);
    }
  };

  // Handle Download file
  const handleDownload = () => {
    const ext = practical.language === 'bash' ? 'sh' : 'cpp';
    const filename = `practical_${practical.id.toString().padStart(2, '0')}_${practical.shortTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.${ext}`;
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lineCount = (code.match(/\n/g) || []).length + 1;

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 shadow-2xl flex flex-col">
      {/* Editor Header Bar (VS Code style) */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        {/* Left: File info */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700/60">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {practical.language === 'bash' ? 'script.sh' : 'main.cpp'}
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            ({practical.language === 'bash' ? 'Bash 5.2' : 'C++ 20 / Linux POSIX'})
          </span>
          {practical.isLinuxOnly && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
              Linux Kernel Required
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Custom Stdin toggle */}
          <button
            onClick={() => setShowStdin(!showStdin)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white transition-colors border border-slate-700/50"
            title="Provide custom input (stdin)"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Custom Input</span>
            {showStdin ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {/* Reset Code */}
          <button
            onClick={onResetCode}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white transition-colors border border-slate-700/50"
            title="Reset code to original lab version"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white transition-colors border border-slate-700/50"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          {/* Download Code */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white transition-colors border border-slate-700/50"
            title="Download source code"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Download</span>
          </button>

          {/* Run Practical */}
          <button
            onClick={onRunCode}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all shadow-md ${
              isRunning
                ? 'bg-blue-600/50 text-white cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30 active:scale-95'
            }`}
            title="Execute practical on remote Linux compiler sandbox"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Practical</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Optional Custom Input Drawer */}
      {showStdin && (
        <div className="p-3 bg-slate-900/90 border-b border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Standard Input (stdin) - will be passed to your program:
          </label>
          <textarea
            value={stdin}
            onChange={(e) => onChangeStdin(e.target.value)}
            placeholder="Enter standard input values (space or newline separated) if your code expects input..."
            rows={2}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg p-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* Editor Body with Line Numbers */}
      <div className="relative flex font-mono text-xs leading-relaxed overflow-x-auto min-h-[360px] max-h-[580px]">
        {/* Line Numbers gutter */}
        <div className="select-none py-3.5 pl-3 pr-2 bg-slate-950/90 text-slate-600 text-right font-mono border-r border-slate-800/80 min-w-[40px]">
          {Array.from({ length: Math.max(lineCount, 15) }, (_, i) => (
            <div key={i + 1} className="h-5">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Area for Interactive Editing */}
        <textarea
          value={code}
          onChange={(e) => onChangeCode(e.target.value)}
          spellCheck="false"
          className="flex-1 p-3.5 bg-slate-950 text-slate-100 font-mono text-xs leading-5 resize-none focus:outline-none whitespace-pre selection:bg-blue-600 selection:text-white"
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Editor Footer Status */}
      <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span>Lines: {lineCount}</span>
          <span>Chars: {code.length}</span>
          <span className="text-slate-500">|</span>
          <span className="text-blue-400">Interactive Editor (Edits are automatically saved in local browser)</span>
        </div>
        <div>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
