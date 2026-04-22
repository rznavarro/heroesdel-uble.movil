export type Institution = 'NAVY' | 'AIR_FORCE' | 'ARMY' | 'PDI' | 'CARABINEROS' | 'GOPE' | 'SPECIALTIES';

export interface Guide {
  id: string;
  title: string;
  date: string;
  status: 'PENDING' | 'RESOLVED' | 'READ';
  category: string;
  fileUrl?: string; // Simulado
}

export interface Note {
  id: string;
  tag: string;
  text: string;
  date: string;
}

export interface PhysicalRecord {
  id: string;
  date: string;
  type: '2400m' | '3000m';
  time: string; // MM:SS
  score?: string; // Nota calculada
}

export interface UserProfile {
  id: string;
  code: string;
  name: string;
  targetInstitution: Institution;
  prioritySubjects: string[];
  physicalGoals: {
    run2400m: string;
    run3000m: string;
    pushups: number;
    situps: number;
  };
  academicGoal: 'PAES_WINTER' | 'PAES_REGULAR' | 'INTERNAL';
  
  // Dynamic Data
  guides: Guide[];
  notes: Note[];
  performanceHistory: PhysicalRecord[];
  academicScores: { subject: string; score: number }[];
}
