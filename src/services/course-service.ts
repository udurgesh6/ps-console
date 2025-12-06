import { api } from "@/lib/axios";
import type {
  CreateCourseRequest,
  Course,
  CoursesResponse,
  CourseQueryParams,
  QueryCoursesByCategoryRequest,
  QueryCoursesResponse,
  QueryCoursesByIdsRequest,
  CoursesByIdsResponse,
} from "@/types";

export const courseService = {
  getCourses: async (params?: CourseQueryParams): Promise<CoursesResponse> => {
    const response = await api.get<CoursesResponse>("/courses", params);
    return response;
  },

  getCourseById: async (id: string): Promise<Course> => {
    const response = await api.get<Course>(`/courses/${id}`);
    return response;
  },

  createCourse: async (data: CreateCourseRequest): Promise<Course> => {
    const response = await api.post<Course>("/courses", data);
    return response;
  },

  updateCourse: async (
    id: string,
    data: CreateCourseRequest
  ): Promise<Course> => {
    const response = await api.put<Course>(`/courses/${id}`, data);
    return response;
  },

  deleteCourse: async (id: string): Promise<void> => {
    await api.delete(`/courses/${id}`);
  },

  queryCoursesByCategory: async (
    data: QueryCoursesByCategoryRequest
  ): Promise<QueryCoursesResponse> => {
    const response = await api.post<QueryCoursesResponse>(
      "/query/courses",
      data
    );
    return response;
  },

  queryCoursesByIds: async (
    data: QueryCoursesByIdsRequest
  ): Promise<CoursesByIdsResponse> => {
    const response = await api.post<CoursesByIdsResponse>(
      "/courses/query",
      data
    );
    return response;
  },
};
