import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/services/course-service";
import { CoursesResponse, CourseQueryParams, Course, CourseFormData } from "@/types";
import { ApiError } from "@/types";

export const useGetCourses = (params?: CourseQueryParams) => {
  return useQuery<CoursesResponse, ApiError>({
    queryKey: ['courses', params],
    queryFn: () => courseService.getCourses(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetCourseById = (id: string) => {
  return useQuery<Course, ApiError>({
    queryKey: ['course', id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<Course, ApiError, CourseFormData>({
    mutationFn: (data: CourseFormData) => courseService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<Course, ApiError, { id: string; data: Partial<CourseFormData> }>({
    mutationFn: ({ id, data }) => courseService.updateCourse(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', variables.id] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) => courseService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};
