import type {
  DiagnosisInput,
  DiagnosisResult,
  MissingPiece,
  RoadmapMilestone,
  SkillAxisId,
  SkillScores,
} from './types';
import { getCareerPaths, getSkillFramework } from './career-data';

const SKILL_AXIS_NAMES: Record<SkillAxisId, string> = {
  strategy: '戦略立案',
  digital_marketing: 'デジタルマーケティング',
  offline_marketing: 'オフラインマーケティング',
  technology: 'テクノロジー',
  management: 'マネジメント',
  data: 'データ分析',
  communication: 'コミュニケーション',
};

const SKILL_RECOMMENDATIONS: Record<SkillAxisId, string[]> = {
  strategy: [
    'ビジネスフレームワーク（3C, SWOT, 5F）の実践',
    '事業計画書の作成演習',
    '業界分析レポートの定期作成',
    'MBA関連書籍の読書',
  ],
  digital_marketing: [
    'デジタルマーケティング資格の取得',
    'Google Analytics / GA4の実践',
    'SNSマーケティング・広告運用の実践',
    'SEO/SEM戦略の立案・実行',
  ],
  offline_marketing: [
    'イベント企画・運営の実践経験',
    'PR・広報戦略の立案',
    'ブランド戦略フレームワークの学習',
    '顧客リレーション構築・チャネル開拓',
  ],
  technology: [
    'プログラミング基礎学習（Python, JavaScript）',
    'クラウドサービス（AWS/GCP）の学習',
    'DXプロジェクトへの参画',
    'IT系資格の取得',
  ],
  management: [
    'プロジェクトマネジメント資格（PMP等）の取得',
    '1on1ミーティングの実践',
    'アジャイル/スクラムの学習',
    'リーダーシップ研修への参加',
  ],
  data: [
    'SQL・Pythonによるデータ分析の学習',
    'BIツール（Tableau, Power BI）の習得',
    '統計検定の取得',
    'A/Bテストの設計・実施経験',
  ],
  communication: [
    'プレゼンテーションスキル研修',
    '社外勉強会・カンファレンスでの登壇',
    'ファシリテーションスキルの習得',
    '異業種交流会への参加',
  ],
};

export function runDiagnosis(input: DiagnosisInput): DiagnosisResult {
  const careerData = getCareerPaths();
  const skillFramework = getSkillFramework();

  // Find target career path
  const targetPath = careerData.careerPaths.find(p => p.id === input.targetCareer);
  if (!targetPath) {
    throw new Error(`Career path not found: ${input.targetCareer}`);
  }

  const currentSkills = input.skills;
  const targetSkills = targetPath.requiredSkills;

  // Calculate missing pieces
  const missingPieces = calculateMissingPieces(currentSkills, targetSkills);

  // Calculate feasibility score
  const ageFactor = careerData.ageFactors[input.age] || careerData.ageFactors['30s-early'];
  const learningMult = careerData.learningMultiplier[input.learningInvestment] || 1.0;
  const feasibilityScore = calculateFeasibility(currentSkills, targetSkills, ageFactor, learningMult, input);

  // Generate roadmap
  const roadmap = generateRoadmap(input, currentSkills, targetSkills, targetPath, missingPieces, learningMult);

  // Generate income projection
  const incomeProjection = generateIncomeProjection(input, targetPath, feasibilityScore, learningMult);

  // Identify strengths
  const strengthAreas = identifyStrengths(currentSkills, targetSkills, skillFramework);

  // Identify risks
  const riskFactors = identifyRisks(input, missingPieces, ageFactor);

  // Generate overall message
  const overallMessage = generateOverallMessage(feasibilityScore, input, targetPath, ageFactor);

  return {
    currentSkills,
    targetSkills,
    targetCareerPath: targetPath,
    feasibilityScore,
    missingPieces,
    roadmap,
    incomeProjection,
    strengthAreas,
    riskFactors,
    overallMessage,
  };
}

function calculateMissingPieces(current: SkillScores, target: SkillScores): MissingPiece[] {
  const axes: SkillAxisId[] = ['strategy', 'digital_marketing', 'offline_marketing', 'technology', 'management', 'data', 'communication'];
  const pieces: MissingPiece[] = [];

  for (const axis of axes) {
    const gap = target[axis] - current[axis];
    if (gap > 0) {
      const priority = gap >= 3 ? 'high' : gap >= 2 ? 'medium' : 'low';
      const recs = SKILL_RECOMMENDATIONS[axis];
      const numRecs = priority === 'high' ? 3 : priority === 'medium' ? 2 : 1;

      pieces.push({
        skillId: axis,
        skillName: SKILL_AXIS_NAMES[axis],
        currentLevel: current[axis],
        requiredLevel: target[axis],
        gap,
        priority,
        recommendations: recs.slice(0, numRecs),
      });
    }
  }

  return pieces.sort((a, b) => b.gap - a.gap);
}

