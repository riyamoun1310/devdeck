// Removed duplicate handler outside component
import React, { useState } from 'react';
import './LearningRoadmap.css';
import RoadmapTooltip from '../../components/RoadmapTooltip';
import { SkillCard } from './SkillCard';
import type { Skill, Milestone } from './LearningRoadmap.types';

export function LearningRoadmap({ darkMode }: { darkMode: boolean }) {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: 'Learn React',
      milestones: [
        { id: 1, title: 'Complete Basics Tutorial', completed: true },
        { id: 2, title: 'Build a To-Do App', completed: false },
        { id: 3, title: 'Learn State Management', completed: false },
      ],
    },
    {
      id: 2,
      name: 'Learn TypeScript',
      milestones: [
        { id: 1, title: 'Understand Types', completed: true },
        { id: 2, title: 'Use Interfaces', completed: false },
        { id: 3, title: 'Integrate with React', completed: false },
      ],
    },
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [editSkillId, setEditSkillId] = useState<number | null>(null);
  const [editSkillValue, setEditSkillValue] = useState('');
  const [newMilestone, setNewMilestone] = useState('');
  const [activeSkillId, setActiveSkillId] = useState<number | null>(null);
  const [editMilestoneId, setEditMilestoneId] = useState<{ skillId: number; milestoneId: number } | null>(null);
  const [editMilestoneValue, setEditMilestoneValue] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { id: Date.now(), name: newSkill.trim(), milestones: [] }]);
      setNewSkill('');
    }
  };

  const handleEditSkill = (id: number, name: string) => {
    setEditSkillId(id);
    setEditSkillValue(name);
  };

  const handleEditSkillSave = (id: number) => {
    setSkills(skills.map((skill: Skill) => skill.id === id ? { ...skill, name: editSkillValue } : skill));
    setEditSkillId(null);
    setEditSkillValue('');
  };

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter((skill: Skill) => skill.id !== id));
  };

  const handleEditMilestone = (skillId: number, milestoneId: number, title: string) => {
    setEditMilestoneId({ skillId, milestoneId });
    setEditMilestoneValue(title);
  };

  const handleEditMilestoneSave = (skillId: number, milestoneId: number) => {
    setSkills(skills.map((skill: Skill) =>
      skill.id === skillId
        ? {
            ...skill,
            milestones: skill.milestones.map((m: Milestone) =>
              m.id === milestoneId ? { ...m, title: editMilestoneValue } : m
            ),
          }
        : skill
    ));
    setEditMilestoneId(null);
    setEditMilestoneValue('');
  };

  const handleDeleteMilestone = (skillId: number, milestoneId: number) => {
    setSkills(skills.map((skill: Skill) =>
      skill.id === skillId
        ? { ...skill, milestones: skill.milestones.filter((m: Milestone) => m.id !== milestoneId) }
        : skill
    ));
  };

  const handleToggleMilestone = (skillId: number, milestoneId: number) => {
    setSkills(skills.map((skill: Skill) =>
      skill.id === skillId
        ? {
            ...skill,
            milestones: skill.milestones.map((m: Milestone) =>
              m.id === milestoneId ? { ...m, completed: !m.completed } : m
            ),
          }
        : skill
    ));
  };


  return (
    <div className="learning-roadmap-container" style={{ background: darkMode ? '#181818' : '#fff', color: darkMode ? '#f9f9f9' : '#181818', transition: 'background 0.3s, color 0.3s' }}>
      <h2 className="learning-roadmap-title">Learning Roadmap</h2>
      <RoadmapTooltip show={skills.length === 0} />
      <div className="add-skill-section">
        <input
          type="text"
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          placeholder="Add a new skill..."
        />
        <button onClick={handleAddSkill}>Add Skill</button>
      </div>
      <div className="skills-list">
        {skills.map(skill => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onEditSkill={handleEditSkill}
            onEditSkillSave={handleEditSkillSave}
            onDeleteSkill={handleDeleteSkill}
            editSkillId={editSkillId}
            editSkillValue={editSkillValue}
            editMilestoneId={editMilestoneId}
            editMilestoneValue={editMilestoneValue}
            activeSkillId={activeSkillId}
            newMilestone={newMilestone}
            onEditMilestone={handleEditMilestone}
            onEditMilestoneSave={handleEditMilestoneSave}
            onDeleteMilestone={handleDeleteMilestone}
            onToggleMilestone={handleToggleMilestone}
            onNewMilestoneChange={setNewMilestone}
            onAddMilestone={(skillId) => {
              if (newMilestone.trim()) {
                setSkills(skills.map(s =>
                  s.id === skillId
                    ? { ...s, milestones: [...s.milestones, { id: Date.now(), title: newMilestone.trim(), completed: false }] }
                    : s
                ));
                setNewMilestone('');
              }
            }}
            onSetActiveSkillId={setActiveSkillId}
            onEditSkillValueChange={setEditSkillValue}
            onEditMilestoneValueChange={setEditMilestoneValue}
          />
        ))}
      </div>
    </div>
  );
}
