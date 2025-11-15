import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationItems } from "@/constants/navigation";

export const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const activeProductConfig = navigationItems.find((p) => p.id === pathname);
      if (activeProductConfig) {
        setExpandedGroups(
          navigationItems.map((g) => g.title)
        );
      }
    }
  }, [isOpen, pathname]);

  // const toggleProduct = (productId: Product) => {
  //   if (expandedProduct === productId) {
  //     setExpandedProduct(null);
  //     setExpandedGroups([]);
  //   } else {
  //     setExpandedProduct(productId);
  //     const product = PRODUCTS.find((p) => p.id === productId);
  //     if (product) {
  //       setExpandedGroups(product.sidebarGroups.map((g) => g.title));
  //     }
  //   }
  // };

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleLinkClick = (href: string) => {
    onClose();
    window.location.href = href;
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 top-16">
      <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl overflow-y-auto top-16">
        <div className="p-4 space-y-2">
          {navigationItems.map((product) => {
            const isExpanded = expandedGroups.includes(product.title);

            return (
              <div key={product.id} className="space-y-1">
                <button
                  onClick={() => toggleGroup(product.title)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-md transition-colors",
                    expandedGroups.includes(product.title)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span>{product.title}</span>
                  {isExpanded ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {isExpanded && (
                  <div className="ml-4 space-y-1">
                    {navigationItems.map((group) => {
                      const isGroupExpanded = expandedGroups.includes(
                        group.title
                      );

                      return (
                        <div key={group.title} className="space-y-1">
                          <button
                            onClick={() => toggleGroup(group.title)}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                          >
                            <span>{group.title}</span>
                            {isGroupExpanded ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>

                          {isGroupExpanded && (
                            <div className="ml-3 space-y-1">
                              {group.items.map((item) => (
                                <button
                                  key={item.href}
                                  onClick={() =>
                                    handleLinkClick(item.href)
                                  }
                                  className={cn(
                                    "w-full text-left block px-3 py-2 text-sm rounded-md transition-colors",
                                    pathname === item.href
                                      ? "bg-gray-100 text-gray-900 font-medium"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                  )}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
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
  );
};
