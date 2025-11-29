import { ObjectType, ValueType, OperationRequest, OperationInput } from '@/types'

export const createOperationRequest = (
  objectType: ObjectType,
  operationType: string,
  input: OperationInput[]
): OperationRequest => ({
  objectType,
  operationType,
  input,
})

// Helper for bulk delete
export const createBulkDeleteRequest = (
  objectType: ObjectType,
  ids: string[]
): OperationRequest => ({
  objectType,
  operationType: "delete",
  input: [
    {
      key: `${objectType}Id`,
      value: ids,
      valueType: ValueType.ARRAY,
    },
  ],
})

// Helper for employee group assignment
export const createAssignGroupRequest = (
  employeeIds: string[],
  groupId: string
): OperationRequest => ({
  objectType: ObjectType.EMPLOYEE,
  operationType: "assign-group",
  input: [
    {
      key: "employeeId",
      value: employeeIds,
      valueType: ValueType.ARRAY,
    },
    {
      key: "employeeGroupId",
      value: groupId,
      valueType: ValueType.STRING,
    },
  ],
})
