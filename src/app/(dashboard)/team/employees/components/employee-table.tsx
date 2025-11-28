"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable, DataTableAction, DataTableColumnHeader } from "@/components/shared/data-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MoreHorizontal, 
  Trash2, 
  Mail, 
  UserCheck,
  UserX,
  User
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Employee, EmployeeQueryParams } from "@/types"
import { useCallback, useState } from "react"
import { useGetEmployees } from "@/hooks/use-employee"
import type { SortingState, PaginationState } from "@tanstack/react-table"

export const EmployeesTable = () => {
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
      }))
    }, 0)
  }, [])

  if (error) return <div>Something went wrong!</div>;
  
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
      size: 20
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
          sortable={true}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <span className="font-medium">{row.getValue("name")}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Email"
        />
      ),
      cell: ({ row }) => {
        return <span className="font-medium">{row.getValue("email")}</span>
      },
    },
    {
      accessorKey: "positionTitle",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Position"
        />
      ),
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
          sortable={true}
          filterable={true}
          filterOptions={[
            { label: "Active", value: "true", icon: UserCheck },
            { label: "Inactive", value: "false", icon: UserX },
          ]}
        />
      ),
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean
        return (
          <Badge
            variant={isActive ? "default" : "outline"}
            className="capitalize"
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        const isActive = row.getValue(id) as boolean
        return value.includes(String(isActive))
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const employee = row.original

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
                    e.stopPropagation()
                    navigator.clipboard.writeText(employee.id)
                  }}
                >
                  Copy employee ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  Edit employee
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => e.stopPropagation()}
                  className="text-destructive"
                >
                  Delete employee
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
      size: 50,
    },
  ]

  // Bulk actions configuration
  const actions: DataTableAction<Employee>[] = [
    {
      label: "Assign Group",
      icon: Mail,
      onClick: (rows) => {
        console.log("Assign group to:", rows.map(r => r.original.email))
      },
      variant: "outline",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (rows) => {
        console.log("Delete employees:", rows.map(r => r.original.id))
      },
      variant: "outline",
    },
  ]

  const handleRowClick = (employee: Employee) => {
    console.log("Row clicked:", employee)
  }

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
    </div>
  )
}
