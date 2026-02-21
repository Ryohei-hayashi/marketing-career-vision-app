'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import RadarChart from '@/components/result/RadarChart';
import MissingPieces from '@/components/result/MissingPieces';
import RoadmapTimeline from '@/components/result/RoadmapTimeline';
import IncomeProjection from '@/components/result/IncomeProjection';
import { runDiagnosis } from '@/lib/diagnosis-engine';
import type { DiagnosisInput, DiagnosisResult } from '@/lib/types';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('diagnosisInput');
    if (!stored) {
      router.push('/diagnosis');
      return;
    }

    try {
      const input: DiagnosisInput = JSON.parse(stored);
      const diagnosisResult = runDiagnosis(input);
      setResult(diagnosisResult);
    } catch {
      router.push('/diagnosis');
    }
  }, [router]);

  if (!result) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-gray-500">診断結果を計算中...</p>
      </div>
    );
  }

  const targetIncome = parseInt(
    JSON.parse(sessionStorage.getItem('diagnosisInput') || '{}').targetIncome || '700'
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8" id="result-container">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">診断結果</h1>
        <p className="text-gray-500 text-sm">
          {result.targetCareerPath.name}を目指すあなたのキャリアビジョン
        </p>
      </div>

      {/* Overall Message */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <p className="text-blue-800 text-center">{result.overallMessage}</p>
      </Card>

      {/* Feasibility Score */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">実現可能性スコア</h2>
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-blue-600">
            {result.feasibilityScore}
            <span className="text-lg text-gray-400">/100</span>
          </div>
          <div className="flex-1">
            <ProgressBar value={result.feasibilityScore} max={100} />
          </div>
        </div>
      </Card>

      {/* Radar Chart */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          スキルマップ（現在 vs 目標）
        </h2>
        <RadarChart
          currentSkills={result.currentSkills}
          targetSkills={result.targetSkills}
        />
      </Card>

      {/* Missing Pieces */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          ミッシングピース
        </h2>
        <MissingPieces pieces={result.missingPieces} />
      </div>

      {/* Strengths & Risks */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card>
          <h3 className="font-medium text-green-700 mb-2">強み</h3>
          <ul className="space-y-1">
            {result.strengthAreas.map((s) => (
              <li key={s} className="text-sm text-gray-600 flex items-start gap-1">
                <span className="text-green-500">+</span> {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-medium text-orange-700 mb-2">注意点</h3>
          <ul className="space-y-1">
            {result.riskFactors.map((r) => (
              <li key={r} className="text-sm text-gray-600 flex items-start gap-1">
                <span className="text-orange-500">!</span> {r}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Roadmap */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          キャリアロードマップ
        </h2>
        <RoadmapTimeline milestones={result.roadmap} />
      </div>

      {/* Income Projection */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">年収予測</h2>
        <IncomeProjection data={result.incomeProjection} targetIncome={targetIncome} />
      </Card>

      {/* Recommended Certifications */}
      <Card className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          おすすめの資格・学習
        </h2>
        <div className="flex flex-wrap gap-2">
          {result.targetCareerPath.certifications.map((cert) => (
            <span
              key={cert}
              className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200"
            >
              {cert}
            </span>
          ))}
          {result.targetCareerPath.keySkills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-50 text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => router.push('/diagnosis')}
          className="text-sm text-blue-600 hover:underline"
        >
          もう一度診断する
        </button>
      </div>
    </div>
  );
}
