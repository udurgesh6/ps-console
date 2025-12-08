import { useState, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Search,
  Users,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  SimulationProfileTargetSelectionFormData,
  EmployeeGroup,
} from "@/types";
import { Button } from "@/components/ui/button";
import { useGetEmployeeGroups } from "@/hooks";
import { Tag } from "@/components/shared/tag";
import { useDebounce } from "@/hooks";

interface SimulationProfileTargetSelectionStepProps {
  form: UseFormReturn<SimulationProfileTargetSelectionFormData>;
  isSubmitting?: boolean;
}

const ITEMS_PER_PAGE = 10;

export const SimulationProfileTargetSelectionStep = ({
  form,
  isSubmitting = false,
}: SimulationProfileTargetSelectionStepProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedGroupsData, setSelectedGroupsData] = useState<
    Map<string, EmployeeGroup>
  >(new Map());

  // Debounce search query to prevent focus loss
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch employee groups using the debounced search with pagination
  const {
    data: employeeGroupsData,
    isLoading,
    isError,
    error,
  } = useGetEmployeeGroups({
    query: debouncedSearchQuery,
    sortKey: "name",
    sortDirection: "asc",
    limit: ITEMS_PER_PAGE,
    offset: currentPage * ITEMS_PER_PAGE,
  });

  const availableGroups = employeeGroupsData?.employeeGroups || [];
  const totalCount = employeeGroupsData?.total || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const selectedGroupIds = form.watch("employeeGroupIds") || [];

  // Reset to first page when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(0);
  };

  const selectedGroupsMap = useMemo(() => {
    const map = new Map(selectedGroupsData);
    // Update with current available groups if they exist
    availableGroups.forEach((group) => {
      if (selectedGroupIds.includes(group.id)) {
        map.set(group.id, group);
      }
    });
    return map;
  }, [selectedGroupsData, availableGroups, selectedGroupIds]);

  // Calculate total employees from selected groups
  const totalSelectedEmployees = Array.from(selectedGroupsMap.values()).reduce(
    (sum, group) => sum + (group.employeeCount || 0),
    0
  );

  const handleGroupToggle = (groupId: string, checked: boolean) => {
    const currentGroupIds = form.getValues("employeeGroupIds") || [];
    if (checked) {
      // Store the full group data when selecting
      const group = availableGroups.find((g) => g.id === groupId);
      if (group) {
        setSelectedGroupsData((prev) => new Map(prev).set(groupId, group));
      }
      form.setValue("employeeGroupIds", [...currentGroupIds, groupId], {
        shouldValidate: true,
      });
    } else {
      // Remove from stored data when deselecting
      setSelectedGroupsData((prev) => {
        const newMap = new Map(prev);
        newMap.delete(groupId);
        return newMap;
      });
      form.setValue(
        "employeeGroupIds",
        currentGroupIds.filter((id) => id !== groupId),
        { shouldValidate: true }
      );
    }
  };

  const handleRemoveGroup = (groupId: string) => {
    const currentGroupIds = form.getValues("employeeGroupIds") || [];
    setSelectedGroupsData((prev) => {
      const newMap = new Map(prev);
      newMap.delete(groupId);
      return newMap;
    });
    form.setValue(
      "employeeGroupIds",
      currentGroupIds.filter((id) => id !== groupId),
      { shouldValidate: true }
    );
  };

  const handleSelectAll = () => {
    const currentGroupIds = form.getValues("employeeGroupIds") || [];
    const newGroupIds = availableGroups.map((group) => group.id);
    // Merge with existing selections to avoid losing groups from other pages
    const mergedIds = Array.from(new Set([...currentGroupIds, ...newGroupIds]));
    form.setValue("employeeGroupIds", mergedIds, { shouldValidate: true });
  };

  const handleDeselectAll = () => {
    // Only deselect groups visible on current page
    const currentGroupIds = form.getValues("employeeGroupIds") || [];
    const visibleGroupIds = new Set(availableGroups.map((g) => g.id));
    const remainingIds = currentGroupIds.filter(
      (id) => !visibleGroupIds.has(id)
    );
    form.setValue("employeeGroupIds", remainingIds, { shouldValidate: true });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const isAllSelected =
    availableGroups.length > 0 &&
    availableGroups.every((group) => selectedGroupIds.includes(group.id));

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Search and Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by group name, department, or location..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
              disabled={isSubmitting}
            />
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <Users className="w-4 h-4 mr-1" />
              {selectedGroupIds.length}{" "}
              {selectedGroupIds.length === 1 ? "Group" : "Groups"}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {totalSelectedEmployees} Employees
            </Badge>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={isAllSelected ? handleDeselectAll : handleSelectAll}
              disabled={
                isSubmitting || isLoading || availableGroups.length === 0
              }
              variant="outline"
              className="cursor-pointer w-28"
              size="sm"
            >
              {isAllSelected ? "Deselect All" : "Select All"}
            </Button>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-muted-foreground">
              Showing {currentPage * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min((currentPage + 1) * ITEMS_PER_PAGE, totalCount)} of{" "}
              {totalCount} groups
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 0 || isLoading}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1 || isLoading}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Selected Groups Tags */}
        {selectedGroupIds.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedGroupsMap.values()).map((group) => (
              <Tag
                key={group.id}
                id={group.id}
                name={`${group.name} (${group.employeeCount || 0})`}
                handleRemove={() => handleRemoveGroup(group.id)}
              />
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name="employeeGroupIds"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="space-y-3 pr-2">
                  {/* Loading State */}
                  {isLoading && (
                    <div className="text-center flex flex-col items-center justify-center py-12 gap-4">
                      <Loader2 size={28} />
                      <p className="text-sm text-gray-500">
                        Loading employee groups...
                      </p>
                    </div>
                  )}

                  {/* Error State */}
                  {isError && (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-red-300 mx-auto mb-3" />
                      <p className="text-sm text-red-500">
                        Error loading groups:{" "}
                        {error?.message || "Unknown error"}
                      </p>
                    </div>
                  )}

                  {/* Empty State */}
                  {!isLoading && !isError && availableGroups.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">
                        {searchQuery
                          ? "No groups found matching your search"
                          : "No employee groups available"}
                      </p>
                    </div>
                  )}

                  {/* Groups List */}
                  {!isLoading &&
                    !isError &&
                    availableGroups.map((group) => {
                      const isSelected = selectedGroupIds.includes(group.id);
                      return (
                        <Card
                          key={group.id}
                          className={`cursor-pointer transition-all py-0 ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "hover:border-gray-300 hover:shadow-sm"
                          }`}
                          onClick={() =>
                            handleGroupToggle(group.id, !isSelected)
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) =>
                                  handleGroupToggle(
                                    group.id,
                                    checked as boolean
                                  )
                                }
                                disabled={isSubmitting}
                                className="mt-1"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 flex flex-row items-center gap-2 min-w-0">
                                    <h4 className="font-medium text-sm flex items-center gap-2">
                                      {group.name}
                                    </h4>
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className="flex-shrink-0"
                                  >
                                    {group.employeeCount}{" "}
                                    {group.employeeCount === 1
                                      ? "employee"
                                      : "employees"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};
