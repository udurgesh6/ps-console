import z from "zod"
import { courseSchema } from "./course";

export const awarenessSchema = z.object({
    id: z.string().nonempty("ID is required"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    category: z.string().nonempty("Category is required"),
    isActive: z.boolean().optional(),
    courses: z.array(courseSchema).min(1, "At least one course is required"),
    startDate: z.date("Start date is required"),
    endDate: z.date("End date is required"),
});

export type AwarenessProfile = z.infer<typeof awarenessSchema>;
