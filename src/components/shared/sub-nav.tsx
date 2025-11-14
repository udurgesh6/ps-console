"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface SubNavItem {
  title: string
  href: string
  description?: string
}

interface SubNavTabsProps {
  items: SubNavItem[]
  className?: string
}

export function SubNav({ items, className }: SubNavTabsProps) {
  const pathname = usePathname()
  
  // First try to find exact match, then check for path prefixes
  const activeValue = items.find((item) => pathname === item.href)?.href ||
    items.find((item) => pathname.startsWith(item.href + "/"))?.href ||
    items[0]?.href

  console.log(activeValue)

  return (
    <Tabs value={activeValue} className={className}>
      <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0 space-x-4">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="inline-flex">
            <TabsTrigger
              value={item.href}
              className="relative px-0 pt-0 pb-2 cursor-pointer rounded-none border-t-0 border-x-0 border-b-2 hover:border-gray-300 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              {item.title}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  )
}
