'use client';

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { SkillScores, SkillAxisId } from '@/lib/types';

const AXIS_LABELS: Record<SkillAxisId, string> = {
  strategy: '戦略立案',
  digital_marketing: 'デジタルMK',
  offline_marketing: 'オフラインMK',
  technology: 'テクノロジー',
  management: 'マネジメント',
  data: 'データ分析',
  communication: 'コミュニケーション',
};

interface RadarChartProps {
  currentSkills: SkillScores;
  targetSkills: SkillScores;
}

export default function RadarChart({ currentSkills, targetSkills }: RadarChartProps) {
  const axes: SkillAxisId[] = ['strategy', 'digital_marketing', 'offline_marketing', 'technology', 'management', 'data', 'communication'];

  const data = axes.map((axis) => ({
    skill: AXIS_LABELS[axis],
    current: currentSkills[axis],
    target: targetSkills[axis],
  }));

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
          <Radar
            name="現在のスキル"
            dataKey="current"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="目標スキル"
            dataKey="target"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
