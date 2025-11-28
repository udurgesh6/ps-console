import z from "zod"
import { courseSchema } from "./course";
import { employeeGroupSchema } from "./employee-group";

export const awarenessSchema = z.object({
    id: z.string().nonempty("ID is required"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    category: z.string().nonempty("Category is required"),
    isActive: z.boolean().optional(),
    courses: z.array(courseSchema).min(1, "At least one course is required"),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    employeeGroups: z.array(employeeGroupSchema).min(1, "At least one employee group is required"),
});
export type AwarenessProfile = z.infer<typeof awarenessSchema>;

export const awarenessProfileBasicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  category: z.string().nonempty("Category is required"),
});
export type AwarenessProfileBasicInfoFormData = z.infer<typeof awarenessProfileBasicInfoSchema>;

export const awarenessProfileCoursesSchema = z.object({
  courses: z.array(courseSchema).min(1, "At least one course is required"),
});
export type AwarenessProfileCoursesFormData = z.infer<typeof awarenessProfileCoursesSchema>;

export const awarenessProfileEmployeeGroupsSchema = z.object({
  employeeGroups: z.array(employeeGroupSchema).min(1, "At least one employee group is required"),
});
export type AwarenessProfileEmployeeGroupsFormData = z.infer<typeof awarenessProfileEmployeeGroupsSchema>;

export const baseAwarenessProfileTimelineSchema = z.object({
  startDate: z.string(),
  startTime: z.string(),
  endDate: z.string(),
  endTime: z.string(),
}).refine((data) => {
  if (data.startDate && data.startTime && data.endDate && data.endTime) {
    const start = new Date(`${data.startDate}T${data.startTime}`);
    const end = new Date(`${data.endDate}T${data.endTime}`);
    return end > start;
  }
  return true;
}, {
  message: "End date/time must be after start date/time",
  path: ["endDate"],
});
export type AwarenessProfileTimelineFormData = z.infer<typeof baseAwarenessProfileTimelineSchema>;

