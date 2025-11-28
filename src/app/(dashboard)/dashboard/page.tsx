"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import {
  AlertTriangle,
  Asterisk,
  Mail,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskChart } from "@/components/charts/risk-chart";
import { AiEngineStatus } from "./_components/ai-engine-status";
import { RecentSimulations } from "./_components/recent-simulations";
import { ThreatIntel } from "./_components/threat-intel";
// import { employees } from "@/constants/temporary/employees";
import { dummySimulationProfiles } from "@/constants/temporary/simulation-profiles";
import { Top } from "./_components/top";
import { SubNavItem } from "@/components/shared/sub-nav";
import { ChartHeading } from "@/components/charts/chart-heading";
import { COLOR_SCHEMES } from "@/constants/colors";
import { Tooltip } from "recharts";
import { ChartWrapper } from "@/components/layouts/dashboard/chart-wrapper";

export default function Dashboard() {
  const keyMetrics = [
    {
      title: "Total Users",
      value: String(3),
      icon: Users,
      description: "+12% from last month",
      color: COLOR_SCHEMES.user.group.main,
      bgColor: COLOR_SCHEMES.user.group.bg,
    },
    {
      title: "Active Simulations",
      value: String(dummySimulationProfiles.length),
      icon: Mail,
      description: "23 scheduled today",
      color: COLOR_SCHEMES.communication.notification.main,
      bgColor: COLOR_SCHEMES.communication.notification.bg,
    },
    {
      title: "High Risk Employees",
      value: String(
        0
      ),
      icon: AlertTriangle,
      description: "-8% improvement",
      color: COLOR_SCHEMES.risk.high.main,
      bgColor: COLOR_SCHEMES.risk.high.bg,
    },
    {
      title: "Success Rate",
      value: "73.2%",
      icon: Shield,
      description: "+5.1% this quarter",
      color: COLOR_SCHEMES.security.shield.main,
      bgColor: COLOR_SCHEMES.security.shield.bg,
    },
  ];

  const riskData = [
    { month: "Jan", highRisk: 45, mediumRisk: 120, lowRisk: 235 },
    { month: "Feb", highRisk: 42, mediumRisk: 115, lowRisk: 248 },
    { month: "Mar", highRisk: 38, mediumRisk: 108, lowRisk: 267 },
    { month: "Apr", highRisk: 35, mediumRisk: 102, lowRisk: 284 },
    { month: "May", highRisk: 32, mediumRisk: 98, lowRisk: 295 },
    { month: "Jun", highRisk: 28, mediumRisk: 95, lowRisk: 312 },
  ];

  const riskConfig = {
    xAxisKey: "month",
    areas: [
      {
        dataKey: "lowRisk",
        name: "Low Risk",
        color: COLOR_SCHEMES.risk.low.main,
      },
      {
        dataKey: "mediumRisk",
        name: "Medium Risk",
        color: COLOR_SCHEMES.risk.medium.main,
      },
      {
        dataKey: "highRisk",
        name: "High Risk",
        color: COLOR_SCHEMES.risk.high.main,
      },
    ],
    showGrid: true,
    showLegend: true,
    stacked: true,
    legendOrder: ["highRisk", "mediumRisk", "lowRisk"],
  };

  return (
    <div className="gap-6 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <StatCard
            key={index}
            icon={metric.icon}
            value={metric.value}
            label={metric.title}
            description={metric.description}
            color={metric.color}
            bgColor={metric.bgColor}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartWrapper
          title="Risk Trend Analysis"
          icon={Asterisk}
          iconColor={COLOR_SCHEMES.status.critical.main}
          mainClassname="lg:col-span-2 "
        >
          <RiskChart
            data={riskData}
            config={riskConfig}
            tooltip={
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const total = payload.reduce(
                      (sum, entry) => sum + (Number(entry.value) || 0),
                      0
                    );
                    return (
                      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
                        <p className="font-bold text-lg mb-2">{label}</p>
                        {[...payload].reverse().map((entry, index) => (
                          <div
                            key={index}
                            className="flex justify-between gap-6 text-sm mb-1"
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.stroke }}
                              />
                              {entry.name}:
                            </span>
                            <span className="font-semibold">{entry.value}</span>
                          </div>
                        ))}
                        <div className="border-t mt-2 pt-2 flex justify-between">
                          <span className="font-semibold">Total:</span>
                          <span className="font-bold">{total}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            }
          />
        </ChartWrapper>
        {/* <AiEngineStatus /> */}
        <ThreatIntel />
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSimulations />
      </div> */}
    </div>
  );
}
