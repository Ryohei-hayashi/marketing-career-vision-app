// Skill Axes
export type SkillAxisId = 'strategy' | 'digital_marketing' | 'offline_marketing' | 'technology' | 'management' | 'data' | 'communication';

export type SkillScores = Record<SkillAxisId, number>;

export interface SkillLevel {
  level: number;
  label: string;
  description: string;
}

export interface SkillAxis {
  id: SkillAxisId;
  name: string;
  description: string;
  levels: SkillLevel[];
}

export interface SkillFramework {
  axes: SkillAxis[];
}

// Questions
export type QuestionType = 'select' | 'rating';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: QuestionOption[];
  skillAxis?: SkillAxisId;
  min?: number;
  max?: number;
}

export interface QuestionStep {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface QuestionsData {
  steps: QuestionStep[];
}

// Career Paths
export interface CareerPath {
  id: string;
  name: string;
  description: string;
  requiredSkills: SkillScores;
  incomeRange: {
    entry: number;
    mid: number;
    senior: number;
    expert: number;
  };
  marketDemand: 'low' | 'medium' | 'high' | 'very-high';
  growthRate: number;
  keySkills: string[];
  certifications: string[];
  transitionPaths: string[];
}

export interface AgeFactor {
  flexibility: number;
  riskTolerance: number;
  marketValue: number;
  label: string;
}

export interface CareerPathsData {
  careerPaths: CareerPath[];
  ageFactors: Record<string, AgeFactor>;
  learningMultiplier: Record<string, number>;
}

// Diagnosis Input/Output
export interface DiagnosisInput {
  age: string;
  currentRole: string;
  experience: string;
  skills: SkillScores;
  careerDirection: string;
  targetCareer: string;
  workEnvironment: string;
  workLifeBalance: number;
  learningInvestment: string;
  targetIncome: string;
  motivation: string;
  urgency: string;
}

export interface MissingPiece {
  skillId: SkillAxisId;
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
  recommendations: string[];
}

export interface RoadmapMilestone {
  year: number;
  title: string;
  actions: string[];
  expectedSkills: Partial<SkillScores>;
  expectedIncome: number;
}

export interface DiagnosisResult {
  currentSkills: SkillScores;
  targetSkills: SkillScores;
  targetCareerPath: CareerPath;
  feasibilityScore: number;
  missingPieces: MissingPiece[];
  roadmap: RoadmapMilestone[];
  incomeProjection: { year: number; income: number }[];
  strengthAreas: string[];
  riskFactors: string[];
  overallMessage: string;
}
