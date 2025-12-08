import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generalService, simulationProfileService } from "@/services";
import {
  CreateSimulationProfileRequest,
  UpdateSimulationProfileRequest,
  SimulationProfile,
  ApiError,
  SimulationProfileQueryParams,
  SimulationProfileDetailsResponse,
  UseOperationOptions,
  FiltersParams,
  FiltersResponse,
} from "@/types";
import { useOperation } from "./use-operations";

export const useGetSimulationProfiles = (params?: SimulationProfileQueryParams) => {
  return useQuery<SimulationProfileDetailsResponse, ApiError>({
    queryKey: ["simulation-profiles", params],
    queryFn: () => simulationProfileService.getSimulationProfiles(params),
  });
};

export const useGetSimulationProfileById = (id: string) => {
  return useQuery<SimulationProfile, ApiError>({
    queryKey: ["simulation-profile", id],
    queryFn: () => simulationProfileService.getSimulationProfileById(id),
    enabled: !!id && id !== "new",
  });
};

export const useCreateSimulationProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSimulationProfileRequest) =>
      simulationProfileService.createSimulationProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["simulation-profiles"] });
    },
  });
};

export const useUpdateSimulationProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateSimulationProfileRequest;
    }) => simulationProfileService.updateSimulationProfile(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["simulation-profiles"] });
      queryClient.invalidateQueries({
        queryKey: ["simulation-profile", variables.id],
      });
    },
  });
};

export const useDeleteSimulationProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => simulationProfileService.deleteSimulationProfile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["simulation-profiles"] });
    },
  });
};

export const useSimulationProfileOperation = (options?: UseOperationOptions) => {
  return useOperation({
    ...options,
    invalidateQueries: [
      "simulation-profiles",
      ...(options?.invalidateQueries || []),
    ],
  });
};

export const useGetSimulationProfileFilters = (params?: FiltersParams) => {
  return useQuery<FiltersResponse, ApiError>({
    queryKey: ['simulation-profile-filters'],
    queryFn: () => generalService.getFilters(params),
  })
}