function calculateFeasibility(
  current: SkillScores,
  target: SkillScores,
  ageFactor: { flexibility: number; riskTolerance: number; marketValue: number },
  learningMult: number,
  input: DiagnosisInput
): number {
  const axes: SkillAxisId[] = ['strategy', 'digital_marketing', 'offline_marketing', 'technology', 'management', 'data', 'communication'];

  // Skill match ratio (0-1)
  let totalRequired = 0;
  let totalCurrent = 0;
  for (const axis of axes) {
    totalRequired += target[axis];
    totalCurrent += Math.min(current[axis], target[axis]);
  }
  const skillMatch = totalCurrent / totalRequired;

  // Age factor (flexibility + market value average)
  const ageScore = (ageFactor.flexibility + ageFactor.marketValue) / 2;

  // Learning acceleration
  const learningScore = Math.min(learningMult / 2, 1);

  // Urgency penalty: shorter timelines with bigger gaps = lower feasibility
  const urgencyMap: Record<string, number> = { '1year': 0.6, '3years': 0.85, '5years': 1.0, '10years': 1.0 };
  const urgencyFactor = urgencyMap[input.urgency] || 1.0;

  const score = (skillMatch * 0.4 + ageScore * 0.25 + learningScore * 0.2 + urgencyFactor * 0.15) * 100;
  return Math.round(Math.min(Math.max(score, 10), 95));
}

function generateRoadmap(
  input: DiagnosisInput,
  current: SkillScores,
  target: SkillScores,
  targetPath: { name: string; keySkills: string[]; certifications: string[] },
  missingPieces: MissingPiece[],
  learningMult: number,
): RoadmapMilestone[] {
  const milestones: RoadmapMilestone[] = [];
  const axes: SkillAxisId[] = ['strategy', 'digital_marketing', 'offline_marketing', 'technology', 'management', 'data', 'communication'];
  const topGaps = missingPieces.slice(0, 3);

  // Year 1: Foundation
  const year1Skills: Partial<SkillScores> = {};
  for (const axis of axes) {
    const gap = target[axis] - current[axis];
    if (gap > 0) {
      const improvement = Math.min(Math.ceil(gap * 0.3 * learningMult), gap);
      year1Skills[axis] = current[axis] + improvement;
    }
  }

  milestones.push({
    year: 1,
    title: '基礎構築フェーズ',
    actions: [
      topGaps[0] ? `${topGaps[0].skillName}の基礎学習を開始` : '現在のスキルの強化',
      topGaps[0]?.recommendations[0] || '業界動向のリサーチ',
      `${targetPath.name}に関する情報収集・ネットワーキング`,
      targetPath.certifications[0] ? `${targetPath.certifications[0]}の学習開始` : '関連書籍の読破',
    ],
    expectedSkills: year1Skills,
    expectedIncome: parseInt(input.targetIncome) * 0.7,
  });

  // Year 3: Growth
  const year3Skills: Partial<SkillScores> = {};
  for (const axis of axes) {
    const gap = target[axis] - current[axis];
    if (gap > 0) {
      const improvement = Math.min(Math.ceil(gap * 0.7 * learningMult), gap);
      year3Skills[axis] = current[axis] + improvement;
    }
  }

  milestones.push({
    year: 3,
    title: '実践・成長フェーズ',
    actions: [
      topGaps[1] ? `${topGaps[1].skillName}の実践経験を積む` : 'スキルの実践応用',
      `${targetPath.name}に近い役割での実務経験`,
      targetPath.keySkills[0] ? `${targetPath.keySkills[0]}の実践` : '専門性の深化',
      '社外での発信・ブランディング強化',
    ],
    expectedSkills: year3Skills,
    expectedIncome: parseInt(input.targetIncome) * 0.85,
  });

  // Year 5: Achievement
  const year5Skills: Partial<SkillScores> = {};
  for (const axis of axes) {
    year5Skills[axis] = target[axis];
  }

  milestones.push({
    year: 5,
    title: '目標達成フェーズ',
    actions: [
      `${targetPath.name}としてのポジション確立`,
      '後進の育成・メンタリング',
      '業界内でのプレゼンス確立',
      '次のキャリアステージの検討',
    ],
    expectedSkills: year5Skills,
    expectedIncome: parseInt(input.targetIncome),
  });

  return milestones;
}

