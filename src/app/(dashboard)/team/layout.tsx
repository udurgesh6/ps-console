"use client";

import { SubNav, SubNavItem } from "@/components/shared/sub-nav";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { EmployeeForm } from "./components/employee-form";
import { EmployeeGroupForm } from "./components/employee-group-form";
import { FileUploadFormWithExcel } from "./components/file-upload-with-excel";
import { useSidebar } from "@/context/sidebar-context";

const employeeNavItems: SubNavItem[] = [
  {
    title: "Employees",
    href: "/team/employees",
  },
  {
    title: "Groups",
    href: "/team/groups",
  },
];

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openSidebar, closeSidebar, employeeDetail, groupDetail } =
    useSidebar();

  return (
    <>
      <div className="flex flex-col space-y-4">
        <SubNav items={employeeNavItems} />
        <div className="flex-1 pt-4">{children}</div>
      </div>

      <SidebarSheet
        open={openSidebar === "add-employee"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Add New Employee"
        description="Fill in the details to add a new employee to your team."
      >
        <EmployeeForm />
      </SidebarSheet>

      {employeeDetail && (
        <SidebarSheet
          open={openSidebar === "edit-employee"}
          onOpenChange={(open) => !open && closeSidebar()}
          title="Edit Employee"
          description="Fill in the details to edit an employee."
        >
          <EmployeeForm employeeDetail={employeeDetail} />
        </SidebarSheet>
      )}

      <SidebarSheet
        open={openSidebar === "create-group"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Create New Group"
        description="Create a group and add members to organize your team."
      >
        <EmployeeGroupForm onCancel={closeSidebar} />
      </SidebarSheet>

      {groupDetail && (
        <SidebarSheet
          open={openSidebar === "edit-group"}
          onOpenChange={(open) => !open && closeSidebar()}
          title="Edit Group"
          description="Edit a group and add members to organize your team."
        >
          <EmployeeGroupForm
            onCancel={closeSidebar}
            groupDetail={groupDetail}
          />
        </SidebarSheet>
      )}

      <SidebarSheet
        open={openSidebar === "import-employees"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Import Employees"
        description="Upload a CSV or Excel file to import multiple employees at once."
      >
        <FileUploadFormWithExcel
        />
      </SidebarSheet>

      <SidebarSheet
        open={openSidebar === "import-groups"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Import Groups"
        description="Upload a CSV or Excel file to import multiple groups at once."
      >
        <></>
      </SidebarSheet>
    </>
  );
}
