"use client";

import { PageHeader } from "@/components/shared/page-header";
import { SubNav } from "@/components/shared/sub-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    {
      title: "General",
      href: "/system-config",
    },
    {
      title: "Members",
      href: "/system-config/members",
    },
    {
      title: "Notifications",
      href: "/system-config/notifications",
    },
  ];
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
