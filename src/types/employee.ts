import { z } from 'zod'

export const employeeSchema = z.object({
  id: z.uuid(),
  tenantId: z.uuid(),
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  department: z.string().min(1, 'Department is required'),
  positionTitle: z.string(),
  isActive: z.boolean(),
  managerEmployeeId: z.email('Invalid manager email'),
  employeeGroupId: z.uuid(),
  createdAt: z.number().int().positive(),
  updatedAt: z.number().int().positive(),
})

export type Employee = z.infer<typeof employeeSchema>

export const employeesListSchema = z.array(employeeSchema)

export type EmployeesList = z.infer<typeof employeesListSchema>

export const employeeQueryParamsSchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
  query: z.string().optional(),
  sortKey: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
})

export type EmployeeQueryParams = z.infer<typeof employeeQueryParamsSchema>

export interface EmployeeDetailsResponse {
  employees: Employee[]
  total: number
  limit: number
}

export const employeeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  department: z.string().min(1, "Department is required"),
  positionTitle: z.string().min(1, "Position title is required"),
  isActive: z.boolean(),
  managerEmployeeId: z.email("Invalid manager email").optional().or(z.literal("")),
  employeeGroupId: z.uuid("Invalid employee group ID").optional().or(z.literal("")),
})

export type EmployeeFormData = z.infer<typeof employeeFormSchema>

export interface CreateEmployeeRequest {
  name: string
  email: string
  department: string
  positionTitle: string
  isActive: boolean
  managerEmployeeId?: string
  employeeGroupId?: string
}

export interface UpdateEmployeeRequest extends CreateEmployeeRequest {
  id: string
}

export interface RiskLevels {
  low: number
  medium: number
  high: number
}

export interface EmployeeSummaryResponse {
  total: number
  active: number
  inactive: number
  riskLevels: RiskLevels
}

export interface EmployeeImportResponse {
  message: string
}
