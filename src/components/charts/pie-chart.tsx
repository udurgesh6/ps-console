import React from "react";
import { ResponsiveContainer } from "recharts";
import { PieChart as RePieChart } from "recharts";
import { Pie } from "recharts";
import { Cell } from "recharts";
import { Tooltip } from "recharts";
import { Legend } from "recharts";

export interface IPieData {
  name: string;
  value: number;
  color: string;
  [key: string]: unknown;
}

export const PieChart = ({ data }: { data: IPieData[] }) => {
  return (
    <>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RePieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-600">{item.name}</span>
            </div>
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </>
  );
};
