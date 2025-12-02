import { z } from "zod";

export const episodeSchema = z.object({
  id: z.string().uuid(),
});

export const courseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  category: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  thumbnail: z.string().url().optional(),
  duration: z.number().int().optional(),
  episodes: z.array(episodeSchema).optional(),
});

export type Course = z.infer<typeof courseSchema>;

export const courseFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z.string().url("Invalid URL").optional(),
});

export type CourseFormData = z.infer<typeof courseFormSchema>;

// Query params schema
export const courseQueryParamsSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  language: z.string().optional(),
  topic: z.string().optional(),
  duration: z.string().optional(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});

export type CourseQueryParams = z.infer<typeof courseQueryParamsSchema>;

// Response schema
export const coursesResponseSchema = z.object({
  courses: z.array(courseSchema),
  total: z.number().int().nonnegative(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});

export type CoursesResponse = z.infer<typeof coursesResponseSchema>;
