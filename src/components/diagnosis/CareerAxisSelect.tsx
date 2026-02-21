'use client';

interface CareerAxisSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CAREER_DIRECTIONS = [
  {
    value: 'specialist',
    label: 'スペシャリスト',
    description: '専門性を深め、特定分野のエキスパートを目指す',
    icon: '🎯',
  },
  {
    value: 'generalist',
    label: 'ゼネラリスト',
    description: '幅広いスキルを持ち、複数領域を横断する',
    icon: '🌐',
  },
  {
    value: 'manager',
    label: 'マネジメント',
    description: '組織やチームを率い、人と事業を動かす',
    icon: '👥',
  },
  {
    value: 'entrepreneur',
    label: '起業・独立',
    description: '自分の事業やサービスを立ち上げる',
    icon: '🚀',
  },
];

export default function CareerAxisSelect({ value, onChange }: CareerAxisSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CAREER_DIRECTIONS.map((dir) => (
        <button
          key={dir.value}
          type="button"
          onClick={() => onChange(dir.value)}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            value === dir.value
              ? 'border-blue-600 bg-blue-50 shadow-sm'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-2xl mb-2">{dir.icon}</div>
          <div className="font-medium text-gray-800 text-sm">{dir.label}</div>
          <div className="text-xs text-gray-500 mt-1">{dir.description}</div>
        </button>
      ))}
    </div>
  );
}