function generateIncomeProjection(
  input: DiagnosisInput,
  targetPath: { incomeRange: { entry: number; mid: number; senior: number; expert: number }; growthRate: number },
  feasibility: number,
  learningMult: number,
): { year: number; income: number }[] {
  const targetIncome = parseInt(input.targetIncome);
  const currentEstimate = estimateCurrentIncome(input);
  const projections: { year: number; income: number }[] = [];

  for (let year = 0; year <= 10; year++) {
    const progress = Math.min(year / 5, 1);
    const growthFactor = 1 + targetPath.growthRate * learningMult * (feasibility / 100);
    const income = currentEstimate + (targetIncome - currentEstimate) * progress * (feasibility / 100) * growthFactor;
    projections.push({
      year,
      income: Math.round(Math.min(income, targetPath.incomeRange.expert)),
    });
  }

  return projections;
}

function estimateCurrentIncome(input: DiagnosisInput): number {
  const baseByAge: Record<string, number> = {
    '20s-early': 350,
    '20s-late': 420,
    '30s-early': 500,
    '30s-late': 580,
    '40s': 650,
    '50s': 680,
  };

  const expMultiplier: Record<string, number> = {
    '0-2': 0.9,
    '3-5': 1.0,
    '6-10': 1.1,
    '11+': 1.2,
  };

  const base = baseByAge[input.age] || 500;
  const mult = expMultiplier[input.experience] || 1.0;
  return Math.round(base * mult);
}

function identifyStrengths(
  current: SkillScores,
  target: SkillScores,
  _framework: { axes: { id: SkillAxisId; name: string }[] },
): string[] {
  const strengths: string[] = [];
  const axes: SkillAxisId[] = ['strategy', 'digital_marketing', 'offline_marketing', 'technology', 'management', 'data', 'communication'];

  for (const axis of axes) {
    if (current[axis] >= target[axis]) {
      strengths.push(`${SKILL_AXIS_NAMES[axis]}は目標水準を満たしています`);
    } else if (current[axis] >= target[axis] - 1) {
      strengths.push(`${SKILL_AXIS_NAMES[axis]}はあと少しで目標に到達します`);
    }
  }

  // Find top 2 skills
  const sorted = axes.sort((a, b) => current[b] - current[a]);
  if (sorted[0]) {
    strengths.unshift(`${SKILL_AXIS_NAMES[sorted[0]]}が最も高いスキルです`);
  }

  return strengths.slice(0, 4);
}

function identifyRisks(
  input: DiagnosisInput,
  missingPieces: MissingPiece[],
  ageFactor: { flexibility: number; riskTolerance: number; label: string },
): string[] {
  const risks: string[] = [];

  if (missingPieces.filter(p => p.priority === 'high').length >= 2) {
    risks.push('複数のスキルで大きなギャップがあります。段階的な学習計画が重要です');
  }

  if (ageFactor.flexibility < 0.5) {
    risks.push(`${ageFactor.label}では転職のハードルが上がるため、現職でのスキル獲得も検討してください`);
  }

  if (input.learningInvestment === 'minimal') {
    risks.push('学習時間が限られているため、目標達成までの期間が長くなる可能性があります');
  }

  if (input.urgency === '1year' && missingPieces.length >= 3) {
    risks.push('1年以内の達成は難しい可能性があります。まず最優先スキルに集中することをお勧めします');
  }

  if (risks.length === 0) {
    risks.push('大きなリスク要因は見当たりません。計画的にスキルアップを進めましょう');
  }

  return risks;
}

function generateOverallMessage(
  feasibility: number,
  input: DiagnosisInput,
  targetPath: { name: string },
  ageFactor: { label: string },
): string {
  if (feasibility >= 80) {
    return `あなたは${targetPath.name}への転身に非常に近い位置にいます。${ageFactor.label}の今、数個のスキルギャップを埋めることで目標に到達できます。`;
  } else if (feasibility >= 60) {
    return `${targetPath.name}への道筋は明確です。いくつかのスキルギャップがありますが、計画的に取り組めば十分に達成可能です。`;
  } else if (feasibility >= 40) {
    return `${targetPath.name}を目指すには一定の努力が必要ですが、段階的なアプローチで実現可能です。まず最も重要なスキルから着手しましょう。`;
  } else {
    return `${targetPath.name}への到達には大きなスキルギャップがあります。長期的な視点で、まず基盤となるスキルの構築から始めましょう。`;
  }
}
