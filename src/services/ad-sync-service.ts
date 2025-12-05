import { api } from "@/lib/axios";
import type {
  CreateADSyncRequest,
  ADSyncConfig,
  ADSyncResponse,
  ADSyncStatusResponse,
} from "@/types";

export const adSyncService = {
  getADSyncConfig: async (): Promise<ADSyncConfig> => {
    const response = await api.get<ADSyncConfig>("/ad-sync/config");
    return response;
  },

  createADSyncConfig: async (data: CreateADSyncRequest): Promise<ADSyncConfig> => {
    const response = await api.post<ADSyncConfig>("/ad-sync/config", data);
    return response;
  },

  updateADSyncConfig: async (
    id: string,
    data: CreateADSyncRequest
  ): Promise<ADSyncConfig> => {
    const response = await api.put<ADSyncConfig>(`/ad-sync/config/${id}`, data);
    return response;
  },

  syncNow: async (): Promise<ADSyncResponse> => {
    const response = await api.post<ADSyncResponse>("/ad-sync/sync");
    return response;
  },

  getStatus: async (): Promise<ADSyncStatusResponse> => {
    const response = await api.get<ADSyncStatusResponse>("/ad-sync/status");
    return response;
  },
};
