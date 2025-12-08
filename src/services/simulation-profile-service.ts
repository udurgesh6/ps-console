// services/simulation-profile.service.ts
import { api } from "@/lib/axios";
import type {
  CreateSimulationProfileRequest,
  UpdateSimulationProfileRequest,
  SimulationProfile,
  SimulationProfileDetailsResponse,
  SimulationProfileQueryParams,
} from "@/types";

export const simulationProfileService = {
  getSimulationProfiles: async (
    params?: SimulationProfileQueryParams
  ): Promise<SimulationProfileDetailsResponse> => {
    const response = await api.get<SimulationProfileDetailsResponse>(
      "/simulation-profiles",
      params
    );
    return response;
  },

  getSimulationProfileById: async (id: string): Promise<SimulationProfile> => {
    const response = await api.get<SimulationProfile>(`/simulation-profiles/${id}`);
    return response;
  },

  createSimulationProfile: async (
    data: CreateSimulationProfileRequest
  ): Promise<SimulationProfile> => {
    const response = await api.post<SimulationProfile>("/simulation-profiles", data);
    return response;
  },

  updateSimulationProfile: async (
    id: string,
    data: UpdateSimulationProfileRequest
  ): Promise<SimulationProfile> => {
    const response = await api.put<SimulationProfile>(
      `/simulation-profiles/${id}`,
      data
    );
    return response;
  },

  deleteSimulationProfile: async (id: string): Promise<void> => {
    await api.delete(`/simulation-profiles/${id}`);
  },
};
