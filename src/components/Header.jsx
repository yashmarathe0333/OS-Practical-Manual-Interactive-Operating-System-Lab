import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Search, LayoutDashboard, BookOpen, Menu, X, CheckCircle2, ChevronRight, Laptop } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ProgressBar from './ProgressBar';
import { searchPracticals } from '../data/practicals';

export default function Header({
  activeView,
  onViewChange,
  onSelectPractical,
  completedIds,
  theme,
  onToggleTheme,
  onToggleMobileSidebar,
  isMobileSidebarOpen
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const searchResults = searchQuery.trim() ? searchPracticals(searchQuery) : [];

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Sidebar"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => onViewChange('dashboard')} 
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  OS Practical Manual
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Interactive Lab
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal hidden sm:block">
                Operating System Laboratory Manual & Execution Engine
              </p>
            </div>
          </button>
        </div>

        {/* Center: Search Box */}
        <div className="flex-1 max-w-md relative hidden md:block" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search 24 practicals by number, title, or topic..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto z-50">
              <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex justify-between">
                <span>Matching Practicals ({searchResults.length})</span>
                <span>Press ESC or click to view</span>
              </div>
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No practicals matched "<span className="text-white">{searchQuery}</span>"
                </div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {searchResults.map((p) => {
                    const isDone = completedIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPractical(p.id);
                          onViewChange('manual');
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full p-2.5 text-left hover:bg-slate-800/80 flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                            #{p.id.toString().padStart(2, '0')}
                          </span>
                          <div>
                            <p className="text-xs font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                              {p.shortTitle}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Unit {p.unit} • {p.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isDone && (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3" /> Done
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: View Toggles, Progress & Theme */}
        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeView === 'dashboard'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button
              onClick={() => onViewChange('manual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeView === 'manual'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lab Practicals</span>
            </button>
          </div>

          {/* Progress Tracker */}
          <div className="hidden sm:block pl-2 border-l border-slate-800">
            <ProgressBar completedCount={completedIds.length} totalCount={24} />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
