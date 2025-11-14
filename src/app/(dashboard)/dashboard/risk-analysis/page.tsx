"use client";

import { ChartHeading } from "@/components/charts/chart-heading";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { PieChart } from "@/components/charts/pie-chart";
import { Tooltip } from "recharts";
import { ScatterChart } from "@/components/charts/scatter-chart";
import { RiskFactorAnalysis } from "../_components/risk-analysis/risk-factor-analysis";
import { Summary } from "@/components/charts/summary";
import { HighRiskUsers } from "../_components/risk-analysis/high-risk-users";

export default function RiskAnalysis() {
  const riskDistribution = [
    { name: "Low", value: 25, color: "#3b82f6" },
    { name: "Medium", value: 50, color: "#ef4444" },
    { name: "High", value: 25, color: "#10b981" },
  ];

  const userRiskScatter = [
    { riskScore: 15, clickRate: 2.1, department: "IT" },
    { riskScore: 32, clickRate: 8.4, department: "HR" },
    { riskScore: 45, clickRate: 12.7, department: "Marketing" },
    { riskScore: 67, clickRate: 18.9, department: "Sales" },
    { riskScore: 78, clickRate: 24.3, department: "Finance" },
    { riskScore: 89, clickRate: 31.2, department: "Executive" },
  ];

  const riskScoreVsClickRateConfig = {
    xAxisKey: "riskScore",
    yAxisKey: "clickRate",
    xAxisName: "Risk Score",
    yAxisName: "Click Rate",
    scatterName: "User Risk",
    fillColor: "#3b82f6",
  };

  const achievements = [
    {
      text: "Reduced overall phishing susceptibility by 24.6%",
      variant: "success" as const,
    },
    {
      text: "Increased reporting rate by 8.4% across all departments",
      variant: "success" as const,
    },
    {
      text: "Successfully trained 2,847 employees through simulation",
      variant: "success" as const,
    },
    {
      text: "Achieved 94.3% AI model accuracy in risk prediction",
      variant: "success" as const,
    },
  ];

  const improvements = [
    {
      text: "Reduced overall phishing susceptibility by 24.6%",
      variant: "warning" as const,
    },
    {
      text: "Increased reporting rate by 8.4% across all departments",
      variant: "warning" as const,
    },
    {
      text: "Successfully trained 2,847 employees through simulation",
      variant: "warning" as const,
    },
    {
      text: "Achieved 94.3% AI model accuracy in risk prediction",
      variant: "warning" as const,
    },
  ];

  const recommendedAction = {
    title: "Recommended Actions",
    description:
      "Focus on targeted training for Finance department, implement advanced scenarios for executives, and increase mobile-focused simulations. Consider additional weekend awareness campaigns.",
    icon: <TrendingUp className="h-5 w-5" />,
  };

  return (
    <div className="gap-6 flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <ChartHeading title="Risk Distribution" icon={TrendingUp} />
          <CardContent>
            <PieChart data={riskDistribution} />
          </CardContent>
        </Card>
        <Card>
          <ChartHeading title="Risk Score vs Click Rate" icon={TrendingUp} />
          <CardContent>
            <ScatterChart
              data={userRiskScatter}
              config={riskScoreVsClickRateConfig}
              tooltip={
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
                          <p className="font-medium">{data.department}</p>
                          <p className="text-sm">
                            Risk Score: {data.riskScore}
                          </p>
                          <p className="text-sm">
                            Click Rate: {data.clickRate}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              }
            />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskFactorAnalysis />
        <HighRiskUsers />
      </div>
      <Summary
        icon={TrendingUp}
        summaryTitle1="Achievements"
        summary1={achievements}
        summaryTitle2="Improvements"
        summary2={improvements}
        recommendedAction={recommendedAction}
      />
    </div>
  );
}
