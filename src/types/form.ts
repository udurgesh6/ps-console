import z from "zod";

export const formSchema = z.object({
    id: z.string().nonempty("ID is required"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().nonempty("Category is required"),
    htmlTemplate: z.string().nonempty("HTML content is required"),
});

export type Form = z.infer<typeof formSchema>;
