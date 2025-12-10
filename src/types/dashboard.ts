import z from "zod";

// Employee Export Operation
export const employeeExportOperationSchema = z.object({
  message: z.string(),
  operationId: z.string().uuid(),
});

export type EmployeeExportOperation = z.infer<typeof employeeExportOperationSchema>;

export interface EmployeeExportResponse {
  message: string;
  operationId: string;
}
