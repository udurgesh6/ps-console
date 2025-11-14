"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable, DataTableAction, DataTableColumnHeader } from "@/components/shared/data-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  MoreHorizontal, 
  Trash2, 
  Users, 
  FolderKanban,
  Edit,
  Eye
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Group = {
  id: string
  name: string
  description: string
  memberCount: number
  department: string
  status: "active" | "inactive"
  createdAt: string
  members: string[]
}

const groups: Group[] = [
  {
    id: "1",
    name: "Engineering Team",
    description: "Core engineering and development team",
    memberCount: 15,
    department: "Engineering",
    status: "active",
    createdAt: "2024-01-15",
    members: ["John Doe", "Alice Williams", "Charlie Brown"],
  },
  {
    id: "2",
    name: "Design Team",
    description: "UI/UX and product design",
    memberCount: 8,
    department: "Design",
    status: "active",
    createdAt: "2024-01-20",
    members: ["Jane Smith", "Charlie Brown"],
  },
  {
    id: "3",
    name: "Product Management",
    description: "Product strategy and roadmap",
    memberCount: 5,
    department: "Product",
    status: "active",
    createdAt: "2024-02-01",
    members: ["Bob Johnson"],
  },
  {
    id: "4",
    name: "Marketing Team",
    description: "Marketing and growth initiatives",
    memberCount: 12,
    department: "Marketing",
    status: "active",
    createdAt: "2024-02-10",
    members: ["Sarah Connor", "Mike Ross"],
  },
  {
    id: "5",
    name: "Sales Team",
    description: "Business development and sales",
    memberCount: 10,
    department: "Sales",
    status: "active",
    createdAt: "2024-02-15",
    members: ["Harvey Specter", "Donna Paulsen"],
  },
  {
    id: "6",
    name: "HR & People Ops",
    description: "Human resources and operations",
    memberCount: 6,
    department: "HR",
    status: "active",
    createdAt: "2024-03-01",
    members: ["Jessica Pearson"],
  },
  {
    id: "7",
    name: "Finance Team",
    description: "Financial planning and accounting",
    memberCount: 7,
    department: "Finance",
    status: "active",
    createdAt: "2024-03-05",
    members: ["Louis Litt", "Rachel Zane"],
  },
  {
    id: "8",
    name: "Customer Support",
    description: "Customer success and support",
    memberCount: 14,
    department: "Support",
    status: "active",
    createdAt: "2024-03-10",
    members: ["Katrina Bennett"],
  },
  {
    id: "9",
    name: "DevOps Team",
    description: "Infrastructure and deployment",
    memberCount: 4,
    department: "Engineering",
    status: "active",
    createdAt: "2024-03-15",
    members: ["Marcus Rashford"],
  },
  {
    id: "10",
    name: "QA Team",
    description: "Quality assurance and testing",
    memberCount: 6,
    department: "Engineering",
    status: "active",
    createdAt: "2024-03-20",
    members: ["Bruno Fernandes"],
  },
  {
    id: "11",
    name: "Content Team",
    description: "Content creation and strategy",
    memberCount: 5,
    department: "Marketing",
    status: "inactive",
    createdAt: "2024-04-01",
    members: ["Casemiro"],
  },
  {
    id: "12",
    name: "Data Analytics",
    description: "Data analysis and insights",
    memberCount: 8,
    department: "Product",
    status: "inactive",
    createdAt: "2024-04-05",
    members: ["Antony"],
  },
]

export const GroupsTable = () => {
  const columns: ColumnDef<Group>[] = [
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
          title="Group Name"
          sortable={true}
        />
      ),
      cell: ({ row }) => {
        const group = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderKanban className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{group.name}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {group.description}
              </span>
            </div>
          </div>
        )
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
        const group = row.original
        return (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {group.members.slice(0, 3).map((member, index) => (
                <Avatar key={index} className="h-7 w-7 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {member.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
            </span>
          </div>
        )
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
            { label: "Product", value: "Product" },
            { label: "Marketing", value: "Marketing" },
            { label: "Sales", value: "Sales" },
            { label: "HR", value: "HR" },
            { label: "Finance", value: "Finance" },
            { label: "Support", value: "Support" },
          ]}
        />
      ),
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="capitalize">
            {row.getValue("department")}
          </Badge>
        )
      },
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
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={status === "active" ? "default" : "secondary"}
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
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Created"
          sortable={true}
        />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"))
        return (
          <span className="text-muted-foreground">
            {date.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const group = row.original

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
                  navigator.clipboard.writeText(group.id)
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
        )
      },
    },
  ]

  // Bulk actions configuration
  const actions: DataTableAction<Group>[] = [
    {
      label: "Manage Members",
      icon: Users,
      onClick: (rows) => {
        console.log("Manage members for:", rows.map(r => r.original.name))
      },
      variant: "outline",
    },
    {
      label: "Delete Groups",
      icon: Trash2,
      onClick: (rows) => {
        console.log("Delete groups:", rows.map(r => r.original.id))
      },
      variant: "outline",
    },
  ]

  const handleRowClick = (group: Group) => {
    console.log("Group clicked:", group)
  }

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={groups}
        searchKey="name"
        searchPlaceholder="Search groups..."
        actions={actions}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
