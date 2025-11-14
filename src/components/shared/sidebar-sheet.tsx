import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function SidebarSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: SidebarSheetProps) {
  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/80"
        onClick={() => onOpenChange(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full bg-white shadow-lg transition-transform duration-300 ease-in-out sm:w-[540px]",
          open ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b p-6">
          <div className="space-y-1">
            <h2 className="!text-lg !font-medium !leading-6 !m-0 !p-0">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground !m-0 !p-0">{description}</p>
            )}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </>
  )
}
