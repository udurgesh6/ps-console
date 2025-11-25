import { PageHeader } from "@/components/shared/page-header";
import { SubNav } from "@/components/shared/sub-nav";
import React, { ReactNode } from "react";
import { SubNavItem } from "@/components/shared/sub-nav";

export const Top = ({
  navItems,
  children,
}: {
  navItems: SubNavItem[];
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-col space-y-6 bg-white p-6 py-8 rounded-3xl shadow-md border-0">
      <div className="flex items-center justify-between">
        <PageHeader />
        <div className="flex gap-2"></div>
      </div>
      <SubNav items={navItems} />
      {children}
    </div>
  );
};
