import { api } from "@/lib/axios";
import type { OperationRequest, OperationResponse } from "@/types";

export const operationService = {
  execute: async (request: OperationRequest): Promise<OperationResponse> => {
    const response = await api.post<OperationResponse>("/operation", request);
    return response;
  },
};
