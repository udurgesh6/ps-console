"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableAction,
  DataTableColumnHeader,
} from "@/components/shared/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Trash2,
  Mail,
  UserCheck,
  UserX,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Employee, EmployeeQueryParams } from "@/types";
import { useCallback, useRef, useState } from "react";
import { useGetEmployees } from "@/hooks/use-employee";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { useSidebar } from "@/context/sidebar-context";
import { useEmployeeOperation } from "@/hooks";
import {
  createBulkDeleteRequest,
  createAssignGroupRequest,
} from "@/helpers/operations";
import { ObjectType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { DataTableRef } from "@/components/shared/data-table";
import { AssignGroupDialog } from "./assign-group-dialog";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { Error } from "@/components/shared/error";

export const EmployeesTable = () => {
  const { toast } = useToast();

  const tableRef = useRef<DataTableRef<Employee>>(null);

  const employeeOperation = useEmployeeOperation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Operation completed successfully",
      });
      // Clear row selection after successful operation
      tableRef.current?.resetRowSelection();
    },
  });

  const { setOpenSidebar, setEmployeeDetail } = useSidebar();

  const [assignGroupDialog, setAssignGroupDialog] = useState<{
    open: boolean;
    employeeIds: string[];
  }>({
    open: false,
    employeeIds: [],
  });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    employeeIds: string[];
  }>({
    open: false,
    employeeIds: [],
  });

  const handleAssignGroup = (groupId: string) => {
    const request = createAssignGroupRequest(
      assignGroupDialog.employeeIds,
      groupId
    );
    employeeOperation.mutate(request, {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to assign group",
        });
      },
    });
  };

  const handleConfirmDelete = () => {
    const request = createBulkDeleteRequest(
      ObjectType.EMPLOYEE,
      deleteDialog.employeeIds
    );
    employeeOperation.mutate(request, {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete employees",
        });
      },
    });
  };

  const [params, setParams] = useState<EmployeeQueryParams>({
    limit: 10,
    offset: 0,
  });

  const { data, isLoading, error } = useGetEmployees(params);

  const handlePaginationChange = useCallback((pagination: PaginationState) => {
    setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        limit: pagination.pageSize,
        offset: pagination.pageIndex * pagination.pageSize,
      }));
    }, 0);
  }, []);

  if (error) return <Error error={error} />;

  const columns: ColumnDef<Employee>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 20,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" sortable={true} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <span className="font-medium">{row.getValue("name")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        return <span className="font-medium">{row.getValue("email")}</span>;
      },
    },
    {
      accessorKey: "positionTitle",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Position" />
      ),
      cell: ({ row }) => {
        return (
          <span className="font-medium">{row.getValue("positionTitle")}</span>
        );
      },
    },
    {
      accessorKey: "department",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Department"
          sortable={true}
        />
      ),
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Status"
          sortable={false}
          filterable={true}
          filterOptions={[
            { label: "Active", value: "true", icon: UserCheck },
            { label: "Inactive", value: "false", icon: UserX },
          ]}
        />
      ),
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge
            variant={isActive ? "default" : "outline"}
            className="capitalize"
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        const isActive = row.getValue(id) as boolean;
        return value.includes(String(isActive));
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const employee = row.original;

        return (
          <div className="flex w-full justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenSidebar("edit-employee");
                    setEmployeeDetail(employee);
                  }}
                >
                  Edit employee
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteDialog({
                      open: true,
                      employeeIds: [employee.id],
                    });
                  }}
                  className="text-destructive"
                >
                  Delete employee
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      size: 50,
    },
  ];

  const actions: DataTableAction<Employee>[] = [
    {
      label: "Assign Group",
      icon: Mail,
      onClick: (rows) => {
        const employeeIds = rows.map((r) => r.original.id);
        setAssignGroupDialog({
          open: true,
          employeeIds,
        });
      },
      variant: "outline",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (rows) => {
        const employeeIds = rows.map((r) => r.original.id);
        setDeleteDialog({
          open: true,
          employeeIds,
        });
      },
      variant: "outline",
    },
  ];

  const handleRowClick = (employee: Employee) => {
    console.log("Row clicked:", employee);
  };

  const handleSearchChange = (searchValue: string) => {
    setParams((prev) => ({
      ...prev,
      query: searchValue || undefined,
      offset: 0,
    }));
  };

  const handleSortingChange = (sorting: SortingState) => {
    if (sorting.length > 0) {
      const sort = sorting[0];
      setParams((prev) => ({
        ...prev,
        sortKey: sort.id,
        sortDirection: sort.desc ? "desc" : "asc",
        offset: 0,
      }));
    } else {
      setParams((prev) => ({
        ...prev,
        sortKey: undefined,
        sortDirection: undefined,
        offset: 0,
      }));
    }
  };

  return (
    <div className="space-y-4">
      <DataTable
        ref={tableRef}
        columns={columns}
        data={data?.employees || []}
        total={data?.total || 0}
        searchKey="name"
        searchPlaceholder="Search employees..."
        actions={actions}
        onRowClick={handleRowClick}
        onSearchChange={handleSearchChange}
        onSortingChange={handleSortingChange}
        onPaginationChange={handlePaginationChange}
        manualPagination={true}
        manualSorting={true}
        pageCount={Math.ceil((data?.total || 0) / (params.limit || 10))}
        pageIndex={Math.floor((params.offset || 0) / (params.limit || 10))}
        pageSize={params.limit || 10}
        isLoading={isLoading}
        searchDebounceMs={500}
      />
      <AssignGroupDialog
        open={assignGroupDialog.open}
        onOpenChange={(open) =>
          setAssignGroupDialog((prev) => ({ ...prev, open }))
        }
        onConfirm={handleAssignGroup}
        employeeCount={assignGroupDialog.employeeIds.length}
      />
      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
        onConfirm={handleConfirmDelete}
        itemCount={deleteDialog.employeeIds.length}
        itemType="employee"
      />
    </div>
  );
};
