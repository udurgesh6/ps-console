import z from "zod";
import { employeeSchema } from "./employee";

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  memberCount: z.number(),
  department: z.string(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
  members: z.array(employeeSchema),
  riskLevel: z.enum(["low", "medium", "high"]).optional(),
});

export type Group = z.infer<typeof groupSchema>;
