"use client"

import { Breadcrumb } from "@/components/shared/breadcrumb"
import { usePathname } from "next/navigation"
import { useGetAttackVectorById } from "@/hooks"
import { SubNav, SubNavItem } from "@/components/shared/sub-nav"

const attackVectorNavItems: SubNavItem[] = [
  {
    title: "Phishing ",
    href: "/attack-vector",
  },
  {
    title: "Vishing",
    href: "/attack-vector/vishing",
  },
];

export default function AttackVectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isEditRoute = pathname !== "/attack-vector" && pathname !== "/attack-vector/vishing"
  
  const getAttackVectorId = () => {
    if (isEditRoute) {
      const segments = pathname.split('/').filter(Boolean)
      return segments[segments.length - 1] || null
    }
    return null
  }

  const attackVectorId = getAttackVectorId()
  
  const { data: attackVector, isLoading } = useGetAttackVectorById(attackVectorId || '')
  
  const getAttackVectorName = () => {
    if (isLoading) return "Loading..."
    if (!attackVectorId) return "Unknown Attack Vector"
    return attackVector?.name || `New`
  }

  return (
    <div className="flex flex-col space-y-4">
      {isEditRoute && (
        <div className="">
          <Breadcrumb 
            items={[
              { label: "Attack Vector", href: "/attack-vector" },
              { label: getAttackVectorName(), isActive: true }
            ]}
          />
        </div>
      )}
      {!isEditRoute && <SubNav items={attackVectorNavItems} />}
      <div className="flex-1">{children}</div>
    </div>
  )
}
