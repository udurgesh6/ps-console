import React from "react";
import { ResponsiveContainer, ScatterChart as ReScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from "recharts";

type ChartDataPoint = {
  [key: string]: string | number;
};

interface IScatterData {
  data: ChartDataPoint[];
  config: {
    xAxisKey: string;
    yAxisKey: string;
    xAxisName: string;
    yAxisName: string;
    scatterName: string;
    fillColor: string;
    tooltipTitleKey?: string;
  };
  tooltip?: React.ReactNode;
}

export const ScatterChart = ({ data, config, tooltip: TooltipComponent }: IScatterData) => {
    const { xAxisKey, yAxisKey, xAxisName, yAxisName } = config;
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ReScatterChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisKey}
            type="number"
            domain={[0, 100]}
            name={xAxisName}
          />
          <YAxis
            dataKey={yAxisKey}
            type="number"
            domain={[0, 35]}
            name={yAxisName}
          />
          {TooltipComponent && <Tooltip />}
          <Scatter dataKey="clickRate" fill="#3b82f6" />
        </ReScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
