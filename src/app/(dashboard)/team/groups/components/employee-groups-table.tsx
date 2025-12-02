"use client";

import { useState, useCallback, useRef } from "react";
import {
  ColumnDef,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import {
  DataTable,
  DataTableAction,
  DataTableColumnHeader,
} from "@/components/shared/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEmployeeGroupOperation, useGetEmployeeGroups } from "@/hooks";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmployeeGroup, EmployeeGroupQueryParams, ObjectType } from "@/types";
import { unixToLocaleDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { DataTableRef } from "@/components/shared/data-table";
import { useSidebar } from "@/context/sidebar-context";
import { createBulkDeleteRequest } from "@/helpers/operations";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { Error } from "@/components/shared/error";

export const EmployeeGroupsTable = () => {
  const { toast } = useToast();
  const { setOpenSidebar, setGroupDetail } = useSidebar();

  const tableRef = useRef<DataTableRef<EmployeeGroup>>(null);

  const [params, setParams] = useState<EmployeeGroupQueryParams>({
    limit: 10,
    offset: 0,
  });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    groupIds: string[];
  }>({
    open: false,
    groupIds: [],
  });

  const { data, isLoading, error } = useGetEmployeeGroups(params);

  const employeeGroupOperation = useEmployeeGroupOperation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Operation completed successfully",
      });
      tableRef.current?.resetRowSelection();
    },
  });

  const handleConfirmDelete = () => {
    const request = createBulkDeleteRequest(
      ObjectType.EMPLOYEE_GROUP,
      deleteDialog.groupIds
    );
    employeeGroupOperation.mutate(request, {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete employees",
        });
      },
    });
  };

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

  const columns: ColumnDef<EmployeeGroup>[] = [
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
        <DataTableColumnHeader
          column={column}
          title="Group Name"
          sortable={true}
        />
      ),
      cell: ({ row }) => {
        const group = row.original;
        return (
          <div className="flex items-center gap-3">
            <span className="font-medium">{group.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "memberCount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Members"
          sortable={true}
        />
      ),
      cell: ({ row }) => {
        const group = row.original;
        return (
          <div className="flex items-center gap-2">
            {/* <div className="flex -space-x-2">
              {group.members.slice(0, 3).map((member, index) => (
                <Avatar key={index} className="h-7 w-7 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div> */}
            <span className="text-sm text-muted-foreground">
              {group.employeeCount}{" "}
              {group.employeeCount === 1 ? "member" : "members"}
            </span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "department",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title="Department"
    //       sortable={true}
    //       filterable={true}
    //       filterOptions={[
    //         { label: "Engineering", value: "Engineering" },
    //         { label: "Design", value: "Design" },
    //         { label: "Product", value: "Product" },
    //         { label: "Marketing", value: "Marketing" },
    //         { label: "Sales", value: "Sales" },
    //         { label: "HR", value: "HR" },
    //         { label: "Finance", value: "Finance" },
    //         { label: "Support", value: "Support" },
    //       ]}
    //     />
    //   ),
    //   cell: ({ row }) => {
    //     return (
    //       <Badge variant="outline" className="capitalize">
    //         {row.getValue("department")}
    //       </Badge>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return value.includes(row.getValue(id));
    //   },
    // },
    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title="Status"
    //       sortable={true}
    //       filterable={true}
    //       filterOptions={[
    //         { label: "Active", value: "active" },
    //         { label: "Inactive", value: "inactive" },
    //       ]}
    //     />
    //   ),
    //   cell: ({ row }) => {
    //     const status = row.getValue("status") as string;
    //     return (
    //       <Badge
    //         variant={status === "active" ? "default" : "secondary"}
    //         className="capitalize"
    //       >
    //         {status}
    //       </Badge>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return value.includes(row.getValue(id));
    //   },
    // },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Created"
          sortable={true}
        />
      ),
      cell: ({ row }) => {
        return (
          <span className="text-muted-foreground">
            {unixToLocaleDate(row.getValue("createdAt"))}
          </span>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Updated"
          sortable={true}
        />
      ),
      cell: ({ row }) => {
        return (
          <span className="text-muted-foreground">
            {unixToLocaleDate(row.getValue("updatedAt"))}
          </span>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const group = row.original;

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
                {/* <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </DropdownMenuItem> */}
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenSidebar("edit-group");
                    setGroupDetail(group);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit group
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteDialog({
                      open: true,
                      groupIds: [group.id],
                    });
                  }}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      size: 50,
    },
  ];

  const actions: DataTableAction<EmployeeGroup>[] = [
    {
      label: "Delete Groups",
      icon: Trash2,
      onClick: (rows) => {
        console.log(
          "Delete groups:",
          rows.map((r) => r.original.id)
        );
      },
      variant: "outline",
    },
  ];

  const handleRowClick = (group: EmployeeGroup) => {
    console.log("Group clicked:", group);
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
        columns={columns}
        data={data?.employeeGroups || []}
        total={data?.total || 0}
        searchKey="name"
        searchPlaceholder="Search groups..."
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
      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
        onConfirm={handleConfirmDelete}
        itemCount={deleteDialog.groupIds.length}
        itemType="group"
      />
    </div>
  );
};
