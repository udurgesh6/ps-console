import { z } from "zod";

export const videoUrlSchema = z.object({
  language: z.string(),
  url: z.string().url(),
});

export type VideoUrl = z.infer<typeof videoUrlSchema>;

export const subtitleUrlSchema = z.object({
  language: z.string(),
  url: z.string().url(),
});

export type SubtitleUrl = z.infer<typeof subtitleUrlSchema>;

export const episodeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  duration: z.number().int().positive(),
  order: z.number().int().positive(),
  video: z.array(videoUrlSchema),
  subtitle: z.array(subtitleUrlSchema).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Episode = z.infer<typeof episodeSchema>;

export const episodeCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  duration: z.number().int().positive().min(1, "Duration must be at least 1 minute"),
  order: z.number().int().positive(),
  video: z.array(videoUrlSchema).min(1, "At least one video is required"),
  subtitle: z.array(subtitleUrlSchema).optional(),
});

export type EpisodeCreate = z.infer<typeof episodeCreateSchema>;

export const courseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  category: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  thumbnail: z.string().url().optional(),
  duration: z.number().int().optional(),
  episodes: z.array(episodeSchema).optional(),
});

export type Course = z.infer<typeof courseSchema>;

export const courseFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  episodes: z.array(episodeCreateSchema).optional(),
});

export type CourseFormData = z.infer<typeof courseFormSchema>;

export interface CreateCourseRequest {
  name: string;
  description: string;
  category: string;
  episodes?: EpisodeCreate[];
}

export interface UpdateCourseRequest extends CreateCourseRequest {
  id: string;
}

export const courseQueryParamsSchema = z.object({
  category_id: z.string().uuid().optional(),
  limit: z.number().int().min(1).max(100).optional().default(20),
  offset: z.number().int().min(0).optional().default(0),
  query: z.string().optional().default(""),
  sortKey: z.enum(["name", "createdAt", "updatedAt"]).optional().default("name"),
  sortDirection: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type CourseQueryParams = z.infer<typeof courseQueryParamsSchema>;

export interface QueryCoursesByCategoryRequest {
  category_ids?: string[];
}

export interface QueryCoursesByIdsRequest {
  course_ids: string[];
}

export const coursesResponseSchema = z.object({
  courses: z.array(courseSchema),
  total: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
});

export type CoursesResponse = z.infer<typeof coursesResponseSchema>;

export const queryCoursesResponseSchema = z.object({
  content: z.array(courseSchema),
  total: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
});

export type QueryCoursesResponse = z.infer<typeof queryCoursesResponseSchema>;

export const coursesByIdsResponseSchema = z.object({
  courses: z.array(courseSchema),
  total: z.number().int().nonnegative(),
});

export type CoursesByIdsResponse = z.infer<typeof coursesByIdsResponseSchema>;

