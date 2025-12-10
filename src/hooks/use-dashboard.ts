import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "@/services";
import {
  EmployeeExportResponse,
  ApiError,
} from "@/types";

export const useExportEmployees = () => {
  return useMutation<EmployeeExportResponse, ApiError>({
    mutationFn: () => dashboardService.exportEmployees(),
  });
};
