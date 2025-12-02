import { api } from "@/lib/axios";
import type {
  CreateEmployeeRequest,
  Employee,
  EmployeeDetailsResponse,
  EmployeeImportResponse,
  EmployeeQueryParams,
  EmployeeSummaryResponse,
} from "@/types";

export const employeeService = {
  getEmployees: async (
    params?: EmployeeQueryParams
  ): Promise<EmployeeDetailsResponse> => {
    const response = await api.get<EmployeeDetailsResponse>(
      "/employees",
      params
    );
    return response;
  },

  getEmployeeById: async (id: string): Promise<Employee> => {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response;
  },

  createEmployee: async (data: CreateEmployeeRequest): Promise<Employee> => {
    const response = await api.post<Employee>("/employees", data);
    return response;
  },

  updateEmployee: async (
    id: string,
    data: CreateEmployeeRequest
  ): Promise<Employee> => {
    const response = await api.put<Employee>(`/employees/${id}`, data);
    return response;
  },

  getEmployeeSummary: async (): Promise<EmployeeSummaryResponse> => {
    const response = await api.get<EmployeeSummaryResponse>("/employees/summary");
    return response;
  },

  importEmployees: async (file: File): Promise<EmployeeImportResponse> => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await api.post<EmployeeImportResponse>(
      "/employees/operation/import",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

    return response
  },
};
