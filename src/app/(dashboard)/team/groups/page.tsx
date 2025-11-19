"use client"

import { TopStats } from "@/components/dashboard/top-stats"
import { Users, UserCheck, FolderKanban, Shield } from "lucide-react"
import { GroupsTable } from "./components/groups-table"
import { groups } from "@/constants/temporary/groups"

export default function Groups() {
  const topStats = [
    {
      icon: FolderKanban,
      title: "Total Groups",
      value: groups.length,
      colorScheme: "green" as const,
    },
    {
      icon: Users,
      title: "Total Members",
      value: new Set(groups.flatMap(group => group.members.map(member => member.id))).size,
      colorScheme: "blue" as const,
    },
    {
      icon: UserCheck,
      title: "Active Groups",
      value: groups.filter((group) => group.status === "active").length,
      colorScheme: "purple" as const,
    },
    {
      icon: Shield,
      title: "High Risk Groups",
      value: groups.filter((group) => group.riskLevel === "high").length,
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
