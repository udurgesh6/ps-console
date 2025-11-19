"use client"

import { TopStats } from "@/components/dashboard/top-stats"
import { Users, UserCheck, UserX, FolderKanban } from "lucide-react"
import { EmployeesTable } from "./components/employee-table";
import { employees } from "@/constants/temporary/employees";

export default function Employee() {
  const topStats = [
    {
      icon: Users,
      title: "Total Employees",
      value: employees.length,
      colorScheme: "green" as const,
    },
    {
      icon: UserCheck,
      title: "Active Employees",
      value: employees.filter((employee) => employee.status === "active").length,
      colorScheme: "blue" as const,
    },
    {
      icon: UserX,
      title: "Inactive Employees",
      value: employees.filter((employee) => employee.status === "inactive").length,
      colorScheme: "purple" as const,
    },
    {
      icon: FolderKanban,
      title: "High Risk Employees",
      value: employees.filter((employee) => employee.riskLevel === "high").length,
      colorScheme: "yellow" as const,
    },
  ];
  
  return (
    <div className="flex flex-col space-y-6">            
        <TopStats topStats={topStats} />
        <EmployeesTable />
    </div>
  )
}
