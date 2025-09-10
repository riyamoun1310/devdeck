// Main dashboard layout for DevDeck
import { useState } from 'react';
import './Dashboard.css';
import { KanbanBoard } from './features/kanban-board/KanbanBoard';
import { LearningRoadmap } from './features/learning-roadmap/LearningRoadmap';
import { JobPipeline } from './features/job-pipeline/JobPipeline';

interface DashboardProps {
  currentTheme: string;
  toggleTheme: () => void;
}

export default function Dashboard({ currentTheme, toggleTheme }: DashboardProps) {
  const [active, setActive] = useState<'kanban' | 'roadmap' | 'pipeline'>('kanban');

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h1>DevDeck Dashboard</h1>
        <p>Welcome! Choose a feature to get started:</p>
        <nav className="dashboard-nav">
          <button onClick={() => setActive('kanban')} className={active === 'kanban' ? 'active' : ''}>Kanban Board</button>
          <button onClick={() => setActive('roadmap')} className={active === 'roadmap' ? 'active' : ''}>Learning Roadmap</button>
          <button onClick={() => setActive('pipeline')} className={active === 'pipeline' ? 'active' : ''}>Job Application Pipeline</button>
        </nav>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </header>
      <main className={`tab-content${active ? ' fade-in' : ''}`} key={active}>
        {active === 'kanban' && <KanbanBoard darkMode={currentTheme === 'dark'} setDarkMode={() => {}} />}
        {active === 'roadmap' && <LearningRoadmap darkMode={currentTheme === 'dark'} />}
        {active === 'pipeline' && <JobPipeline darkMode={currentTheme === 'dark'} />}
        {!active && (
          <ul className="dashboard-list">
            <li>Kanban Board</li>
            <li>Learning Roadmap</li>
            <li>Job Application Pipeline</li>
          </ul>
        )}
      </main>
      <footer className="dashboard-footer">
        <span>Made with ❤️ for developers | {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
