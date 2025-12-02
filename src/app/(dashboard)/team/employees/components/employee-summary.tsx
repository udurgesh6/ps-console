import React from "react";
import { TopStatsCardProps } from "@/types";
import { Users, UserCheck, UserX, FolderKanban } from "lucide-react";
import { useGetEmployeeSummary } from "@/hooks";
import { TopStatsCard } from "@/components/dashboard/top-stats/top-stats-card";
import { Error } from "@/components/shared/error";

export const EmployeeSummary = () => {
  const { data: employeeSummary, isLoading, error } = useGetEmployeeSummary();

  if (error) {
    return (
      <Error error={error} />
    );
  }

  const topStats = [
    {
      icon: Users,
      title: "Total Employees",
      value: employeeSummary?.total || 0,
      colorScheme: "green" as const,
    },
    {
      icon: UserCheck,
      title: "Active Employees",
      value: employeeSummary?.active || 0,
      colorScheme: "blue" as const,
    },
    {
      icon: UserX,
      title: "Inactive Employees",
      value: employeeSummary?.inactive || 0,
      colorScheme: "purple" as const,
    },
    {
      icon: FolderKanban,
      title: "High Risk Employees",
      value: employeeSummary?.riskLevels?.high || 0,
      colorScheme: "yellow" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {topStats.map((stat: TopStatsCardProps) => (
        <TopStatsCard
          key={stat.title}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
