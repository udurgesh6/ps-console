import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { employeeGroupService } from '@/services'
import { EmployeeGroup, ApiError, EmployeeGroupQueryParams, EmployeeGroupDetailsResponse, UseOperationOptions, CreateEmployeeGroupRequest } from '@/types'
import { useOperation } from '@/hooks'

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

export const useEmployeeGroupOperation = (options?: UseOperationOptions) => {
  return useOperation({
    ...options,
    invalidateQueries: ['employeeGroups', ...(options?.invalidateQueries || [])],
  })
}

export const useCreateEmployeeGroup = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateEmployeeGroupRequest) => employeeGroupService.createEmployeeGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeGroups'] })
    },
  })
}

export const useUpdateEmployeeGroup = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateEmployeeGroupRequest }) => 
      employeeGroupService.updateEmployeeGroup(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['employeeGroups'] })
      queryClient.invalidateQueries({ queryKey: ['employeeGroup', variables.id] })
    },
  })
}