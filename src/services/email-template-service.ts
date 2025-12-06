import { api } from "@/lib/axios"

import type {
  EmailTemplateGenerateRequest,
  EmailTemplateGenerateResponse,
  Operation,
  EmailTemplateOperation,
} from "@/types"

export const emailTemplateService = {
  generateEmailTemplate: async (
    data: EmailTemplateGenerateRequest
  ): Promise<EmailTemplateGenerateResponse> => {
    const response = await api.post<EmailTemplateGenerateResponse>(
      "/email-templates/generate",
      data
    )
    return response
  },

  getOperationStatus: async (operationId: string): Promise<Operation> => {
    const response = await api.get<Operation>(`/operations/${operationId}`)
    return response
  },

  getEmailTemplateOperation: async (
    operationId: string
  ): Promise<EmailTemplateOperation> => {
    const operation = await api.get<Operation>(`/operations/${operationId}`)
    
    if (operation.output && operation.output.length > 0) {
      const htmlTemplateOutput = operation.output.find(
        (item) => item.key === "htmlTemplate"
      )
      
      if (htmlTemplateOutput && htmlTemplateOutput.value) {
        try {
          const decodedHtml = atob(htmlTemplateOutput.value)
          return {
            ...operation,
            output: {
              htmlTemplate: decodedHtml,
            },
          }
        } catch (error) {
          console.error("Failed to decode HTML template:", error)
        }
      }
    }

    return {
      ...operation,
      output: null,
    }
  },
}
