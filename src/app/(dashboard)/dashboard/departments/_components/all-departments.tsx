import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

export const AllDepartments = () => {
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 60) return { level: "High", color: "bg-red-100 text-red-700" };
    if (score >= 40)
      return { level: "Medium", color: "bg-yellow-100 text-yellow-700" };
    return { level: "Low", color: "bg-green-100 text-green-700" };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departmentData.map((dept) => {
        const riskLevel = getRiskLevel(dept.avgRiskScore);
        return (
          <Card key={dept.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span>{dept.name}</span>
                </CardTitle>
                <Badge className={riskLevel.color}>
                  {riskLevel.level} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Users</span>
                <span className="font-medium">{dept.users}</span>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Click Rate</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(dept.trend)}
                    <span className="font-medium">{dept.clickRate}%</span>
                  </div>
                </div>
                <Progress value={dept.clickRate} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Report Rate</span>
                  <span className="font-medium">{dept.reportRate}%</span>
                </div>
                <Progress
                  value={dept.reportRate}
                  className="h-2 bg-green-200"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Avg Risk Score</span>
                  <span className="font-medium">{dept.avgRiskScore}</span>
                </div>
                <Progress value={dept.avgRiskScore} className="h-2" />
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-sm">
                  {dept.trend === "up" && (
                    <span className="text-red-600">
                      +{dept.change}% this month
                    </span>
                  )}
                  {dept.trend === "down" && (
                    <span className="text-green-600">
                      {dept.change}% this month
                    </span>
                  )}
                  {dept.trend === "stable" && (
                    <span className="text-slate-600">
                      ±{dept.change}% this month
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
