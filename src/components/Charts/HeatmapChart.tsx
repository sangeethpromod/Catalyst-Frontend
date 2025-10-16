import React from "react";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar, Cell } from "recharts";

interface HeatmapChartProps {
  data: Array<{ year: number; month: string; return: number }>;
  label?: string;
}

const monthOrder = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function getMonthIndex(month: string) {
  return monthOrder.indexOf(month);
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({ data, label }) => {
  // Group by year for Y axis, and by month for X axis
  const years = Array.from(new Set(data.map(d => d.year)));
  const months = monthOrder;

  // Build a matrix: [{ year, Jan, Feb, ... Dec }]
  const matrix = years.map(year => {
    const row: any = { year };
    months.forEach(month => {
      const found = data.find(d => d.year === year && d.month === month);
      row[month] = found ? found.return : null;
    });
    return row;
  });

  return (
    <div className="w-full">
      {label && <div className="text-white text-sm mb-2">{label}</div>}
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart
          data={matrix}
          layout="vertical"
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <XAxis type="number" hide domain={[0, months.length]} />
          <YAxis dataKey="year" type="category" axisLine={false} tickLine={false} tick={{ fill: '#fff', fontSize: 12 }} />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;
            const { year } = payload[0].payload;
            return (
              <div className="bg-black text-white p-2 rounded border border-stone-800">
                <div>Year: {year}</div>
                {months.map(month => (
                  <div key={month}>
                    {month}: {payload[0].payload[month] !== null ? payload[0].payload[month] : '-'}
                  </div>
                ))}
              </div>
            );
          }} />
          {months.map((month, idx) => (
            <Bar
              key={month}
              dataKey={month}
              barSize={18}
              stackId="a"
              fill="#fb7185"
              radius={[2, 2, 2, 2]}
              isAnimationActive={false}
            >
              {matrix.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={typeof entry[month] === 'number' ? (entry[month] > 0 ? '#fb7185' : '#1e293b') : '#222'}
                />
              ))}
            </Bar>
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
