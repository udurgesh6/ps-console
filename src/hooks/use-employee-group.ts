import { useQuery } from '@tanstack/react-query'
import { employeeGroupService } from '@/services'
import { EmployeeGroup, ApiError, EmployeeGroupQueryParams, EmployeeGroupDetailsResponse } from '@/types'

export const useGetEmployeeGroups = (params?: EmployeeGroupQueryParams) => {
  return useQuery<EmployeeGroupDetailsResponse, ApiError>({
    queryKey: ['employeeGroups', params],
    queryFn: () => employeeGroupService.getEmployeeGroups(params),
  })
}

export const useGetEmployeeGroupById = (id: string) => {
  return useQuery<EmployeeGroup, ApiError>({
    queryKey: ['employeeGroup', id],
    queryFn: () => employeeGroupService.getEmployeeGroupById(id),
    enabled: !!id,
  })
}
