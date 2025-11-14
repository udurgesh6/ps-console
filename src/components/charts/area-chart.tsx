import React from "react";
import { AreaChart as RechartsAreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";

type ChartDataPoint = {
  [key: string]: string | number;
};

interface AreaChartProps {
  data: ChartDataPoint[];
  dataKeys: {
    x: string;
    bars: { key: string; color: string; name: string }[];
  };
}

export const AreaChart = ({ data, dataKeys }: AreaChartProps) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          <defs>
            <linearGradient id={dataKeys.bars[0].key} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={dataKeys.bars[0].color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={dataKeys.bars[0].color} stopOpacity={0} />
            </linearGradient>
            <linearGradient id={dataKeys.bars[1].key} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={dataKeys.bars[1].color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={dataKeys.bars[1].color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKeys.x} />
          <YAxis />
          <Tooltip />
          {dataKeys.bars.map((bar, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={bar.key}
              stackId="1"
              stroke={bar.color}
              fill={`url(#${bar.key})`}
              name={bar.name}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};
