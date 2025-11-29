import { z } from 'zod'

export const employeeGroupSchema = z.object({
  id: z.uuid(),
  tenantId: z.uuid(),
  name: z.string().min(1, 'Name is required'),
  employeeCount: z.number(),
  employeeIds: z.array(z.string()),
  createdAt: z.number().int().positive(),
  updatedAt: z.number().int().positive(),
})
export const employeeGroupsListSchema = z.array(employeeGroupSchema)

export type EmployeeGroup = z.infer<typeof employeeGroupSchema>
export type EmployeeGroupsList = z.infer<typeof employeeGroupsListSchema>

export const employeeGroupQueryParamsSchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
  query: z.string().optional(),
  sortKey: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
})
export type EmployeeGroupQueryParams = z.infer<typeof employeeGroupQueryParamsSchema>

export interface EmployeeGroupDetailsResponse {
  employeeGroups: EmployeeGroup[]
  total: number
  limit: number
}

export const employeeGroupFormSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  employeeIds: z.array(z.string()),
});

export type EmployeeGroupFormData = z.infer<typeof employeeGroupFormSchema>;

export interface CreateEmployeeGroupRequest {
  name: string;
  employeeIds: string[];
}

export interface UpdateEmployeeGroupRequest extends CreateEmployeeGroupRequest {
  id: string;
}