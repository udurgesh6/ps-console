import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generalService, landingPageService } from "@/services";
import type {
  LandingPageGenerateRequest,
  LandingPageGenerateResponse,
  Operation,
  LandingPageOperation,
  ApiError,
  LandingPage,
  LandingPageQueryParams,
  LandingPagesResponse,
  CreateLandingPageRequest,
  FiltersParams,
  FiltersResponse,
} from "@/types";

export const useGenerateLandingPage = () => {
  const queryClient = useQueryClient();
  
  return useMutation<
    LandingPageGenerateResponse,
    ApiError,
    LandingPageGenerateRequest
  >({
    mutationFn: (data: LandingPageGenerateRequest) =>
      landingPageService.generateLandingPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landing-pages"] });
    },
  });
};

export const useGetLandingPageOperationStatus = (
  operationId: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
  }
) => {
  return useQuery<Operation, ApiError>({
    queryKey: ["operation", operationId],
    queryFn: () => landingPageService.getOperationStatus(operationId),
    enabled: options?.enabled ?? !!operationId,
    refetchInterval: options?.refetchInterval,
  });
};

export const useGetLandingPageOperation = (
  operationId: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
  }
) => {
  return useQuery<LandingPageOperation, ApiError>({
    queryKey: ["landing-page-operation", operationId],
    queryFn: () => landingPageService.getLandingPageOperation(operationId),
    enabled: options?.enabled ?? !!operationId,
    refetchInterval: options?.refetchInterval,
  });
};

export const useLandingPageGeneration = (
  operationId: string | null,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<LandingPageOperation, ApiError>({
    queryKey: ["landing-page-generation", operationId],
    queryFn: () => landingPageService.getLandingPageOperation(operationId!),
    enabled: options?.enabled ?? !!operationId,
    refetchInterval: (query) => {
      // Stop polling if operation is completed or failed
      const data = query.state.data;
      if (data?.status === "completed" || data?.status === "failed") {
        return false;
      }
      // Poll every 3 seconds while processing
      return 3000;
    },
  });
};

export const useGetLandingPages = (params?: LandingPageQueryParams) => {
  return useQuery<LandingPagesResponse, ApiError>({ 
    queryKey: ['landing-pages', params],
    queryFn: () => landingPageService.getLandingPages(params),
  })
}

export const useGetLandingPageById = (id: string) => {
  return useQuery<LandingPage, ApiError>({
    queryKey: ['landing-page', id],
    queryFn: () => landingPageService.getLandingPageById(id),
    enabled: !!id,
  })
}

export const useCreateLandingPage = () => {
  const queryClient = useQueryClient()

  return useMutation<LandingPage, ApiError, CreateLandingPageRequest>({
    mutationFn: (data: CreateLandingPageRequest) =>
      landingPageService.createLandingPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landing-pages'] })
    },
  })
}

export const useUpdateLandingPage = () => {
  const queryClient = useQueryClient()

  return useMutation<
    LandingPage,
    ApiError,
    { id: string; data: CreateLandingPageRequest }
  >({
    mutationFn: ({ id, data }) =>
      landingPageService.updateLandingPage(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['landing-pages'] })
      queryClient.invalidateQueries({ queryKey: ['landing-page', variables.id] })
    },
  })
}

export const useDeleteLandingPage = () => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) => landingPageService.deleteLandingPage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landing-pages'] })
    },
  })
}

export const useGetLandingPageFilters = (params?: FiltersParams) => {
  return useQuery<FiltersResponse, ApiError>({
    queryKey: ['landing-page-filters'],
    queryFn: () => generalService.getFilters(params),
  })
}
