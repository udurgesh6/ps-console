"use client"

import * as React from "react"

type SidebarType = "add-employee" | "create-group" | "import-employees" | "import-groups" | "add-template" | "add-course" | null

interface SidebarContextType {
  openSidebar: SidebarType
  setOpenSidebar: (type: SidebarType) => void
  closeSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = React.useState<SidebarType>(null)

  const closeSidebar = React.useCallback(() => {
    setOpenSidebar(null)
  }, [])

  return (
    <SidebarContext.Provider
      value={{ openSidebar, setOpenSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
