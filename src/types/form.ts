import z from "zod";

// export const formSchema = z.object({
//     id: z.string().nonempty("ID is required"),
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     description: z.string().min(10, "Description must be at least 10 characters"),
//     category: z.string().nonempty("Category is required"),
//     htmlTemplate: z.string().nonempty("HTML content is required"),
// });

// export type Form = z.infer<typeof formSchema>;

export const submissionFormSchema = z.object({
  id: z.uuid(),
  tenantId: z.uuid(),
  name: z.string().max(255, 'Name must be 255 characters or less'),
  description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
  htmlPage: z.string().min(1, 'HTML page content is required'),
  createdAt: z.number().int().positive(),
  updatedAt: z.number().int().positive(),
})

export type SubmissionForm = z.infer<typeof submissionFormSchema>

export const submissionFormsListSchema = z.array(submissionFormSchema)

export type SubmissionFormsList = z.infer<typeof submissionFormsListSchema>

export const submissionFormQueryParamsSchema = z.object({
  limit: z.number().int().min(1).max(100).optional().default(20),
  offset: z.number().int().min(0).optional().default(0),
})

export type SubmissionFormQueryParams = z.infer<typeof submissionFormQueryParamsSchema>

export interface SubmissionFormsResponse {
  submissionForms: SubmissionForm[]
  total: number
  limit: number
  offset: number
}

export const submissionFormFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less"),
  description: z.string().max(1000, "Description must be 1000 characters or less").optional().or(z.literal("")),
  htmlPage: z.string().min(1, "HTML page content is required"),
})

export type SubmissionFormFormData = z.infer<typeof submissionFormFormSchema>

export interface CreateSubmissionFormRequest {
  name: string
  description?: string
  htmlPage: string
}

export interface UpdateSubmissionFormRequest extends CreateSubmissionFormRequest {
  id: string
}
