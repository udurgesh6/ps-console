import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type ChartDataPoint = {
  [key: string]: string | number;
};

interface PerformanceChartProps {
  data: ChartDataPoint[];
  dataKeys: {
    x: string;
    lines: { key: string; color: string; name: string }[];
  };
}

export const PerformanceChart = ({ data, dataKeys }: PerformanceChartProps) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            {dataKeys.lines.map((line) => (
              <linearGradient key={line.key} id={line.key} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={line.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={line.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKeys.x} />
          <YAxis />
          <Tooltip />
          {dataKeys.lines.map((line) => (
            <Area
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              fill={`url(#${line.key})`}
              strokeWidth={2}
              name={line.name}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
