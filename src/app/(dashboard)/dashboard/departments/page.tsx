"use client";

import { BarsChart } from "@/components/charts/bar-chart";
import { ChartHeading } from "@/components/charts/chart-heading";
import { LineChart } from "@/components/charts/line-chart";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { AllDepartments } from "./_components/all-departments";
import { Recommendations } from "./_components/recommendations";
import { Summary } from "@/components/charts/summary";

export default function Departments() {
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
  const departmentData = [
    {
      name: "IT",
      users: 245,
      clickRate: 8.3,
      reportRate: 42.7,
      avgRiskScore: 34,
      trend: "down",
      change: -2.1,
    },
    {
      name: "HR",
      users: 156,
      clickRate: 12.4,
      reportRate: 38.9,
      avgRiskScore: 41,
      trend: "down",
      change: -1.8,
    },
    {
      name: "Marketing",
      users: 298,
      clickRate: 15.7,
      reportRate: 35.2,
      avgRiskScore: 48,
      trend: "stable",
      change: 0.3,
    },
    {
      name: "Sales",
      users: 387,
      clickRate: 22.1,
      reportRate: 29.8,
      avgRiskScore: 58,
      trend: "up",
      change: 1.4,
    },
    {
      name: "Finance",
      users: 178,
      clickRate: 31.2,
      reportRate: 24.5,
      avgRiskScore: 67,
      trend: "up",
      change: 3.2,
    },
    {
      name: "Executive",
      users: 23,
      clickRate: 28.9,
      reportRate: 18.7,
      avgRiskScore: 72,
      trend: "up",
      change: 4.1,
    },
  ];

  const monthlyTrends = [
    {
      month: "Jan",
      IT: 9.2,
      HR: 13.1,
      Marketing: 16.8,
      Sales: 24.3,
      Finance: 32.1,
      Executive: 35.2,
    },
    {
      month: "Feb",
      IT: 8.7,
      HR: 12.8,
      Marketing: 16.2,
      Sales: 23.8,
      Finance: 31.8,
      Executive: 33.9,
    },
    {
      month: "Mar",
      IT: 8.5,
      HR: 12.6,
      Marketing: 15.9,
      Sales: 23.2,
      Finance: 31.5,
      Executive: 32.1,
    },
    {
      month: "Apr",
      IT: 8.3,
      HR: 12.4,
      Marketing: 15.7,
      Sales: 22.8,
      Finance: 31.2,
      Executive: 30.8,
    },
    {
      month: "May",
      IT: 8.1,
      HR: 12.2,
      Marketing: 15.5,
      Sales: 22.1,
      Finance: 30.9,
      Executive: 29.5,
    },
    {
      month: "Jun",
      IT: 8.3,
      HR: 12.4,
      Marketing: 15.7,
      Sales: 22.1,
      Finance: 31.2,
      Executive: 28.9,
    },
  ];

  return (
    <div className="gap-6 flex flex-col">
      <Card>
        <ChartHeading
          title="Department Click Rate Comparison"
          icon={TrendingUp}
        />
        <CardContent>
          <BarsChart
            data={departmentData}
            dataKeys={{
              x: "name",
              bars: [
                { key: "clickRate", color: "#ef4444", name: "Click Rate %" },
                { key: "reportRate", color: "#10b981", name: "Report Rate %" },
              ],
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <ChartHeading
          title="Monthly Click Rate Trends by Department"
          icon={TrendingUp}
        />
        <CardContent>
          <LineChart
            data={monthlyTrends}
            dataKeys={{
              x: "month",
              lines: [
                { key: "IT", color: "#ef4444", name: "IT" },
                { key: "HR", color: "#10b981", name: "HR" },
                { key: "Marketing", color: "#3b82f6", name: "Marketing" },
                { key: "Sales", color: "#ef4444", name: "Sales" },
                { key: "Finance", color: "#10b981", name: "Finance" },
                { key: "Executive", color: "#3b82f6", name: "Executive" },
              ],
            }}
          />
        </CardContent>
      </Card>
      <AllDepartments />
      <Recommendations />
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
