import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseService, generalService } from "@/services";
import type {
  CreateCourseRequest,
  Course,
  CoursesResponse,
  CourseQueryParams,
  QueryCoursesByCategoryRequest,
  QueryCoursesResponse,
  QueryCoursesByIdsRequest,
  CoursesByIdsResponse,
  ApiError,
  FiltersResponse,
  FiltersParams,
} from "@/types";

export const useGetCourses = (params?: CourseQueryParams) => {
  return useQuery<CoursesResponse, ApiError>({
    queryKey: ["courses", params],
    queryFn: () => courseService.getCourses(params),
  });
};

export const useGetCourseById = (id: string) => {
  return useQuery<Course, ApiError>({
    queryKey: ["course", id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<Course, ApiError, CreateCourseRequest>({
    mutationFn: (data: CreateCourseRequest) =>
      courseService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Course,
    ApiError,
    { id: string; data: CreateCourseRequest }
  >({
    mutationFn: ({ id, data }) => courseService.updateCourse(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", variables.id] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) => courseService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useQueryCoursesByCategory = () => {
  return useMutation<QueryCoursesResponse, ApiError, QueryCoursesByCategoryRequest>({
    mutationFn: (data: QueryCoursesByCategoryRequest) =>
      courseService.queryCoursesByCategory(data),
  });
};

export const useQueryCoursesByIds = () => {
  return useMutation<CoursesByIdsResponse, ApiError, QueryCoursesByIdsRequest>({
    mutationFn: (data: QueryCoursesByIdsRequest) =>
      courseService.queryCoursesByIds(data),
  });
};

export const useGetCourseFilters = (params?: FiltersParams) => {
  return useQuery<FiltersResponse, ApiError>({
    queryKey: ['course-filters'],
    queryFn: () => generalService.getFilters(params),
  })
}

