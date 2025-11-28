import { ChartHeading } from "@/components/charts/chart-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, Users } from "lucide-react";
import React from "react";
import { Employee } from "@/types";
import { ChartWrapper } from "@/components/layouts/dashboard/chart-wrapper";

export const HighRiskUsers = ({ employees }: { employees: Employee[] }) => {
  const highRiskEmployees = employees
    .filter((employee) => employee.name.startsWith("high"))
    .slice(0, 4);

  const highRiskUsers = [
    {
      name: highRiskEmployees[0]?.name || "N/A",
      dept: highRiskEmployees[0]?.department || "N/A",
      score: 89,
      reason: "Executive role + recent incidents",
    },
    {
      name: highRiskEmployees[1]?.name || "N/A",
      dept: highRiskEmployees[1]?.department || "N/A",
      score: 84,
      reason: "High click rate + privileged access",
    },
    {
      name: highRiskEmployees[2]?.name || "N/A",
      dept: highRiskEmployees[2]?.department || "N/A",
      score: 78,
      reason: "Access to sensitive data + training overdue",
    },
    {
      name: highRiskEmployees[3]?.name || "N/A",
      dept: highRiskEmployees[3]?.department || "N/A",
      score: 72,
      reason: "Admin privileges + pattern of clicks",
    },
  ];

  return (
    <ChartWrapper title="High-Risk Users Requiring Attention" icon={Users}>
      <div className="space-y-4">
        {highRiskUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h4 className="font-medium text-red-900">{user.name}</h4>
                <Badge className="bg-red-100 rounded-full text-red-700">
                  {user.dept}
                </Badge>
              </div>
              <p className="text-sm text-red-700">{user.reason}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <p className="text-lg font-bold text-red-800">{user.score}</p>
                <p className="text-xs text-red-600">Risk Score</p>
              </div>
              {/* <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                  Schedule Training
                </button> */}
            </div>
          </div>
        ))}
      </div>
    </ChartWrapper>
  );
};
