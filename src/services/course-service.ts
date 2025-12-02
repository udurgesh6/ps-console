// import { api } from "@/lib/axios";
import { dummyCourses } from "@/constants/temporary/courses";
import { CoursesResponse, CourseQueryParams, Course, CourseFormData } from "@/types";


export const courseService = {
  getCourses: async (
    params?: CourseQueryParams
  ): Promise<CoursesResponse> => {
    // TODO: Replace with actual API call when endpoint is ready
    // const response = await api.get<CoursesResponse>(
    //   "/courses",
    //   params
    // );
    // return response;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Return dummy data with optional filtering
    let filteredCourses = [...dummyCourses];

    // Apply search filter
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.name.toLowerCase().includes(searchLower) ||
        course.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (params?.category) {
      filteredCourses = filteredCourses.filter(
        course => course.category === params.category
      );
    }

    // Apply duration filter
    if (params?.duration) {
      filteredCourses = filteredCourses.filter(course => {
        if (!course.duration) return false;
        
        switch (params.duration) {
          case "short":
            return course.duration < 5;
          case "medium":
            return course.duration >= 5 && course.duration <= 10;
          case "long":
            return course.duration > 10;
          default:
            return true;
        }
      });
    }

    // Apply pagination
    const start = params?.offset || 0;
    const end = params?.limit ? start + params.limit : filteredCourses.length;
    const paginatedCourses = filteredCourses.slice(start, end);

    return {
      courses: paginatedCourses,
      total: filteredCourses.length,
      limit: params?.limit,
      offset: params?.offset,
    };
  },

  getCourseById: async (id: string): Promise<Course> => {
    // TODO: Replace with actual API call when endpoint is ready
    // const response = await api.get<Course>(`/courses/${id}`);
    // return response;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const course = dummyCourses.find(c => c.id === id);
    
    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  },

  createCourse: async (data: CourseFormData): Promise<Course> => {
    // TODO: Replace with actual API call when endpoint is ready
    // const response = await api.post<Course>("/courses", data);
    // return response;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newCourse: Course = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      category: data.category,
      thumbnail: data.thumbnail,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return newCourse;
  },

  updateCourse: async (id: string, data: Partial<CourseFormData>): Promise<Course> => {
    // TODO: Replace with actual API call when endpoint is ready
    // const response = await api.patch<Course>(`/courses/${id}`, data);
    // return response;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));

    const course = dummyCourses.find(c => c.id === id);
    
    if (!course) {
      throw new Error("Course not found");
    }

    const updatedCourse: Course = {
      ...course,
      ...data,
      updated_at: new Date().toISOString(),
    };

    return updatedCourse;
  },

  deleteCourse: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call when endpoint is ready
    // await api.delete(`/courses/${id}`);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const courseIndex = dummyCourses.findIndex(c => c.id === id);
    
    if (courseIndex === -1) {
      throw new Error("Course not found");
    }
  },
};
