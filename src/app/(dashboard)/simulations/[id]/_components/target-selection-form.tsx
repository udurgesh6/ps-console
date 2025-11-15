import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Search, Users, Building2 } from "lucide-react";
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
import { SimulationProfileTargetSelectionFormData } from "@/types";
import { Group } from "@/types";
import { Button } from "@/components/ui/button";

interface SimulationProfileTargetSelectionStepProps {
  form: UseFormReturn<SimulationProfileTargetSelectionFormData>;
  isSubmitting?: boolean;
  availableGroups: Group[];
}

export const SimulationProfileTargetSelectionStep: FC<
  SimulationProfileTargetSelectionStepProps
> = ({ form, isSubmitting = false, availableGroups }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const selectedGroups = form.watch("employeeGroups") || [];

  const filteredGroups = availableGroups.filter((group) => {
    const query = searchQuery.toLowerCase();
    return (
      group.name.toLowerCase().includes(query) ||
      group.department?.toLowerCase().includes(query)
    );
  });

  const totalSelectedEmployees = availableGroups
    .filter((group) => selectedGroups.includes(group.id))
    .reduce((sum, group) => sum + group.memberCount, 0);

  const handleGroupToggle = (groupId: string, checked: boolean) => {
    const currentGroups = form.getValues("employeeGroups") || [];
    if (checked) {
      form.setValue("employeeGroups", [...currentGroups, groupId], {
        shouldValidate: true,
      });
    } else {
      form.setValue(
        "employeeGroups",
        currentGroups.filter((id) => id !== groupId),
        { shouldValidate: true }
      );
    }
  };

  const handleSelectAll = () => {
    const allIds = filteredGroups.map((group) => group.id);
    form.setValue("employeeGroups", allIds, { shouldValidate: true });
  };

  const handleDeselectAll = () => {
    form.setValue("employeeGroups", [], { shouldValidate: true });
  };

  const isAllSelected = selectedGroups.length === filteredGroups.length;

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* <div className="flex items-center justify-end">
          
        </div> */}

        {/* Search and Actions */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by group name, department, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              disabled={isSubmitting}
            />
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <Users className="w-4 h-4 mr-1" />
              {selectedGroups.length}{" "}
              {selectedGroups.length === 1 ? "Group" : "Groups"}
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
              disabled={isSubmitting || filteredGroups.length === 0}
              variant="outline"
              className="cursor-pointer w-28"
              size="sm"
            >
              {isAllSelected ? "Deselect All" : "Select All"}
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="employeeGroups"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="space-y-3 pr-2">
                  {filteredGroups.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">
                        {searchQuery
                          ? "No groups found matching your search"
                          : "No employee groups available"}
                      </p>
                    </div>
                  ) : (
                    filteredGroups.map((group) => {
                      const isSelected = selectedGroups.includes(group.id);
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
                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                      {group.department && (
                                        <div className="flex items-center gap-1">
                                          <Building2 className="w-3.5 h-3.5" />
                                          <span>{group.department}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className="flex-shrink-0"
                                  >
                                    {group.memberCount}{" "}
                                    {group.memberCount === 1
                                      ? "employee"
                                      : "employees"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Summary Footer */}
        {/* {selectedGroups.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Selected Groups Summary</span>
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  {selectedGroups.length}{" "}
                  {selectedGroups.length === 1 ? "group" : "groups"}
                </span>
                <span className="text-gray-400">•</span>
                <span className="font-semibold text-primary">
                  {totalSelectedEmployees} total employees
                </span>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </Form>
  );
};
