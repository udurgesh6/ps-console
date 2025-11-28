import { api } from "@/lib/axios";
import type {
  Employee,
  EmployeeDetailsResponse,
  EmployeeQueryParams,
} from "@/types";

export const employeeService = {
  getEmployees: async (
    params?: EmployeeQueryParams
  ): Promise<EmployeeDetailsResponse> => {
    const response = await api.get<EmployeeDetailsResponse>("/employees", params);
    return response;
  },

  getEmployeeById: async (id: string): Promise<Employee> => {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response;
  },
};
