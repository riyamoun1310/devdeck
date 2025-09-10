import React, { useState } from 'react';
import './JobPipeline.css';

export type Job = {
  id: number;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  notes?: string;
};

const initialJobs: Job[] = [
  { id: 1, company: 'Google', position: 'Frontend Engineer', status: 'Applied' },
  { id: 2, company: 'Microsoft', position: 'React Developer', status: 'Interview' },
  { id: 3, company: 'Amazon', position: 'UI Engineer', status: 'Offer' },
];

export function JobPipeline({ darkMode }: { darkMode: boolean }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [newJob, setNewJob] = useState({ company: '', position: '', status: 'Applied' });
  const [showForm, setShowForm] = useState(false);

  const handleAddJob = () => {
    if (newJob.company.trim() && newJob.position.trim()) {
      setJobs([
        ...jobs,
        {
          id: Date.now(),
          company: newJob.company,
          position: newJob.position,
          status: newJob.status as 'Applied' | 'Interview' | 'Offer' | 'Rejected',
        }
      ]);
      setNewJob({ company: '', position: '', status: 'Applied' });
      setShowForm(false);
    }
  };

  const handleStatusChange = (id: number, status: Job['status']) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status } : job));
  };

  return (
    <div className="job-pipeline-container" style={{ background: darkMode ? '#181818' : '#fff', color: darkMode ? '#f9f9f9' : '#181818', transition: 'background 0.3s, color 0.3s' }}>
      <h2>Job Pipeline</h2>
      <button className="add-job-btn" onClick={() => setShowForm(true)}>Add Job</button>
      {showForm && (
        <div className="job-form">
          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={e => setNewJob({ ...newJob, company: e.target.value })}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddJob();
              if (e.key === 'Escape') setShowForm(false);
            }}
          />
          <input
            type="text"
            placeholder="Position"
            value={newJob.position}
            onChange={e => setNewJob({ ...newJob, position: e.target.value })}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddJob();
              if (e.key === 'Escape') setShowForm(false);
            }}
          />
          <select
            value={newJob.status}
            onChange={e => setNewJob({ ...newJob, status: e.target.value as Job['status'] })}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddJob();
              if (e.key === 'Escape') setShowForm(false);
            }}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={handleAddJob}>Save</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
      <div className="job-list">
        {jobs.map(job => (
          <div key={job.id} className={`job-card job-${job.status.toLowerCase()}`}> 
            <div className="job-info">
              <span className="job-company">{job.company}</span>
              <span className="job-position">{job.position}</span>
            </div>
            <div className="job-status">
              <select
                value={job.status}
                onChange={e => handleStatusChange(job.id, e.target.value as Job['status'])}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
