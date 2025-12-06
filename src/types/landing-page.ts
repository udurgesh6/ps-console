import { z } from "zod";
import { Operation } from "./email-template";

export const landingPageSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().optional(),
  tenantId: z.uuid().optional(),
  systemLandingPageId: z.uuid().optional(),
  htmlPage: z.string(),
  createdAt: z.number().int().positive(),
  updatedAt: z.number().int().positive(),
  url: z.url().optional(),
});

export type LandingPage = z.infer<typeof landingPageSchema>;

export const landingPagesListSchema = z.array(landingPageSchema)

export type LandingPagesList = z.infer<typeof landingPagesListSchema>

export const landingPageQueryParamsSchema = z.object({
  limit: z.number().int().min(1).max(100).optional().default(20),
  offset: z.number().int().min(0).optional().default(0),
})

export type LandingPageQueryParams = z.infer<typeof landingPageQueryParamsSchema>

export interface LandingPagesResponse {
  landingPages: LandingPage[]
  total: number
  limit: number
  offset: number
}

export const landingPageFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less"),
  description: z.string().max(1000, "Description must be 1000 characters or less").optional().or(z.literal("")),
  htmlPage: z.string().min(1, "HTML page content is required"),
})

export type LandingPageFormData = z.infer<typeof landingPageFormSchema>

export interface CreateLandingPageRequest {
  name: string
  description?: string
  htmlPage: string
}

export interface UpdateLandingPageRequest extends CreateLandingPageRequest {
  id: string
}

export const landingPageGenerateRequestSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  details: z.string().min(1, 'Details are required'),
  colorScheme: z.string().optional(),
})

export type LandingPageGenerateRequest = z.infer<typeof landingPageGenerateRequestSchema>

export interface LandingPageGenerateResponse {
  operationId: string
  message: string
}

// export const operationInputSchema = z.object({
//   key: z.string(),
//   value: z.string(),
//   valueType: z.string(),
// })

// export type OperationInput = z.infer<typeof operationInputSchema>

// export const operationOutputSchema = z.object({
//   key: z.string(),
//   value: z.string(),
//   valueType: z.string(),
// })

// export type OperationOutput = z.infer<typeof operationOutputSchema>

// export const operationStatusSchema = z.enum([
//   'processing',
//   'completed',
//   'failed',
//   'pending',
// ])

// export type OperationStatus = z.infer<typeof operationStatusSchema>

// export const operationSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   operationType: z.string(),
//   status: operationStatusSchema,
//   input: z.array(operationInputSchema),
//   output: z.array(operationOutputSchema).nullable(),
//   errorMessage: z.string(),
//   createdAt: z.number().int().positive(),
//   updatedAt: z.number().int().positive(),
// })

// export type Operation = z.infer<typeof operationSchema>

export interface LandingPageOutput {
  htmlTemplate: string // Decoded from base64
}

// Helper type for decoded operation with email template
export interface LandingPageOperation extends Omit<Operation, 'output'> {
  output: LandingPageOutput | null
}