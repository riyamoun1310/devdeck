export type Milestone = { id: number; title: string; completed: boolean };
export type Skill = { id: number; name: string; milestones: Milestone[] };
