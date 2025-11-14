import { ChartHeading } from "@/components/charts/chart-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, Users } from "lucide-react";
import React from "react";

export const HighRiskUsers = () => {
  const highRiskUsers = [
    {
      name: "Sarah Johnson",
      dept: "Finance",
      score: 89,
      reason: "Executive role + recent incidents",
    },
    {
      name: "Michael Torres",
      dept: "Sales",
      score: 84,
      reason: "High click rate + privileged access",
    },
    {
      name: "Lisa Chen",
      dept: "HR",
      score: 78,
      reason: "Access to sensitive data + training overdue",
    },
    {
      name: "David Rodriguez",
      dept: "IT",
      score: 72,
      reason: "Admin privileges + pattern of clicks",
    },
  ];
  
  return (
    <Card>
      <ChartHeading title="High-Risk Users Requiring Attention" icon={Users} />
      <CardContent>
        <div className="space-y-4">
          {highRiskUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h4 className="font-medium text-red-900">{user.name}</h4>
                  <Badge className="bg-red-100 text-red-700">{user.dept}</Badge>
                </div>
                <p className="text-sm text-red-700">{user.reason}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-red-800">{user.score}</p>
                  <p className="text-xs text-red-600">Risk Score</p>
                </div>
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                  Schedule Training
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
