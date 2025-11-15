"use client"

// @ts-nocheck
import { useState, useMemo, useCallback, forwardRef, useImperativeHandle, Ref } from "react"; // <-- Ensure Ref is imported
import { LibraryFilters } from "./library-filters";
import { LibraryItems } from "./library-items";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { LibraryProps } from "@/types";
import { BulkActions } from "../bulk-actions";
import { cn } from "@/lib/utils";

export interface LibraryHandle {
  isSelectEnabled: boolean;
  setIsSelectEnabled: (value: boolean) => void;
}

export const Library = forwardRef<LibraryHandle, LibraryProps>(({
  showFilters = true,
  showSearch = true,
  showBulkActions = true,
  showActionButton = true,
  showInModal = false,
  isOpen = false,
  filterGroups = [],
  bulkActions = [],
  items = [],
  actionButtonText = "Done",
  onActionButtonClick,
  onClose,
  renderItem,
  isSingleSelect = false,
}, ref: Ref<LibraryHandle>) => {

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectEnabled, setIsSelectEnabled] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    isSelectEnabled: isSelectEnabled,
    setIsSelectEnabled: setIsSelectEnabled,
  }));

  const filteredItems = useMemo(() => {
    // ... (Your filteredItems logic)
    let result = [...items];

    Object.entries(selectedFilters).forEach(([filterKey, selectedValues]) => {
      if (selectedValues.length > 0) {
        result = result.filter((item) => {
          const itemValue = item[filterKey];
          // Assuming item[filterKey] is a string for comparison with selectedValues
          return selectedValues.includes(itemValue);
        });
      }
    });

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [items, selectedFilters, searchQuery]);

  const handleFilterChange = useCallback((filterKey: string, value: string) => {
    // ... (Your handleFilterChange logic)
    setSelectedFilters((prev) => {
      const current = prev[filterKey] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [filterKey]: newValues };
    });
  }, []);

  const toggleItemSelection = useCallback((itemId: string) => {
    // ... (Your toggleItemSelection logic)
    if (!isSingleSelect) {
      setSelectedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setSelectedItems([itemId]);
    }
  }, [isSingleSelect]);

  const handleActionButton = useCallback(() => {
    // ... (Your handleActionButton logic)
    if (onActionButtonClick) {
      onActionButtonClick(items.filter((item) => selectedItems.includes(item.id)));
    }
  }, [onActionButtonClick, selectedItems, items]);

  const LibraryContent = () => (
    // ... (Your LibraryContent component structure)
    <div className="flex h-full bg-white rounded-lg shadow-lg border border-gray-200">
      {showFilters && filterGroups.length > 0 && (
        <LibraryFilters
          filterGroups={filterGroups}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          showSearch={showSearch}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {!showInModal && showBulkActions && (
          <div className={cn("bg-white border-b rounded-t-lg border-gray-200 px-6 py-4", selectedItems.length === 0 && "hidden md:block")}>
            <BulkActions
              actions={bulkActions}
              selectedItems={items.filter((item) => selectedItems.includes(item.id))}
              setSelectedItems={(items) => setSelectedItems(items.map((item) => item.id))}
              setIsSelectEnabled={setIsSelectEnabled}
              showDivider={true}
              showEndDivider={false}
              isSelectEnabled={isSelectEnabled}
            />
          </div>
        )}

        <div className={cn("flex-1 overflow-y-auto p-3 md:p-6", showInModal && "py-4")}>
          <LibraryItems
            items={filteredItems}
            selectedItems={selectedItems}
            onToggleSelection={toggleItemSelection}
            renderItem={renderItem}
            isSelectEnabled={isSelectEnabled}
          />
        </div>

        {showInModal && showActionButton && (
          <div className="bg-white w-full flex justify-end border-t border-gray-200 px-6 py-4">
            <Button
              onClick={handleActionButton}
              disabled={selectedItems.length === 0}
              className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
            >
              {actionButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  if (showInModal) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          showCloseButton={false}
          className="max-w-7xl sm:max-w-7xl h-[90vh] p-0 pt-5"
        >
          <VisuallyHidden>
            <DialogTitle>Library</DialogTitle>
          </VisuallyHidden>
          <LibraryContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="">
      <LibraryContent />
    </div>
  );
});

Library.displayName = 'Library';
