import type { MissingPiece } from '@/lib/types';
import Card from '@/components/ui/Card';

interface MissingPiecesProps {
  pieces: MissingPiece[];
}

const priorityStyles = {
  high: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', label: '優先度：高' },
  medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', label: '優先度：中' },
  low: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700', label: '優先度：低' },
};

export default function MissingPieces({ pieces }: MissingPiecesProps) {
  if (pieces.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-500">
          すべてのスキルが目標水準を満たしています！
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {pieces.map((piece) => {
        const style = priorityStyles[piece.priority];
        return (
          <div
            key={piece.skillId}
            className={`rounded-xl border p-4 ${style.bg} ${style.border}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">{piece.skillName}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${style.badge}`}>
                {style.label}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">現在</span>
                <span className="text-lg font-bold text-blue-600">Lv.{piece.currentLevel}</span>
              </div>
              <span className="text-gray-300">→</span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">目標</span>
                <span className="text-lg font-bold text-orange-500">Lv.{piece.requiredLevel}</span>
              </div>
              <div className="ml-auto">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${
                        i < piece.currentLevel
                          ? 'bg-blue-500'
                          : i < piece.requiredLevel
                          ? 'bg-orange-300'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">推奨アクション：</p>
              <ul className="space-y-1">
                {piece.recommendations.map((rec) => (
                  <li key={rec} className="text-sm text-gray-700 flex items-start gap-1">
                    <span className="text-blue-500 mt-0.5">-</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
