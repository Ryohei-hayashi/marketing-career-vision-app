'use client';

import type { Question } from '@/lib/types';

interface QuestionFormProps {
  question: Question;
  value: string | number;
  onChange: (value: string | number) => void;
}

export default function QuestionForm({ question, value, onChange }: QuestionFormProps) {
  if (question.type === 'rating') {
    const min = question.min ?? 1;
    const max = question.max ?? 5;
    const levels = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    return (
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-3">{question.text}</label>
        <div className="flex gap-2">
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              className={`flex-1 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                value === level
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
          <span>低い</span>
          <span>高い</span>
        </div>
      </div>
    );
  }

  // select type
  return (
    <div className="mb-6">
      <label className="block text-gray-800 font-medium mb-3">{question.text}</label>
      <div className="grid gap-2">
        {question.options?.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-colors ${
              value === option.value
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
