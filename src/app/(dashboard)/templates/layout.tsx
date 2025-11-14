"use client"

import { PageHeader } from "@/components/shared/page-header"
import { SubNav } from "@/components/shared/sub-nav"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { SubNavItem } from "@/components/shared/sub-nav"
import { SidebarSheet } from "@/components/shared/sidebar-sheet"
import { useSidebar } from "@/context/sidebar-context"
import { AddTemplateForm } from "./components/add-template-form"

const templateNavItems: SubNavItem[] = [
  {
    title: "Email",
    href: "/templates",
  },
  {
    title: "Form",
    href: "/templates/form",
  },
  {
    title: "Landing",
    href: "/templates/landing",
  },
];

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { openSidebar, setOpenSidebar, closeSidebar } = useSidebar()

  const handleCreateTemplate = async () => {
    // TODO: Replace with actual API call
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <PageHeader />
          <div className="flex gap-2">
            <Button onClick={() => setOpenSidebar("add-template")}>
              <PlusIcon className="mr-2 h-4 w-4 font-semibold" />
              Add Template
            </Button>
          </div>
        </div>
        <SubNav items={templateNavItems} />
        <div className="flex-1 pt-4">{children}</div>
      </div>
      <SidebarSheet
        open={openSidebar === "add-template"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Create New Template"
        description="Create a new template for your phishing simulations."
      >
        <AddTemplateForm
          onSubmit={handleCreateTemplate}
          onCancel={closeSidebar}
        />
      </SidebarSheet>
    </>
  )
}
