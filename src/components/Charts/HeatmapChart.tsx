import React, { useState } from "react";

interface HeatmapChartProps {
  data: Array<{
    year: number;
    children: Array<{
      month: string;
      return: number;
      sign: "positive" | "negative" | "zero";
    }>;
  }>;
  label?: string;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const HeatmapChart: React.FC<HeatmapChartProps> = ({ data, label }) => {
  const [hoveredCell, setHoveredCell] = useState<{ year: number; month: string; return: number } | null>(null);

  // Add safety check for data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full">
        {label && <div className="text-white text-lg font-semibold mb-4">{label}</div>}
        <div className="text-gray-400 text-center py-8">No data available for visualization</div>
      </div>
    );
  }

  // Get color based on return value with intensity
  const getColor = (returnValue: number | null): string => {
    if (returnValue === null) return 'bg-stone-800';
    
    if (returnValue > 0) {
      // Positive returns: shades of green
      if (returnValue >= 50) return 'bg-green-600';
      if (returnValue >= 30) return 'bg-green-500';
      if (returnValue >= 15) return 'bg-green-400';
      if (returnValue >= 5) return 'bg-green-300';
      return 'bg-green-200';
    } else if (returnValue < 0) {
      // Negative returns: shades of red
      if (returnValue <= -20) return 'bg-red-600';
      if (returnValue <= -15) return 'bg-red-500';
      if (returnValue <= -10) return 'bg-red-400';
      if (returnValue <= -5) return 'bg-red-300';
      return 'bg-red-200';
    }
    return 'bg-gray-500';
  };

  // Get text color for contrast
  const getTextColor = (returnValue: number | null): string => {
    if (returnValue === null) return 'text-gray-400';
    if (Math.abs(returnValue) >= 15) return 'text-white';
    return 'text-gray-900';
  };

  return (
    <div className="w-full">
      {label && <div className="text-white text-lg font-semibold mb-4">{label}</div>}
      
      {/* Legend */}
      <div className="mb-4 flex items-center gap-6 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span className="text-white">High Positive (&gt;30%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span className="text-white">Moderate Positive (5-30%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded"></div>
          <span className="text-white">Neutral (0%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 rounded"></div>
          <span className="text-white">Moderate Negative (-5 to -15%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="text-white">High Negative (&lt;-15%)</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-white text-sm font-semibold p-2 border border-stone-700 bg-stone-900 sticky left-0 z-10">
                  Year
                </th>
                {months.map(month => (
                  <th key={month} className="text-white text-xs font-semibold p-2 border border-stone-700 bg-stone-900 min-w-[60px]">
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(yearData => (
                <tr key={yearData.year}>
                  <td className="text-white font-bold text-sm p-2 border border-stone-700 bg-stone-900 sticky left-0 z-10">
                    {yearData.year}
                  </td>
                  {months.map(month => {
                    const monthData = yearData.children.find(child => child.month === month);
                    const returnValue = monthData?.return ?? null;
                    const colorClass = getColor(returnValue);
                    const textColorClass = getTextColor(returnValue);

                    return (
                      <td
                        key={month}
                        className={`${colorClass} ${textColorClass} text-xs font-medium p-2 border border-stone-700 text-center cursor-pointer transition-all hover:opacity-80 hover:scale-105 relative`}
                        onMouseEnter={() => returnValue !== null && setHoveredCell({ year: yearData.year, month, return: returnValue })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {returnValue !== null ? `${returnValue.toFixed(1)}%` : '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div className="mt-4 bg-stone-900 border border-stone-700 rounded p-3">
          <div className="text-white font-semibold">
            {hoveredCell.year} {hoveredCell.month}
          </div>
          <div className="text-sm">
            Return: <span className={`font-medium ${hoveredCell.return > 0 ? 'text-green-400' : hoveredCell.return < 0 ? 'text-red-400' : 'text-gray-400'}`}>
              {hoveredCell.return.toFixed(2)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
