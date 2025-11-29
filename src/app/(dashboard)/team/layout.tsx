"use client";

import { SubNav, SubNavItem } from "@/components/shared/sub-nav";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { EmployeeForm } from "./components/employee-form";
import { EmployeeGroupForm } from "./components/employee-group-form";
import {
  FileUploadFormWithExcel,
  ParsedFileData,
} from "./components/file-upload-with-excel";
import { useSidebar } from "@/context/sidebar-context";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  // const handleAddEmployee = async (data: EmployeeFormData) => {
  //   try {
  //     console.log("Adding employee:", data)

  //     await new Promise((resolve) => setTimeout(resolve, 1000))

  //     toast({
  //       title: "Employee added",
  //       description: `${data.name} has been added successfully.`,
  //       type: "success",
  //     })

  //     closeSidebar()

  //     // TODO: Refresh employee list
  //   } catch (error) {
  //     console.log(error)
  //     toast({
  //       title: "Error",
  //       description: "Failed to add employee. Please try again.",
  //       type: "error",
  //     })
  //   }
  // }

  const handleFileImport = async (data: ParsedFileData) => {
    try {
      // TODO: Replace with actual API call
      console.log("Importing data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const successCount = data.rowCount - (data.errors?.length || 0);

      toast({
        title: "Import completed",
        description: `Successfully imported ${successCount} of ${data.rowCount} records.`,
        type: successCount === data.rowCount ? "success" : "warning",
      });

      closeSidebar();

      // TODO: Refresh list
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to import data. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* <div className="flex items-center justify-end ">
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full">
                  <PlusIcon className="mr-2 h-4 w-4 font-semibold" />
                  {buttonLabel}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleAddClick}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  {buttonLabel}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleImportClick}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import from file
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div> */}
        <SubNav items={employeeNavItems} />
        <div className="flex-1 pt-4">{children}</div>
      </div>

      <SidebarSheet
        open={openSidebar === "add-employee"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Add New Employee"
        description="Fill in the details to add a new employee to your team."
      >
        <EmployeeForm onCancel={closeSidebar} />
      </SidebarSheet>

      {employeeDetail && (
        <SidebarSheet
          open={openSidebar === "edit-employee"}
          onOpenChange={(open) => !open && closeSidebar()}
          title="Edit Employee"
          description="Fill in the details to edit an employee."
        >
          <EmployeeForm
            onCancel={closeSidebar}
            employeeDetail={employeeDetail}
          />
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

      {/* Import Employees Sidebar */}
      <SidebarSheet
        open={openSidebar === "import-employees"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Import Employees"
        description="Upload a CSV or Excel file to import multiple employees at once."
      >
        <FileUploadFormWithExcel
          type="employees"
          onSubmit={handleFileImport}
          onCancel={closeSidebar}
        />
      </SidebarSheet>

      {/* Import Groups Sidebar */}
      <SidebarSheet
        open={openSidebar === "import-groups"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Import Groups"
        description="Upload a CSV or Excel file to import multiple groups at once."
      >
        <FileUploadFormWithExcel
          type="groups"
          onSubmit={handleFileImport}
          onCancel={closeSidebar}
        />
      </SidebarSheet>
    </>
  );
}
