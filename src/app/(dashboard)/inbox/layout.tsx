"use client";

import { PageHeader } from "@/components/shared/page-header";

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
      <div className="flex-1 pt-4">{children}</div>
    </div>
  );
}
