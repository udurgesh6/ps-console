"use client"

import { useState, useMemo, useCallback, forwardRef, useImperativeHandle, Ref } from "react";
import { LibraryFilters } from "./library-filters";
import { LibraryItems } from "./library-items";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { LibraryProps } from "@/types";
import { BulkActions } from "../bulk-actions";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

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
  initialSelectedItems = [],
  actionButtonText = "Done",
  onActionButtonClick,
  onClose,
  renderItem,
  isSingleSelect = false,
  showMaxItems = 4,
  isFilterGroupsLoading = false,
  isItemsLoading = false,
}, ref: Ref<LibraryHandle>) => {

  console.log(showBulkActions, isItemsLoading)

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>(initialSelectedItems);
  const [isSelectEnabled, setIsSelectEnabled] = useState<boolean>(showInModal ? true : false);

  useImperativeHandle(ref, () => ({
    isSelectEnabled: isSelectEnabled,
    setIsSelectEnabled: setIsSelectEnabled,
  }));

  const filteredItems = useMemo(() => {
    // Don't filter if loading
    if (isItemsLoading) return [];
    
    let result = [...items];

    Object.entries(selectedFilters).forEach(([filterKey, selectedValues]) => {
      if (selectedValues.length > 0) {
        result = result.filter((item) => {
          const itemValue = item[filterKey];
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
  }, [items, selectedFilters, searchQuery, isItemsLoading]);

  const handleFilterChange = useCallback((filterKey: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[filterKey] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [filterKey]: newValues };
    });
  }, []);

  const toggleItemSelection = useCallback((itemId: string) => {
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
    if (onActionButtonClick) {
      onActionButtonClick(items.filter((item) => selectedItems.includes(item.id)));
    }
  }, [onActionButtonClick, selectedItems, items]);

  const LibraryContent = () => (
    <div className={cn(
      "flex bg-white rounded-3xl shadow-lg border border-gray-200",
      showInModal ? "h-full" : "h-[calc(100vh-10rem)] max-h-[800px]"
    )}>
      {/* Filters Section - Full height with border extending to bottom */}
      {/* FIXED: Show filters if filterGroups exist OR if loading */}
      {showFilters && (filterGroups.length > 0 || isFilterGroupsLoading) && (
        <div className="flex-shrink-0 h-full">
          <LibraryFilters
            filterGroups={filterGroups}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            showSearch={showSearch}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isFilterGroupsLoading={isFilterGroupsLoading}
          />
        </div>
      )}

      {/* Main Content Area - Full height flex column */}
      <div className="flex-1 rounded-r-3xl flex flex-col h-full overflow-hidden">
        {/* Bulk Actions - Fixed at top, doesn't scroll */}
        {showBulkActions && isItemsLoading && (
          <div className="flex flex-row items-center w-full justify-end gap-2 h-10 px-6 pt-8 mb-2">
            <Skeleton className="h-8 w-24 rounded-3xl" />
            <Skeleton className="h-8 w-24 rounded-3xl" />
          </div>
        )}
        {showBulkActions && !isItemsLoading && (
          <div className={cn(
            "flex-shrink-0",
            !showInModal && "bg-white border-b rounded-t-3xl border-gray-200 px-6 py-4",
            selectedItems.length === 0 && "hidden md:block"
          )}>
            <BulkActions
              actions={bulkActions}
              selectedItems={items.filter((item) => selectedItems.includes(item.id))}
              setSelectedItems={(items) => setSelectedItems(items.map((item) => item.id))}
              setIsSelectEnabled={setIsSelectEnabled}
              showDivider={true}
              showEndDivider={false}
              isSelectEnabled={showInModal ? true : isSelectEnabled}
              showInModal={showInModal}
            />
          </div>
        )}

        {/* Library Items - Scrollable zone that takes remaining height */}
        <div className={cn(
          "flex-1 overflow-y-auto p-3 md:p-6",
          showInModal && "py-4"
        )}>
          <LibraryItems
            items={filteredItems}
            selectedItems={selectedItems}
            onToggleSelection={toggleItemSelection}
            renderItem={renderItem}
            isSelectEnabled={isSelectEnabled}
            showInModal={showInModal}
            showMaxItems={showMaxItems}
            isItemsLoading={isItemsLoading}
          />
        </div>

        {/* Action Button - Fixed at bottom, doesn't scroll */}
        {showInModal && showActionButton && (
          <div className="flex-shrink-0 bg-white w-full flex justify-end border-t border-gray-200 px-6 py-4">
            <Button
              onClick={handleActionButton}
              disabled={selectedItems.length === 0 || isItemsLoading}
              className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
            >
              {isItemsLoading ? "Loading..." : actionButtonText}
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
          className="h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] p-0 flex flex-col rounded-3xl"
          style={{
            maxWidth: "90vw",
            transition: "all 300ms ease-in-out"
          }}
        >
          <VisuallyHidden>
            <DialogTitle>Library</DialogTitle>
          </VisuallyHidden>
          <div className="flex-1 min-h-0">
            <LibraryContent />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="w-full">
      <LibraryContent />
    </div>
  );
});

Library.displayName = 'Library';
