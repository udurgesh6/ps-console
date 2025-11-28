import { useQuery } from '@tanstack/react-query'
import { employeeService } from '@/services'
import { Employee, ApiError, EmployeeQueryParams, EmployeeDetailsResponse } from '@/types'

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
