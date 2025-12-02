import { z } from "zod";

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

export const landingPageFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  htmlPage: z.string().min(1, "HTML content is required"),
  url: z.url("Invalid URL").optional(),
});

export type LandingPageFormData = z.infer<typeof landingPageFormSchema>;
