import { z } from 'zod'

export const employeeSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  department: z.string().min(1, 'Department is required'),
  positionTitle: z.string(),
  isActive: z.boolean(),
  managerEmployeeId: z.string().email('Invalid manager email'),
  employeeGroupId: z.string().uuid(),
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