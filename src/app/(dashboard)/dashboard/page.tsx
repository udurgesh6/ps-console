"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { AlertTriangle, Mail, Shield, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskChart } from "@/components/charts/risk-chart";
import { AiEngineStatus } from "./_components/ai-engine-status";
import { RecentSimulations } from "./_components/recent-simulations";
import { ThreatIntel } from "./_components/threat-intel";

export default function Dashboard() {
  const keyMetrics = [
    {
      title: "Total Users",
      value: "2,847",
      icon: Users,
      description: "+12% from last month",
    },
    {
      title: "Active Simulations",
      value: "187",
      icon: Mail,
      description: "23 scheduled today",
    },
    {
      title: "High Risk Users",
      value: "342",
      icon: AlertTriangle,
      description: "-8% improvement",
    },
    {
      title: "Success Rate",
      value: "73.2%",
      icon: Shield,
      description: "+5.1% this quarter",
    },
  ];

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
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Risk Trend Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RiskChart />
          </CardContent>
        </Card>
        <AiEngineStatus />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSimulations />
        <ThreatIntel />
      </div>
    </div>
  );
}
