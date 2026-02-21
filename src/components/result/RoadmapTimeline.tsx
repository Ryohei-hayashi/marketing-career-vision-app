import type { RoadmapMilestone } from '@/lib/types';

interface RoadmapTimelineProps {
  milestones: RoadmapMilestone[];
}

export default function RoadmapTimeline({ milestones }: RoadmapTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200" />
      <div className="space-y-8">
        {milestones.map((milestone) => (
          <div key={milestone.year} className="relative pl-16">
            <div className="absolute left-3.5 w-5 h-5 bg-blue-600 rounded-full border-4 border-blue-100" />
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {milestone.year}年後
                </span>
                <h4 className="font-medium text-gray-800">{milestone.title}</h4>
              </div>
              <ul className="space-y-2 mb-3">
                {milestone.actions.map((action) => (
                  <li key={action} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 shrink-0">-</span>
                    {action}
                  </li>
                ))}
              </ul>
              <div className="text-xs text-gray-400 border-t border-gray-100 pt-2">
                想定年収: {milestone.expectedIncome.toLocaleString()}万円
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
