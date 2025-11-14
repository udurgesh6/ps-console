"use client"

import { SubNav, SubNavItem } from "@/components/shared/sub-nav"
import { Button } from "@/components/ui/button"
import { PlusIcon, Upload } from "lucide-react"
import { usePathname } from "next/navigation"
import { SidebarSheet } from "@/components/shared/sidebar-sheet"
import { AddEmployeeForm, EmployeeFormData } from "./components/add-employee-form"
import { CreateGroupForm, GroupFormData } from "./components/create-group-form"
import { FileUploadFormWithExcel, ParsedFileData } from "./components/file-upload-with-excel"
import { useSidebar } from "@/context/sidebar-context"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/components/shared/page-header"

const employeeNavItems: SubNavItem[] = [
  {
    title: "Employees",
    href: "/team/employees",
  },
  {
    title: "Groups",
    href: "/team/groups",
  },
]

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { openSidebar, setOpenSidebar, closeSidebar } = useSidebar()
  const { toast } = useToast()
  // const pageConfig = getPageConfig(pathname)

  const activeNavItem = employeeNavItems.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isEmployeesPage = activeNavItem === employeeNavItems[0]
  const buttonLabel = isEmployeesPage ? "Add Employee" : "Create Group"

  const handleAddClick = () => {
    setOpenSidebar(isEmployeesPage ? "add-employee" : "create-group")
  }

  const handleImportClick = () => {
    setOpenSidebar(isEmployeesPage ? "import-employees" : "import-groups")
  }

  const handleAddEmployee = async (data: EmployeeFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log("Adding employee:", data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast({
        title: "Employee added",
        description: `${data.firstName} ${data.lastName} has been added successfully.`,
        type: "success",
      })
      
      closeSidebar()
      
      // TODO: Refresh employee list
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        type: "error",
      })
    }
  }

  const handleCreateGroup = async (data: GroupFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log("Creating group:", data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast({
        title: "Group created",
        description: `${data.name} has been created successfully.`,
        type: "success",
      })
      
      closeSidebar()
      
      // TODO: Refresh group list
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to create group. Please try again.",
        type: "error",
      })
    }
  }

  const handleFileImport = async (data: ParsedFileData) => {
    try {
      // TODO: Replace with actual API call
      console.log("Importing data:", data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      const successCount = data.rowCount - (data.errors?.length || 0)
      
      toast({
        title: "Import completed",
        description: `Successfully imported ${successCount} of ${data.rowCount} records.`,
        type: successCount === data.rowCount ? "success" : "warning",
      })
      
      closeSidebar()
      
      // TODO: Refresh list
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to import data. Please try again.",
        type: "error",
      })
    }
  }

  // Mock data for available employees (replace with actual data)
  const mockEmployees = [
    { id: "1", name: "John Doe", position: "Software Engineer" },
    { id: "2", name: "Jane Smith", position: "Product Manager" },
    { id: "3", name: "Bob Johnson", position: "Designer" },
  ]

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <PageHeader />
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
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
        </div>
        <SubNav items={employeeNavItems} />
        <div className="flex-1 pt-4">{children}</div>
      </div>

      {/* Add Employee Sidebar */}
      <SidebarSheet
        open={openSidebar === "add-employee"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Add New Employee"
        description="Fill in the details to add a new employee to your team."
      >
        <AddEmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={closeSidebar}
        />
      </SidebarSheet>

      {/* Create Group Sidebar */}
      <SidebarSheet
        open={openSidebar === "create-group"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Create New Group"
        description="Create a group and add members to organize your team."
      >
        <CreateGroupForm
          onSubmit={handleCreateGroup}
          onCancel={closeSidebar}
          availableEmployees={mockEmployees}
        />
      </SidebarSheet>

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
  )
}
