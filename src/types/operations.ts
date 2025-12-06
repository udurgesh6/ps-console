import z from "zod"

export enum ObjectType {
  EMPLOYEE = "employee",
  EMPLOYEE_GROUP = "employeeGroup",
  SIMULATION_PROFILE = "simulationProfile",
  ATTACK_VECTOR = "attackVector",
  COURSE = "course",
  SUBMISSION_FORM = "submission-form",
  LANDING_PAGE = "landing-page",
}

export enum ValueType {
  STRING = "string",
  ARRAY = "array",
  NUMBER = "number",
  BOOLEAN = "boolean",
}

export enum OperationType {
  DELETE = "delete",
  ASSIGN_GROUP = "assign-group",
}

export const operationInputSchema = z.object({
  key: z.string(),
  value: z.array(z.string()).or(z.string()),
  valueType: z.enum([ValueType.STRING, ValueType.ARRAY]),
})

export type OperationInput = z.infer<typeof operationInputSchema>

export interface OperationRequest {
  objectType: ObjectType
  operationType: OperationType
  input: OperationInput[]
}

export interface OperationResponse {
  status: string
  output?: OperationInput
}

export interface UseOperationOptions {
  onSuccess?: () => void
  invalidateQueries?: string[]
}