import React from 'react';
import type { Skill, Milestone } from './LearningRoadmap.types';

interface SkillCardProps {
  skill: Skill;
  editSkillId: number | null;
  editSkillValue: string;
  editMilestoneId: { skillId: number; milestoneId: number } | null;
  editMilestoneValue: string;
  activeSkillId: number | null;
  newMilestone: string;
  onEditSkill: (id: number, name: string) => void;
  onEditSkillSave: (id: number) => void;
  onDeleteSkill: (id: number) => void;
  onEditMilestone: (skillId: number, milestoneId: number, title: string) => void;
  onEditMilestoneSave: (skillId: number, milestoneId: number) => void;
  onDeleteMilestone: (skillId: number, milestoneId: number) => void;
  onToggleMilestone: (skillId: number, milestoneId: number) => void;
  onNewMilestoneChange: (value: string) => void;
  onAddMilestone: (skillId: number) => void;
  onSetActiveSkillId: (id: number | null) => void;
  onSetEditSkillId: (id: number | null) => void;
  onSetEditMilestoneId: (id: { skillId: number; milestoneId: number } | null) => void;
  onEditSkillValueChange: (value: string) => void;
  onEditMilestoneValueChange: (value: string) => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  editSkillId,
  editSkillValue,
  editMilestoneId,
  editMilestoneValue,
  activeSkillId,
  newMilestone,
  onEditSkill,
  onEditSkillSave,
  onDeleteSkill,
  onEditMilestone,
  onEditMilestoneSave,
  onDeleteMilestone,
  onToggleMilestone,
  onNewMilestoneChange,
  onAddMilestone,
  onSetActiveSkillId,
  onEditSkillValueChange,
  onEditMilestoneValueChange,
  onSetEditSkillId,
  onSetEditMilestoneId,
}) => {
  const completedCount = skill.milestones.filter(m => m.completed).length;
  const totalCount = skill.milestones.length;
  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  return (
    <div className="skill-card" tabIndex={0} aria-label={`Skill card: ${skill.name}`}>
      <div className="skill-card-header">
        {editSkillId === skill.id ? (
          <React.Fragment>
            <input
              type="text"
              value={editSkillValue}
              onChange={e => onEditSkillValueChange(e.target.value)}
              className="skill-input"
              onKeyDown={e => {
                if (e.key === 'Enter') onEditSkillSave(skill.id);
                if (e.key === 'Escape') onSetEditSkillId(null);
              }}
            />
            <button onClick={() => onEditSkillSave(skill.id)} className="skill-card-btn" style={{ marginRight: '0.5rem' }}>Save</button>
            <button onClick={() => onSetEditSkillId(null)} className="skill-card-btn" style={{ background: '#eee', color: '#181818' }}>Cancel</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3 className="skill-card-title">{skill.name}</h3>
            <button onClick={() => onEditSkill(skill.id, skill.name)} className="skill-card-btn" aria-label={`Edit skill ${skill.name}`}>Edit</button>
            <button onClick={() => onDeleteSkill(skill.id)} className="skill-card-btn delete" aria-label={`Delete skill ${skill.name}`}>Delete</button>
          </React.Fragment>
        )}
      </div>
      <div style={{ margin: '1rem 0' }}>
        <div className="progress-bar">
          <div className={`progress-bar-fill ${percent === 100 ? 'complete' : 'incomplete'}`} style={{ width: `${percent}%` }} />
          <span className={`progress-bar-label ${percent === 100 ? 'complete' : ''}`}>{percent}%</span>
        </div>
      </div>
      <ul className="milestone-list">
        {skill.milestones.map((milestone: Milestone) => (
          <li key={milestone.id} className="milestone-item">
            <input
              type="checkbox"
              checked={milestone.completed}
              onChange={() => onToggleMilestone(skill.id, milestone.id)}
              className="milestone-checkbox"
              aria-label={`Mark milestone '${milestone.title}' as complete`}
            />
            {editMilestoneId && editMilestoneId.skillId === skill.id && editMilestoneId.milestoneId === milestone.id ? (
              <React.Fragment>
                <input
                  type="text"
                  value={editMilestoneValue}
                  onChange={e => onEditMilestoneValueChange(e.target.value)}
                  className="skill-input"
                  onKeyDown={e => {
                    if (e.key === 'Enter') onEditMilestoneSave(skill.id, milestone.id);
                    if (e.key === 'Escape') onSetEditMilestoneId(null);
                  }}
                />
                <button onClick={() => onEditMilestoneSave(skill.id, milestone.id)} className="milestone-btn" style={{ marginRight: '0.5rem' }}>Save</button>
                <button onClick={() => onSetEditMilestoneId(null)} className="milestone-btn" style={{ background: '#eee', color: '#181818' }}>Cancel</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span className={`milestone-title${milestone.completed ? ' complete' : ''}`}>{milestone.title}</span>
                <button onClick={() => onEditMilestone(skill.id, milestone.id, milestone.title)} className="milestone-btn" aria-label={`Edit milestone ${milestone.title}`}>Edit</button>
                <button onClick={() => onDeleteMilestone(skill.id, milestone.id)} className="milestone-btn delete" aria-label={`Delete milestone ${milestone.title}`}>Delete</button>
              </React.Fragment>
            )}
          </li>
        ))}
      </ul>
      {activeSkillId === skill.id ? (
        <div className="add-milestone-row">
          <input
            type="text"
            value={newMilestone}
            onChange={e => onNewMilestoneChange(e.target.value)}
            placeholder="Add milestone..."
            className="add-milestone-input"
            onKeyDown={e => {
              if (e.key === 'Enter') onAddMilestone(skill.id);
              if (e.key === 'Escape') onSetActiveSkillId(null);
            }}
          />
          <button onClick={() => onAddMilestone(skill.id)} className="add-milestone-btn">Add</button>
          <button onClick={() => onSetActiveSkillId(null)} className="close-milestone-btn">Close</button>
        </div>
      ) : (
        <button onClick={() => onSetActiveSkillId(skill.id)} className="add-milestone-btn" style={{ marginTop: '1rem' }}>Add Milestone</button>
      )}
    </div>
  );
}
