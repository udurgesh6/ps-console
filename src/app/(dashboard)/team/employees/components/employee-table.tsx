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

export type Employee = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  department: string
}

const employees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
    status: "active",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Designer",
    status: "active",
    department: "Design",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Manager",
    status: "inactive",
    department: "Management",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Developer",
    status: "active",
    department: "Engineering",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Designer",
    status: "active",
    department: "Design",
  },
]

export const EmployeesTable = () => {
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
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Role"
          filterable={true}
          filterOptions={[
            { label: "Developer", value: "Developer" },
            { label: "Designer", value: "Designer" },
            { label: "Manager", value: "Manager" },
          ]}
        />
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "department",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Department"
          sortable={true}
          filterable={true}
          filterOptions={[
            { label: "Engineering", value: "Engineering" },
            { label: "Design", value: "Design" },
            { label: "Management", value: "Management" },
          ]}
        />
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Status"
          sortable={true}
          filterable={true}
          filterOptions={[
            { label: "Active", value: "active", icon: UserCheck },
            { label: "Inactive", value: "inactive", icon: UserX },
          ]}
        />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={status === "active" ? "default" : "outline"}
            className="capitalize"
          >
            {status}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const employee = row.original

        return (
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
        )
      },
    },
  ]

  // Bulk actions configuration
  const actions: DataTableAction<Employee>[] = [
    {
      label: "Assign Group",
      icon: Mail,
      onClick: (rows) => {
        console.log("Send email to:", rows.map(r => r.original.email))
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

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={employees}
        searchKey="name"
        searchPlaceholder="Search employees..."
        actions={actions}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
