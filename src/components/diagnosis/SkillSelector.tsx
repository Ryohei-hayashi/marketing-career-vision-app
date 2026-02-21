'use client';

import type { SkillAxisId } from '@/lib/types';
import { getSkillFramework } from '@/lib/career-data';

interface SkillSelectorProps {
  skills: Record<SkillAxisId, number>;
  onChange: (axisId: SkillAxisId, value: number) => void;
}

export default function SkillSelector({ skills, onChange }: SkillSelectorProps) {
  const framework = getSkillFramework();

  return (
    <div className="space-y-6">
      {framework.axes.map((axis) => {
        const currentValue = skills[axis.id] || 1;
        return (
          <div key={axis.id}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-medium text-gray-800">{axis.name}</span>
                <p className="text-xs text-gray-500">{axis.description}</p>
              </div>
              <span className="text-sm text-blue-600 font-medium">
                Lv.{currentValue}
              </span>
            </div>
            <div className="flex gap-1">
              {axis.levels.map((level) => (
                <button
                  key={level.level}
                  type="button"
                  onClick={() => onChange(axis.id, level.level)}
                  title={`${level.label}: ${level.description}`}
                  className={`flex-1 py-2 rounded text-xs transition-colors ${
                    currentValue >= level.level
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
