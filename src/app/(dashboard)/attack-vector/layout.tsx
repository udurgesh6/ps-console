"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/shared/breadcrumb"
import { PlusIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { dummyAttackVectors } from "@/constants/temporary/attack-vectors"
import { useRouter } from "next/navigation"

export default function AttackVectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const isEditRoute = pathname.startsWith('/attack-vector/') && pathname !== '/attack-vector'
  
  // Extract attack vector ID from pathname - more robust approach
  const getAttackVectorId = () => {
    if (isEditRoute) {
      // Split pathname and get the last segment which should be the ID
      const segments = pathname.split('/').filter(Boolean)
      return segments[segments.length - 1] || null
    }
    return null
  }

  const attackVectorId = getAttackVectorId()
  
  // Find attack vector by ID and return its name
  const getAttackVectorName = (id: string | null) => {
    if (!id) return "Unknown Attack Vector"
    
    const attackVector = dummyAttackVectors.find(av => av.id === id)
    return attackVector ? attackVector.name : `Attack Vector ${id}`
  }

  return (
    <div className="flex flex-col space-y-4">
      {!isEditRoute && (
        <div className="flex items-center justify-between">
          <PageHeader />
          <div className="flex gap-2">
            <Button onClick={() => router.push('/attack-vector/new')}>
              <PlusIcon className="mr-2 h-4 w-4 font-semibold" />
              Create Attack Vector
            </Button>
          </div>
        </div>
      )}
      
      {/* Breadcrumb Navigation - Only show on edit routes */}
      {isEditRoute && (
        <div className="">
          <Breadcrumb 
            items={[
              { label: "Attack Vector", href: "/attack-vector" },
              { label: getAttackVectorName(attackVectorId), isActive: true }
            ]}
          />
        </div>
      )}
      
      <div className="flex-1">{children}</div>
    </div>
  )
}
