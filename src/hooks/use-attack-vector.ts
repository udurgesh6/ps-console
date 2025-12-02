import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { attackVectorService, generalService } from '@/services'
import { CreateAttackVectorRequest, UpdateAttackVectorRequest, AttackVector, ApiError, AttackVectorQueryParams, AttackVectorDetailsResponse, UseOperationOptions, FiltersResponse } from '@/types'
import { useOperation } from './use-operations'

export const useGetAttackVectors = (params?: AttackVectorQueryParams) => {
  return useQuery<AttackVectorDetailsResponse, ApiError>({
    queryKey: ['attack-vectors', params],
    queryFn: () => attackVectorService.getAttackVectors(params),
  })
}

export const useGetAttackVectorById = (id: string) => {
  return useQuery<AttackVector, ApiError>({
    queryKey: ['attack-vector', id],
    queryFn: () => attackVectorService.getAttackVectorById(id),
    enabled: !!id,
  })
}

export const useCreateAttackVector = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateAttackVectorRequest) => attackVectorService.createAttackVector(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attack-vectors'] })
    },
  })
}

export const useUpdateAttackVector = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAttackVectorRequest }) => 
      attackVectorService.updateAttackVector(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['attack-vectors'] })
      queryClient.invalidateQueries({ queryKey: ['attack-vector', variables.id] })
    },
  })
}

export const useAttackVectorOperation = (options?: UseOperationOptions) => {
  return useOperation({
    ...options,
    invalidateQueries: ['attack-vectors', ...(options?.invalidateQueries || [])],
  })
}

export const useGetAttackVectorFilters = () => {
  return useQuery<FiltersResponse, ApiError>({
    queryKey: ['attack-vector-filters'],
    queryFn: () => generalService.getFilters(),
  })
}
