import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NavigationItem } from "@/constants/navigation";

interface GroupNavigationProps {
  navItems: NavigationItem[];
  expandedGroups: string[];
  toggleGroup: (title: string) => void;
  pathname: string;
}

export const GroupNavigation = ({
  navItems,
  expandedGroups,
  toggleGroup,
  pathname,
}: GroupNavigationProps) => {
  return (
    <>
      {navItems.map((navItem: NavigationItem) => {
        const isExpanded = expandedGroups.includes(navItem.title);

        if (!navItem.showTitle) {
          const item = navItem.items[0];
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

        return (
          <div key={navItem.title} className="space-y-2">
            <button
              onClick={() => toggleGroup(navItem.title)}
              className="w-full flex items-center cursor-pointer justify-between pr-3 pt-2 text-sm font-medium text-white rounded-md transition-colors"
            >
              <span>{navItem.title}</span>
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {isExpanded && (
              <div className="ml-2 space-y-2">
                {navItem.items.map((item) => {
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
    </>
  );
};
