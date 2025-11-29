"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { EmployeeGroup, employeeGroupFormSchema, EmployeeGroupFormData } from "@/types";
import { useToast } from "@/hooks";
import { useCreateEmployeeGroup, useUpdateEmployeeGroup, useGetEmployees } from "@/hooks";

interface EmployeeGroupFormProps {
  onCancel: () => void;
  isLoading?: boolean;
  groupDetail?: Partial<EmployeeGroup>;
}

export function EmployeeGroupForm({
  onCancel,
  isLoading = false,
  groupDetail,
}: EmployeeGroupFormProps) {
  const { toast } = useToast();
  const { data: employeesData } = useGetEmployees({limit: 100});
  const createEmployeeGroup = useCreateEmployeeGroup();
  const updateEmployeeGroup = useUpdateEmployeeGroup();

  const isEditMode = !!groupDetail?.id;

  const [searchTerm, setSearchTerm] = React.useState("");

  const form = useForm<EmployeeGroupFormData>({
    resolver: zodResolver(employeeGroupFormSchema),
    defaultValues: {
      name: groupDetail?.name || "",
      employeeIds: groupDetail?.employeeIds || [],
    },
  });

  const availableEmployees = employeesData?.employees || [];

  const filteredEmployees = availableEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (data: EmployeeGroupFormData) => {
    try {
      if (isEditMode && groupDetail?.id) {
        await updateEmployeeGroup.mutateAsync({
          id: groupDetail.id,
          data,
        });
        toast({
          title: "Employee group updated successfully",
          type: "success",
        });
      } else {
        await createEmployeeGroup.mutateAsync(data);
        toast({
          title: "Employee group created successfully",
          type: "success",
        });
      }
      onCancel();
    } catch (error) {
      console.log(error);
      toast({
        title: `Failed to ${isEditMode ? "update" : "create"} employee group`,
        type: "error",
      });
    }
  };

  const toggleMember = (employeeId: string) => {
    const currentIds = form.getValues("employeeIds");
    const newIds = currentIds.includes(employeeId)
      ? currentIds.filter((id) => id !== employeeId)
      : [...currentIds, employeeId];
    form.setValue("employeeIds", newIds);
  };

  const removeMember = (employeeId: string) => {
    const currentIds = form.getValues("employeeIds");
    form.setValue(
      "employeeIds",
      currentIds.filter((id) => id !== employeeId)
    );
  };

  const selectedEmployeeIds = form.watch("employeeIds");
  const selectedEmployees = availableEmployees.filter((emp) =>
    selectedEmployeeIds.includes(emp.id)
  );

  const isMutating = createEmployeeGroup.isPending || updateEmployeeGroup.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Group Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., Development Team" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeIds"
          render={() => (
            <FormItem>
              <FormLabel>Members</FormLabel>
              
              {/* Selected Members */}
              {selectedEmployees.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
                  {selectedEmployees.map((emp) => (
                    <Badge key={emp.id} variant="secondary" className="gap-1">
                      {emp.name}
                      <button
                        type="button"
                        onClick={() => removeMember(emp.id)}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Search */}
              <Input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Employee List */}
              <div className="border rounded-md max-h-64 overflow-y-auto">
                {filteredEmployees.length > 0 ? (
                  <div className="divide-y">
                    {filteredEmployees.map((employee) => (
                      <label
                        key={employee.id}
                        className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedEmployeeIds.includes(employee.id)}
                          onCheckedChange={() => toggleMember(employee.id)}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {employee.positionTitle}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    {searchTerm
                      ? "No employees found matching your search"
                      : "No employees available"}
                  </p>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                {selectedEmployeeIds.length} member(s) selected
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading || isMutating}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || isMutating}>
            {isMutating
              ? "Saving..."
              : isEditMode
                ? "Update Group"
                : "Create Group"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
