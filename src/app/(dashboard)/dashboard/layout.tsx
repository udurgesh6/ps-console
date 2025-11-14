"use client";

import { PageHeader } from "@/components/shared/page-header";
import { SubNav } from "@/components/shared/sub-nav";
import { SubNavItem } from "@/components/shared/sub-nav";

const navItems: SubNavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
  },
  {
    title: "Simulation",
    href: "/dashboard/simulation",
  },
  {
    title: "Risk Analysis",
    href: "/dashboard/risk-analysis",
  },
  {
    title: "Departments",
    href: "/dashboard/departments",
  },
  {
    title: "Trends",
    href: "/dashboard/trends",
  },
  {
    title: "Compliance",
    href: "/dashboard/compliance",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <PageHeader />
        <div className="flex gap-2"></div>
      </div>
      <SubNav items={navItems} />
      <div className="flex-1 pt-4">{children}</div>
    </div>
  );
}
