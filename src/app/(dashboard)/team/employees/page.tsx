"use client"

import { TopStats } from "@/components/dashboard/top-stats"
import { Users, UserCheck, UserX, FolderKanban } from "lucide-react"
import { EmployeesTable } from "./components/employee-table";

export default function Employee() {
  const topStats = [
    {
      icon: Users,
      title: "Total Employees",
      value: "100",
      colorScheme: "green" as const,
    },
    {
      icon: UserCheck,
      title: "Active Employees",
      value: "100",
      colorScheme: "blue" as const,
    },
    {
      icon: UserX,
      title: "Inactive Employees",
      value: "100",
      colorScheme: "purple" as const,
    },
    {
      icon: FolderKanban,
      title: "Total Groups",
      value: "100",
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
