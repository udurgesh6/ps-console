import { z } from 'zod'

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