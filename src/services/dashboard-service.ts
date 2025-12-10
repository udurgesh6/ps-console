import { api } from "@/lib/axios";
import type { EmployeeExportResponse } from "@/types";

export const dashboardService = {
  exportEmployees: async (): Promise<EmployeeExportResponse> => {
    const response = await api.post<EmployeeExportResponse>(
      "/employees/operation/export",
      {} // Empty object as payload
    );
    return response;
  },
};
