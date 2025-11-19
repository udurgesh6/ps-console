import { z } from "zod";

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  status: z.enum(["active", "inactive"]),
  department: z.string(),
  groupsAssigned: z.array(z.string()),
  riskLevel: z.enum(["low", "medium", "high"]).optional(),
});

export type Employee = z.infer<typeof employeeSchema>;
