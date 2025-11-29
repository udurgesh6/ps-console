"use client"

import { Employee, EmployeeGroup } from "@/types"
import { createContext, useCallback, useContext, useState, ReactNode } from "react"

type SidebarType = "add-employee" | "edit-employee" | "create-group" | "edit-group" | "import-employees" | "import-groups" | "add-template" | "add-course" | null

interface SidebarContextType {
  openSidebar: SidebarType
  setOpenSidebar: (type: SidebarType) => void
  closeSidebar: () => void
  employeeDetail: Employee | null
  setEmployeeDetail: (employee: Employee | null) => void
  groupDetail: EmployeeGroup | null
  setGroupDetail: (group: EmployeeGroup | null) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState<SidebarType>(null)
  const [employeeDetail, setEmployeeDetail] = useState<Employee | null>(null)
  const [groupDetail, setGroupDetail] = useState<EmployeeGroup | null>(null)

  const closeSidebar = useCallback(() => {
    setOpenSidebar(null)
  }, [])

  return (
    <SidebarContext.Provider
      value={{ openSidebar, setOpenSidebar, closeSidebar, employeeDetail, setEmployeeDetail, groupDetail, setGroupDetail }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
