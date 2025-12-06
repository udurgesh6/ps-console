import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { generalService, submissionFormService } from '@/services'
import type {
  CreateSubmissionFormRequest,
  SubmissionForm,
  SubmissionFormsResponse,
  SubmissionFormQueryParams,
  ApiError,
  FiltersParams,
  FiltersResponse,
} from '@/types'

export const useGetSubmissionForms = (params?: SubmissionFormQueryParams) => {
  return useQuery<SubmissionFormsResponse, ApiError>({
    queryKey: ['submission-forms', params],
    queryFn: () => submissionFormService.getSubmissionForms(params),
  })
}

export const useGetSubmissionFormById = (id: string) => {
  return useQuery<SubmissionForm, ApiError>({
    queryKey: ['submission-form', id],
    queryFn: () => submissionFormService.getSubmissionFormById(id),
    enabled: !!id,
  })
}

export const useCreateSubmissionForm = () => {
  const queryClient = useQueryClient()

  return useMutation<SubmissionForm, ApiError, CreateSubmissionFormRequest>({
    mutationFn: (data: CreateSubmissionFormRequest) =>
      submissionFormService.createSubmissionForm(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission-forms'] })
    },
  })
}

export const useUpdateSubmissionForm = () => {
  const queryClient = useQueryClient()

  return useMutation<
    SubmissionForm,
    ApiError,
    { id: string; data: CreateSubmissionFormRequest }
  >({
    mutationFn: ({ id, data }) =>
      submissionFormService.updateSubmissionForm(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['submission-forms'] })
      queryClient.invalidateQueries({ queryKey: ['submission-form', variables.id] })
    },
  })
}

export const useDeleteSubmissionForm = () => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) => submissionFormService.deleteSubmissionForm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission-forms'] })
    },
  })
}

export const useGetSubmissionFormFilters = (params?: FiltersParams) => {
  return useQuery<FiltersResponse, ApiError>({
    queryKey: ['submission-form-filters'],
    queryFn: () => generalService.getFilters(params),
  })
}
