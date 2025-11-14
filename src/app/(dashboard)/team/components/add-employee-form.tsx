"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AddEmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export interface EmployeeFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  startDate: string
  notes?: string
}

export function AddEmployeeForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: AddEmployeeFormProps) {
  const [formData, setFormData] = React.useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    startDate: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (
    field: keyof EmployeeFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Girish"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Zizu"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="john.doe@company.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">
          Department <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.department}
          onValueChange={(value) => handleChange("department", value)}
          required
        >
          <SelectTrigger id="department">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="product">Product</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">
          Position <span className="text-destructive">*</span>
        </Label>
        <Input
          id="position"
          value={formData.position}
          onChange={(e) => handleChange("position", e.target.value)}
          placeholder="Software Engineer"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="startDate">
          Start Date <span className="text-destructive">*</span>
        </Label>
        <Input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Additional information about the employee"
          rows={4}
        />
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
          {isLoading ? "Adding..." : "Add Employee"}
        </Button>
      </div>
    </form>
  )
}
