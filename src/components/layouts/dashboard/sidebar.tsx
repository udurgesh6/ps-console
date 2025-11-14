import { ProductConfig } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = ({
  product,
  onExpandChange,
}: {
  product: ProductConfig;
  onExpandChange?: (isExpanded: boolean) => void;
}) => {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    product.sidebarGroups.map((g) => g.title)
  );
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const toggleSidebar = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandChange?.(newExpanded);
  };

  // Commented out hover functionality
  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  //   onHoverChange?.(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  //   onHoverChange?.(false);
  // };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-50",
        "transition-all duration-300 ease-in-out",
        isExpanded ? "w-56" : "w-20"
      )}
      // Commented out hover functionality
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute cursor-pointer top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50",
          isExpanded ? "right-[-12px]" : "right-[-12px]"
        )}
        title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft size={16} className="text-gray-600" />
        ) : (
          <ChevronRight size={16} className="text-gray-600" />
        )}
      </button>

      {/* Collapsed State - Icon Strip (always visible) */}
      <div
        className={cn(
          "absolute inset-0 w-20 bg-black border-r border-gray-200",
          "transition-opacity duration-200",
          isExpanded ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Small Logo */}
        <div className="flex items-center justify-center h-16 w-20 border-b bg-white border-gray-200">
          <Image
            src="/phish-sheriff-small.png"
            alt="Phish Sheriff Small Logo"
            width={20}
            height={20}
          />
        </div>

        {/* Navigation Icons */}
        <div className="flex-1 overflow-y-auto py-4">
          {product.sidebarGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center h-12 w-20 transition-colors",
                      pathname === item.href
                        ? "bg-gray-50 text-black border-r-0"
                        : "text-white hover:bg-gray-200 hover:text-gray-900"
                    )}
                    title={item.label}
                  >
                    {IconComponent !== undefined && <IconComponent size={18} />}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0 w-56 bg-black",
          "transition-opacity duration-200",
          isExpanded ? "opacity-100 delay-150" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Full Logo */}
        <div className="h-16 flex items-center gap-3 px-4 pl-6 bg-white border-b border-gray-200">
          <div className="flex items-center justify-center">
            <Image
              src="/phish-sheriff-logo-navbar.png"
              alt="Phish Sheriff Logo"
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden h-[calc(100vh-4rem)]">
          <div className="p-4 pl-6 space-y-2">
            {product.sidebarGroups.map((group) => {
              const isExpanded = expandedGroups.includes(group.title);

              // Render direct links (no dropdown)
              if (group.isDirect && group.items.length === 1) {
                const item = group.items[0];
                const IconComponent = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors font-medium",
                      pathname === item.href
                        ? "bg-gray-200 text-gray-900"
                        : "text-white hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {IconComponent !== undefined && <IconComponent size={16} />}
                    {item.label}
                  </Link>
                );
              }

              // Render expandable groups
              return (
                <div key={group.title} className="space-y-2">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center cursor-pointer justify-between pr-3 pt-2 text-sm font-medium text-white rounded-md transition-colors"
                  >
                    <span>{group.title}</span>
                    {isExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="ml-2 space-y-2">
                      {group.items.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors",
                              pathname === item.href
                                ? "bg-gray-200 text-gray-900 font-medium"
                                : "text-white hover:text-gray-900 hover:bg-gray-50"
                            )}
                          >
                            {IconComponent !== undefined && (
                              <IconComponent size={16} />
                            )}
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
