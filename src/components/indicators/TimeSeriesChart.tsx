import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { ChartDataPoint } from '../../types';

interface TimeSeriesChartProps {
  data: ChartDataPoint[];
  primaryStation: string;
  secondaryStation: string;
  parameterName: string;
  unit: string;
  selectedStandard: 'WHO' | 'CPCB' | 'ECR';
  thresholdLimit?: number;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  primaryStation,
  secondaryStation,
  parameterName,
  unit,
  selectedStandard,
  thresholdLimit,
}) => {
  const isJSDOM =
    typeof window !== 'undefined' &&
    (window.navigator?.userAgent?.includes('jsdom') || process.env.NODE_ENV === 'test');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-elevated border border-border-strong p-3 rounded-lg shadow-xl text-xs font-mono space-y-1.5 z-50">
          <div className="text-text-primary font-bold border-b border-border-subtle pb-1">
            {label} ({parameterName})
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={`entry-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-bold text-text-primary">
                {entry.value} {unit}
              </span>
            </div>
          ))}
          {thresholdLimit !== undefined && (
            <div className="text-accent-amber border-t border-border-subtle pt-1 text-[11px] flex justify-between gap-4">
              <span>{selectedStandard} Standard:</span>
              <span className="font-bold">{thresholdLimit} {unit}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="w-full bg-base/80 border border-border-subtle rounded-xl p-4 sm:p-6 space-y-4 relative overflow-hidden"
      aria-label="Recharts Time-Series Engine Container"
    >
      {/* Chart Top Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-text-secondary border-b border-border-subtle pb-3">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-text-primary font-medium">
            <span className="w-3 h-0.5 bg-[#48B8D0]" />
            <span>{primaryStation}</span>
          </span>
          <span className="flex items-center gap-1.5 text-text-primary font-medium">
            <span className="w-3 h-0.5 bg-[#64B88A]" />
            <span>{secondaryStation}</span>
          </span>
          {thresholdLimit !== undefined && (
            <span className="flex items-center gap-1.5 text-text-secondary">
              <span className="w-3 h-0.5 border-t border-dashed border-[#E7AE55]" />
              <span>{selectedStandard} Regulatory Threshold ({thresholdLimit} {unit})</span>
            </span>
          )}
        </div>
        <div className="text-right">
          <span className="text-text-secondary">Period: 2021 to 2026 (Monthly Aggregate)</span>
        </div>
      </div>

      {/* Chart Subtitle & Engine Label */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-text-primary font-sans flex items-center gap-2">
          <span>Recharts Time-Series Engine Container</span>
          <span className="text-xs font-mono font-medium bg-surface-elevated text-text-secondary px-2 py-0.5 rounded border border-border-subtle">
            Dual Plot
          </span>
        </div>
        <span className="text-xs text-text-secondary">
          Unit: <span className="font-mono">{unit}</span>
        </span>
      </div>

      {/* Recharts Canvas */}
      <div className="w-full h-72 sm:h-80 min-h-[300px]">
        <ResponsiveContainer
          width="100%"
          height={300}
          minHeight={300}
          initialDimension={{ width: 800, height: 300 }}
        >
          <LineChart
            data={data}
            margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D42" opacity={0.6} />
            <XAxis
              dataKey="date"
              stroke="#CBD5E1"
              tick={{ fill: '#CBD5E1', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#1E2D42' }}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis
              stroke="#CBD5E1"
              tick={{ fill: '#CBD5E1', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#1E2D42' }}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                fontSize: '11px',
                fontFamily: 'monospace',
                paddingTop: '8px',
              }}
            />
            {thresholdLimit !== undefined && (
              <ReferenceLine
                y={thresholdLimit}
                stroke="#E7AE55"
                strokeDasharray="4 4"
                label={{
                  value: `${selectedStandard} Limit (${thresholdLimit})`,
                  fill: '#E7AE55',
                  fontSize: 10,
                  position: 'insideTopRight',
                  fontFamily: 'monospace',
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="primaryValue"
              name={primaryStation}
              stroke="#48B8D0"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: '#48B8D0' }}
              isAnimationActive={!isJSDOM}
            />
            <Line
              type="monotone"
              dataKey="secondaryValue"
              name={secondaryStation}
              stroke="#64B88A"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: '#64B88A' }}
              isAnimationActive={!isJSDOM}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline Aggregate Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary border-t border-border-subtle pt-2 overflow-x-auto">
        <span>Jan 2021</span>
        <span className="hidden sm:inline">Jan 2022</span>
        <span>Jan 2023</span>
        <span className="hidden sm:inline">Jan 2024</span>
        <span>Jan 2025</span>
        <span className="text-text-primary font-medium">Nov 2026 (Latest Telemetry)</span>
      </div>
    </div>
  );
};
