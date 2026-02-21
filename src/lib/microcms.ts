import type { QuestionsData, CareerPathsData } from './types';
import { getQuestions as getLocalQuestions, getCareerPaths as getLocalCareerPaths } from './career-data';

const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY;

function isMicroCMSConfigured(): boolean {
  return !!(MICROCMS_SERVICE_DOMAIN && MICROCMS_API_KEY);
}

async function fetchFromMicroCMS<T>(endpoint: string): Promise<T | null> {
  if (!isMicroCMSConfigured()) return null;

  try {
    const res = await fetch(
      `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}`,
      {
        headers: { 'X-MICROCMS-API-KEY': MICROCMS_API_KEY! },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchQuestions(): Promise<QuestionsData> {
  const cmsData = await fetchFromMicroCMS<QuestionsData>('questions');
  return cmsData ?? getLocalQuestions();
}

export async function fetchCareerPaths(): Promise<CareerPathsData> {
  const cmsData = await fetchFromMicroCMS<CareerPathsData>('career-paths');
  return cmsData ?? getLocalCareerPaths();
}
