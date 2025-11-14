"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface CreateGroupFormProps {
  onSubmit: (data: GroupFormData) => void
  onCancel: () => void
  isLoading?: boolean
  availableEmployees?: Employee[]
}

export interface GroupFormData {
  name: string
  description: string
  memberIds: string[]
}

interface Employee {
  id: string
  name: string
  position: string
}

export function CreateGroupForm({
  onSubmit,
  onCancel,
  isLoading = false,
  availableEmployees = [],
}: CreateGroupFormProps) {
  const [formData, setFormData] = React.useState<GroupFormData>({
    name: "",
    description: "",
    memberIds: [],
  })

  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredEmployees = availableEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof GroupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleMember = (employeeId: string) => {
    setFormData((prev) => ({
      ...prev,
      memberIds: prev.memberIds.includes(employeeId)
        ? prev.memberIds.filter((id) => id !== employeeId)
        : [...prev.memberIds, employeeId],
    }))
  }

  const removeMember = (employeeId: string) => {
    setFormData((prev) => ({
      ...prev,
      memberIds: prev.memberIds.filter((id) => id !== employeeId),
    }))
  }

  const selectedEmployees = availableEmployees.filter((emp) =>
    formData.memberIds.includes(emp.id)
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="groupName">
          Group Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="groupName"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g., Development Team"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Brief description of the group's purpose"
          rows={3}
        />
      </div>

      <div className="space-y-3">
        <Label>Members</Label>
        
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
                    checked={formData.memberIds.includes(employee.id)}
                    onCheckedChange={() => toggleMember(employee.id)}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {employee.position}
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
          {formData.memberIds.length} member(s) selected
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Group"}
        </Button>
      </div>
    </form>
  )
}
