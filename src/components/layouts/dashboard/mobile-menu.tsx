import { Product, PRODUCTS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const MobileMenu = ({
  isOpen,
  activeProduct,
  onProductChange,
  onClose,
}: {
  isOpen: boolean;
  activeProduct: Product;
  onProductChange: (product: Product) => void;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const [expandedProduct, setExpandedProduct] = useState<Product | null>(
    activeProduct
  );
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setExpandedProduct(activeProduct);
      const activeProductConfig = PRODUCTS.find((p) => p.id === activeProduct);
      if (activeProductConfig) {
        setExpandedGroups(
          activeProductConfig.sidebarGroups.map((g) => g.title)
        );
      }
    }
  }, [isOpen, activeProduct]);

  const toggleProduct = (productId: Product) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
      setExpandedGroups([]);
    } else {
      setExpandedProduct(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      if (product) {
        setExpandedGroups(product.sidebarGroups.map((g) => g.title));
      }
    }
  };

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleLinkClick = (href: string, productId: Product) => {
    onProductChange(productId);
    onClose();
    window.location.href = href;
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 top-16">
      <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl overflow-y-auto top-16">
        <div className="p-4 space-y-2">
          {PRODUCTS.map((product) => {
            const isExpanded = expandedProduct === product.id;

            return (
              <div key={product.id} className="space-y-1">
                <button
                  onClick={() => toggleProduct(product.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-md transition-colors",
                    activeProduct === product.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span>{product.name}</span>
                  {isExpanded ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {isExpanded && (
                  <div className="ml-4 space-y-1">
                    {product.sidebarGroups.map((group) => {
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
                                    handleLinkClick(item.href, product.id)
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
