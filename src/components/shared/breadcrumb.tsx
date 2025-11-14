"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: React.ReactNode
  textSize?: "sm" | "base" | "lg"
}

export function Breadcrumb({ 
  items, 
  className, 
  separator = <ChevronRight className="h-4 w-4" />,
  textSize = "sm"
}: BreadcrumbProps) {
  const textSizeClasses = {
    sm: "text-sm",
    base: "text-base", 
    lg: "text-lg"
  }

  return (
    <nav 
      className={cn("flex flex-row h-full items-center space-x-2", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isActive = item.isActive ?? isLast

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}
              
              {item.href && !isActive ? (
                <Link
                  href={item.href}
                  className={cn(
                    textSizeClasses[textSize],
                    "text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    textSizeClasses[textSize],
                    isActive 
                      ? "text-gray-900 font-medium" 
                      : "text-gray-600"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Utility function to generate breadcrumb items from pathname
export function generateBreadcrumbItems(
  pathname: string,
  customLabels?: Record<string, string>
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = []

  // Add home/root item if needed
  if (segments.length > 0) {
    items.push({
      label: customLabels?.[''] || 'Home',
      href: '/'
    })
  }

  // Generate items for each segment
  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1
    
    // Use custom label if provided, otherwise format the segment
    const label = customLabels?.[segment] || 
                  customLabels?.[href] || 
                  segment.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')

    items.push({
      label,
      href: isLast ? undefined : href,
      isActive: isLast
    })
  })

  return items
}
