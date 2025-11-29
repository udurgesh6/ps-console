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
import { Switch } from "@/components/ui/switch";
import { Employee, EmployeeFormData, employeeFormSchema } from "@/types";
import { useToast } from "@/hooks";
import { useCreateEmployee, useUpdateEmployee } from "@/hooks";

interface EmployeeFormProps {
  onCancel: () => void;
  isLoading?: boolean;
  employeeDetail?: Partial<Employee>;
}

export function EmployeeForm({
  onCancel,
  isLoading = false,
  employeeDetail,
}: EmployeeFormProps) {
  const { toast } = useToast();
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();

  const isEditMode = !!employeeDetail?.id;

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: employeeDetail?.name || "",
      email: employeeDetail?.email || "",
      department: employeeDetail?.department || "",
      positionTitle: employeeDetail?.positionTitle || "",
      isActive: employeeDetail?.isActive ?? true,
      employeeGroupId: employeeDetail?.employeeGroupId || "",
    },
  });

  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      if (isEditMode && employeeDetail?.id) {
        await updateEmployee.mutateAsync({
          id: employeeDetail.id,
          data,
        });
        toast({
          title: "Employee updated successfully",
          type: "success",
        });
      } else {
        await createEmployee.mutateAsync(data);
        toast({
          title: "Employee created successfully",
          type: "success",
        });
      }
      onCancel();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create employee",
        type: "error",
      });
    }
  };

  const isMutating = createEmployee.isPending || updateEmployee.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@company.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Department <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Department" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="positionTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Position Title <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Status</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Set whether this employee is currently active
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
                ? "Update Employee"
                : "Save Employee"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
