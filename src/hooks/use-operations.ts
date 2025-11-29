import { useMutation, useQueryClient } from '@tanstack/react-query'
import { operationService } from '@/services'
import type { OperationRequest, UseOperationOptions } from '@/types'

export const useOperation = (options?: UseOperationOptions) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: OperationRequest) => operationService.execute(request),
    onSuccess: () => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        })
      }
      options?.onSuccess?.()
    },
  })
}