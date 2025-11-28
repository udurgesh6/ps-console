import { api } from "@/lib/axios";
import type {
  EmployeeGroup,
  EmployeeGroupDetailsResponse,
  EmployeeGroupQueryParams,
} from "@/types";

export const employeeGroupService = {
  getEmployeeGroups: async (
    params?: EmployeeGroupQueryParams
  ): Promise<EmployeeGroupDetailsResponse> => {
    const response = await api.get<EmployeeGroupDetailsResponse>("/employee-groups", params);
    return response;
  },

  getEmployeeGroupById: async (id: string): Promise<EmployeeGroup> => {
    const response = await api.get<EmployeeGroup>(`/employee-groups/${id}`);
    return response;
  },
};
