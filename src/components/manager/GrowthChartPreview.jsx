import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function GrowthChartPreview() {
  const data = [
    { name: '2024/25', year: '2024/25', subtitle: '(Today)', value: 500, displayValue: '€0.5M', label: '#ProofOfValue' },
    { name: '2025/26', year: '2025/26', value: 1000, displayValue: '€1.0M', label: '#ValidateAtScale' },
    { name: '2026/27', year: '2026/27', value: 1500, displayValue: '€1.5M', label: '#ReplicateAcrossClients' },
    { name: '2027/28', year: '2027/28', value: 2500, displayValue: '€2.5M', label: '#ScaleHorizontally' },
    { name: '2028/29', year: '2028/29', value: 4500, displayValue: '€4.5M', label: '#AccelerateWithAI' }
  ];

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;

    return (
      <g>
        <circle cx={cx} cy={cy} r={8} fill="#86BC25" stroke="#ffffff" strokeWidth={2} />
        <text x={cx} y={cy - 30} textAnchor="middle" fontSize="10" fill="#003b6e" fontWeight="700">
          {payload.displayValue}
        </text>
        <text x={cx} y={cy - 18} textAnchor="middle" fontSize="8" fill="#86BC25" fontWeight="600">
          {payload.label}
        </text>
      </g>
    );
  };

  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    const tickData = data[payload.index];

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={15} textAnchor="middle" fill="#333" fontSize={10} fontWeight="600">
          {tickData.year}
        </text>
        {tickData.subtitle && (
          <text x={0} y={15} dy={15} textAnchor="middle" fill="#666" fontSize={8}>
            {tickData.subtitle}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full h-full bg-white p-4 flex flex-col">
      <h3 className="text-base font-bold text-gray-800 mb-2 text-center">5-Year Growth Trajectory (Illustrative)</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 50, right: 40, left: 40, bottom: 40 }}>
            <XAxis
              dataKey="name"
              tick={<CustomXAxisTick />}
              axisLine={{ stroke: '#333', strokeWidth: 1 }}
              tickLine={false}
              interval={0}
              height={40}
            />
            <Tooltip
              formatter={(value) => [`€${(value / 1000).toFixed(1)}M`, 'Managed Fees']}
              labelStyle={{ color: '#333', fontSize: '12px', fontWeight: 'bold' }}
              itemStyle={{ fontSize: '11px' }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid #86BC25',
                borderRadius: '6px',
                padding: '8px'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#86BC25"
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={{ r: 10, stroke: '#86BC25', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
