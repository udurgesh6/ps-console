import React, { useState, FC } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SidebarSheet } from '@/components/shared/sidebar-sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { LibraryFiltersProps } from '@/types/library';

export const LibraryFilters: FC<LibraryFiltersProps> = ({
  filterGroups,
  selectedFilters,
  onFilterChange,
  showSearch,
  searchQuery,
  onSearchChange,
  isFilterGroupsLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    // Initialize all groups as expanded
    const initial: Record<string, boolean> = {};
    filterGroups.forEach(group => {
      initial[group.id] = true;
    });
    return initial;
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Handle parent checkbox change
  const handleParentCheckboxChange = (groupId: string, e: React.MouseEvent) => {
    // Stop propagation to prevent label click from triggering
    e.stopPropagation();
    
    const group = filterGroups.find(g => g.id === groupId);
    if (!group) return;

    const options = group.options || group.subcategories || [];
    const allSelected = options.every(option => 
      selectedFilters[groupId]?.includes(option.id)
    );

    // If all are selected, uncheck all; otherwise, check all
    options.forEach(option => {
      const isCurrentlySelected = selectedFilters[groupId]?.includes(option.id);
      if (allSelected) {
        // Uncheck all
        if (isCurrentlySelected) {
          onFilterChange(groupId, option.id);
        }
      } else {
        // Check all
        if (!isCurrentlySelected) {
          onFilterChange(groupId, option.id);
        }
      }
    });
  };

  // Check if all options in a group are selected
  const isGroupFullySelected = (groupId: string) => {
    const group = filterGroups.find(g => g.id === groupId);
    if (!group) return false;

    const options = group.options || group.subcategories || [];
    if (options.length === 0) return false;

    return options.every(option => selectedFilters[groupId]?.includes(option.id));
  };

  // Check if some (but not all) options in a group are selected
  const isGroupPartiallySelected = (groupId: string) => {
    const group = filterGroups.find(g => g.id === groupId);
    if (!group) return false;

    const options = group.options || group.subcategories || [];
    const selectedCount = options.filter(option => 
      selectedFilters[groupId]?.includes(option.id)
    ).length;

    return selectedCount > 0 && selectedCount < options.length;
  };

  const FilterContent = () => (
    <div className="flex flex-col h-full">
      {/* Fixed Search Section */}
      {showSearch && (
        <div className="flex-shrink-0 px-6 pt-6 pb-4 bg-white border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search filters..."
              className="pl-9 h-10 focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:ring-offset-0 rounded-3xl border-gray-200 bg-gray-50 hover:bg-white transition-colors"
              disabled={isFilterGroupsLoading}
            />
          </div>
        </div>
      )}

      {/* Scrollable Filter Groups */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {isFilterGroupsLoading ? (
          /* Loading Skeletons */
          <div className="space-y-6">
            {[1, 2, 3].map((_, groupIndex) => (
              <div key={groupIndex} className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <div className="space-y-3 pl-2">
                  {[1, 2, 3, 4].map((_, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-3">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 flex-1 max-w-[180px]" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : filterGroups.filter(g => (g.options || g.subcategories || []).length > 0).length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">No filters available</p>
          </div>
        ) : (
          /* Filter Groups */
          <div className="space-y-1">
            {filterGroups
              .filter(group => {
                // Only show groups that have options
                const options = group.options || group.subcategories || [];
                return options.length > 0;
              })
              .map((group, groupIndex) => {
                const options = group.options || group.subcategories || [];
                const isExpanded = expandedGroups[group.id] ?? true;
                const isFullySelected = isGroupFullySelected(group.id);
                const isPartiallySelected = isGroupPartiallySelected(group.id);

                return (
                  <div key={group.id} className="group">
                    {groupIndex > 0 && <Separator className="my-4" />}
                    
                    {/* Group Header with Parent Checkbox */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        {/* LEFT: Checkbox + Label (label acts as accordion toggle) */}
                        <div 
                          className="flex items-center space-x-2 flex-1 min-w-0 cursor-pointer"
                          onClick={() => toggleGroup(group.id)}
                        >
                          {/* Checkbox - separate click area */}
                          <div onClick={(e) => handleParentCheckboxChange(group.id, e)}>
                            <Checkbox
                              id={`parent-${group.id}`}
                              checked={isFullySelected}
                              className="data-[state=checked]:bg-black data-[state=checked]:border-black flex-shrink-0"
                            />
                          </div>
                          
                          {/* Label - toggles accordion */}
                          <span className="text-sm font-semibold text-gray-900 hover:text-black transition-colors truncate">
                            {group.name}
                          </span>
                          
                          {/* Chevron icon - part of the label click area */}
                          {options.length > 0 && (
                            <div className="ml-auto flex-shrink-0">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Group Options */}
                    {isExpanded && options.length > 0 && (
                      <div className="space-y-2 pl-6 mb-2">
                        {options.map((option) => {
                          const isChecked = selectedFilters[group.id]?.includes(option.id) || false;
                          
                          return (
                            <div
                              key={option.id}
                              className="flex items-center space-x-2.5 py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-50 transition-colors group/item"
                            >
                              <Checkbox
                                id={`${group.id}-${option.id}`}
                                checked={isChecked}
                                onCheckedChange={() => onFilterChange(group.id, option.id)}
                                className="data-[state=checked]:bg-black data-[state=checked]:border-black flex-shrink-0"
                              />
                              <Label
                                htmlFor={`${group.id}-${option.id}`}
                                className="flex-1 text-sm font-normal cursor-pointer text-gray-700 group-hover/item:text-gray-900 transition-colors flex items-center justify-between min-w-0"
                              >
                                <span className="truncate">{option.name}</span>
                                {option.count !== undefined && (
                                  <span className="ml-2 text-xs text-gray-400 font-medium flex-shrink-0">
                                    {option.count}
                                  </span>
                                )}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );

  // Count active filters
  const activeFilterCount = Object.values(selectedFilters).reduce(
    (count, filters) => count + filters.length,
    0
  );

  const handleClearAll = () => {
    Object.keys(selectedFilters).forEach(key => {
      selectedFilters[key].forEach(value => {
        onFilterChange(key, value);
      });
    });
  };

  return (
    <>
      {/* Desktop: Sidebar - Full height container */}
      <div className="hidden md:flex md:flex-col w-72 bg-white border-r border-gray-200 h-full rounded-l-3xl overflow-hidden">
        <FilterContent />
      </div>

      {/* Mobile: Filter Button + SidebarSheet */}
      <div className="md:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 rounded-full h-14 px-5 shadow-lg bg-white hover:bg-gray-50 border-gray-300 flex items-center gap-2"
          disabled={isFilterGroupsLoading}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {activeFilterCount > 0 && (
            <span className="bg-black text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <SidebarSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          title="Filters"
          description={
            isFilterGroupsLoading 
              ? "Loading filters..." 
              : activeFilterCount > 0 
                ? `${activeFilterCount} active filter${activeFilterCount !== 1 ? 's' : ''}` 
                : "Refine your search results"
          }
          className="sm:w-96"
        >
          <div className="flex flex-col h-full">
            {/* Clear All Button */}
            {!isFilterGroupsLoading && activeFilterCount > 0 && (
              <div className="flex-shrink-0 px-6 pb-3 border-b border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 -ml-2"
                >
                  Clear all ({activeFilterCount})
                </Button>
              </div>
            )}
            
            {/* Filter Content */}
            <div className="flex-1 overflow-hidden">
              <FilterContent />
            </div>
            
            {/* Apply Button */}
            <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-black text-white hover:bg-gray-800 h-11 font-medium shadow-sm"
                disabled={isFilterGroupsLoading}
              >
                {isFilterGroupsLoading ? "Loading..." : "Apply Filters"}
              </Button>
            </div>
          </div>
        </SidebarSheet>
      </div>
    </>
  );
};
