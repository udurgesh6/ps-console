"use client";

import { BarsChart } from "@/components/charts/bar-chart";
import { ChartHeading } from "@/components/charts/chart-heading";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { StatDisplay } from "@/components/charts/stat-display";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProgressItem } from "@/components/shared/progress-item";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  AlertTriangle,
  Shield,
  TrendingUp,
  Clock,
  Zap,
  AlertCircle,
} from "lucide-react";
import { CampaignEffectiveness } from "../_components/simulation/campaign-effectiveness";
import { Summary } from "@/components/charts/summary";

export default function Simulation() {
  const simulationMetrics = [
    {
      icon: Mail,
      value: "1,247",
      label: "Total Simulations",
      description: "+23% vs previous period",
    },
    {
      icon: AlertTriangle,
      value: "18.3%",
      label: "Avg Click Rate",
      description: "-2.1% improvement",
    },
    {
      icon: Shield,
      value: "31.7%",
      label: "Report Rate",
      description: "+8.4% improvement",
    },
    {
      icon: TrendingUp,
      value: "24.6%",
      label: "Risk Reduction",
      description: "Since program start",
    },
  ];

  const simulationData = [
    { month: "Jan", sent: 1200, opened: 980, clicked: 245, reported: 387 },
    { month: "Feb", sent: 1150, opened: 945, clicked: 198, reported: 423 },
    { month: "Mar", sent: 1300, opened: 1045, clicked: 189, reported: 456 },
    { month: "Apr", sent: 1250, opened: 1087, clicked: 156, reported: 498 },
    { month: "May", sent: 1400, opened: 1234, clicked: 167, reported: 567 },
    { month: "Jun", sent: 1350, opened: 1189, clicked: 147, reported: 634 },
  ];

  const templatePerformance = [
    { name: "Office 365 Login", clicks: 89, reports: 134 },
    { name: "CEO Request", clicks: 156, reports: 98 },
    { name: "Google Drive", clicks: 67, reports: 123 },
    { name: "Bank Alert", clicks: 134, reports: 167 },
    { name: "IT Support", clicks: 45, reports: 189 },
  ];

  const securityAwarenessMetrics = [
    {
      label: "Click Rate Reduction",
      value: 76,
      target: "15% reduction",
      description: "Target: 15% reduction",
    },
    {
      label: "Report Rate Increase",
      value: 84,
      target: "10% increase",
      description: "Target: 10% increase",
    },
    {
      label: "Training Completion",
      value: 94,
      target: "95% completion",
      description: "Target: 95% completion",
    },
  ];

  const responseTimeStats = [
    {
      label: "Avg. Click Time",
      value: "2.4 min",
      icon: <Clock className="w-4 h-4" />,
      variant: "default" as const,
      description: "Average time to initial click",
    },
    {
      label: "Avg. Report Time",
      value: "8.7 min",
      icon: <TrendingUp className="w-4 h-4" />,
      variant: "default" as const,
      description: "Average time to file report",
    },
    {
      label: "Fastest Report",
      value: "32 sec",
      icon: <Zap className="w-4 h-4" />,
      variant: "success" as const,
      description: "Quickest response recorded",
    },
    {
      label: "Slowest Click",
      value: "4.2 hrs",
      icon: <AlertCircle className="w-4 h-4" />,
      variant: "danger" as const,
      description: "Longest delay detected",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {simulationMetrics.map((metric, index) => (
          <StatCard
            key={index}
            icon={metric.icon}
            value={metric.value}
            label={metric.label}
            description={metric.description}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <ChartHeading
            title="Simulation Performance Trend"
            icon={TrendingUp}
          />
          <CardContent>
            <PerformanceChart
              data={simulationData}
              dataKeys={{
                x: "month",
                lines: [
                  { key: "sent", color: "#3b82f6", name: "Sent" },
                  { key: "clicked", color: "#ef4444", name: "Clicked" },
                  { key: "reported", color: "#10b981", name: "Reported" },
                ],
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <ChartHeading title="Template Performance" icon={TrendingUp} />
          <CardContent>
            <BarsChart
              data={templatePerformance}
              dataKeys={{
                x: "name",
                bars: [
                  { key: "clicks", color: "#ef4444", name: "Clicks" },
                  { key: "reports", color: "#10b981", name: "Reports" },
                ],
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <ChartHeading title="Security Awareness Progress" icon={Shield} />
          <CardContent className="space-y-4">
            {securityAwarenessMetrics.map((metric) => (
              <ProgressItem
                key={metric.label}
                label={metric.label}
                value={metric.value}
                description={metric.description}
              />
            ))}
          </CardContent>
        </Card>
        <StatDisplay
          title="Response Time Analysis"
          icon={Clock}
          stats={responseTimeStats}
        />
        <CampaignEffectiveness />
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
