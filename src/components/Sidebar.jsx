import React, { useState } from 'react';
import { Search, Filter, ChevronsUpDown, CheckCircle2, Terminal, X, Sparkles } from 'lucide-react';
import UnitAccordion from './UnitAccordion';
import { UNITS } from '../data/units';
import { allPracticals } from '../data/practicals';

export default function Sidebar({
  activePracticalId,
  onSelectPractical,
  completedIds,
  isOpen,
  onClose
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'completed', 'pending', 'linux'
  const [openUnits, setOpenUnits] = useState({ 1: true, 2: true, 3: false, 4: false, 5: false });

  // Toggle single unit accordion
  const handleToggleUnit = (unitId) => {
    setOpenUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  // Expand or collapse all
  const toggleAllUnits = () => {
    const areAllOpen = Object.values(openUnits).every(Boolean);
    const updated = {};
    UNITS.forEach(u => {
      updated[u.id] = !areAllOpen;
    });
    setOpenUnits(updated);
  };

  // Filter practicals based on search and selected filter mode
  const filterPractical = (p) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const match =
        p.id.toString() === q ||
        p.title.toLowerCase().includes(q) ||
        p.shortTitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filterMode === 'completed') return completedIds.includes(p.id);
    if (filterMode === 'pending') return !completedIds.includes(p.id);
    if (filterMode === 'linux') return p.isLinuxOnly;

    return true;
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Controls: Search & Filter */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 space-y-2.5 bg-slate-50/80 dark:bg-slate-900/90">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              Lab Practicals (24)
            </span>
            <button
              onClick={toggleAllUnits}
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 transition-colors"
              title="Expand or collapse all units"
            >
              <ChevronsUpDown className="w-3 h-3" />
              Toggle All
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter practicals..."
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="grid grid-cols-4 gap-1 text-[11px]">
            {[
              { id: 'all', label: 'All (24)' },
              { id: 'completed', label: `Done (${completedIds.length})` },
              { id: 'pending', label: `Todo (${24 - completedIds.length})` },
              { id: 'linux', label: 'Linux' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterMode(f.id)}
                className={`py-1 rounded-md text-center font-medium transition-colors ${
                  filterMode === f.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Units & Practicals List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {UNITS.map((unit) => {
            const unitPracticals = allPracticals
              .filter(p => p.unit === unit.id)
              .filter(filterPractical);

            // If filtering and this unit has zero matching practicals, hide it
            if (unitPracticals.length === 0 && (searchTerm || filterMode !== 'all')) {
              return null;
            }

            return (
              <UnitAccordion
                key={unit.id}
                unit={unit}
                practicals={unitPracticals}
                isOpen={openUnits[unit.id] ?? false}
                onToggle={() => handleToggleUnit(unit.id)}
                activePracticalId={activePracticalId}
                onSelectPractical={(id) => {
                  onSelectPractical(id);
                  if (onClose) onClose();
                }}
                completedIds={completedIds}
              />
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px]">Interactive Piston Sandbox</span>
          </div>
          <span className="font-mono text-[11px] font-semibold text-blue-400">
            {completedIds.length}/24 Done
          </span>
        </div>
      </aside>
    </>
  );
}
