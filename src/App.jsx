import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Manual from './pages/Manual';
import {
  getCompletedPracticals,
  togglePracticalCompletion,
  getSavedTheme,
  saveTheme
} from './utils/storage';

export default function App() {
  const [activeView, setActiveView] = useState('manual'); // 'manual' or 'dashboard'
  const [activePracticalId, setActivePracticalId] = useState(1);
  const [completedIds, setCompletedIds] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Load initial states from localStorage
  useEffect(() => {
    const savedCompleted = getCompletedPracticals();
    setCompletedIds(savedCompleted);

    const savedTheme = getSavedTheme();
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Theme toggle
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    saveTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Completion toggle
  const handleToggleComplete = (id) => {
    const updated = togglePracticalCompletion(id);
    setCompletedIds(updated);
  };

  // Select Practical
  const handleSelectPractical = (id) => {
    setActivePracticalId(id);
    setActiveView('manual');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Header */}
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        onSelectPractical={handleSelectPractical}
        completedIds={completedIds}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex">
        {/* Left Sidebar (Only visible in 'manual' view on desktop, or as mobile drawer) */}
        {activeView === 'manual' && (
          <Sidebar
            activePracticalId={activePracticalId}
            onSelectPractical={handleSelectPractical}
            completedIds={completedIds}
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Right Content Area */}
        <main
          className={`flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 transition-all ${
            activeView === 'manual' ? 'lg:ml-80' : 'w-full max-w-7xl mx-auto'
          }`}
        >
          {activeView === 'dashboard' ? (
            <Dashboard
              completedIds={completedIds}
              onSelectPractical={handleSelectPractical}
              onGoToManual={() => setActiveView('manual')}
            />
          ) : (
            <Manual
              activePracticalId={activePracticalId}
              onSelectPractical={handleSelectPractical}
              completedIds={completedIds}
              onToggleComplete={handleToggleComplete}
            />
          )}
        </main>
      </div>
    </div>
  );
}
