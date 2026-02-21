'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StepIndicator from '@/components/ui/StepIndicator';
import QuestionForm from '@/components/diagnosis/QuestionForm';
import SkillSelector from '@/components/diagnosis/SkillSelector';
import { getQuestions } from '@/lib/career-data';
import type { SkillAxisId, DiagnosisInput } from '@/lib/types';

const questionsData = getQuestions();
const STEP_NAMES = questionsData.steps.map((s) => s.title);

export default function DiagnosisPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [skills, setSkills] = useState<Record<SkillAxisId, number>>({
    strategy: 1,
    digital_marketing: 1,
    offline_marketing: 1,
    technology: 1,
    management: 1,
    data: 1,
    communication: 1,
  });

  const step = questionsData.steps[currentStep];

  const handleAnswer = (questionId: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSkillChange = (axisId: SkillAxisId, value: number) => {
    setSkills((prev) => ({ ...prev, [axisId]: value }));
  };

  const isStepComplete = () => {
    if (step.id === 'skills') {
      return Object.values(skills).every((v) => v >= 1);
    }
    return step.questions.every((q) => answers[q.id] !== undefined);
  };

  const handleNext = () => {
    if (currentStep < questionsData.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const input: DiagnosisInput = {
      age: answers.age as string,
      currentRole: answers.currentRole as string,
      experience: answers.experience as string,
      skills,
      careerDirection: answers.careerDirection as string,
      targetCareer: answers.targetCareer as string,
      workEnvironment: answers.workEnvironment as string,
      workLifeBalance: (answers.workLifeBalance as number) || 3,
      learningInvestment: answers.learningInvestment as string,
      targetIncome: answers.targetIncome as string,
      motivation: answers.motivation as string,
      urgency: answers.urgency as string,
    };

    sessionStorage.setItem('diagnosisInput', JSON.stringify(input));
    router.push('/result');
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
        キャリアビジョン診断
      </h1>
      <p className="text-center text-gray-500 text-sm mb-8">
        5つのステップで、あなたのキャリアの「ミッシングピース」を特定します
      </p>

      <StepIndicator steps={STEP_NAMES} currentStep={currentStep} />

      <Card className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-1">{step.title}</h2>
        <p className="text-sm text-gray-500 mb-6">{step.description}</p>

        {step.id === 'skills' ? (
          <SkillSelector skills={skills} onChange={handleSkillChange} />
        ) : (
          step.questions.map((q) => (
            <QuestionForm
              key={q.id}
              question={q}
              value={answers[q.id] ?? ''}
              onChange={(value) => handleAnswer(q.id, value)}
            />
          ))
        )}
      </Card>

      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          戻る
        </Button>
        <Button onClick={handleNext} disabled={!isStepComplete()}>
          {currentStep === questionsData.steps.length - 1 ? '診断結果を見る' : '次へ'}
        </Button>
      </div>
    </div>
  );
}
