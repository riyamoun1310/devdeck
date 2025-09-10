import React from 'react';

export default function RoadmapTooltip({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 32,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1976d2',
      color: '#fff',
      padding: '1rem 2rem',
      borderRadius: 12,
      boxShadow: '0 2px 12px #333',
      fontWeight: 600,
      fontSize: 18,
      zIndex: 9999,
      transition: 'opacity 0.3s',
      opacity: show ? 1 : 0,
    }}>
      Welcome! Add a skill, then milestones. Click checkboxes to track progress. Edit or delete anytime.
    </div>
  );
}
