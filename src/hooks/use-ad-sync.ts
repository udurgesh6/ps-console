import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adSyncService } from '@/services'
import { 
  CreateADSyncRequest, 
  ADSyncConfig, 
  ADSyncStatusResponse,
  ApiError 
} from '@/types'

export const useGetADSyncConfig = () => {
  return useQuery<ADSyncConfig, ApiError>({
    queryKey: ['ad-sync-config'],
    queryFn: () => adSyncService.getADSyncConfig(),
    retry: false,
  })
}

export const useGetADSyncStatus = () => {
  return useQuery<ADSyncStatusResponse, ApiError>({
    queryKey: ['ad-sync-status'],
    queryFn: () => adSyncService.getStatus(),
  })
}

export const useCreateADSyncConfig = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateADSyncRequest) => adSyncService.createADSyncConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad-sync-config'] })
      queryClient.invalidateQueries({ queryKey: ['ad-sync-status'] })
    },
  })
}

export const useUpdateADSyncConfig = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateADSyncRequest }) => 
      adSyncService.updateADSyncConfig(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad-sync-config'] })
      queryClient.invalidateQueries({ queryKey: ['ad-sync-status'] })
    },
  })
}

export const useSyncADNow = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => adSyncService.syncNow(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      queryClient.invalidateQueries({ queryKey: ['employee-groups'] })
      queryClient.invalidateQueries({ queryKey: ['ad-sync-config'] })
      queryClient.invalidateQueries({ queryKey: ['ad-sync-status'] })
    },
  })
}
