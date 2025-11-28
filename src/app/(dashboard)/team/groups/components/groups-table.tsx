"use client";

import { useState, useCallback } from "react";
import { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";
import {
  DataTable,
  DataTableAction,
  DataTableColumnHeader,
} from "@/components/shared/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useGetEmployeeGroups } from "@/hooks";
import {
  MoreHorizontal,
  Trash2,
  Users,
  Edit,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmployeeGroup, EmployeeGroupQueryParams } from "@/types";
import { unixToLocaleDate } from "@/lib/utils";

export const GroupsTable = () => {
  const [params, setParams] = useState<EmployeeGroupQueryParams>({
    limit: 10,
    offset: 0,
  });

  const { data, isLoading, error } = useGetEmployeeGroups(params);

  const handlePaginationChange = useCallback((pagination: PaginationState) => {
    setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        limit: pagination.pageSize,
        offset: pagination.pageIndex * pagination.pageSize,
      }));
    }, 0);
  }, []);

  if (error) return <div>Something went wrong!</div>;

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
      size: 20
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
            {/* <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderKanban className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col"> */}
              <span className="font-medium">{group.name}</span>
              {/* <span className="text-xs text-muted-foreground line-clamp-1">
                {group.description}
              </span> */}
            </div>
          // </div>
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(group.id);
                }}
              >
                Copy group ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Edit className="mr-2 h-4 w-4" />
                Edit group
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Users className="mr-2 h-4 w-4" />
                Manage members
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => e.stopPropagation()}
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

  // Bulk actions configuration
  const actions: DataTableAction<EmployeeGroup>[] = [
    {
      label: "Manage Members",
      icon: Users,
      onClick: (rows) => {
        console.log(
          "Manage members for:",
          rows.map((r) => r.original.name)
        );
      },
      variant: "outline",
    },
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
      }))
    }
  
    const handleSortingChange = (sorting: SortingState) => {
      if (sorting.length > 0) {
        const sort = sorting[0]
        setParams((prev) => ({
          ...prev,
          sortKey: sort.id,
          sortDirection: sort.desc ? 'desc' : 'asc',
          offset: 0,
        }))
      } else {
        setParams((prev) => ({
          ...prev,
          sortKey: undefined,
          sortDirection: undefined,
          offset: 0,
        }))
      }
    }

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
    </div>
  );
};
