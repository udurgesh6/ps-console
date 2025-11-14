import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartDataPoint = {
  [key: string]: string | number;
};

interface BarsChartProps {
  data: ChartDataPoint[];
  dataKeys: {
    x: string;
    bars: { key: string; color: string; name: string }[];
  };
}

export const BarsChart = ({ data, dataKeys }: BarsChartProps) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKeys.x} angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          {dataKeys.bars.map((bar) => (
            <Bar key={bar.key} dataKey={bar.key} fill={bar.color} name={bar.name} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
