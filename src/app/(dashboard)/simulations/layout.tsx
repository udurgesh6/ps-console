"use client"

import { PageHeader } from "@/components/shared/page-header"

export default function SimulationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <>
      <div className="flex flex-col space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <PageHeader />
        </div>
        <div className="flex-1 pt-4">{children}</div>
      </div>
    </>
  )
}
