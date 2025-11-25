import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Legend,
  CartesianGrid
} from "recharts";
import { Props as LegendProps } from "recharts/types/component/DefaultLegendContent";

type ChartDataPoint = {
  [key: string]: string | number;
};

interface AreaConfig {
  dataKey: string;
  name: string;
  color: string;
}

interface IRiskChartProps {
  data: ChartDataPoint[];
  config: {
    xAxisKey: string;
    areas: AreaConfig[];
    showGrid?: boolean;
    showLegend?: boolean;
    stacked?: boolean;
    legendOrder?: string[];
  };
  tooltip?: React.ReactNode;
  height?: string;
}

const renderLegend = (props: LegendProps, legendOrder?: string[]) => {
  const { payload } = props;
  
  if (!payload) return null;
  
  // Reorder payload based on legendOrder if provided
  let orderedPayload = [...payload];
  
  if (legendOrder && legendOrder.length > 0) {
    orderedPayload = legendOrder
      .map(dataKey => payload.find(item => item.dataKey === dataKey))
      .filter((item): item is NonNullable<typeof item> => item !== undefined);
  }
  
  return (
    <div className="flex justify-center gap-6 mt-4">
      {orderedPayload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export const RiskChart = ({
  data,
  config,
  tooltip: CustomTooltip,
  height = "h-80",
}: IRiskChartProps) => {
  const {
    xAxisKey,
    areas,
    showGrid = true,
    showLegend = true,
    stacked = true,
    legendOrder
  } = config;

  return (
    <div className={`${height} w-full`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {areas.map((area) => (
              <linearGradient
                key={area.dataKey}
                id={area.dataKey}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={area.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={area.color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>

          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}

          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          {CustomTooltip && CustomTooltip}

          {showLegend && <Legend content={(props) => renderLegend(props, legendOrder)} />}

          {areas.map((area) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name}
              stackId={stacked ? "1" : area.dataKey}
              stroke={area.color}
              fill={`url(#${area.dataKey})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
