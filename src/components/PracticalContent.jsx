import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2, Circle, ChevronLeft, ChevronRight, BookOpen, FileCode, Play,
  Cpu, GitBranch, ListOrdered, HelpCircle, Sparkles, Terminal, Award, FileText
} from 'lucide-react';
import CodeEditor from './CodeEditor';
import OutputTerminal from './OutputTerminal';
import FlowchartViewer from './FlowchartViewer';
import { executeCode } from '../utils/codeRunner';
import { getSavedCode, saveCode, resetCode } from '../utils/storage';

export default function PracticalContent({
  practical,
  isCompleted,
  onToggleComplete,
  onPreviousPractical,
  onNextPractical,
  hasPrevious,
  hasNext
}) {
  const [activeTab, setActiveTab] = useState('full'); // 'full', 'overview', 'theory', 'algorithm', 'code', 'viva'
  const [currentCode, setCurrentCode] = useState('');
  const [stdin, setStdin] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [outputResult, setOutputResult] = useState(null);

  // Load saved code whenever practical changes
  useEffect(() => {
    const saved = getSavedCode(practical.id, practical.code);
    setCurrentCode(saved);
    setOutputResult(null);
    setStdin('');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [practical.id, practical.code]);

  // Code edit handler
  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
    saveCode(practical.id, newCode);
  };

  // Reset code handler
  const handleReset = () => {
    resetCode(practical.id);
    setCurrentCode(practical.code);
  };

  // Run code handler
  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await executeCode({
        code: currentCode,
        language: practical.language,
        stdin: stdin
      });
      setOutputResult(res);
    } catch (e) {
      setOutputResult({
        success: false,
        isRealExecution: false,
        stdout: '',
        stderr: `Execution error: ${e.message}`,
        exitCode: -1,
        durationMs: 0,
        engine: 'Error'
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Trigger celebration confetti when marking complete
  const handleCompleteToggle = () => {
    const nextState = !isCompleted;
    onToggleComplete(practical.id);
    if (nextState) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-6">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-blue-400">UNIT {practical.unit}</span>
          <span>•</span>
          <span className="truncate max-w-xs">{practical.unitTitle}</span>
          <span>•</span>
          <span className="text-slate-300 font-medium">{practical.category}</span>
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPreviousPractical}
            disabled={!hasPrevious}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              hasPrevious
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={onNextPractical}
            disabled={!hasNext}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              hasNext
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Practical Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-blue-600 text-white font-bold tracking-wide shadow-sm">
                PRACTICAL #{practical.id.toString().padStart(2, '0')}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700/60">
                {practical.category}
              </span>
              {practical.isLinuxOnly ? (
                <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                  Linux System Environment
                </span>
              ) : (
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                  Portable C++ (All Platforms)
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
              {practical.title}
            </h1>
          </div>

          {/* Mark Completed Button */}
          <button
            onClick={handleCompleteToggle}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>Mark as Completed</span>
              </>
            )}
          </button>
        </div>

        {/* View Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-6 border-t border-slate-200 dark:border-slate-800/80 mt-6 text-xs">
          {[
            { id: 'full', label: 'Full Lab Manual', icon: FileText },
            { id: 'overview', label: 'Aim & Problem', icon: BookOpen },
            { id: 'theory', label: 'Theory', icon: Cpu },
            { id: 'algorithm', label: 'Algorithm & Flowchart', icon: ListOrdered },
            { id: 'code', label: 'Code & Execution', icon: FileCode },
            { id: 'viva', label: 'Viva Voce Q&A', icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Rendering based on Tab */}
      
      {/* 1. AIM & PROBLEM STATEMENT */}
      {(activeTab === 'full' || activeTab === 'overview') && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 font-mono">
              <BookOpen className="w-4 h-4" />
              1. Aim
            </h3>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {practical.aim}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 font-mono">
              <FileText className="w-4 h-4" />
              2. Problem Statement
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {practical.problemStatement}
            </p>
          </div>
        </div>
      )}

      {/* 2. THEORY */}
      {(activeTab === 'full' || activeTab === 'theory') && (
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 font-mono pb-2 border-b border-slate-200 dark:border-slate-800">
            <Cpu className="w-4 h-4" />
            3. Theory & Architectural Concepts
          </h3>
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 whitespace-pre-wrap font-sans">
            {practical.theory}
          </div>
        </div>
      )}

      {/* 3. ALGORITHM */}
      {(activeTab === 'full' || activeTab === 'algorithm') && (
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 font-mono pb-2 border-b border-slate-200 dark:border-slate-800">
            <ListOrdered className="w-4 h-4" />
            4. Step-by-Step Algorithm
          </h3>
          <div className="space-y-2">
            {practical.algorithm.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold select-none min-w-[20px]">
                  {idx + 1}.
                </span>
                <span className="flex-1 font-sans">{step.replace(/^\d+\.\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. FLOWCHART */}
      {(activeTab === 'full' || activeTab === 'algorithm') && (
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 font-mono pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
            <GitBranch className="w-4 h-4" />
            5. Flowchart
          </h3>
          <FlowchartViewer flowchartText={practical.flowchart} algorithm={practical.algorithm} />
        </div>
      )}

      {/* 5. CODE EDITOR & REAL EXECUTION TERMINAL */}
      {(activeTab === 'full' || activeTab === 'code') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 font-mono">
              <FileCode className="w-4 h-4" />
              6. Source Code Editor & Interactive Execution
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Language: <strong className="text-slate-800 dark:text-slate-200">{practical.language.toUpperCase()}</strong>
            </span>
          </div>

          {/* Interactive Code Editor Component */}
          <CodeEditor
            practical={practical}
            code={currentCode}
            onChangeCode={handleCodeChange}
            onResetCode={handleReset}
            onRunCode={handleRun}
            isRunning={isRunning}
            stdin={stdin}
            onChangeStdin={setStdin}
          />

          {/* Output Terminal Component */}
          <OutputTerminal
            outputResult={outputResult}
            sampleOutput={practical.sampleOutput}
            isRunning={isRunning}
            onClear={() => setOutputResult(null)}
          />
        </div>
      )}

      {/* 6. SAMPLE INPUT & OUTPUT */}
      {(activeTab === 'full' || activeTab === 'code' || activeTab === 'overview') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sample Input */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 font-mono">
              <Terminal className="w-4 h-4" />
              7. Sample Input
            </h3>
            <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
              {practical.sampleInput}
            </pre>
          </div>

          {/* Sample Output */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              8. Sample Output
            </h3>
            <pre className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-emerald-300/90 overflow-x-auto whitespace-pre-wrap max-h-56">
              {practical.sampleOutput}
            </pre>
          </div>
        </div>
      )}

      {/* 7. EXPLANATION */}
      {(activeTab === 'full' || activeTab === 'theory' || activeTab === 'code') && (
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 font-mono pb-2 border-b border-slate-200 dark:border-slate-800">
            <BookOpen className="w-4 h-4" />
            9. Code Explanation & Key Mechanisms
          </h3>
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
            {practical.explanation}
          </div>
        </div>
      )}

      {/* 8. RESULT */}
      {(activeTab === 'full' || activeTab === 'overview') && (
        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-slate-900/70 border border-emerald-300 dark:border-emerald-500/30 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-mono">
            <Award className="w-4 h-4" />
            10. Result
          </h3>
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {practical.result}
          </p>
        </div>
      )}

      {/* 9. VIVA VOCE QUESTIONS & ANSWERS */}
      {(activeTab === 'full' || activeTab === 'viva') && practical.vivaQuestions && (
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 font-mono">
              <HelpCircle className="w-4 h-4" />
              11. Viva Voce Preparation Questions
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Essential practical exam interview prep</span>
          </div>

          <div className="space-y-3">
            {practical.vivaQuestions.map((viva, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1.5">
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-mono">Q{idx + 1}:</span>
                  <span>{viva.q}</span>
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                  <strong className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">Ans: </strong>
                  {viva.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          onClick={onPreviousPractical}
          disabled={!hasPrevious}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
            hasPrevious
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              : 'bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Practical</span>
        </button>

        <button
          onClick={onNextPractical}
          disabled={!hasNext}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
            hasNext
              ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/30'
              : 'bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed'
          }`}
        >
          <span>Next Practical</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
