"use client";

import { AreaChart } from "@/components/charts/area-chart";
import { ChartHeading } from "@/components/charts/chart-heading";
import { LineChart } from "@/components/charts/line-chart";
import { Summary } from "@/components/charts/summary";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar1Icon, Target, TrendingDown, TrendingUp } from "lucide-react";

export default function Trends() {
  const overallTrends = [
    { month: "Jan", clickRate: 24.3, reportRate: 28.7, riskScore: 58.2 },
    { month: "Feb", clickRate: 22.8, reportRate: 31.2, riskScore: 55.9 },
    { month: "Mar", clickRate: 21.5, reportRate: 33.8, riskScore: 53.1 },
    { month: "Apr", clickRate: 19.9, reportRate: 36.4, riskScore: 50.7 },
    { month: "May", clickRate: 18.7, reportRate: 38.9, riskScore: 48.3 },
    { month: "Jun", clickRate: 18.3, reportRate: 41.2, riskScore: 46.8 },
  ];

  const seasonalData = [
    { period: "Q1", business: 22.1, personal: 18.7, mixed: 20.4 },
    { period: "Q2", business: 19.8, personal: 16.3, mixed: 18.1 },
    { period: "Q3", business: 18.5, personal: 15.9, mixed: 17.2 },
    { period: "Q4", business: 21.3, personal: 17.8, mixed: 19.6 },
  ];

  const timeOfDayData = [
    { hour: "8-10", clickRate: 12.3, reportRate: 45.2 },
    { hour: "10-12", clickRate: 18.7, reportRate: 38.9 },
    { hour: "12-14", clickRate: 24.1, reportRate: 31.5 },
    { hour: "14-16", clickRate: 21.8, reportRate: 35.7 },
    { hour: "16-18", clickRate: 19.3, reportRate: 39.2 },
    { hour: "18-20", clickRate: 26.7, reportRate: 28.4 },
  ];

  const keyMetrics = [
    {
      title: "Click Rate",
      value: "-24.7%",
      icon: TrendingDown,
      description: "6-month improvement",
    },
    {
      title: "Report Rate",
      value: "+43.6%",
      icon: TrendingUp,
      description: "6-month improvement",
    },
    {
      title: "Risk Score",
      value: "-19.6%",
      icon: Target,
      description: "6-month reduction",
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {keyMetrics.map((metric, index) => (
          <StatCard
            key={index}
            icon={metric.icon}
            value={metric.value}
            label={metric.title}
            description={metric.description}
          />
        ))}
      </div>
      <Card>
        <ChartHeading title="Overall Trends" icon={TrendingUp} />
        <CardContent>
          <LineChart
            data={overallTrends}
            dataKeys={{
              x: "month",
              lines: [
                { key: "clickRate", color: "#ef4444", name: "Click Rate %" },
                { key: "reportRate", color: "#10b981", name: "Report Rate %" },
                { key: "riskScore", color: "#3b82f6", name: "Risk Score %" },
              ],
            }}
          />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <ChartHeading title="Seasonal Patterns" icon={Calendar1Icon} />
          <CardContent>
            <AreaChart
              data={seasonalData}
              dataKeys={{
                x: "period",
                bars: [
                  { key: "business", color: "#ef4444", name: "Business" },
                  { key: "personal", color: "#10b981", name: "Personal" },
                  { key: "mixed", color: "#3b82f6", name: "Mixed" },
                ],
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <ChartHeading title="Time of Day Trends" icon={TrendingUp} />
          <CardContent>
            <LineChart
              data={timeOfDayData}
              dataKeys={{
                x: "hour",
                lines: [
                  { key: "clickRate", color: "#ef4444", name: "Click Rate %" },
                  {
                    key: "reportRate",
                    color: "#10b981",
                    name: "Report Rate %",
                  },
                ],
              }}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <ChartHeading title="Trend Insights & Predictions" icon={TrendingUp} />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <h4 className="mb-2">Positive Trends</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">
                    Consistent Click Rate Decline
                  </p>
                  <p className="text-sm text-green-600">
                    24.7% reduction over 6 months indicates effective training
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">
                    Improved Reporting Behavior
                  </p>
                  <p className="text-sm text-green-600">
                    43.6% increase in phishing reports shows better awareness
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">
                    Overall Risk Reduction
                  </p>
                  <p className="text-sm text-green-600">
                    19.6% decrease in average risk scores across organization
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="mb-2">Areas of Concern</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">
                    Weekend Vulnerability
                  </p>
                  <p className="text-sm text-amber-600">
                    26.7% higher click rates during evening hours (6-8 PM)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">
                    Increased Risk of Phishing
                  </p>
                  <p className="text-sm text-amber-600">
                    15.3% increase in phishing attempts during off-peak hours
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Lunch Hour Risk</p>
                  <p className="text-sm text-amber-600">
                    Peak click rates (24.1%) during lunch break (12-2 PM)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
