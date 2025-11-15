import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SidebarSheet } from '@/components/shared/sidebar-sheet';
import { LibraryFiltersProps } from '@/types/library';

export const LibraryFilters: React.FC<LibraryFiltersProps> = ({
  filterGroups,
  selectedFilters,
  onFilterChange,
  showSearch,
  searchQuery,
  onSearchChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const FilterContent = () => (
    <>
      {/* Search */}
      {showSearch && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              className="pl-9 h-9 focus-visible:ring-black"
            />
          </div>
        </div>
      )}

      {/* Filter Groups */}
      {filterGroups.map((group, groupIndex) => (
        <div key={group.key}>
          {groupIndex > 0 && <Separator className="my-6" />}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{group.title}</h3>
            <div className="space-y-3">
              {group.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${group.key}-${option.value}`}
                    checked={selectedFilters[group.key]?.includes(option.value) || false}
                    onCheckedChange={() => onFilterChange(group.key, option.value)}
                    className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                  <Label
                    htmlFor={`${group.key}-${option.value}`}
                    className="flex-1 text-sm font-normal cursor-pointer text-gray-700 hover:text-gray-900"
                  >
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <span className="ml-2 text-gray-400">{option.count}</span>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
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
      {/* Desktop: Sidebar - Fixed width, scrolls independently when filter content is tall */}
      <div className="hidden rounded-l-lg md:flex md:flex-col w-64 bg-white border-r border-gray-200 h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <FilterContent />
        </div>
      </div>

      {/* Mobile: Filter Button + SidebarSheet */}
      <div className="md:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 gap-1 right-6 z-40 rounded-full h-14 w-14 px-6 shadow-lg bg-white hover:bg-gray-50 border-gray-300"
        >
          <SlidersHorizontal className="w-5 h-5 mr-0" />
          {activeFilterCount > 0 && (
            <span className="ml-0 text-black text-base rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <SidebarSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          title="Filters"
          description={activeFilterCount > 0 ? `${activeFilterCount} active filter${activeFilterCount !== 1 ? 's' : ''}` : undefined}
          className="sm:w-96"
        >
          <div className="space-y-4">
            {activeFilterCount > 0 && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear all
                </Button>
              </div>
            )}
            
            <FilterContent />
            
            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                Show Results
              </Button>
            </div>
          </div>
        </SidebarSheet>
      </div>
    </>
  );
};
