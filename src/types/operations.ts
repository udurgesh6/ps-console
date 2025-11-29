export enum ObjectType {
  EMPLOYEE = "employee",
  EMPLOYEE_GROUP = "employeeGroup",
  SIMULATION_PROFILE = "simulationProfile",
  ATTACK_VECTOR = "attackVector",
  COURSE = "course",
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

export interface OperationInput {
  key: string
  value: string | string[] | number | boolean
  valueType: ValueType
}

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