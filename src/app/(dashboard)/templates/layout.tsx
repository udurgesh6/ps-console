"use client"

import { PageHeader } from "@/components/shared/page-header"
import { SubNav } from "@/components/shared/sub-nav"
import { SubNavItem } from "@/components/shared/sub-nav"
import { SidebarSheet } from "@/components/shared/sidebar-sheet"
import { useSidebar } from "@/context/sidebar-context"
import { AddTemplateForm } from "./components/add-template-form"

const templateNavItems: SubNavItem[] = [
  // {
  //   title: "Email",
  //   href: "/templates",
  // },
  {
    title: "Form",
    href: "/templates/form",
  },
  {
    title: "Landing",
    href: "/templates/landing",
  },
  {
    title: "Courses",
    href: "/templates/courses",
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
        {/* <PageHeader /> */}
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
