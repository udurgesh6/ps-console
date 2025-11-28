"use client"

import { TopStats } from "@/components/dashboard/top-stats"
import { Users, UserCheck, FolderKanban, Shield } from "lucide-react"
import { GroupsTable } from "./components/groups-table"

export default function Groups() {
  const topStats = [
    {
      icon: FolderKanban,
      title: "Total Groups",
      value: 0,
      colorScheme: "green" as const,
    },
    {
      icon: Users,
      title: "Total Members",
      value: 0,
      colorScheme: "blue" as const,
    },
    {
      icon: UserCheck,
      title: "Active Groups",
      value: 0,
      colorScheme: "purple" as const,
    },
    {
      icon: Shield,
      title: "High Risk Groups",
      value: 0,
      colorScheme: "yellow" as const,
    },
  ]
  
  return (
    <div className="flex flex-col space-y-6">            
      <TopStats topStats={topStats} />
      <GroupsTable />
    </div>
  )
}
