import { navigationItems } from "@/constants/navigation";
import { getTheme } from "@/constants/theme-config";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = ({
  onExpandChange,
}: {
  onExpandChange?: (isExpanded: boolean) => void;
}) => {
  const pathname = usePathname();
  const basicNavigationItems = navigationItems.filter(
    (item) => !item.isSystemConfig
  );
  const systemNavigationItems = navigationItems.filter(
    (item) => item.isSystemConfig
  );

  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    basicNavigationItems.map((g) => g.title)
  );
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  // const toggleSidebar = () => {
  //   const newExpanded = !isExpanded;
  //   setIsExpanded(newExpanded);
  //   onExpandChange?.(newExpanded);
  // };

  const isBaseRouteActive = (
    itemHref: string,
    currentPathname: string
  ): boolean => {
    const secondSlashIndex = itemHref.indexOf("/", 1);
    const basePath =
      secondSlashIndex !== -1
        ? itemHref.substring(0, secondSlashIndex)
        : itemHref;
    return currentPathname.startsWith(basePath);
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-50 bg-gray-50",
        "transition-all duration-300 ease-in-out",
        // isExpanded ? "w-56" : "w-20"
      )}
    >
      {/* Toggle button - commented out but available */}
      {/* <button
        onClick={toggleSidebar}
        className={cn(
          "absolute cursor-pointer top-20 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50",
          isExpanded ? "right-[-19px]" : "right-[-12px]"
        )}
        title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft size={16} className="text-gray-600" />
        ) : (
          <ChevronRight size={16} className="text-gray-600" />
        )}
      </button> */}

      {/* Collapsed Sidebar */}
      <div
        className={cn(
          "absolute inset-0 w-20 bg-gray-100 border-r",
          "transition-opacity duration-200",
          // isExpanded ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex items-center justify-center h-16 w-20 border-b bg-gray-100">
          <Image
            src="/phish-sheriff-small.png"
            alt="Phish Sheriff Small Logo"
            width={20}
            height={20}
          />
        </div>

        <div className="flex flex-col py-6 justify-between overflow-y-auto overflow-x-hidden h-[calc(100vh-4rem)]">
          <div className="overflow-y-auto overflow-x-hidden">
            {basicNavigationItems.map((group) => (
              <div key={group.title} className="space-y-1">
                {group.items.map((item) => {
                  const IconComponent = item.icon;
                  const theme = item.theme ? getTheme(item.theme) : null;
                  const isActive = isBaseRouteActive(item.href, pathname);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center h-12 w-20 transition-colors",
                        isActive
                          ? "bg-gray-50 border-r-0"
                          : "hover:bg-gray-200"
                      )}
                      title={item.label}
                    >
                      {IconComponent !== undefined && (
                        <IconComponent 
                          size={18} 
                          className={cn(
                            "transition-colors",
                            theme ? theme.colors.icon : "text-gray-600"
                          )}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="overflow-y-auto overflow-x-hidden">
            {systemNavigationItems.map((group) => (
              <div key={group.title} className="space-y-1">
                {group.items.map((item) => {
                  const IconComponent = item.icon;
                  const theme = item.theme ? getTheme(item.theme) : null;
                  const isActive = isBaseRouteActive(item.href, pathname);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center h-12 w-20 transition-colors",
                        isActive
                          ? "bg-gray-50 border-r-0"
                          : "hover:bg-gray-200"
                      )}
                      title={item.label}
                    >
                      {IconComponent !== undefined && (
                        <IconComponent 
                          size={18} 
                          className={cn(
                            "transition-colors",
                            theme ? theme.colors.icon : "text-gray-600"
                          )}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Sidebar */}
      <div
        className={cn(
          "absolute inset-0 w-56 bg-gray-100",
          "transition-opacity duration-200",
          // isExpanded ? "opacity-100 delay-150" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Full Logo */}
        <div className="h-16 flex items-center gap-3 px-4 pl-6 bg-gray-100">
          <div className="flex items-center justify-center">
            <Image
              src="/phish-sheriff-logo-navbar.png"
              alt="Phish Sheriff Logo"
              width={180}
              height={150}
            />
          </div>
        </div>

        <div className="flex-1 flex-col py-0 pt-2 bg-gray-100 overflow-y-auto overflow-x-hidden h-[calc(100vh-4rem)] flex flex-col justify-between">
          <div className="px-5 pl-5 space-y-2">
            {basicNavigationItems.map((navItem) => {
              const isGroupExpanded = expandedGroups.includes(navItem.title);

              if (!navItem.showTitle) {
                return navItem.items.map((item) => {
                  const IconComponent = item.icon;
                  const theme = item.theme ? getTheme(item.theme) : null;
                  const isActive = isBaseRouteActive(item.href, pathname);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 p-3 text-sm rounded-3xl transition-all font-medium",
                        isActive
                          ? "bg-white shadow-sm text-primary font-semibold"
                          : "text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      {IconComponent !== undefined && (
                        <IconComponent 
                          size={16} 
                          className={cn(
                            "transition-colors",
                            theme ? theme.colors.icon : "text-gray-600"
                          )}
                        />
                      )}
                      {item.label}
                    </Link>
                  );
                });
              }

              return (
                <div key={navItem.title} className="space-y-2">
                  <button
                    onClick={() => toggleGroup(navItem.title)}
                    className="w-full flex items-center cursor-pointer justify-between pr-3 pt-2 text-sm font-medium text-gray-700 rounded-md transition-colors hover:text-gray-900"
                  >
                    <span>{navItem.title}</span>
                    {isGroupExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>

                  {isGroupExpanded && (
                    <div className="ml-2 space-y-2">
                      {navItem.items.map((item) => {
                        const IconComponent = item.icon;
                        const theme = item.theme ? getTheme(item.theme) : null;
                        const isActive = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2 px-2 py-2 text-sm rounded-3xl transition-all",
                              isActive
                                ? "bg-gray-200 text-gray-900 font-semibold"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            )}
                          >
                            {IconComponent !== undefined && (
                              <IconComponent 
                                size={16} 
                                className={cn(
                                  "transition-colors",
                                  theme ? theme.colors.icon : "text-gray-600"
                                )}
                              />
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

          <div className="px-5 pb-10 pl-5 space-y-2">
            {systemNavigationItems.map((navItem) => {
              const isGroupExpanded = expandedGroups.includes(navItem.title);

              if (!navItem.showTitle) {
                return navItem.items.map((item) => {
                  const IconComponent = item.icon;
                  const theme = item.theme ? getTheme(item.theme) : null;
                  const isActive = isBaseRouteActive(item.href, pathname);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 p-3 text-sm rounded-3xl transition-all font-medium",
                        isActive
                          ? "bg-white shadow-sm text-primary font-semibold"
                          : "text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      {IconComponent !== undefined && (
                        <IconComponent 
                          size={16} 
                          className={cn(
                            "transition-colors",
                            theme ? theme.colors.icon : "text-gray-600"
                          )}
                        />
                      )}
                      {item.label}
                    </Link>
                  );
                });
              }

              return (
                <div key={navItem.title} className="space-y-2">
                  <button
                    onClick={() => toggleGroup(navItem.title)}
                    className="w-full flex items-center cursor-pointer justify-between pr-3 pt-2 text-sm font-medium text-gray-700 rounded-md transition-colors hover:text-gray-900"
                  >
                    <span>{navItem.title}</span>
                    {isGroupExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>

                  {isGroupExpanded && (
                    <div className="ml-2 space-y-2">
                      {navItem.items.map((item) => {
                        const IconComponent = item.icon;
                        const theme = item.theme ? getTheme(item.theme) : null;
                        const isActive = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2 p-3 text-sm rounded-3xl transition-all",
                              isActive
                                ? "bg-gray-200 text-gray-900 font-medium"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            )}
                          >
                            {IconComponent !== undefined && (
                              <IconComponent 
                                size={16} 
                                className={cn(
                                  "transition-colors",
                                  theme ? theme.colors.icon : "text-gray-600"
                                )}
                              />
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
