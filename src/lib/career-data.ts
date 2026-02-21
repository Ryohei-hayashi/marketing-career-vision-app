import type { CareerPathsData, QuestionsData, SkillFramework } from './types';
import questionsJson from '@/data/questions.json';
import careerPathsJson from '@/data/career-paths.json';
import skillFrameworkJson from '@/data/skill-framework.json';

export function getQuestions(): QuestionsData {
  return questionsJson as QuestionsData;
}

export function getCareerPaths(): CareerPathsData {
  return careerPathsJson as CareerPathsData;
}

export function getSkillFramework(): SkillFramework {
  return skillFrameworkJson as SkillFramework;
}
