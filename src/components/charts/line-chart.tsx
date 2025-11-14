import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
} from "recharts";

type ChartDataPoint = {
  [key: string]: string | number;
};

interface LineChartProps {
  data: ChartDataPoint[];
  dataKeys: {
    x: string;
    lines: { key: string; color: string; name: string }[];
  };
}

export const LineChart = ({ data, dataKeys }: LineChartProps) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKeys.x} />
          <YAxis />
          <Tooltip />
          {dataKeys.lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};
