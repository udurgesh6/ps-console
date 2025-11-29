import { api } from "@/lib/axios";
import type {
  CreateEmployeeGroupRequest,
  EmployeeGroup,
  EmployeeGroupDetailsResponse,
  EmployeeGroupQueryParams,
} from "@/types";

export const employeeGroupService = {
  getEmployeeGroups: async (
    params?: EmployeeGroupQueryParams
  ): Promise<EmployeeGroupDetailsResponse> => {
    const response = await api.get<EmployeeGroupDetailsResponse>(
      "/employee-groups",
      params
    );
    return response;
  },

  getEmployeeGroupById: async (id: string): Promise<EmployeeGroup> => {
    const response = await api.get<EmployeeGroup>(`/employee-groups/${id}`);
    return response;
  },

  createEmployeeGroup: async (
    data: CreateEmployeeGroupRequest
  ): Promise<EmployeeGroup> => {
    const response = await api.post<EmployeeGroup>("/employee-groups", data);
    return response;
  },

  updateEmployeeGroup: async (
    id: string,
    data: CreateEmployeeGroupRequest
  ): Promise<EmployeeGroup> => {
    const response = await api.put<EmployeeGroup>(
      `/employee-groups/${id}`,
      data
    );
    return response;
  },
};
