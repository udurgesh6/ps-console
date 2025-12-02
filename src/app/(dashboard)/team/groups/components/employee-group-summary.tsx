import { TopStatsCardProps } from "@/types";
import { Users, UserCheck, FolderKanban, Shield } from "lucide-react";
import { useGetEmployeeGroupSummary } from "@/hooks";
import { TopStatsCard } from "@/components/dashboard/top-stats/top-stats-card";
import { Error } from "@/components/shared/error";

export const EmployeeGroupSummary = () => {
  const { data: employeeGroupSummary, isLoading, error } = useGetEmployeeGroupSummary();

  if (error) {
    return (
      <Error error={error} />
    );
  }

  const topStats = [
    {
      icon: FolderKanban,
      title: "Total Groups",
      value: employeeGroupSummary?.total || 0,
      colorScheme: "green" as const,
    },
    {
      icon: Users,
      title: "Total Members",
      value: employeeGroupSummary?.total || 0,
      colorScheme: "blue" as const,
    },
    {
      icon: UserCheck,
      title: "Active Groups",
      value: employeeGroupSummary?.active || 0,
      colorScheme: "purple" as const,
    },
    {
      icon: Shield,
      title: "High Risk Groups",
      value: employeeGroupSummary?.riskLevels?.high || 0,
      colorScheme: "yellow" as const,
    },
  ]

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
