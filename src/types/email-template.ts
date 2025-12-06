import { z } from 'zod'
import { operationInputSchema } from './operations'

export const emailTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(128),
  description: z.string().optional(),
  tenantId: z.string(),
  groupId: z.string().optional(),
  htmlBody: z.string(),
  landingPageId: z.string().optional(),
  landingPageURL: z.string().url().optional(),
  systemTemplateId: z.string().optional(),
  createdAt: z.number().int().positive(),
  updatedAt: z.number().int().positive(),
  senderDisplayName: z.string().optional(),
  senderEmail: z.string().email().optional(),
  subject: z.string().optional(),
  severity: z.string().optional(),
  topical: z.string().optional(),
  simulationProfileIds: z.array(z.string()).optional(),
  courseId: z.string().optional(),
})

export type EmailTemplate = z.infer<typeof emailTemplateSchema>

export const emailTemplatesListSchema = z.array(emailTemplateSchema)

export type EmailTemplatesList = z.infer<typeof emailTemplatesListSchema>

export const emailTemplateFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(128),
  description: z.string().optional(),
  groupId: z.string().optional(),
  htmlBody: z.string().min(1, "HTML body is required"),
  landingPageId: z.string().optional(),
  landingPageURL: z.string().url("Invalid URL").optional(),
  senderDisplayName: z.string().optional(),
  senderEmail: z.string().email("Invalid email address").optional(),
  subject: z.string().optional(),
  severity: z.string().optional(),
  topical: z.string().optional(),
  simulationProfileIds: z.array(z.string()).optional(),
  courseId: z.string().optional(),
})

export type EmailTemplateFormData = z.infer<typeof emailTemplateFormSchema>


export const emailTemplateGenerateRequestSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  details: z.string().min(1, 'Details are required'),
  colorScheme: z.string().optional(),
})

export type EmailTemplateGenerateRequest = z.infer<typeof emailTemplateGenerateRequestSchema>

export interface EmailTemplateGenerateResponse {
  operationId: string
  message: string
}

// export const operationInputSchema = z.object({
//   key: z.string(),
//   value: z.string(),
//   valueType: z.string(),
// })

// export type OperationInput = z.infer<typeof operationInputSchema>

export const operationOutputSchema = z.object({
  key: z.string(),
  value: z.string(),
  valueType: z.string(),
})

export type OperationOutput = z.infer<typeof operationOutputSchema>

export const operationStatusSchema = z.enum([
  'processing',
  'completed',
  'failed',
  'pending',
])

export type OperationStatus = z.infer<typeof operationStatusSchema>

export const operationSchema = z.object({
  id: z.string(),
  name: z.string(),
  operationType: z.string(),
  status: operationStatusSchema,
  input: z.array(operationInputSchema),
  output: z.array(operationOutputSchema).nullable(),
  errorMessage: z.string(),
  createdAt: z.number().int().positive(),
  updatedAt: z.number().int().positive(),
})

export type Operation = z.infer<typeof operationSchema>

export interface EmailTemplateOutput {
  htmlTemplate: string // Decoded from base64
}

// Helper type for decoded operation with email template
export interface EmailTemplateOperation extends Omit<Operation, 'output'> {
  output: EmailTemplateOutput | null
}