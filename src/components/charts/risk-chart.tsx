
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts";

const data = [
  { month: "Jan", highRisk: 45, mediumRisk: 120, lowRisk: 235 },
  { month: "Feb", highRisk: 42, mediumRisk: 115, lowRisk: 248 },
  { month: "Mar", highRisk: 38, mediumRisk: 108, lowRisk: 267 },
  { month: "Apr", highRisk: 35, mediumRisk: 102, lowRisk: 284 },
  { month: "May", highRisk: 32, mediumRisk: 98, lowRisk: 295 },
  { month: "Jun", highRisk: 28, mediumRisk: 95, lowRisk: 312 },
];

export const RiskChart = () => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="highRisk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="mediumRisk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="lowRisk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="highRisk"
            stackId="1"
            stroke="#ef4444"
            fill="url(#highRisk)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="mediumRisk"
            stackId="1"
            stroke="#f59e0b"
            fill="url(#mediumRisk)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="lowRisk"
            stackId="1"
            stroke="#10b981"
            fill="url(#lowRisk)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
