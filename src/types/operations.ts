export enum ObjectType {
  EMPLOYEE = "employee",
  EMPLOYEE_GROUP = "employee-group",
  SIMULATION_PROFILE = "simulation-profile",
  ATTACK_VECTOR = "attack-vector",
  COURSE = "course",
}

export enum ValueType {
  STRING = "string",
  ARRAY = "array",
  NUMBER = "number",
  BOOLEAN = "boolean",
}

export interface OperationInput {
  key: string
  value: string | string[] | number | boolean
  valueType: ValueType
}

export interface OperationRequest {
  objectType: ObjectType
  operationType: string
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