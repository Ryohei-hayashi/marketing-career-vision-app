import { fetchQuestions } from '@/lib/microcms';
import DiagnosisClient from './DiagnosisClient';

export default async function DiagnosisPage() {
  const questionsData = await fetchQuestions();
  return <DiagnosisClient questionsData={questionsData} />;
}
