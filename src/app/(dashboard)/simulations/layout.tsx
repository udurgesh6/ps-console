"use client"

import { PageHeader } from "@/components/shared/page-header"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function SimulationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
     <>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <PageHeader />
          <div className="flex gap-2">
            <Button onClick={() => router.push('/simulations/new')}>
              <PlusIcon className="mr-2 h-4 w-4 font-semibold" />
              Create Simulation
            </Button>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
