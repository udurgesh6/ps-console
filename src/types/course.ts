import z from "zod"

export const courseSchema = z.object({
    id: z.string().nonempty("ID is required"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().nonempty("Category is required"),
    level: z.string().nonempty("Level is required"),
    thumbnail: z.string().nonempty("Thumbnail is required"),
    slug: z.string().nonempty("Slug is required"),
    updated_at: z.string().nonempty("Updated at is required"),
});

export type Course = z.infer<typeof courseSchema>;
