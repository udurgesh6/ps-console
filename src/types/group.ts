import z from "zod";

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  memberCount: z.number(),
  department: z.string(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
  members: z.array(z.string()),
});

export type Group = z.infer<typeof groupSchema>;
