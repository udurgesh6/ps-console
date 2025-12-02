import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { employeeService } from '@/services'
import { CreateEmployeeRequest, Employee, ApiError, EmployeeQueryParams, EmployeeDetailsResponse, UseOperationOptions, EmployeeSummaryResponse, EmployeeImportResponse } from '@/types'
import { useOperation } from './use-operations'

export const useGetEmployees = (params?: EmployeeQueryParams) => {
  return useQuery<EmployeeDetailsResponse, ApiError>({
    queryKey: ['employees', params],
    queryFn: () => employeeService.getEmployees(params),
  })
}

export const useGetEmployeeById = (id: string) => {
  return useQuery<Employee, ApiError>({
    queryKey: ['employee', id],
    queryFn: () => employeeService.getEmployeeById(id),
    enabled: !!id,
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateEmployeeRequest) => employeeService.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateEmployeeRequest }) => 
      employeeService.updateEmployee(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      queryClient.invalidateQueries({ queryKey: ['employee', variables.id] })
    },
  })
}


export const useEmployeeOperation = (options?: UseOperationOptions) => {
  return useOperation({
    ...options,
    invalidateQueries: ['employees', ...(options?.invalidateQueries || [])],
  })
}

export const useGetEmployeeSummary = () => {
  return useQuery<EmployeeSummaryResponse, ApiError>({
    queryKey: ['employee-summary'],
    queryFn: () => employeeService.getEmployeeSummary(),
  })
}

export const useImportEmployees = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File): Promise<EmployeeImportResponse> =>
      employeeService.importEmployees(file),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}
