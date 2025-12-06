import { api } from "@/lib/axios"
import type {
  CreateSubmissionFormRequest,
  SubmissionForm,
  SubmissionFormsResponse,
  SubmissionFormQueryParams,
} from "@/types"
import { decodeSubmissionForm } from "@/utils/encode-decode-base64"

export const submissionFormService = {
  getSubmissionForms: async (
    params?: SubmissionFormQueryParams
  ): Promise<SubmissionFormsResponse> => {
    const response = await api.get<SubmissionFormsResponse>(
      "/submission-forms",
      params
    )
    
    return {
      ...response,
      submissionForms: response.submissionForms.map(decodeSubmissionForm),
    }
  },

  getSubmissionFormById: async (id: string): Promise<SubmissionForm> => {
    const response = await api.get<SubmissionForm>(`/submission-forms/${id}`)
    return decodeSubmissionForm(response)
  },

  createSubmissionForm: async (
    data: CreateSubmissionFormRequest
  ): Promise<SubmissionForm> => {
    const response = await api.post<SubmissionForm>("/submission-forms", data)
    return decodeSubmissionForm(response)
  },

  updateSubmissionForm: async (
    id: string,
    data: CreateSubmissionFormRequest
  ): Promise<SubmissionForm> => {
    const response = await api.put<SubmissionForm>(
      `/submission-forms/${id}`,
      data
    )
    return decodeSubmissionForm(response)
  },

  deleteSubmissionForm: async (id: string): Promise<void> => {
    await api.delete(`/submission-forms/${id}`)
  },
}
