'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface IncomeProjectionProps {
  data: { year: number; income: number }[];
  targetIncome: number;
}

export default function IncomeProjection({ data, targetIncome }: IncomeProjectionProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(v) => `${v}年後`}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(v) => `${v}万`}
            width={60}
          />
          <Tooltip
            formatter={(value: number | undefined) => [`${(value ?? 0).toLocaleString()}万円`, '予測年収']}
            labelFormatter={(label: React.ReactNode) => `${label}年後`}
          />
          <ReferenceLine
            y={targetIncome}
            stroke="#f97316"
            strokeDasharray="5 5"
            label={{ value: `目標: ${targetIncome.toLocaleString()}万円`, position: 'right', fontSize: 11, fill: '#f97316' }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
